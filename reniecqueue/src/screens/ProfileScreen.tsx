import React, {
    useEffect,
    useState,
} from "react";

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../styles/colors";
import { useUsuario } from "./UsuarioContext";

interface FilaInformacionProps {
    icono: keyof typeof Ionicons.glyphMap;
    etiqueta: string;
    valor: string;
}

function FilaInformacion({
    icono,
    etiqueta,
    valor,
}: FilaInformacionProps) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
                <Ionicons
                    name={icono}
                    size={21}
                    color={Colors.primary}
                />
            </View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>
                    {etiqueta}
                </Text>

                <Text style={styles.infoValue}>
                    {valor || "No registrado"}
                </Text>
            </View>
        </View>
    );
}

export default function ProfileScreen() {
    const navigation = useNavigation<any>();

    const {
        usuario,
        actualizarPerfil,
        cambiarPassword,
    } = useUsuario();

    const [editando, setEditando] =
        useState(false);

    const [nombrePerfil, setNombrePerfil] =
        useState("");

    const [correo, setCorreo] =
        useState("");

    const [celular, setCelular] =
        useState("");

    const [
        passwordModalVisible,
        setPasswordModalVisible,
    ] = useState(false);

    const [
        passwordActual,
        setPasswordActual,
    ] = useState("");

    const [
        nuevaPassword,
        setNuevaPassword,
    ] = useState("");

    const [
        confirmarPassword,
        setConfirmarPassword,
    ] = useState("");

    useEffect(() => {
        if (usuario) {
            setNombrePerfil(
                usuario.nombrePerfil
            );

            setCorreo(usuario.correo);
            setCelular(usuario.celular);
        }
    }, [usuario]);

    function cancelarEdicion() {
        if (!usuario) return;

        setNombrePerfil(
            usuario.nombrePerfil
        );

        setCorreo(usuario.correo);
        setCelular(usuario.celular);

        setEditando(false);
    }

    function guardarPerfil() {
        const nombreLimpio =
            nombrePerfil.trim();

        const correoLimpio =
            correo.trim();

        const celularLimpio =
            celular.trim();

        if (nombreLimpio.length < 2) {
            Alert.alert(
                "Nombre inválido",
                "Ingrese un nombre de perfil válido."
            );

            return;
        }

        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !correoValido.test(correoLimpio)
        ) {
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

        const actualizado =
            actualizarPerfil({
                nombrePerfil:
                    nombreLimpio,
                correo: correoLimpio,
                celular: celularLimpio,
            });

        if (!actualizado) {
            Alert.alert(
                "Error",
                "No se pudo actualizar el perfil."
            );

            return;
        }

        setEditando(false);

        Alert.alert(
            "Perfil actualizado",
            "Los datos de tu cuenta fueron actualizados correctamente."
        );
    }

    function abrirCambioPassword() {
        setPasswordActual("");
        setNuevaPassword("");
        setConfirmarPassword("");

        setPasswordModalVisible(true);
    }

    function guardarPassword() {
        if (
            passwordActual.trim() === "" ||
            nuevaPassword.trim() === "" ||
            confirmarPassword.trim() === ""
        ) {
            Alert.alert(
                "Campos incompletos",
                "Complete todos los campos."
            );

            return;
        }

        if (nuevaPassword.length < 6) {
            Alert.alert(
                "Contraseña inválida",
                "La nueva contraseña debe tener al menos 6 caracteres."
            );

            return;
        }

        if (
            nuevaPassword !==
            confirmarPassword
        ) {
            Alert.alert(
                "Las contraseñas no coinciden",
                "La confirmación debe ser igual a la nueva contraseña."
            );

            return;
        }

        const resultado =
            cambiarPassword(
                passwordActual,
                nuevaPassword
            );

        if (!resultado.ok) {
            Alert.alert(
                "No se pudo actualizar",
                resultado.mensaje
            );

            return;
        }

        setPasswordModalVisible(false);

        Alert.alert(
            "Contraseña actualizada",
            resultado.mensaje
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView
                style={styles.container}
            >
                <View
                    style={styles.noSessionContainer}
                >
                    <Ionicons
                        name="person-circle-outline"
                        size={75}
                        color={Colors.primary}
                    />

                    <Text
                        style={styles.noSessionTitle}
                    >
                        No existe una sesión activa
                    </Text>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: "Login",
                                    },
                                ],
                            })
                        }
                    >
                        <Text
                            style={
                                styles.loginButtonText
                            }
                        >
                            Volver al inicio
                        </Text>
                    </TouchableOpacity>
                </View>
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
                />
            </LinearGradient>



            <ScrollView
                contentContainerStyle={
                    styles.scrollContent
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View style={styles.profileHeader}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={Colors.primary}
                        />
                    </TouchableOpacity>

                    

                    <View style={styles.avatar}>
                        <Ionicons
                            name="person"
                            size={60}
                            color={Colors.primary}
                        />
                    </View>

                    <Text style={styles.profileName}>
                        {usuario.nombrePerfil}
                    </Text>

                    <Text style={styles.profileDni}>
                        DNI: {usuario.dni}
                    </Text>

                </View>

                <View style={styles.section}>
                    <View
                        style={
                            styles.sectionTitleContainer
                        }
                    >
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={23}
                            color={Colors.primary}
                        />

                        <View style={styles.titleText}>
                            <Text
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Datos registrados en
                                RENIEC
                            </Text>

                            <Text
                                style={
                                    styles.sectionDescription
                                }
                            >
                                Esta información es
                                oficial y no puede
                                modificarse.
                            </Text>
                        </View>
                    </View>

                    <FilaInformacion
                        icono="card-outline"
                        etiqueta="DNI"
                        valor={usuario.dni}
                    />

                    <FilaInformacion
                        icono="person-outline"
                        etiqueta="Nombres"
                        valor={usuario.nombres}
                    />

                    <FilaInformacion
                        icono="person-outline"
                        etiqueta="Apellido paterno"
                        valor={
                            usuario.apellidoPaterno
                        }
                    />

                    <FilaInformacion
                        icono="person-outline"
                        etiqueta="Apellido materno"
                        valor={
                            usuario.apellidoMaterno
                        }
                    />
                </View>

                <View style={styles.section}>
                    <View
                        style={
                            styles.sectionTitleContainer
                        }
                    >
                        <Ionicons
                            name="settings-outline"
                            size={23}
                            color={Colors.primary}
                        />

                        <View style={styles.titleText}>
                            <Text
                                style={
                                    styles.sectionTitle
                                }
                            >
                                Datos de mi cuenta
                            </Text>

                            <Text
                                style={
                                    styles.sectionDescription
                                }
                            >
                                Esta información sí
                                puede ser modificada.
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.inputLabel}>
                        Nombre de perfil
                    </Text>

                    {editando ? (
                        <TextInput
                            style={styles.input}
                            value={nombrePerfil}
                            onChangeText={
                                setNombrePerfil
                            }
                            placeholder="Nombre de perfil"
                        />
                    ) : (
                        <View
                            style={
                                styles.readOnlyField
                            }
                        >
                            <Ionicons
                                name="person-outline"
                                size={21}
                                color={Colors.primary}
                            />

                            <Text
                                style={
                                    styles.readOnlyText
                                }
                            >
                                {usuario.nombrePerfil}
                            </Text>
                        </View>
                    )}

                    <Text style={styles.inputLabel}>
                        Correo electrónico
                    </Text>

                    {editando ? (
                        <TextInput
                            style={styles.input}
                            value={correo}
                            onChangeText={setCorreo}
                            placeholder="Correo electrónico"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    ) : (
                        <View
                            style={
                                styles.readOnlyField
                            }
                        >
                            <Ionicons
                                name="mail-outline"
                                size={21}
                                color={Colors.primary}
                            />

                            <Text
                                style={
                                    styles.readOnlyText
                                }
                            >
                                {usuario.correo ||
                                    "No registrado"}
                            </Text>
                        </View>
                    )}

                    <Text style={styles.inputLabel}>
                        Celular
                    </Text>

                    {editando ? (
                        <TextInput
                            style={styles.input}
                            value={celular}
                            onChangeText={(value) =>
                                setCelular(
                                    value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                            placeholder="Número de celular"
                            keyboardType="numeric"
                            maxLength={9}
                        />
                    ) : (
                        <View
                            style={
                                styles.readOnlyField
                            }
                        >
                            <Ionicons
                                name="call-outline"
                                size={21}
                                color={Colors.primary}
                            />

                            <Text
                                style={
                                    styles.readOnlyText
                                }
                            >
                                {usuario.celular ||
                                    "No registrado"}
                            </Text>
                        </View>
                    )}

                    {!editando ? (
                        <>
                            <TouchableOpacity
                                style={
                                    styles.editButton
                                }
                                onPress={() =>
                                    setEditando(true)
                                }
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={21}
                                    color="#fff"
                                />

                                <Text
                                    style={
                                        styles.editButtonText
                                    }
                                >
                                    Editar perfil
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    styles.passwordButton
                                }
                                onPress={
                                    abrirCambioPassword
                                }
                            >
                                <Ionicons
                                    name="key-outline"
                                    size={21}
                                    color={
                                        Colors.primary
                                    }
                                />

                                <Text
                                    style={
                                        styles.passwordButtonText
                                    }
                                >
                                    Cambiar contraseña
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View
                            style={
                                styles.actionButtons
                            }
                        >
                            <TouchableOpacity
                                style={
                                    styles.cancelButton
                                }
                                onPress={
                                    cancelarEdicion
                                }
                            >
                                <Text
                                    style={
                                        styles.cancelButtonText
                                    }
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    styles.saveButton
                                }
                                onPress={
                                    guardarPerfil
                                }
                            >
                                <Text
                                    style={
                                        styles.saveButtonText
                                    }
                                >
                                    Guardar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            <Modal
                visible={passwordModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setPasswordModalVisible(false)
                }
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View
                            style={
                                styles.modalIconContainer
                            }
                        >
                            <Ionicons
                                name="key-outline"
                                size={35}
                                color={Colors.primary}
                            />
                        </View>

                        <Text style={styles.modalTitle}>
                            Cambiar contraseña
                        </Text>

                        <Text
                            style={styles.modalDescription}
                        >
                            Ingresa tu contraseña
                            actual y la nueva
                            contraseña.
                        </Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Contraseña actual"
                            value={passwordActual}
                            onChangeText={
                                setPasswordActual
                            }
                            secureTextEntry
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nueva contraseña"
                            value={nuevaPassword}
                            onChangeText={
                                setNuevaPassword
                            }
                            secureTextEntry
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Confirmar nueva contraseña"
                            value={confirmarPassword}
                            onChangeText={
                                setConfirmarPassword
                            }
                            secureTextEntry
                        />

                        <View
                            style={
                                styles.modalButtons
                            }
                        >
                            <TouchableOpacity
                                style={
                                    styles.modalCancelButton
                                }
                                onPress={() =>
                                    setPasswordModalVisible(
                                        false
                                    )
                                }
                            >
                                <Text
                                    style={
                                        styles.modalCancelText
                                    }
                                >
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    styles.modalSaveButton
                                }
                                onPress={
                                    guardarPassword
                                }
                            >
                                <Text
                                    style={
                                        styles.modalSaveText
                                    }
                                >
                                    Actualizar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FB",
    },

   header: {
    height: 110,
    justifyContent: "center",
    alignItems: "center",
},

