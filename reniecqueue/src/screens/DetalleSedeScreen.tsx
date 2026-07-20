import React, { useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import MapView, { Marker } from "react-native-maps";

import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";

export default function DetalleSedeScreen() {

    const navigation = useNavigation<any>();

    const route = useRoute<any>();

    const { sede } = route.params;

    const [menuVisible, setMenuVisible] = useState(false);

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
                        size={42}
                        color="#fff"
                    />

                </TouchableOpacity>

            </LinearGradient>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <Image
                    source={sede.imagen}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.card}>

                    <Text style={styles.title}>
                        {sede.nombre}
                    </Text>

                    <View style={styles.infoRow}>

                        <Ionicons
                            name="location"
                            size={22}
                            color={Colors.primary}
                        />

                        <Text style={styles.address}>
                            {sede.direccion}
                        </Text>

                    </View>

                    <Text style={styles.section}>
                        Ubicación
                    </Text>

                    <MapView

                        style={styles.map}

                        initialRegion={{

                            latitude: sede.latitud,

                            longitude: sede.longitud,

                            latitudeDelta: 0.01,

                            longitudeDelta: 0.01,

                        }}

                    >

                        <Marker

                            coordinate={{

                                latitude: sede.latitud,

                                longitude: sede.longitud,

                            }}

                            title={sede.nombre}

                            description={sede.direccion}

                        />

                    </MapView>
                                        <Text style={styles.section}>
                        Información de la sede
                    </Text>

                    <View style={styles.infoCard}>

                        <View style={styles.item}>

                            <Ionicons
                                name="time-outline"
                                size={24}
                                color={Colors.primary}
                            />

                            <View style={styles.itemText}>

                                <Text style={styles.itemTitle}>
                                    Horario de atención
                                </Text>

                                <Text style={styles.itemDescription}>
                                    Lunes - Viernes
                                </Text>

                                <Text style={styles.itemDescription}>
                                    8:30 a.m. - 5:00 p.m.
                                </Text>

                            </View>

                        </View>

                        <View style={styles.separator}/>

                        <View style={styles.item}>

                            <Ionicons
                                name="call-outline"
                                size={24}
                                color={Colors.primary}
                            />

                            <View style={styles.itemText}>

                                <Text style={styles.itemTitle}>
                                    Teléfono
                                </Text>

                                <Text style={styles.itemDescription}>
                                    (01) 315-4000
                                </Text>

                            </View>

                        </View>

                        <View style={styles.separator}/>

                        <View style={styles.item}>

                            <Ionicons
                                name="business-outline"
                                size={24}
                                color={Colors.primary}
                            />

                            <View style={styles.itemText}>

                                <Text style={styles.itemTitle}>
                                    Estado
                                </Text>

                                <Text style={styles.itemDescription}>
                                    Disponible para solicitar turno
                                </Text>

                            </View>

                        </View>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("Tramites", {
                                sede,
                            })
                        }
                    >

                        <LinearGradient
                            colors={[
                                Colors.primary,
                                Colors.secondary,
                            ]}
                            style={styles.gradient}
                        >

                            <Text style={styles.buttonText}>
                                Continuar
                            </Text>

                            <Ionicons
                                name="arrow-forward"
                                color="#fff"
                                size={22}
                            />

                        </LinearGradient>

                    </TouchableOpacity>

                </View>

            </ScrollView>

            <BottomNav active="Sedes"/>

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
        backgroundColor: "#F4F7FB",
    },

    header: {
        height: 120,

        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        elevation: 8,
    },

    logo: {
        width: 220,
        height: 200,
    },

    profile: {
        position: "absolute",
        right: 20,
        top: 55,
    },

    image: {
        width: "100%",
        height: 240,
    },

    card: {
        backgroundColor: "#fff",
        marginTop: -20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 22,
        elevation: 8,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.text,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 20,
    },

    address: {
        flex: 1,
        marginLeft: 10,
        color: Colors.gray,
        fontSize: 15,
        lineHeight: 22,
    },

    section: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.text,
        marginBottom: 15,
        marginTop: 10,
    },

    map: {
        width: "100%",
        height: 250,
        borderRadius: 20,
        overflow: "hidden",
    },

    infoCard: {
        backgroundColor: "#F8FAFD",
        borderRadius: 20,
        marginTop: 20,
        paddingVertical: 5,
        elevation: 2,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 18,
    },

    itemText: {
        marginLeft: 15,
        flex: 1,
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text,
    },

    itemDescription: {
        color: Colors.gray,
        marginTop: 3,
        fontSize: 14,
    },

    separator: {
        height: 1,
        backgroundColor: "#E5E5E5",
        marginHorizontal: 18,
    },

    button: {
        marginTop: 30,
        marginBottom: 120,
    },

    gradient: {
        height: 58,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },

});