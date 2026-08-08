import React, {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

export interface AvisoTurno {
    tipo: string;
    titulo: string;
    mensaje: string;
}

export interface Turno {
    idTurno: number;
    numero: string;

    sede: {
        idSede?: number;
        codigo?: string;
        nombre: string;
        [key: string]: any;
    };

    tramite: {
        idTramite?: number;
        codigo?: string;
        nombre: string;
        [key: string]: any;
    };

    personasEspera: number;
    tiempoEstimado: number;

    estado: string;

    ventanilla?: string | null;
    aviso?: AvisoTurno | null;

    fechaRegistro?: string;
    fechaLlamado?: string | null;
    fechaInicioAtencion?: string | null;
    fechaFinalizacion?: string | null;
}

interface TurnoContextType {
    turno: Turno | null;

    tieneTurnoActivo: boolean;

    registrarTurno: (
        nuevoTurno: Turno
    ) => void;

    actualizarTurno: (
        turnoActualizado: Turno
    ) => void;

    eliminarTurno: () => void;
}

const TurnoContext =
    createContext(
        {} as TurnoContextType
    );

export function esEstadoTurnoActivo(
    estado?: string | null
): boolean {
    return (
        estado === "EN_ESPERA" ||
        estado === "LLAMADO" ||
        estado === "EN_ATENCION"
    );
}

export function TurnoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [turno, setTurno] =
        useState<Turno | null>(null);

    const tieneTurnoActivo =
        turno !== null &&
        esEstadoTurnoActivo(
            turno.estado
        );

    const registrarTurno =
        useCallback(
            (
                nuevoTurno: Turno
            ) => {
                setTurno(
                    nuevoTurno
                );
            },
            []
        );

    const actualizarTurno =
        useCallback(
            (
                turnoActualizado: Turno
            ) => {
                setTurno(
                    turnoActualizado
                );
            },
            []
        );

    const eliminarTurno =
        useCallback(() => {
            setTurno(null);
        }, []);

    return (
        <TurnoContext.Provider
            value={{
                turno,
                tieneTurnoActivo,
                registrarTurno,
                actualizarTurno,
                eliminarTurno,
            }}
        >
            {children}
        </TurnoContext.Provider>
    );
}

export function useTurno() {
    return useContext(
        TurnoContext
    );
}