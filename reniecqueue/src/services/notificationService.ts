import {
    Platform,
} from "react-native";

import * as Notifications
    from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function configurarNotificaciones():
    Promise<boolean> {

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(
            "turnos",
            {
                name: "Turnos RENIEC",
                importance:
                    Notifications
                        .AndroidImportance
                        .HIGH,
                vibrationPattern: [
                    0,
                    250,
                    250,
                    250,
                ],
                sound: "default",
            }
        );
    }

    const permisosActuales =
        await Notifications
            .getPermissionsAsync();

    let estadoFinal =
        permisosActuales.status;

    if (
        estadoFinal !==
        "granted"
    ) {
        const nuevosPermisos =
            await Notifications
                .requestPermissionsAsync();

        estadoFinal =
            nuevosPermisos.status;
    }

    return (
        estadoFinal ===
        "granted"
    );
}

export async function mostrarNotificacionTurno(
    titulo: string,
    mensaje: string
): Promise<void> {
    await Notifications
        .scheduleNotificationAsync({
            content: {
                title: titulo,
                body: mensaje,
                sound: "default",

                data: {
                    screen: "Turno",
                },
            },

            trigger:
                Platform.OS ===
                    "android"
                    ? {
                          channelId:
                              "turnos",
                      }
                    : null,
        });
}