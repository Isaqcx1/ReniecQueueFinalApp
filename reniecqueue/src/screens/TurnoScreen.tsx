import React, {
    useCallback,
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { useUsuario } from "./UsuarioContext";
import { useTurno } from "./TurnoContext";

import {
    obtenerTurnoActivoApi,
    cancelarTurnoApi,
    TurnoSeguimiento,
} from "../services/turnoService";



import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";

function esEstadoTerminado(
    estado?: string | null
): boolean {
    return (
        estado === "FINALIZADO" ||
        estado === "AUSENTE" ||
        estado === "CANCELADO"
    );
}

export default function TurnoScreen() {
    const navigation = useNavigation<any>();

    const irAlHistorial = () => {
        navigation.navigate(
            "HistorialTurnos"
        );
    };
    const [cancelando, setCancelando] =
        useState(false);

    const {
        usuario,
        cerrarSesion,
    } = useUsuario();

    const {
        turno,
        actualizarTurno,
        eliminarTurno,
    } = useTurno();

    const [menuVisible, setMenuVisible] =
        useState(false);

    const [cargando, setCargando] =
        useState(false);

    const [actualizando, setActualizando] =
        useState(false);

    const [errorSeguimiento, setErrorSeguimiento] =
        useState("");

    /*
    Sirven para evitar que la misma alerta
    aparezca cada cinco segundos.
    */
    const estadoAnterior = useRef<string | null>(
        turno?.estado ?? null
    );

    const personasAvisadas =
        useRef<number | null>(null);

    const consultando =
        useRef(false);

    const pantallaActiva =
        useRef(false);

    const convertirTurno = (
        turnoApi: TurnoSeguimiento
    ) => {
        return {
            idTurno: turnoApi.idTurno,
            numero: turnoApi.codigoTurno,

            sede: turnoApi.sede,
            tramite: turnoApi.tramite,

            personasEspera:
                turnoApi.personasDelante,

            tiempoEstimado:
                turnoApi.tiempoEstimadoMinutos,

            estado: turnoApi.estado,

            ventanilla:
                turnoApi.ventanilla,

            aviso:
                turnoApi.aviso,

            fechaRegistro:
                turnoApi.fechaRegistro,

            fechaLlamado:
                turnoApi.fechaLlamado,

            fechaInicioAtencion:
                turnoApi.fechaInicioAtencion,

            fechaFinalizacion:
                turnoApi.fechaFinalizacion,
        };
    };

    const mostrarAvisos = (
        turnoApi: TurnoSeguimiento
    ) => {
        const estadoPrevio =
            estadoAnterior.current;

        /*
        Avisos relacionados con la cantidad de
        personas delante.
        */
        if (
            turnoApi.estado === "EN_ESPERA" &&
            turnoApi.personasDelante <= 2 &&
            personasAvisadas.current !==
            turnoApi.personasDelante
        ) {
            personasAvisadas.current =
                turnoApi.personasDelante;

            if (
                turnoApi.personasDelante === 2
            ) {
                Alert.alert(
                    "Tu turno está próximo",
                    "Hay dos personas delante de ti. Mantente cerca de la sede."
                );
            }

            if (
                turnoApi.personasDelante === 1
            ) {
                Alert.alert(
                    "Prepárate",
                    "Hay una persona delante de ti. Serás el siguiente en ser llamado."
                );
            }

            if (
                turnoApi.personasDelante === 0
            ) {
                Alert.alert(
                    "Eres el siguiente",
                    "Mantente atento. Tu turno será llamado próximamente."
                );
            }
        }

        /*
        Aviso principal cuando el asesor llama
        al ciudadano.
        */
        if (
            turnoApi.estado === "LLAMADO" &&
            estadoPrevio !== "LLAMADO"
        ) {
            Alert.alert(
                "¡Es tu turno!",
                `Tu turno ${turnoApi.codigoTurno} ha sido llamado.\n\nDirígete a la ventanilla ${turnoApi.ventanilla ||
                "asignada"
                }.`
            );
        }

        if (
            turnoApi.estado ===
            "EN_ATENCION" &&
            estadoPrevio !==
            "EN_ATENCION"
        ) {
            Alert.alert(
                "Atención iniciada",
                `Tu trámite está siendo atendido en la ventanilla ${turnoApi.ventanilla || ""
                }.`
            );
        }

        if (
            turnoApi.estado ===
            "FINALIZADO" &&
            estadoPrevio !==
            "FINALIZADO"
        ) {
            Alert.alert(
                "Atención finalizada",
                "Tu atención fue finalizada correctamente."
            );
        }

        if (
            turnoApi.estado === "AUSENTE" &&
            estadoPrevio !== "AUSENTE"
        ) {
            Alert.alert(
                "Turno marcado como ausente",
                "No te presentaste cuando tu turno fue llamado."
            );
        }

        estadoAnterior.current =
            turnoApi.estado;
    };


    const manejarCancelarTurno = () => {
        if (!turno) {
            return;
        }

        if (!usuario?.dni) {
            Alert.alert(
                "Error",
                "No se encontró el DNI del usuario."
            );

            return;
        }

        if (turno.estado !== "EN_ESPERA") {
            Alert.alert(
                "No disponible",
                "Este turno ya no puede ser cancelado."
            );

            return;
        }

        Alert.alert(
            "Cancelar turno",
            `¿Estás seguro de cancelar tu turno ${turno.numero}?`,
            [
                {
                    text: "No",
                    style: "cancel",
                },

                {
                    text: "Sí, cancelar",
                    style: "destructive",

                    onPress: async () => {
                        try {
                            setCancelando(true);

                            const resultado =
                                await cancelarTurnoApi(
                                    turno.idTurno,
                                    usuario.dni
                                );

                            actualizarTurno({
                                ...turno,
                                estado:
                                    resultado.turno.estado,

                                fechaFinalizacion:
                                    resultado.turno
                                        .fechaCancelacion,
                            });

                            estadoAnterior.current =
                                resultado.turno.estado;

                            personasAvisadas.current =
                                null;

                            Alert.alert(
                                "Turno cancelado",
                                resultado.mensaje
                            );
                        } catch (error) {
                            console.error(
                                "Error al cancelar turno:",
                                error
                            );

                            Alert.alert(
                                "No se pudo cancelar",
                                error instanceof Error
                                    ? error.message
                                    : "Ocurrió un error al cancelar el turno."
                            );
                        } finally {
                            setCancelando(false);
                        }
                    },
                },
            ]
        );
    };

    const cargarSeguimiento =
        useCallback(
            async (
                mostrarCarga = false
            ) => {
                if (!usuario?.dni) {
                    return;
                }

                if (consultando.current) {
                    return;
                }

                try {
                    consultando.current = true;

                    if (mostrarCarga) {
                        setCargando(true);
                    } else {
                        setActualizando(true);
                    }

                    setErrorSeguimiento("");

                    const resultado =
                        await obtenerTurnoActivoApi(
                            usuario.dni
                        );

                    if (!pantallaActiva.current) {
                        return;
                    }

                    if (
                        !resultado.tieneTurno ||
                        !resultado.turno
                    ) {
                        /*
                        Si el turno que tenemos en pantalla ya terminó,
                        lo conservamos localmente para que el ciudadano
                        pueda ver el resultado: cancelado, ausente o
                        atención finalizada.

                        El turno solo se limpiará cuando el ciudadano
                        seleccione Sedes desde el menú inferior.
                        */
                        if (
                            !esEstadoTerminado(
                                estadoAnterior.current
                            )
                        ) {
                            eliminarTurno();
                            estadoAnterior.current =
                                null;
                        }

                        personasAvisadas.current =
                            null;

                        return;
                    }

                    mostrarAvisos(
                        resultado.turno
                    );

                    actualizarTurno(
                        convertirTurno(
                            resultado.turno
                        )
                    );
                } catch (error) {
                    console.error(
                        "Error al consultar el turno:",
                        error
                    );

                    if (pantallaActiva.current) {
                        setErrorSeguimiento(
                            error instanceof Error
                                ? error.message
                                : "No se pudo actualizar el turno."
                        );
                    }
                } finally {
                    consultando.current = false;

                    if (pantallaActiva.current) {
                        setCargando(false);
                        setActualizando(false);
                    }
                }
            },
            [
                usuario?.dni,
                actualizarTurno,
                eliminarTurno,
            ]
        );

    /*
    Consulta el backend al entrar a la pantalla
    y vuelve a consultar cada cinco segundos.
    */
    useFocusEffect(
        useCallback(() => {
            pantallaActiva.current = true;

            cargarSeguimiento(true);

            const intervalo = setInterval(() => {
                cargarSeguimiento(false);
            }, 5000);

            return () => {
                pantallaActiva.current = false;
                clearInterval(intervalo);
            };
        }, [cargarSeguimiento])
    );

    const obtenerEstadoVisual = (
        estado: string
    ) => {
        const estados: Record<
            string,
            {
                texto: string;
                icono: keyof typeof Ionicons.glyphMap;
                color: string;
                fondo: string;
            }
        > = {
            EN_ESPERA: {
                texto: "En espera",
                icono: "time-outline",
                color: "#B36B00",
                fondo: "#FFF4DD",
            },

            LLAMADO: {
                texto: "¡Es tu turno!",
                icono: "notifications",
                color: "#1565C0",
                fondo: "#E5F1FF",
            },

            EN_ATENCION: {
                texto: "En atención",
                icono: "person-outline",
                color: "#21864C",
                fondo: "#E3F8EC",
            },

            FINALIZADO: {
                texto: "Atención finalizada",
                icono: "checkmark-circle",
                color: "#21864C",
                fondo: "#E3F8EC",
            },

            AUSENTE: {
                texto: "Ausente",
                icono: "close-circle-outline",
                color: "#C62828",
                fondo: "#FFE8E8",
            },

            CANCELADO: {
                texto: "Cancelado",
                icono: "ban-outline",
                color: "#C62828",
                fondo: "#FFE8E8",
            },
        };

        return (
            estados[estado] || {
                texto: estado,
                icono: "information-circle-outline",
                color: Colors.primary,
                fondo: "#EAF4FF",
            }
        );
    };

    const estadoVisual =
        obtenerEstadoVisual(
            turno?.estado || "EN_ESPERA"
        );

    const esTurnoFinalizado =
        esEstadoTerminado(
            turno?.estado
        );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[
                    Colors.primary,
                    Colors.secondary,
                ]}
                style={styles.header}
            >
                <Image
                    source={require("../assets/logor.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.profile}
                    onPress={() =>
                        setMenuVisible(true)
                    }
                >
                    <Ionicons
                        name="person-circle"
                        size={42}
                        color="#fff"
                    />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={
                    styles.scrollContent
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View style={styles.content}>
                    {cargando && !turno ? (
                        <View style={styles.loading}>
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary}
                            />

                            <Text
                                style={
                                    styles.loadingText
                                }
                            >
                                Consultando tu turno...
                            </Text>
                        </View>
                    ) : !turno ? (
                        <>
                            <View
                                style={
                                    styles.iconCircle
                                }
                            >
                                <Ionicons
                                    name="ticket-outline"
                                    size={60}
                                    color={
                                        Colors.primary
                                    }
                                />
                            </View>

                            <Text style={styles.title}>
                                Aún no tienes un turno
                                activo
                            </Text>

                            <Text
                                style={
                                    styles.description
                                }
                            >
                                Para obtener un turno
                                virtual debes seleccionar
                                una sede, elegir un trámite
                                y registrarte en la cola
                                virtual.
                            </Text>

                            <TouchableOpacity
                                activeOpacity={0.9}
                                style={styles.button}
                                onPress={() =>
                                    navigation.navigate(
                                        "Sedes"
                                    )
                                }
                            >
                                <LinearGradient
                                    colors={[
                                        Colors.primary,
                                        Colors.secondary,
                                    ]}
                                    style={
                                        styles.gradient
                                    }
                                >
                                    <Ionicons
                                        name="business"
                                        size={22}
                                        color="#fff"
                                    />

                                    <Text
                                        style={
                                            styles.buttonText
                                        }
                                    >
                                        Ir a Sedes
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    styles.historyButton
                                }
                                activeOpacity={0.8}
                                onPress={
                                    irAlHistorial
                                }
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={21}
                                    color={
                                        Colors.primary
                                    }
                                />

                                <Text
                                    style={
                                        styles.historyButtonText
                                    }
                                >
                                    Ver historial de turnos
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View
                                style={[
                                    styles.statusIcon,
                                    {
                                        backgroundColor:
                                            estadoVisual.fondo,
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={
                                        estadoVisual.icono
                                    }
                                    size={58}
                                    color={
                                        estadoVisual.color
                                    }
                                />
                            </View>

                            <Text style={styles.title}>
                                Mi Turno
                            </Text>

                            <View
                                style={[
                                    styles.statusBanner,
                                    {
                                        backgroundColor:
                                            estadoVisual.fondo,
                                    },
                                ]}
                            >
                                <Ionicons
                                    name={
                                        estadoVisual.icono
                                    }
                                    size={24}
                                    color={
                                        estadoVisual.color
                                    }
                                />

                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                estadoVisual.color,
                                        },
                                    ]}
                                >
                                    {
                                        estadoVisual.texto
                                    }
                                </Text>
                            </View>

                            {turno.aviso && !esTurnoFinalizado && (
                                <View
                                    style={
                                        styles.noticeCard
                                    }
                                >
                                    <Ionicons
                                        name="notifications-outline"
                                        size={24}
                                        color={
                                            Colors.primary
                                        }
                                    />

                                    <View
                                        style={
                                            styles.noticeContent
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.noticeTitle
                                            }
                                        >
                                            {
                                                turno
                                                    .aviso
                                                    .titulo
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                styles.noticeMessage
                                            }
                                        >
                                            {
                                                turno
                                                    .aviso
                                                    .mensaje
                                            }
                                        </Text>
                                    </View>
                                </View>
                            )}

                            <View style={styles.ticket}>
                                <View
                                    style={
                                        styles.turnNumberContainer
                                    }
                                >
                                    <Text
                                        style={
                                            styles.turnNumberLabel
                                        }
                                    >
                                        TURNO
                                    </Text>

                                    <Text
                                        style={
                                            styles.turnNumber
                                        }
                                    >
                                        {turno.numero}
                                    </Text>
                                </View>

                                <View
                                    style={
                                        styles.divider
                                    }
                                />

                                <View
                                    style={
                                        styles.informationRow
                                    }
                                >
                                    <Ionicons
                                        name="business-outline"
                                        size={22}
                                        color={
                                            Colors.primary
                                        }
                                    />

                                    <View
                                        style={
                                            styles.informationContent
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.label
                                            }
                                        >
                                            Sede
                                        </Text>

                                        <Text
                                            style={
                                                styles.value
                                            }
                                        >
                                            {
                                                turno.sede
                                                    .nombre
                                            }
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={
                                        styles.informationRow
                                    }
                                >
                                    <Ionicons
                                        name="document-text-outline"
                                        size={22}
                                        color={
                                            Colors.primary
                                        }
                                    />

                                    <View
                                        style={
                                            styles.informationContent
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.label
                                            }
                                        >
                                            Trámite
                                        </Text>

                                        <Text
                                            style={
                                                styles.value
                                            }
                                        >
                                            {
                                                turno
                                                    .tramite
                                                    .nombre
                                            }
                                        </Text>
                                    </View>
                                </View>

                                {turno.estado ===
                                    "EN_ESPERA" && (
                                        <View
                                            style={
                                                styles.queueInformation
                                            }
                                        >

                                            <View
                                                style={
                                                    styles.queueBox
                                                }
                                            >
                                                <Ionicons
                                                    name="people-outline"
                                                    size={25}
                                                    color={
                                                        Colors.primary
                                                    }
                                                />

                                                <Text
                                                    style={
                                                        styles.queueNumber
                                                    }
                                                >
                                                    {
                                                        turno.personasEspera
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.queueLabel
                                                    }
                                                >
                                                    Personas
                                                    delante
                                                </Text>
                                            </View>

                                            <View
                                                style={
                                                    styles.queueBox
                                                }
                                            >
                                                <Ionicons
                                                    name="time-outline"
                                                    size={25}
                                                    color={
                                                        Colors.primary
                                                    }
                                                />

                                                <Text
                                                    style={
                                                        styles.queueNumber
                                                    }
                                                >
                                                    {
                                                        turno.tiempoEstimado
                                                    }
                                                </Text>


                                                <Text
                                                    style={
                                                        styles.queueLabel
                                                    }
                                                >
                                                    Minutos
                                                    estimados
                                                </Text>

                                            </View>

                                        </View>

                                    )}

                                {turno.estado === "EN_ESPERA" && (
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={manejarCancelarTurno}
                                        disabled={cancelando}
                                        activeOpacity={0.8}
                                    >
                                        <Ionicons
                                            name="close-circle-outline"
                                            size={20}
                                            color="#C62828"
                                        />

                                        <Text style={styles.cancelButtonText}>
                                            {cancelando
                                                ? "Cancelando..."
                                                : "Cancelar turno"}
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                {(turno.estado ===
                                    "LLAMADO" ||
                                    turno.estado ===
                                    "EN_ATENCION") && (
                                        <View
                                            style={
                                                styles.windowCard
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.windowLabel
                                                }
                                            >
                                                Dirígete a la
                                                ventanilla
                                            </Text>

                                            <Text
                                                style={
                                                    styles.windowNumber
                                                }
                                            >
                                                {turno.ventanilla ||
                                                    "--"}
                                            </Text>
                                        </View>
                                    )}
                            </View>

                            {errorSeguimiento ? (
                                <View
                                    style={
                                        styles.errorCard
                                    }
                                >
                                    <Ionicons
                                        name="warning-outline"
                                        size={20}
                                        color="#C62828"
                                    />

                                    <Text
                                        style={
                                            styles.errorText
                                        }
                                    >
                                        {
                                            errorSeguimiento
                                        }
                                    </Text>
                                </View>
                            ) : null}

                            {!esTurnoFinalizado && (
                                <TouchableOpacity
                                    style={
                                        styles.refreshButton
                                    }
                                    disabled={actualizando}
                                    onPress={() =>
                                        cargarSeguimiento(
                                            false
                                        )
                                    }
                                >
                                    {actualizando ? (
                                        <ActivityIndicator
                                            size="small"
                                            color={
                                                Colors.primary
                                            }
                                        />
                                    ) : (
                                        <Ionicons
                                            name="refresh"
                                            size={20}
                                            color={
                                                Colors.primary
                                            }
                                        />
                                    )}

                                    <Text
                                        style={
                                            styles.refreshText
                                        }
                                    >
                                        {actualizando
                                            ? "Actualizando..."
                                            : "Actualizar turno"}
                                    </Text>

                                </TouchableOpacity>

                            )}

                            {esTurnoFinalizado && (
                                <>
                                    <View
                                        style={
                                            styles.finishedInformation
                                        }
                                    >
                                        <Ionicons
                                            name="information-circle-outline"
                                            size={20}
                                            color="#60758A"
                                        />

                                        <Text
                                            style={
                                                styles.finishedInformationText
                                            }
                                        >
                                            {turno.estado ===
                                                "CANCELADO"
                                                ? "Tu turno fue cancelado correctamente. Para solicitar un nuevo turno, selecciona Sedes en el menú inferior."
                                                : turno.estado ===
                                                    "AUSENTE"
                                                    ? "Tu turno fue marcado como ausente. Para solicitar un nuevo turno, selecciona Sedes en el menú inferior."
                                                    : "Tu atención fue finalizada correctamente. Si necesitas realizar otro trámite, selecciona Sedes en el menú inferior."}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={
                                            styles.historyButton
                                        }
                                        activeOpacity={0.8}
                                        onPress={
                                            irAlHistorial
                                        }
                                    >
                                        <Ionicons
                                            name="time-outline"
                                            size={21}
                                            color={
                                                Colors.primary
                                            }
                                        />

                                        <Text
                                            style={
                                                styles.historyButtonText
                                            }
                                        >
                                            Ver historial de turnos
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}
                </View>
            </ScrollView>

            <BottomNav active="Turno" />

            <ProfileMenu
                visible={menuVisible}
                onClose={() =>
                    setMenuVisible(false)
                }
                onProfile={() => {
                    setMenuVisible(false);
                    navigation.navigate(
                        "Profile"
                    );
                }}
                onSettings={() => {
                    setMenuVisible(false);
                    navigation.navigate(
                        "Settings"
                    );
                }}
                onLogout={() => {
                    cerrarSesion();
                    eliminarTurno();
                    setMenuVisible(false);

                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: "Login",
                            },
                        ],
                    });
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

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 110,
    },

    content: {
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: 28,
        paddingTop: 35,
    },

    loading: {
        flex: 1,
        minHeight: 400,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        marginTop: 15,
        color: "#667788",
        fontSize: 15,
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

    statusIcon: {
        width: 105,
        height: 105,
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
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

    statusBanner: {
        marginTop: 14,
        paddingHorizontal: 18,
        paddingVertical: 11,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    statusText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "700",
    },

    noticeCard: {
        width: "100%",
        marginTop: 20,
        padding: 16,
        borderRadius: 15,
        backgroundColor: "#EAF4FF",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    noticeContent: {
        flex: 1,
        marginLeft: 12,
    },

    noticeTitle: {
        color: Colors.primary,
        fontWeight: "700",
        fontSize: 16,
    },

    noticeMessage: {
        color: "#536779",
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4,
    },

    ticket: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 20,
        marginTop: 20,
        elevation: 4,
    },

    turnNumberContainer: {
        alignItems: "center",
    },

    turnNumberLabel: {
        color: "#7B8A98",
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
    },

    turnNumber: {
        color: Colors.primary,
        fontSize: 42,
        fontWeight: "800",
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#E9EEF3",
        marginVertical: 18,
    },

    informationRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 17,
    },

    informationContent: {
        flex: 1,
        marginLeft: 12,
    },

    label: {
        fontSize: 13,
        color: "#777",
    },

    value: {
        marginTop: 3,
        fontSize: 16,
        fontWeight: "700",
        color: Colors.primary,
    },

    queueInformation: {
        flexDirection: "row",
        gap: 12,
        marginTop: 5,
    },

    queueBox: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 14,
        backgroundColor: "#F1F7FD",
        alignItems: "center",
    },

    queueNumber: {
        color: Colors.primary,
        fontSize: 26,
        fontWeight: "800",
        marginTop: 4,
    },

    queueLabel: {
        color: "#687A8B",
        fontSize: 12,
        textAlign: "center",
        marginTop: 3,
    },

    windowCard: {
        marginTop: 8,
        paddingVertical: 18,
        borderRadius: 14,
        backgroundColor: "#E5F1FF",
        alignItems: "center",
    },

    windowLabel: {
        color: "#526A7E",
        fontSize: 14,
        fontWeight: "600",
    },

    windowNumber: {
        color: "#1565C0",
        fontSize: 34,
        fontWeight: "800",
        marginTop: 4,
    },

    errorCard: {
        width: "100%",
        padding: 13,
        marginTop: 15,
        borderRadius: 12,
        backgroundColor: "#FFE8E8",
        flexDirection: "row",
        alignItems: "center",
    },

    errorText: {
        flex: 1,
        marginLeft: 9,
        color: "#C62828",
        fontSize: 13,
    },

    refreshButton: {
        marginTop: 18,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
    },

    refreshText: {
        marginLeft: 8,
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    finishedInformation: {
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 14,
        backgroundColor: "#EDF3F8",
        flexDirection: "row",
        alignItems: "flex-start",
    },

    finishedInformationText: {
        flex: 1,
        marginLeft: 9,
        color: "#60758A",
        fontSize: 13,
        lineHeight: 19,
        textAlign: "left",
    },
    cancelButton: {
        width: "100%",
        marginTop: 16,
        paddingVertical: 14,

        borderWidth: 1,
        borderColor: "#C62828",
        borderRadius: 14,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#FFFFFF",
    },

    cancelButtonText: {
        marginLeft: 8,

        color: "#C62828",
        fontSize: 15,
        fontWeight: "700",
    },
    historyButton: {
        width: "100%",
        marginTop: 18,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    historyButtonText: {
        marginLeft: 8,
        color: Colors.primary,
        fontSize: 15,
        fontWeight: "700",
    },
});