import React, {
    useCallback,
    useEffect,
    useRef,
} from "react";

import {
    obtenerSeguimientoTurnoPorIdApi,
    obtenerTurnoActivoApi,
    TurnoSeguimiento,
} from "../services/turnoService";

import {
    configurarNotificaciones,
    mostrarNotificacionTurno,
} from "../services/notificationService";

import {
    useUsuario,
} from "../screens/UsuarioContext";

import {
    Turno,
    useTurno,
} from "../screens/TurnoContext";

function esEstadoActivo(
    estado?: string
): boolean {
    return (
        estado === "EN_ESPERA" ||
        estado === "LLAMADO" ||
        estado === "EN_ATENCION"
    );
}

export default function TurnoMonitor() {
    const {
        usuario,
    } = useUsuario();

    const {
        turno,
        actualizarTurno,
    } = useTurno();

    const consultando =
        useRef(false);

    const permisos =
        useRef(false);

    const idTurnoVigilado =
        useRef<number | null>(
            null
        );

    const avisosEnviados =
        useRef<Set<string>>(
            new Set()
        );

    useEffect(() => {
        const iniciar =
            async () => {
                try {
                    permisos.current =
                        await configurarNotificaciones();
                } catch (error) {
                    console.error(
                        "Error configurando notificaciones:",
                        error
                    );
                }
            };

        iniciar();
    }, []);

    const notificar =
        useCallback(
            async (
                clave: string,
                titulo: string,
                mensaje: string
            ) => {
                if (
                    avisosEnviados.current.has(
                        clave
                    )
                ) {
                    return;
                }

                if (!permisos.current) {
                    return;
                }

                try {
                    await mostrarNotificacionTurno(
                        titulo,
                        mensaje
                    );

                    avisosEnviados.current.add(
                        clave
                    );

                    console.log(
                        "Notificación enviada:",
                        clave
                    );
                } catch (error) {
                    console.error(
                        "Error enviando notificación:",
                        error
                    );
                }
            },
            []
        );

    const convertirTurno = (
        turnoApi: TurnoSeguimiento
    ): Turno => {
        return {
            idTurno:
                turnoApi.idTurno,

            numero:
                turnoApi.codigoTurno,

            sede:
                turnoApi.sede,

            tramite:
                turnoApi.tramite,

            personasEspera:
                turnoApi.personasDelante,

            tiempoEstimado:
                turnoApi
                    .tiempoEstimadoMinutos,

            estado:
                turnoApi.estado,

            ventanilla:
                turnoApi.ventanilla,

            aviso:
                turnoApi.aviso,

            fechaRegistro:
                turnoApi.fechaRegistro,

            fechaLlamado:
                turnoApi.fechaLlamado,

            fechaInicioAtencion:
                turnoApi
                    .fechaInicioAtencion,

            fechaFinalizacion:
                turnoApi
                    .fechaFinalizacion,
        };
    };

    const procesarEstado =
        useCallback(
            async (
                turnoApi:
                    TurnoSeguimiento
            ) => {
                const id =
                    turnoApi.idTurno;

                actualizarTurno(
                    convertirTurno(
                        turnoApi
                    )
                );

                console.log(
                    "Estado del turno:",
                    turnoApi.codigoTurno,
                    turnoApi.estado
                );

                if (
                    turnoApi.estado ===
                    "EN_ESPERA"
                ) {
                    if (
                        turnoApi.personasDelante ===
                        2
                    ) {
                        await notificar(
                            `${id}-2`,
                            "Tu turno está próximo",
                            `Hay dos personas delante de tu turno ${turnoApi.codigoTurno}.`
                        );
                    }

                    if (
                        turnoApi.personasDelante ===
                        1
                    ) {
                        await notificar(
                            `${id}-1`,
                            "Prepárate",
                            `Hay una persona delante de tu turno ${turnoApi.codigoTurno}.`
                        );
                    }

                    if (
                        turnoApi.personasDelante ===
                        0
                    ) {
                        await notificar(
                            `${id}-0`,
                            "Eres el siguiente",
                            `Tu turno ${turnoApi.codigoTurno} será llamado próximamente.`
                        );
                    }

                    return;
                }

                if (
                    turnoApi.estado ===
                    "LLAMADO"
                ) {
                    await notificar(
                        `${id}-LLAMADO`,
                        "¡Es tu turno!",
                        `Tu turno ${turnoApi.codigoTurno} fue llamado. Dirígete a la ventanilla ${turnoApi.ventanilla || "asignada"}.`
                    );

                    return;
                }

                if (
                    turnoApi.estado ===
                    "EN_ATENCION"
                ) {
                    await notificar(
                        `${id}-ATENCION`,
                        "Atención iniciada",
                        `La atención de tu turno ${turnoApi.codigoTurno} ha comenzado en la ventanilla ${turnoApi.ventanilla || "asignada"}.`
                    );

                    return;
                }

                if (
                    turnoApi.estado ===
                    "AUSENTE"
                ) {
                    await notificar(
                        `${id}-AUSENTE`,
                        "Turno marcado como ausente",
                        `Tu turno ${turnoApi.codigoTurno} fue marcado como ausente.`
                    );

                    /*
                    Ya terminó el seguimiento.
                    */
                    idTurnoVigilado.current =
                        null;

                    return;
                }

                if (
                    turnoApi.estado ===
                    "FINALIZADO"
                ) {
                    await notificar(
                        `${id}-FINALIZADO`,
                        "Atención finalizada",
                        `La atención de tu turno ${turnoApi.codigoTurno} finalizó correctamente.`
                    );

                    idTurnoVigilado.current =
                        null;

                    return;
                }

                if (
                    turnoApi.estado ===
                    "CANCELADO"
                ) {
                    /*
                    No notificamos porque la
                    cancelación la realizó el
                    propio ciudadano.
                    */
                    idTurnoVigilado.current =
                        null;
                }
            },
            [
                actualizarTurno,
                notificar,
            ]
        );

    const obtenerTurnoInicial =
        useCallback(
            async () => {
                if (!usuario?.dni) {
                    return null;
                }

                const resultado =
                    await obtenerTurnoActivoApi(
                        usuario.dni
                    );

                if (
                    !resultado.tieneTurno ||
                    !resultado.turno
                ) {
                    return null;
                }

                idTurnoVigilado.current =
                    resultado.turno.idTurno;

                return resultado.turno;
            },
            [
                usuario?.dni,
            ]
        );

    const revisar =
        useCallback(
            async () => {
                if (
                    !usuario?.dni ||
                    consultando.current
                ) {
                    return;
                }

                try {
                    consultando.current =
                        true;

                    /*
                    Si todavía no sabemos qué
                    turno vigilar, buscamos el
                    turno activo del ciudadano.
                    */
                    if (
                        idTurnoVigilado.current ===
                        null
                    ) {
                        const inicial =
                            await obtenerTurnoInicial();

                        if (!inicial) {
                            return;
                        }

                        await procesarEstado(
                            inicial
                        );

                        return;
                    }

                    /*
                    Ya conocemos el id.

                    Desde aquí siempre consultamos
                    exactamente ese turno, incluso
                    si queda AUSENTE o FINALIZADO.
                    */
                    const resultado =
                        await obtenerSeguimientoTurnoPorIdApi(
                            idTurnoVigilado.current
                        );

                    await procesarEstado(
                        resultado
                    );
                } catch (error) {
                    console.error(
                        "Error en monitor de turno:",
                        error
                    );
                } finally {
                    consultando.current =
                        false;
                }
            },
            [
                usuario?.dni,
                obtenerTurnoInicial,
                procesarEstado,
            ]
        );

    /*
    Cuando el ciudadano acaba de generar
    un turno, RequisitosScreen lo coloca
    inmediatamente en TurnoContext.

    Así empezamos a vigilarlo sin esperar
    otra búsqueda por DNI.
    */
    useEffect(() => {
        if (
            turno &&
            esEstadoActivo(
                turno.estado
            )
        ) {
            idTurnoVigilado.current =
                turno.idTurno;
        }
    }, [turno]);

    useEffect(() => {
        if (!usuario?.dni) {
            idTurnoVigilado.current =
                null;

            avisosEnviados.current.clear();

            return;
        }

        revisar();

        const intervalo =
            setInterval(
                revisar,
                5000
            );

        return () => {
            clearInterval(
                intervalo
            );
        };
    }, [
        usuario?.dni,
        revisar,
    ]);

    return null;
}