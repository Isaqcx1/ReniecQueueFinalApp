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