logo: {
     width: 250,
        height: 200,

    resizeMode: "contain",
},

    

    backButton: {
    alignSelf: "flex-start",
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginBottom: 12,
},
    profileHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 25,
},

  



   avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EAF2FC",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 5,
},

   profileName: {
    marginTop: 18,
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
},


profileDni: {
    marginTop: 4,
    fontSize: 15,
    color: "#777",
},







  


    screenSubtitle: {
        marginTop: 5,
        fontSize: 15,
        color: "#666",
    },




    scrollContent: {
        paddingBottom: 40,
    },



  

  

    section: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 18,
        marginBottom: 18,
        elevation: 3,
    },

    sectionTitleContainer: {
        flexDirection: "row",
        marginBottom: 18,
    },

    titleText: {
        flex: 1,
        marginLeft: 11,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    sectionDescription: {
        marginTop: 4,
        fontSize: 13,
        color: "#777",
        lineHeight: 18,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF1F5",
    },

    infoIcon: {
        width: 38,
        alignItems: "center",
    },

    infoContent: {
        flex: 1,
        marginLeft: 8,
    },

    infoLabel: {
        fontSize: 13,
        color: "#777",
    },

    infoValue: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    inputLabel: {
        marginTop: 12,
        marginBottom: 7,
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
    },

    input: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: "#D7DEE8",
        borderRadius: 13,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        fontSize: 16,
        color: "#222",
    },

    readOnlyField: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 13,
        paddingHorizontal: 15,
        backgroundColor: "#F5F7FA",
    },

    readOnlyText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#333",
    },

    editButton: {
        marginTop: 24,
        minHeight: 52,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    editButtonText: {
        marginLeft: 9,
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    passwordButton: {
        marginTop: 12,
        minHeight: 52,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    passwordButtonText: {
        marginLeft: 9,
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    actionButtons: {
        flexDirection: "row",
        marginTop: 24,
    },

    cancelButton: {
        flex: 1,
        minHeight: 50,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 7,
    },

    cancelButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    saveButton: {
        flex: 1,
        minHeight: 50,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 7,
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    modalContent: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 22,
        padding: 22,
        alignItems: "center",
    },

    modalIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#EAF2FC",
        justifyContent: "center",
        alignItems: "center",
    },

    modalTitle: {
        marginTop: 12,
        fontSize: 21,
        fontWeight: "700",
        color: "#222",
    },

    modalDescription: {
        marginTop: 7,
        marginBottom: 18,
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        lineHeight: 20,
    },

    modalInput: {
        width: "100%",
        minHeight: 50,
        borderWidth: 1,
        borderColor: "#D7DEE8",
        borderRadius: 13,
        paddingHorizontal: 14,
        marginBottom: 12,
        fontSize: 15,
    },

    modalButtons: {
        width: "100%",
        flexDirection: "row",
        marginTop: 10,
    },

    modalCancelButton: {
        flex: 1,
        minHeight: 48,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
    },

    modalCancelText: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: "700",
    },

    modalSaveButton: {
        flex: 1,
        minHeight: 48,
        borderRadius: 13,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 6,
    },

    modalSaveText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",
    },

    noSessionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },

    noSessionTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        textAlign: "center",
    },

    loginButton: {
        marginTop: 22,
        backgroundColor: Colors.primary,
        paddingHorizontal: 25,
        paddingVertical: 14,
        borderRadius: 13,
    },

    loginButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    
});