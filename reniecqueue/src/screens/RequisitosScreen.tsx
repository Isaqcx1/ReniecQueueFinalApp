import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";
import { requisitos } from "../data/requisitosData";
import { generarPDF } from "../services/pdfService";
import { useUsuario } from "./UsuarioContext";
import { useTurno } from "./TurnoContext";
import { asignarTurnoApi } from "../services/turnoService";




export default function RequisitosScreen() {
    const navigation = useNavigation<any>();

    const {
        usuario,
        cerrarSesion,
    } = useUsuario();

    const {
        tieneTurnoActivo,
        registrarTurno,
        eliminarTurno,
    } = useTurno();

    const [registrando, setRegistrando] =
        useState(false);

    const route = useRoute<any>();
    const { sede, tramite } = route.params;

    const [menuVisible, setMenuVisible] =
        useState(false);

    const [modalVisible, setModalVisible] =
        useState(false);

    const [alertVisible, setAlertVisible] =
        useState(false);

    const personasCola = 18;

    const tiempoEstimado = 36;

    const informacion = useMemo(() => {
        return requisitos.find(item => item.idTramite === tramite.id);
    }, [tramite]);

    if (!informacion) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: 100, fontSize: 18 }}>
                    No existe información para este trámite.
                </Text>
            </SafeAreaView>
        );
    }

    const descargarPDF = async () => {
        await generarPDF(sede, tramite, informacion);
    };

    const confirmarRegistroCola = async () => {
        const dniUsuario = usuario?.dni?.trim();

        const codigoSede =
            sede?.codigo ??
            sede?.codigoSede ??
            sede?.codigo_sede;

        const codigoTramite =
            tramite?.codigo ??
            tramite?.codigoTramite ??
            tramite?.codigo_tramite;

        console.log("Datos para registrar turno:", {
            dni: dniUsuario,
            sedeCompleta: sede,
            tramiteCompleto: tramite,
            codigoSede,
            codigoTramite,
        });

        if (!dniUsuario) {
            Alert.alert(
                "Sesión no encontrada",
                "No se pudo obtener el DNI del usuario."
            );
            return;
        }

        if (!codigoSede) {
            Alert.alert(
                "Sede no válida",
                "La sede seleccionada no tiene un código asignado."
            );
            return;
        }

        if (!codigoTramite) {
            Alert.alert(
                "Trámite no válido",
                "El trámite seleccionado no tiene un código asignado."
            );
            return;
        }

        if (tieneTurnoActivo) {
            Alert.alert(
                "Turno activo",
                "Ya estás registrado en una cola virtual y tienes un turno activo."
            );
            return;
        }
        try {
            setRegistrando(true);

            const turnoGenerado = await asignarTurnoApi({
                dni: dniUsuario,
                codigoSede: String(codigoSede),
                codigoTramite: String(codigoTramite),
            });

            registrarTurno({
                idTurno: turnoGenerado.idTurno,
                numero: turnoGenerado.codigoTurno,
                sede: turnoGenerado.sede,
                tramite: turnoGenerado.tramite,
                personasEspera:
                    turnoGenerado.personasDelante,
                tiempoEstimado:
                    turnoGenerado.tiempoEstimadoMinutos,
                estado: turnoGenerado.estado,
            });

            setModalVisible(false);

            Alert.alert(
                "Turno asignado",
                `Tu turno ${turnoGenerado.codigoTurno} fue registrado correctamente.`,
                [
                    {
                        text: "Ver mi turno",
                        onPress: () =>
                            navigation.navigate("Turno"),
                    },
                ]
            );
        } catch (error) {
            const mensaje =
                error instanceof Error
                    ? error.message
                    : "No se pudo registrar el turno.";

            Alert.alert(
                "No se pudo asignar el turno",
                mensaje
            );
        } finally {
            setRegistrando(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.header}>
                <Image source={require("../assets/logor.png")} style={styles.logo} resizeMode="contain" />
                <TouchableOpacity style={styles.profile} onPress={() => setMenuVisible(true)}>
                    <Ionicons name="person-circle" color="#fff" size={42} />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.screenTitle}>Información del trámite</Text>
                    <Text style={styles.screenSubtitle}>Revise toda la información antes de solicitar su turno.</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="business" size={28} color={Colors.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{sede.nombre}</Text>
                            <Text style={styles.cardDescription}>{sede.direccion}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons name={tramite.icono} size={30} color={Colors.primary} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{informacion.titulo}</Text>
                            <Text style={styles.cardDescription}>{informacion.descripcion}</Text>
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="cash-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Costo del trámite</Text>
                        </View>
                        <Text style={styles.sectionText}>{informacion.costo}</Text>
                        <Text style={styles.smallText}>Código de pago: {informacion.codigoPago}</Text>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="time-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Tiempo de atención</Text>
                        </View>
                        <Text style={styles.sectionText}>{informacion.tiempo}</Text>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="person-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Modalidad</Text>
                        </View>
                        <Text style={styles.sectionText}>{informacion.modalidad}</Text>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="card-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Lugares de pago</Text>
                        </View>
                        {informacion.lugaresPago.map((lugar, index) => (
                            <View key={index} style={styles.listRow}>
                                <Ionicons name="checkmark-circle" color={Colors.primary} size={20} />
                                <Text style={styles.listText}>{lugar}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Requisitos</Text>
                        </View>
                        {informacion.requisitos.map((req, index) => (
                            <View key={index} style={styles.listRow}>
                                <Ionicons name="checkmark-circle" color="#2ECC71" size={20} />
                                <Text style={styles.listText}>{req}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
                            <Text style={styles.sectionTitle}>Observaciones</Text>
                        </View>
                        {informacion.observaciones.map((obs, index) => (
                            <View key={index} style={styles.listRow}>
                                <Ionicons name="ellipse" size={10} color={Colors.primary} />
                                <Text style={styles.listText}>{obs}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={descargarPDF}>
                            <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
                                <Ionicons name="download-outline" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Descargar requisitos (PDF)</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={styles.button}
                            onPress={() => {
                                if (tieneTurnoActivo) {
                                    setAlertVisible(true);
                                    return;
                                }

                                setModalVisible(true);
                            }}
                        >
                            <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
                                <Ionicons name="people-outline" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Registrarme en la cola</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
            >

                <View style={styles.modalBackground}>

                    <View style={styles.modalContainer}>

                        <Ionicons
                            name="people-circle"
                            size={70}
                            color={Colors.primary}
                        />

                        <Text style={styles.modalTitle}>
                            Confirmar registro
                        </Text>

                        <Text style={styles.modalSubtitle}>
                            Revise la información antes de ingresar a la cola virtual.
                        </Text>

                        <View style={styles.modalCard}>

                            <View style={styles.modalRow}>

                                <Ionicons
                                    name="business"
                                    size={22}
                                    color={Colors.primary}
                                />

                                <View style={styles.modalInfo}>

                                    <Text style={styles.modalLabel}>
                                        Sede
                                    </Text>

                                    <Text style={styles.modalValue}>
                                        {sede.nombre}
                                    </Text>

                                </View>

                            </View>

                            <View style={styles.modalRow}>

                                <Ionicons
                                    name="document-text"
                                    size={22}
                                    color={Colors.primary}
                                />

                                <View style={styles.modalInfo}>

                                    <Text style={styles.modalLabel}>
                                        Trámite
                                    </Text>

                                    <Text style={styles.modalValue}>
                                        {tramite.nombre}
                                    </Text>

                                </View>

                            </View>

                            <View style={styles.modalRow}>

                                <Ionicons
                                    name="people"
                                    size={22}
                                    color={Colors.primary}
                                />

                                <View style={styles.modalInfo}>

                                    <Text style={styles.modalLabel}>
                                        Personas en espera
                                    </Text>

                                    <Text style={styles.modalValue}>
                                        {personasCola}
                                    </Text>

                                </View>

                            </View>

                            <View style={styles.modalRow}>

                                <Ionicons
                                    name="time"
                                    size={22}
                                    color={Colors.primary}
                                />

                                <View style={styles.modalInfo}>

                                    <Text style={styles.modalLabel}>
                                        Tiempo estimado
                                    </Text>

                                    <Text style={styles.modalValue}>
                                        {tiempoEstimado} minutos
                                    </Text>

                                </View>

                            </View>

                        </View>

                        <View style={styles.modalButtons}>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >

                                <Text style={styles.cancelText}>
                                    Cancelar
                                </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.confirmButton,
                                    registrando && {
                                        opacity: 0.6,
                                    },
                                ]}
                                disabled={registrando}
                                onPress={confirmarRegistroCola}
                            >
                                <Text style={styles.confirmText}>
                                    {registrando
                                        ? "Registrando..."
                                        : "Confirmar"}
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>

            <Modal
                visible={alertVisible}
                transparent
                animationType="fade"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>

                        <Ionicons
                            name="alert-circle"
                            size={70}
                            color="#E67E22"
                        />

                        <Text style={styles.modalTitle}>
                            Ya tienes un turno registrado
                        </Text>

                        <Text style={styles.modalSubtitle}>
                            Solo puedes estar registrado en una cola virtual a la vez.
                            Finaliza o cancela tu turno actual antes de solicitar uno nuevo.
                        </Text>

                        <TouchableOpacity
                            style={styles.singleButton}
                            onPress={() => setAlertVisible(false)}
                        >
                            <Text style={styles.confirmText}>
                                Entendido
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <BottomNav active="Sedes" />
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
                    cerrarSesion();
                    eliminarTurno();
                    setMenuVisible(false);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
    },

    modalContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
    },

    modalTitle: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: "700",
        color: Colors.primary,
    },

    modalSubtitle: {
        marginTop: 8,
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 22,
    },

    modalCard: {
        width: "100%",
        backgroundColor: "#F7FAFE",
        borderRadius: 16,
        padding: 18,
    },

    modalRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    modalInfo: {
        marginLeft: 15,
        flex: 1,
    },

    modalLabel: {
        fontSize: 13,
        color: "#888",
    },

    modalValue: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },

    modalButtons: {
        flexDirection: "row",
        marginTop: 25,
        width: "100%",
        justifyContent: "space-between",
    },

    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        marginRight: 8,
        alignItems: "center",
    },

    confirmButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        marginLeft: 8,
        alignItems: "center",
    },

    cancelText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    confirmText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
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
    singleButton: {
        marginTop: 20,
        width: "100%",
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        alignItems: "center",
    },
});