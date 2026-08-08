import React, {
    useCallback,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";

import {
    LinearGradient,
} from "expo-linear-gradient";

import {
    Ionicons,
} from "@expo/vector-icons";

import Colors from "../styles/colors";

import BottomNav
    from "../components/BottomNav";

import {
    useUsuario,
} from "./UsuarioContext";

import {
    obtenerHistorialTurnosApi,
    HistorialTurno,
} from "../services/turnoService";

export default function HistorialTurnosScreen() {
    const navigation =
        useNavigation<any>();

    const {
        usuario,
    } = useUsuario();

    const [
        historial,
        setHistorial,
    ] = useState<HistorialTurno[]>([]);

    const [
        cargando,
        setCargando,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const cargarHistorial =
        useCallback(
            async () => {
                if (!usuario?.dni) {
                    setError(
                        "No se encontró el DNI del usuario."
                    );

                    setCargando(false);

                    return;
                }

                try {
                    setCargando(true);
                    setError("");

                    const resultado =
                        await obtenerHistorialTurnosApi(
                            usuario.dni
                        );

                    setHistorial(
                        resultado.historial
                    );
                } catch (error) {
                    console.error(
                        "Error al cargar historial:",
                        error
                    );

                    setError(
                        error instanceof Error
                            ? error.message
                            : "No se pudo cargar el historial."
                    );
                } finally {
                    setCargando(false);
                }
            },
            [
                usuario?.dni,
            ]
        );

    useFocusEffect(
        useCallback(() => {
            cargarHistorial();
        }, [cargarHistorial])
    );

    const obtenerEstado = (
        estado: HistorialTurno["estado"]
    ) => {
        if (estado === "FINALIZADO") {
            return {
                texto: "Atendido",
                color: "#21864C",
                fondo: "#E3F8EC",
                icono:
                    "checkmark-circle-outline" as const,
            };
        }

        if (estado === "AUSENTE") {
            return {
                texto: "Ausente",
                color: "#D97706",
                fondo: "#FFF4E5",
                icono:
                    "alert-circle-outline" as const,
            };
        }

        return {
            texto: "Cancelado",
            color: "#C62828",
            fondo: "#FFE8E8",
            icono:
                "close-circle-outline" as const,
        };
    };

    const formatearFecha = (
        fecha: string
    ) => {
        return new Date(
            fecha
        ).toLocaleDateString(
            "es-PE",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        );
    };

    const renderTurno = ({
        item,
    }: {
        item: HistorialTurno;
    }) => {
        const estado =
            obtenerEstado(
                item.estado
            );

        return (
            <View
                style={
                    styles.historyCard
                }
            >
                <View
                    style={
                        styles.cardHeader
                    }
                >
                    <View>
                        <Text
                            style={
                                styles.turnLabel
                            }
                        >
                            TURNO
                        </Text>

                        <Text
                            style={
                                styles.turnNumber
                            }
                        >
                            {
                                item.codigoTurno
                            }
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.statusBadge,
                            {
                                backgroundColor:
                                    estado.fondo,
                            },
                        ]}
                    >
                        <Ionicons
                            name={
                                estado.icono
                            }
                            size={17}
                            color={
                                estado.color
                            }
                        />

                        <Text
                            style={[
                                styles.statusText,
                                {
                                    color:
                                        estado.color,
                                },
                            ]}
                        >
                            {
                                estado.texto
                            }
                        </Text>
                    </View>
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
                        size={20}
                        color={
                            Colors.primary
                        }
                    />

                    <View
                        style={
                            styles.information
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
                                item.sede
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
                        size={20}
                        color={
                            Colors.primary
                        }
                    />

                    <View
                        style={
                            styles.information
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
                                item.tramite
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
                        name="calendar-outline"
                        size={20}
                        color={
                            Colors.primary
                        }
                    />

                    <View
                        style={
                            styles.information
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Fecha
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {formatearFecha(
                                item.fechaRegistro
                            )}
                        </Text>
                    </View>
                </View>

                {item.asesor && (
                    <View
                        style={
                            styles.informationRow
                        }
                    >
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color={
                                Colors.primary
                            }
                        />

                        <View
                            style={
                                styles.information
                            }
                        >
                            <Text
                                style={
                                    styles.label
                                }
                            >
                                Asesor
                            </Text>

                            <Text
                                style={
                                    styles.value
                                }
                            >
                                {
                                    item.asesor
                                        .nombreCompleto
                                }
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView
            style={
                styles.container
            }
        >
            <LinearGradient
                colors={[
                    Colors.primary,
                    Colors.secondary,
                ]}
                style={
                    styles.header
                }
            >
                <TouchableOpacity
                    style={
                        styles.backButton
                    }
                    onPress={() =>
                        navigation.navigate(
                            "Turno"
                        )
                    }
                >
                    <Ionicons
                        name="arrow-back"
                        size={25}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <Image
                    source={require(
                        "../assets/logor.png"
                    )}
                    style={
                        styles.logo
                    }
                    resizeMode="contain"
                />
            </LinearGradient>

            <View
                style={
                    styles.titleContainer
                }
            >
                <Text
                    style={
                        styles.title
                    }
                >
                    Historial de turnos
                </Text>

                <Text
                    style={
                        styles.description
                    }
                >
                    Consulta los turnos anteriores
                    asociados a tu cuenta.
                </Text>
            </View>

            {cargando ? (
                <View
                    style={
                        styles.center
                    }
                >
                    <ActivityIndicator
                        size="large"
                        color={
                            Colors.primary
                        }
                    />

                    <Text
                        style={
                            styles.loadingText
                        }
                    >
                        Consultando historial...
                    </Text>
                </View>
            ) : error ? (
                <View
                    style={
                        styles.center
                    }
                >
                    <Ionicons
                        name="warning-outline"
                        size={48}
                        color="#C62828"
                    />

                    <Text
                        style={
                            styles.errorText
                        }
                    >
                        {error}
                    </Text>

                    <TouchableOpacity
                        style={
                            styles.retryButton
                        }
                        onPress={
                            cargarHistorial
                        }
                    >
                        <Text
                            style={
                                styles.retryText
                            }
                        >
                            Intentar nuevamente
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={
                        historial
                    }
                    keyExtractor={(
                        item
                    ) =>
                        item.idTurno.toString()
                    }
                    renderItem={
                        renderTurno
                    }
                    contentContainerStyle={[
                        styles.list,

                        historial.length ===
                            0 &&
                            styles.emptyList,
                    ]}
                    showsVerticalScrollIndicator={
                        false
                    }
                    ListEmptyComponent={
                        <View
                            style={
                                styles.center
                            }
                        >
                            <Ionicons
                                name="time-outline"
                                size={58}
                                color={
                                    Colors.primary
                                }
                            />

                            <Text
                                style={
                                    styles.emptyTitle
                                }
                            >
                                No tienes historial
                            </Text>

                            <Text
                                style={
                                    styles.emptyText
                                }
                            >
                                Tus turnos finalizados,
                                cancelados o marcados como
                                ausentes aparecerán aquí.
                            </Text>
                        </View>
                    }
                />
            )}

            <BottomNav
                active="Turno"
            />
        </SafeAreaView>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                "#F5F8FC",
        },

        header: {
            height: 120,
            justifyContent:
                "center",
            alignItems:
                "center",
            elevation: 8,
        },

        logo: {
            width: 250,
            height: 200,
        },

        backButton: {
            position:
                "absolute",
            left: 20,
            top: 52,
            zIndex: 10,
        },

        titleContainer: {
            paddingHorizontal:
                22,
            paddingTop: 25,
            paddingBottom: 12,
        },

        title: {
            fontSize: 25,
            fontWeight: "800",
            color:
                Colors.primary,
        },

        description: {
            marginTop: 6,
            color: "#65798B",
            fontSize: 14,
            lineHeight: 20,
        },

        list: {
            paddingHorizontal:
                20,
            paddingTop: 10,
            paddingBottom: 130,
        },

        emptyList: {
            flexGrow: 1,
        },

        historyCard: {
            padding: 18,
            marginBottom: 16,
            borderRadius: 18,
            backgroundColor:
                "#FFFFFF",
            elevation: 3,
        },

        cardHeader: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            alignItems:
                "center",
        },

        turnLabel: {
            color: "#82909D",
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 1.3,
        },

        turnNumber: {
            marginTop: 3,
            color:
                Colors.primary,
            fontSize: 25,
            fontWeight: "800",
        },

        statusBadge: {
            flexDirection:
                "row",
            alignItems:
                "center",
            paddingHorizontal:
                11,
            paddingVertical: 7,
            borderRadius: 20,
        },

        statusText: {
            marginLeft: 5,
            fontSize: 12,
            fontWeight: "700",
        },

        divider: {
            height: 1,
            marginVertical: 15,
            backgroundColor:
                "#E9EEF3",
        },

        informationRow: {
            flexDirection:
                "row",
            alignItems:
                "flex-start",
            marginBottom: 13,
        },

        information: {
            flex: 1,
            marginLeft: 11,
        },

        label: {
            color: "#7A8997",
            fontSize: 12,
        },

        value: {
            marginTop: 2,
            color: "#36536B",
            fontSize: 14,
            fontWeight: "600",
        },

        center: {
            flex: 1,
            justifyContent:
                "center",
            alignItems:
                "center",
            paddingHorizontal:
                30,
            paddingBottom: 90,
        },

        loadingText: {
            marginTop: 13,
            color: "#65798B",
        },

        errorText: {
            marginTop: 12,
            textAlign:
                "center",
            color: "#C62828",
        },

        retryButton: {
            marginTop: 18,
            paddingHorizontal:
                18,
            paddingVertical: 11,
            borderWidth: 1,
            borderColor:
                Colors.primary,
            borderRadius: 12,
        },

        retryText: {
            color:
                Colors.primary,
            fontWeight: "700",
        },

        emptyTitle: {
            marginTop: 15,
            fontSize: 20,
            fontWeight: "700",
            color:
                Colors.primary,
        },

        emptyText: {
            marginTop: 8,
            textAlign:
                "center",
            color: "#65798B",
            lineHeight: 21,
        },
    });