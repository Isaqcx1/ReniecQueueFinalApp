import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";
import { useTurno } from "../screens/TurnoContext";

export default function TurnoScreen() {

    const navigation = useNavigation<any>();
    const { turno } = useTurno();

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

            <View style={styles.content}>

                {!turno ? (

                    <>
                        <View style={styles.iconCircle}>

                            <Ionicons
                                name="ticket-outline"
                                size={60}
                                color={Colors.primary}
                            />

                        </View>

                        <Text style={styles.title}>
                            Aún no tienes un turno activo
                        </Text>

                        <Text style={styles.description}>
                            Para obtener un turno virtual debes seleccionar una sede,
                            elegir un trámite y registrarte en la cola virtual.
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.button}
                            onPress={() => navigation.navigate("Sedes")}
                        >

                            <LinearGradient
                                colors={[Colors.primary, Colors.secondary]}
                                style={styles.gradient}
                            >

                                <Ionicons
                                    name="business"
                                    size={22}
                                    color="#fff"
                                />

                                <Text style={styles.buttonText}>
                                    Ir a Sedes
                                </Text>

                            </LinearGradient>

                        </TouchableOpacity>

                    </>

                ) : (

                    <>
                        <View style={styles.iconCircle}>

                            <Ionicons
                                name="checkmark-circle"
                                size={60}
                                color="green"
                            />

                        </View>

                        <Text style={styles.title}>
                            Mi Turno
                        </Text>

                        <View style={styles.ticket}>

                            <Text style={styles.label}>Turno</Text>
                            <Text style={styles.value}>{turno.numero}</Text>

                            <Text style={styles.label}>Sede</Text>
                            <Text style={styles.value}>{turno.sede.nombre}</Text>

                            <Text style={styles.label}>Trámite</Text>
                            <Text style={styles.value}>{turno.tramite.nombre}</Text>

                            <Text style={styles.label}>Personas delante</Text>
                            <Text style={styles.value}>
                                {turno.personasEspera}
                            </Text>

                            <Text style={styles.label}>Tiempo estimado</Text>
                            <Text style={styles.value}>
                                {turno.tiempoEstimado} min
                            </Text>

                            <Text style={styles.label}>Estado</Text>
                            <Text style={styles.value}>
                                {turno.estado}
                            </Text>

                        </View>

                    </>

                )}

            </View>

            <BottomNav active="Turno" />

            <ProfileMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onProfile={() => setMenuVisible(false)}
                onSettings={() => setMenuVisible(false)}
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
        backgroundColor: "#F5F8FC",
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

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
    },

    iconCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#EAF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.primary,
        textAlign: "center",
    },

    description: {
        marginTop: 15,
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        lineHeight: 24,
    },

    button: {
        marginTop: 35,
        width: "100%",
    },

    gradient: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 15,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 17,
        marginLeft: 10,
    },
    ticket: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 20,
        marginTop: 25,
        elevation: 4,
    },

    label: {
        fontSize: 14,
        color: "#777",
        marginTop: 12,
    },

    value: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
    },

});