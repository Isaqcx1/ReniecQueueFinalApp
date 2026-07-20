import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import Input from "../components/Input";
import Button from "../components/Button";
import Colors from "../styles/colors";

export default function RegisterScreen() {

    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    
    const { dni } = route.params;

    const [correo, setCorreo] = useState("");
    const [celular, setCelular] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registrar = () => {

        if (
            correo.trim() === "" ||
            celular.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            Alert.alert(
                "Campos incompletos",
                "Complete toda la información."
            );
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert(
                "Contraseña",
                "Las contraseñas no coinciden."
            );
            return;
        }

        

        Alert.alert(
            "Registro exitoso",
            "Su cuenta fue creada correctamente.",
            [
                {
                    text: "Aceptar",
                    onPress: () => navigation.navigate("Login"),
                },
            ]
        );
    };

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
                    Crear cuenta
                </Text>

                <Text style={styles.description}>
                    Complete la siguiente información para finalizar su registro.
                </Text>

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
                    onChangeText={setCelular}
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
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Ionicons
                            name={showPassword ? "eye" : "eye-off"}
                            size={22}
                            color={Colors.gray}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.passwordContainer}>

                    <Input
                        placeholder="Confirmar contraseña"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <TouchableOpacity
                        style={styles.eye}
                        onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye" : "eye-off"}
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

    card: {

        backgroundColor: "white",

        marginHorizontal: 20,

        marginTop: -40,

        borderRadius: 25,

        padding: 25,

        elevation: 10,

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

    logo: {

        width: 325,

        height: 325,

        marginBottom: 10

    },

});