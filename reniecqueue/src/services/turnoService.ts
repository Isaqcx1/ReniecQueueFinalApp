import { API_URL } from "../config/api";

interface AsignarTurnoDatos {
    dni: string;
    codigoSede: string;
    codigoTramite: string;
}

export interface TurnoRespuesta {
    idTurno: number;
    codigoTurno: string;
    numeroTurno: number;
    estado: string;
    personasDelante: number;
    tiempoEstimadoMinutos: number;

    sede: {
        idSede: number;
        codigo: string;
        nombre: string;
    };

    tramite: {
        idTramite: number;
        codigo: string;
        nombre: string;
    };
}

export async function asignarTurnoApi(
    datos: AsignarTurnoDatos
): Promise<TurnoRespuesta> {
    console.log(
        "Datos enviados al backend:",
        datos
    );

    const respuesta = await fetch(
        `${API_URL}/api/turnos`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje ||
                "No se pudo asignar el turno."
        );
    }

    return resultado.turno;
}

export interface AvisoTurno {
    tipo:
        | "SIGUIENTE"
        | "PROXIMO"
        | "LLAMADO"
        | "EN_ATENCION"
        | "FINALIZADO"
        | "AUSENTE";

    titulo: string;
    mensaje: string;
}

export interface TurnoSeguimiento {
    idTurno: number;
    codigoTurno: string;
    numeroTurno: number;
    estado: string;

    personasDelante: number;
    tiempoEstimadoMinutos: number;
    ventanilla: string | null;

    sede: {
        idSede: number;
        codigo: string;
        nombre: string;
    };

    tramite: {
        idTramite: number;
        codigo: string;
        nombre: string;
    };

    asesor: {
        idAsesor: number;
        nombreCompleto: string;
    } | null;

    fechaRegistro: string;
    fechaLlamado: string | null;
    fechaInicioAtencion: string | null;
    fechaFinalizacion: string | null;

    aviso: AvisoTurno | null;
}

export interface SeguimientoTurnoRespuesta {
    ok: boolean;
    tieneTurno: boolean;
    tieneTurnoActivo: boolean;
    mensaje?: string;
    turno: TurnoSeguimiento | null;
}

export interface CancelarTurnoRespuesta {
    ok: boolean;
    mensaje: string;

    turno: {
        idTurno: number;
        codigoTurno: string;
        estado: string;
        sede: string;
        tramite: string;
        fechaRegistro: string;
        fechaCancelacion: string;
    };
}

export async function obtenerTurnoActivoApi(
    dni: string
): Promise<SeguimientoTurnoRespuesta> {
    const dniLimpio = String(dni).trim();

    if (!/^\d{8}$/.test(dniLimpio)) {
        throw new Error(
            "No se pudo obtener un DNI válido."
        );
    }

    const respuesta = await fetch(
        `${API_URL}/api/turnos/activo/${dniLimpio}`
    );

    const resultado =
        (await respuesta.json()) as SeguimientoTurnoRespuesta;

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje ||
                "No se pudo consultar el turno."
        );
    }

    return resultado;
}

export async function cancelarTurnoApi(
    idTurno: number,
    dni: string
): Promise<CancelarTurnoRespuesta> {
    const respuesta = await fetch(
        `${API_URL}/api/turnos/${idTurno}/cancelar`,
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                dni,
            }),
        }
    );

    const resultado =
        (await respuesta.json()) as CancelarTurnoRespuesta;

    if (!respuesta.ok) {
        throw new Error(
            resultado.mensaje ||
                "No se pudo cancelar el turno."
        );
    }

    return resultado;
}