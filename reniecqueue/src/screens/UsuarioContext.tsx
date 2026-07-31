import React, {
    createContext,
    useContext,
    useState,
} from "react";

import {
    obtenerCiudadanoPorDni,
    obtenerUsuarioPorDni,
} from "../data/reniecData";

export interface UsuarioSesion {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;

    nombrePerfil: string;
    correo: string;
    celular: string;
}

interface DatosPerfil {
    nombrePerfil: string;
    correo: string;
    celular: string;
}

interface ResultadoPassword {
    ok: boolean;
    mensaje: string;
}

interface UsuarioContextType {
    usuario: UsuarioSesion | null;

    iniciarSesion: (dni: string) => boolean;

    cerrarSesion: () => void;

    actualizarPerfil: (
        datos: DatosPerfil
    ) => boolean;

    cambiarPassword: (
        passwordActual: string,
        nuevaPassword: string
    ) => ResultadoPassword;
}

const UsuarioContext = createContext<UsuarioContextType>(
    {} as UsuarioContextType
);

export function UsuarioProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [usuario, setUsuario] =
        useState<UsuarioSesion | null>(null);

    function iniciarSesion(dni: string): boolean {
        const ciudadano =
            obtenerCiudadanoPorDni(dni);

        const cuenta =
            obtenerUsuarioPorDni(dni);

        if (!ciudadano || !cuenta) {
            return false;
        }

        setUsuario({
            dni: ciudadano.dni,
            nombres: ciudadano.nombres,
            apellidoPaterno:
                ciudadano.apellidoPaterno,
            apellidoMaterno:
                ciudadano.apellidoMaterno,

            nombrePerfil:
                cuenta.nombrePerfil ||
                ciudadano.nombres,

            correo: cuenta.correo ?? "",
            celular: cuenta.celular ?? "",
        });

        return true;
    }

    function cerrarSesion() {
        setUsuario(null);
    }

    function actualizarPerfil(
        datos: DatosPerfil
    ): boolean {
        if (!usuario) {
            return false;
        }

        const cuenta =
            obtenerUsuarioPorDni(usuario.dni);

        if (!cuenta) {
            return false;
        }

        // Actualización local simulada
        cuenta.nombrePerfil =
            datos.nombrePerfil;

        cuenta.correo = datos.correo;
        cuenta.celular = datos.celular;

        setUsuario((usuarioActual) => {
            if (!usuarioActual) {
                return null;
            }

            return {
                ...usuarioActual,
                nombrePerfil:
                    datos.nombrePerfil,
                correo: datos.correo,
                celular: datos.celular,
            };
        });

        return true;
    }

    function cambiarPassword(
        passwordActual: string,
        nuevaPassword: string
    ): ResultadoPassword {
        if (!usuario) {
            return {
                ok: false,
                mensaje:
                    "No existe una sesión activa.",
            };
        }

        const cuenta =
            obtenerUsuarioPorDni(usuario.dni);

        if (!cuenta) {
            return {
                ok: false,
                mensaje:
                    "No se encontró la cuenta.",
            };
        }

        if (
            cuenta.password !== passwordActual
        ) {
            return {
                ok: false,
                mensaje:
                    "La contraseña actual es incorrecta.",
            };
        }

        cuenta.password = nuevaPassword;

        return {
            ok: true,
            mensaje:
                "La contraseña fue actualizada correctamente.",
        };
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuario,
                iniciarSesion,
                cerrarSesion,
                actualizarPerfil,
                cambiarPassword,
            }}
        >
            {children}
        </UsuarioContext.Provider>
    );
}

export function useUsuario() {
    return useContext(UsuarioContext);
}