import React, { useRef, useState } from "react";
import { Image } from "react-native";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import Input from "../components/Input";

import Button from "../components/Button";

import Colors from "../styles/colors";

import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {

    const navigation = useNavigation<any>();

    const [dni, setDni] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [dniMessage, setDniMessage] = useState("");
    const [dniStatus, setDniStatus] = useState<
        "success" | "error" | "loading" | ""
    >("");
    const [showPasswordField, setShowPasswordField] = useState(false);


    const [showRegister, setShowRegister] = useState(false);



    const verificarDni = (value: string) => {
        fadeAnim.setValue(0);

        setDni(value);

        setShowPasswordField(false);
        setShowRegister(false);
        setDniMessage("");
        setDniStatus("");

        if (value.length !== 8) return;

        setDniStatus("loading");
        setDniMessage("Verificando DNI...");

        setTimeout(() => {

            const registrados = [
                "74258136",
                "71582469",
                "78451236",
                "73698521",
            ];

            const reniec = [
                ...registrados,
                "75982413",
                "74856329",
                "76325841",
                "79415236",
                "72156384",
                "73512469",
            ];

            if (!reniec.includes(value)) {
                setDniStatus("error");
                setDniMessage("DNI no encontrado en RENIEC.");
                return;
            }

            if (registrados.includes(value)) {
                setDniStatus("success");
                setDniMessage("DNI válido. Bienvenido nuevamente.");
                setShowPasswordField(true);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            } else {
                setDniStatus("success");
                setDniMessage("DNI válido. Debe registrarse.");
                setShowRegister(true);

                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }

        }, 1000);

    };

    const fadeAnim = useRef(new Animated.Value(0)).current;

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





            </LinearGradient>

            <View style={styles.card}>

                <Text style={styles.loginText}>

                    Bienvenido

                </Text>

                <Text style={styles.description}>

                    Ingresa con tu DNI y contraseña.

                </Text>

                <Input
                    placeholder="DNI"
                    keyboardType="numeric"
                    value={dni}
                    onChangeText={verificarDni}
                    maxLength={8}
                />

                {dniMessage !== "" && (

                    <Text
                        style={[
                            styles.message,
                            dniStatus === "success" && styles.success,
                            dniStatus === "error" && styles.error,
                            dniStatus === "loading" && styles.loading,
                        ]}
                    >
                        {dniMessage}
                    </Text>

                )}

                {showPasswordField && (

                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        }}
                    >

                        <View style={styles.passwordContainer}>
                            <Input
                                placeholder="Contraseña"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity
                                style={styles.eye}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={22}
                                    color={Colors.gray}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity>
                            <Text style={styles.forgot}>
                                ¿Olvidaste tu contraseña?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Ingresar"
                            onPress={() => console.log("Login")}
                        />

                    </Animated.View>

                )}

                {showRegister && (

                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-20, 0],
                                    }),
                                },
                            ],
                        }}
                    >

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Register", {
                                    dni: dni,
                                })
                            }
                        >
                            <Text style={styles.register}>
                                Registrarse
                            </Text>
                        </TouchableOpacity>

                    </Animated.View>

                )}

            </View>

        </SafeAreaView>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: Colors.background

    },

    header: {

        height: 300,

        justifyContent: "center",

        alignItems: "center",

        borderBottomLeftRadius: 45,

        borderBottomRightRadius: 45,




    },

    title: {

        color: "white",

        fontSize: 34,

        fontWeight: "bold",

        marginTop: 10

    },

    subtitle: {

        color: "white",

        fontSize: 16,

        marginTop: 5

    },

    card: {

        backgroundColor: "white",

        marginHorizontal: 20,

        marginTop: -40,

        borderRadius: 25,

        padding: 25,

        elevation: 10

    },

    loginText: {

        fontSize: 28,

        fontWeight: "bold",

        color: Colors.text

    },

    description: {

        marginTop: 5,

        marginBottom: 25,

        color: Colors.gray

    },

    passwordContainer: {

        position: "relative"

    },

    eye: {

        position: "absolute",

        right: 15,

        top: 16

    },

    forgot: {

        textAlign: "right",

        color: Colors.primary,

        marginBottom: 15

    },

    register: {

        textAlign: "center",

        marginTop: 25,

        color: Colors.primary,

        fontWeight: "600"

    },

    logo: {

        width: 325,

        height: 325,

        marginBottom: 10

    },

    message: {
        marginTop: -12,
        marginBottom: 18,
        fontSize: 14,
        fontWeight: "600",
    },

    success: {
        color: Colors.success,
    },

    error: {
        color: Colors.danger,
    },

    loading: {
        color: Colors.info,
    },

});