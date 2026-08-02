import React, {
    createContext,
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

    registrarTurno: (
        nuevoTurno: Turno
    ) => void;

    actualizarTurno: (
        turnoActualizado: Turno
    ) => void;

    eliminarTurno: () => void;
}

const TurnoContext =
    createContext<TurnoContextType>(
        {} as TurnoContextType
    );

export function TurnoProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [turno, setTurno] =
        useState<Turno | null>(null);

    function registrarTurno(
        nuevoTurno: Turno
    ) {
        setTurno(nuevoTurno);
    }

    function actualizarTurno(
        turnoActualizado: Turno
    ) {
        setTurno(turnoActualizado);
    }

    function eliminarTurno() {
        setTurno(null);
    }

    return (
        <TurnoContext.Provider
            value={{
                turno,
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
    return useContext(TurnoContext);
}