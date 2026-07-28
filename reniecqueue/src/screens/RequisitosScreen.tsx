import React, { useMemo, useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import Colors from "../styles/colors";

import BottomNav from "../components/BottomNav";

import ProfileMenu from "../components/ProfileMenu";

import { requisitos } from "../data/requisitosData";

export default function RequisitosScreen() {

    const navigation = useNavigation<any>();

    const route = useRoute<any>();

    const { sede, tramite } = route.params;

    const [menuVisible, setMenuVisible] = useState(false);

    const informacion = useMemo(() => {

        return requisitos.find(
            item => item.idTramite === tramite.id
        );

    }, [tramite]);

    if (!informacion) {

        return (

            <SafeAreaView style={styles.container}>

                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 100,
                        fontSize: 18,
                    }}
                >
                    No existe información para este trámite.
                </Text>

            </SafeAreaView>

        );

    }

    return (

        <SafeAreaView style={styles.container}>

            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.header}
            >

                <Image
                    source={require("../assets/logor.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.profile}
                    onPress={() => setMenuVisible(true)}
                >

                    <Ionicons
                        name="person-circle"
                        color="#fff"
                        size={42}
                    />

                </TouchableOpacity>

            </LinearGradient>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.card}>

                    <Text style={styles.screenTitle}>
                        Información del trámite
                    </Text>

                    <Text style={styles.screenSubtitle}>
                        Revise toda la información antes de solicitar su turno.
                    </Text>
                    <View style={styles.infoCard}>

    <View style={styles.iconCircle}>

        <Ionicons
            name="business"
            size={28}
            color={Colors.primary}
        />

    </View>

    <View style={{ flex: 1 }}>

        <Text style={styles.cardTitle}>
            {sede.nombre}
        </Text>

        <Text style={styles.cardDescription}>
            {sede.direccion}
        </Text>

    </View>

</View>

<View style={styles.infoCard}>

    <View style={styles.iconCircle}>

        <MaterialCommunityIcons
            name={tramite.icono}
            size={30}
            color={Colors.primary}
        />

    </View>

    <View style={{ flex: 1 }}>

        <Text style={styles.cardTitle}>
            {informacion.titulo}
        </Text>

        <Text style={styles.cardDescription}>
            {informacion.descripcion}
        </Text>

    </View>

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="cash-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Costo del trámite
        </Text>

    </View>

    <Text style={styles.sectionText}>
        {informacion.costo}
    </Text>

    <Text style={styles.smallText}>
        Código de pago: {informacion.codigoPago}
    </Text>

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="time-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Tiempo de atención
        </Text>

    </View>

    <Text style={styles.sectionText}>
        {informacion.tiempo}
    </Text>

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="person-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Modalidad
        </Text>

    </View>

    <Text style={styles.sectionText}>
        {informacion.modalidad}
    </Text>

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="card-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Lugares de pago
        </Text>

    </View>

    {

        informacion.lugaresPago.map((lugar, index) => (

            <View
                key={index}
                style={styles.listRow}
            >

                <Ionicons
                    name="checkmark-circle"
                    color={Colors.primary}
                    size={20}
                />

                <Text style={styles.listText}>
                    {lugar}
                </Text>

            </View>

        ))

    }

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="document-text-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Requisitos
        </Text>

    </View>

    {

        informacion.requisitos.map((req, index) => (

            <View
                key={index}
                style={styles.listRow}
            >

                <Ionicons
                    name="checkmark-circle"
                    color="#2ECC71"
                    size={20}
                />

                <Text style={styles.listText}>
                    {req}
                </Text>

            </View>

        ))

    }

</View>

<View style={styles.sectionCard}>

    <View style={styles.sectionHeader}>

        <Ionicons
            name="information-circle-outline"
            size={24}
            color={Colors.primary}
        />

        <Text style={styles.sectionTitle}>
            Observaciones
        </Text>

    </View>

    {

        informacion.observaciones.map((obs, index) => (

            <View
                key={index}
                style={styles.listRow}
            >

                <Ionicons
                    name="ellipse"
                    size={10}
                    color={Colors.primary}
                />

                <Text style={styles.listText}>
                    {obs}
                </Text>

            </View>

        ))

    }

</View>
<View style={styles.buttonContainer}>

    <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() =>
            navigation.navigate("DescargarRequisitos", {
                sede,
                tramite,
                informacion,
            })
        }
    >

        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.gradient}
        >

            <Ionicons
                name="download-outline"
                size={24}
                color="#fff"
            />

            <Text style={styles.buttonText}>
                Descargar requisitos (PDF)
            </Text>

        </LinearGradient>

    </TouchableOpacity>

    <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={() =>
            navigation.navigate("RegistroCola", {
                sede,
                tramite,
            })
        }
    >

        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.gradient}
        >

            <Ionicons
                name="people-outline"
                size={24}
                color="#fff"
            />

            <Text style={styles.buttonText}>
                Registrarme en la cola
            </Text>

        </LinearGradient>

    </TouchableOpacity>

</View>

</View>

</ScrollView>

<BottomNav active="Turno" />

<ProfileMenu

    visible={menuVisible}

    onClose={() => setMenuVisible(false)}

    onProfile={() => {

        setMenuVisible(false);

    }}

    onSettings={() => {

        setMenuVisible(false);

    }}

    onLogout={() => {

        setMenuVisible(false);

        navigation.replace("Login");

    }}

/>

</SafeAreaView>

);

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    header: {
        height: 120,

        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        elevation: 8,
    },

    logo: {

        width: 250,
        height: 200,

    },

    profile: {
        position: "absolute",
        right: 20,
        top: 55,
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        marginTop: 12,
        marginBottom: 95,
        borderRadius: 24,
        padding: 20,
        elevation: 8,
    },

    screenTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.text,
    },

    screenSubtitle: {
        marginTop: 6,
        marginBottom: 22,
        color: Colors.gray,
        lineHeight: 22,
    },

    infoCard: {
        backgroundColor: "#F8FBFF",
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#D9EFFF",
    },

    iconCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "#EAF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },

    cardDescription: {
        marginTop: 5,
        color: Colors.gray,
        lineHeight: 20,
    },

    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#EEF4FA",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    sectionTitle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },

    sectionText: {
        fontSize: 18,
        color: Colors.primary,
        fontWeight: "700",
    },

    smallText: {
        marginTop: 5,
        color: Colors.gray,
        fontSize: 14,
    },

    listRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },

    listText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: Colors.text,
        lineHeight: 22,
    },

    buttonContainer: {
        marginTop: 10,
    },

    button: {
        marginBottom: 15,
    },

    gradient: {
        height: 58,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 10,
    },

});