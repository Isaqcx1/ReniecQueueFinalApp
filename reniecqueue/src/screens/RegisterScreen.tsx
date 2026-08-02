import React, { useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";

import {
    useRoute,
    useNavigation,
} from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../styles/colors";

import {
    obtenerCiudadanoPorDni,
    registrarUsuario,
} from "../data/reniecData";

export default function RegisterScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const dni: string = route.params?.dni ?? "";

    const ciudadano = obtenerCiudadanoPorDni(dni);

    const [correo, setCorreo] = useState("");
    const [celular, setCelular] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    const registrar = () => {
        const correoLimpio = correo
            .trim()
            .toLowerCase();

        const celularLimpio = celular.trim();

        if (!dni || !ciudadano) {
            Alert.alert(
                "DNI no válido",
                "No se encontraron los datos del ciudadano en RENIEC."
            );
            return;
        }

        if (
            correoLimpio === "" ||
            celularLimpio === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            Alert.alert(
                "Campos incompletos",
                "Complete toda la información."
            );
            return;
        }

        const expresionCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!expresionCorreo.test(correoLimpio)) {
            Alert.alert(
                "Correo inválido",
                "Ingrese un correo electrónico válido."
            );
            return;
        }

        if (!/^\d{9}$/.test(celularLimpio)) {
            Alert.alert(
                "Celular inválido",
                "El número de celular debe tener 9 dígitos."
            );
            return;
        }

        if (password.length < 6) {
            Alert.alert(
                "Contraseña inválida",
                "La contraseña debe tener al menos 6 caracteres."
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(
                "Contraseñas diferentes",
                "Las contraseñas no coinciden."
            );
            return;
        }

        const resultado = registrarUsuario({
            dni,
            correo: correoLimpio,
            celular: celularLimpio,
            password,
        });

        if (!resultado.ok) {
            Alert.alert(
                "No se pudo registrar",
                resultado.mensaje
            );
            return;
        }

        Alert.alert(
            "Registro exitoso",
            resultado.mensaje,
            [
                {
                    text: "Iniciar sesión",
                    onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                {
                                    name: "Login",
                                },
                            ],
                        });
                    },
                },
            ],
            {
                cancelable: false,
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <LinearGradient
                    colors={[
                        Colors.primary,
                        Colors.secondary,
                    ]}
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <Image
                        source={require("../assets/logor.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </LinearGradient>

                <View style={styles.card}>
                    <Text style={styles.loginText}>
                        Crear cuenta
                    </Text>

                    <Text style={styles.description}>
                        Complete la siguiente información para
                        finalizar su registro.
                    </Text>

                    <View style={styles.reniecCard}>
                        <View style={styles.reniecHeader}>
                            <Ionicons
                                name="shield-checkmark"
                                size={22}
                                color={Colors.primary}
                            />

                            <Text style={styles.reniecTitle}>
                                Datos verificados en RENIEC
                            </Text>
                        </View>

                        <Text style={styles.reniecLabel}>
                            DNI
                        </Text>

                        <Text style={styles.reniecValue}>
                            {dni || "No disponible"}
                        </Text>

                        <Text style={styles.reniecLabel}>
                            Ciudadano
                        </Text>

                        <Text style={styles.reniecValue}>
                            {ciudadano
                                ? `${ciudadano.nombres} ${ciudadano.apellidoPaterno} ${ciudadano.apellidoMaterno}`
                                : "Ciudadano no encontrado"}
                        </Text>
                    </View>

                    <Input
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={correo}
                        onChangeText={setCorreo}
                    />

                    <Input
                        placeholder="Celular"
                        keyboardType="phone-pad"
                        value={celular}
                        maxLength={9}
                        onChangeText={(value: string) =>
                            setCelular(
                                value.replace(/\D/g, "")
                            )
                        }
                    />

                    <View style={styles.passwordContainer}>
                        <Input
                            placeholder="Contraseña"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            style={styles.eye}
                            onPress={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye"
                                        : "eye-off"
                                }
                                size={22}
                                color={Colors.gray}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <Input
                            placeholder="Confirmar contraseña"
                            secureTextEntry={
                                !showConfirmPassword
                            }
                            value={confirmPassword}
                            onChangeText={
                                setConfirmPassword
                            }
                        />

                        <TouchableOpacity
                            style={styles.eye}
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >
                            <Ionicons
                                name={
                                    showConfirmPassword
                                        ? "eye"
                                        : "eye-off"
                                }
                                size={22}
                                color={Colors.gray}
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Crear cuenta"
                        onPress={registrar}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },

    header: {
        height: 280,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
    },

    backButton: {
        position: "absolute",
        top: 18,
        left: 18,
        width: 42,
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginTop: -40,
        borderRadius: 25,
        padding: 25,
        elevation: 10,
    },

    loginText: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.text,
    },

    description: {
        marginTop: 5,
        marginBottom: 20,
        color: Colors.gray,
        lineHeight: 20,
    },

    reniecCard: {
        backgroundColor: "#F1F6FC",
        borderRadius: 15,
        padding: 15,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#DCE8F5",
    },

    reniecHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    reniecTitle: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "700",
        color: Colors.primary,
    },

    reniecLabel: {
        fontSize: 12,
        color: Colors.gray,
        marginTop: 5,
    },

    reniecValue: {
        fontSize: 15,
        color: Colors.text,
        fontWeight: "600",
        marginTop: 2,
    },

    passwordContainer: {
        position: "relative",
    },

    eye: {
        position: "absolute",
        right: 15,
        top: 16,
    },

    logo: {
        width: 325,
        height: 325,
        marginBottom: 10,
    },
});