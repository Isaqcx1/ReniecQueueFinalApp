import React, { createContext, useContext, useState } from "react";

export interface Turno {
    idTurno: number;
    numero: string;
    sede: any;
    tramite: any;
    personasEspera: number;
    tiempoEstimado: number;
    estado: string;
}

interface TurnoContextType {

    turno: Turno | null;

    registrarTurno: (turno: Turno) => void;

    eliminarTurno: () => void;

}

const TurnoContext = createContext<TurnoContextType>(
    {} as TurnoContextType
);

export function TurnoProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [turno, setTurno] = useState<Turno | null>(null);

    function registrarTurno(nuevoTurno: Turno) {

        setTurno(nuevoTurno);

    }

    function eliminarTurno() {

        setTurno(null);

    }

    return (

        <TurnoContext.Provider

            value={{
                turno,
                registrarTurno,
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