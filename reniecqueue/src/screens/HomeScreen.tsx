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

export default function HomeScreen() {

    const navigation = useNavigation<any>();

    const [menuVisible, setMenuVisible] = useState(false);

    return (

        <SafeAreaView style={styles.container}>

            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.header}
            >

                <Image
                    source={require("../assets/logor.png")} // o la ruta donde tengas el logo
                    resizeMode="contain"
                    style={styles.headerLogo}
                />

                <TouchableOpacity
                    style={styles.profileButton}
                    onPress={() => setMenuVisible(true)}
                >

                    <Ionicons
                        name="person-circle"
                        size={44}
                        color="#fff"
                    />

                </TouchableOpacity>

            </LinearGradient>

            <View style={styles.content}>

                <Image
                    source={require("../assets/filar.png")}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.card}>

                    <Text style={styles.title}>
                        Bienvenido
                    </Text>

                    <Text style={styles.description}>
                        RENIEC Queue es una aplicación que facilita la gestión
                        de turnos en las diferentes sedes de RENIEC.
                        Desde aquí podrás consultar las sedes disponibles,
                        solicitar un turno y realizar el seguimiento de tu
                        atención sin necesidad de hacer largas colas.
                    </Text>

                    <View style={styles.infoBox}>

                        <Ionicons
                            name="information-circle"
                            size={28}
                            color={Colors.primary}
                        />

                        <Text style={styles.infoText}>
                            Utiliza la pestaña{" "}
                            <Text style={styles.bold}>
                                Sedes
                            </Text>{" "}
                            para elegir la oficina donde deseas realizar
                            tu trámite.
                        </Text>

                    </View>

                </View>

            </View>

            <BottomNav active="Inicio" />

            <ProfileMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onProfile={() => {
                    setMenuVisible(false);
                    navigation.navigate("Profile");
                }}
                onSettings={() => {
                    setMenuVisible(false);
                    navigation.navigate("Settings");
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },

    header: {
        height: 120,

        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        elevation: 8,
    },

    headerLogo: {
        width: 250,
        height: 200,
    },
    profileButton: {
        position: "absolute",
        right: 20,
        top: 55,
    },

    image: {
        width: "100%",
        height: 340, 
        borderRadius: 25,
        marginBottom: -40, 
        marginTop:20,
        zIndex: 1,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 20,
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        marginTop: -60, // antes -80, ahora más abajo
        position: "relative",
        zIndex: 2,
    },


   

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: Colors.text,
        marginBottom: 12,
    },

    description: {
        fontSize: 16,
        color: Colors.gray,
        lineHeight: 25,
        textAlign: "justify",
    },

    infoBox: {
        marginTop: 22,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EEF6FF",
        borderRadius: 18,
        padding: 15,
    },

    infoText: {
        flex: 1,
        marginLeft: 10,
        color: Colors.text,
        fontSize: 15,
        lineHeight: 22,
    },

    bold: {
        fontWeight: "bold",
        color: Colors.primary,
    },

});