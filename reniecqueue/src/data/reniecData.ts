export interface Ciudadano {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}

export interface UsuarioRegistrado {
    nombrePerfil: string;
    dni: string;
    password: string;
    correo?: string;
    celular?: string;
}

// Personas que existen en la base simulada de RENIEC
export const ciudadanos: Ciudadano[] = [
    {
        dni: "74258136",
        nombres: "Juan Carlos",
        apellidoPaterno: "Pérez",
        apellidoMaterno: "Gómez",
    },
    {
        dni: "71582469",
        nombres: "María Fernanda",
        apellidoPaterno: "Rojas",
        apellidoMaterno: "Torres",
    },
    {
        dni: "78451236",
        nombres: "Luis Alberto",
        apellidoPaterno: "Ramírez",
        apellidoMaterno: "Castro",
    },
    {
        dni: "73698521",
        nombres: "Ana Sofía",
        apellidoPaterno: "Flores",
        apellidoMaterno: "Vargas",
    },
    {
        dni: "75982413",
        nombres: "Diego Andrés",
        apellidoPaterno: "Mendoza",
        apellidoMaterno: "Ruiz",
    },
    {
        dni: "74856329",
        nombres: "Valeria",
        apellidoPaterno: "Salazar",
        apellidoMaterno: "Quispe",
    },
    {
        dni: "76325841",
        nombres: "José Miguel",
        apellidoPaterno: "Torres",
        apellidoMaterno: "Paredes",
    },
    {
        dni: "79415236",
        nombres: "Camila Andrea",
        apellidoPaterno: "Navarro",
        apellidoMaterno: "León",
    },
    {
        dni: "72156384",
        nombres: "Renato Javier",
        apellidoPaterno: "Cruz",
        apellidoMaterno: "Medina",
    },
    {
        dni: "73512469",
        nombres: "Luciana Paola",
        apellidoPaterno: "Herrera",
        apellidoMaterno: "Soto",
    },
    {
        dni: "73049855",
        nombres: "Isaac",
        apellidoPaterno: "Gavidia",
        apellidoMaterno: "Rioja",
    },
];

// Personas que ya crearon una cuenta en RENIEC Queue
export const usuariosRegistrados: UsuarioRegistrado[] = [
    {
        dni: "74258136",
        nombrePerfil: "Juan",
        password: "74258136",
        correo: "juan@gmail.com",
        celular: "987654321",
    },
    {
        dni: "71582469",
        nombrePerfil: "María",
        password: "71582469",
        correo: "maria@gmail.com",
        celular: "986543210",
    },
    {
        dni: "78451236",
        nombrePerfil: "Luis",
        password: "78451236",
        correo: "luis@gmail.com",
        celular: "985432109",
    },
    {
        dni: "73698521",
        nombrePerfil: "Ana",
        password: "73698521",
        correo: "ana@gmail.com",
        celular: "984321098",
    },
    {
        dni: "73049855",
        nombrePerfil: "Isaac",
        password: "73049855",
        correo: "Isaac@gmail.com",
        celular: "983210987",
    },
];

export function obtenerCiudadanoPorDni(
    dni: string
): Ciudadano | undefined {
    return ciudadanos.find((ciudadano) => ciudadano.dni === dni);
}

export function obtenerUsuarioPorDni(
    dni: string
): UsuarioRegistrado | undefined {
    return usuariosRegistrados.find((usuario) => usuario.dni === dni);
}
interface DatosNuevoUsuario {
    dni: string;
    correo: string;
    celular: string;
    password: string;
}

interface ResultadoRegistro {
    ok: boolean;
    mensaje: string;
}

export function registrarUsuario(
    datos: DatosNuevoUsuario
): ResultadoRegistro {
    const ciudadano = obtenerCiudadanoPorDni(datos.dni);

    if (!ciudadano) {
        return {
            ok: false,
            mensaje: "El DNI no existe en los datos de RENIEC.",
        };
    }

    const usuarioExistente = obtenerUsuarioPorDni(datos.dni);

    if (usuarioExistente) {
        return {
            ok: false,
            mensaje: "Este DNI ya tiene una cuenta registrada.",
        };
    }

    const correoEnUso = usuariosRegistrados.some(
        (usuario) =>
            usuario.correo?.toLowerCase() ===
            datos.correo.toLowerCase()
    );

    if (correoEnUso) {
        return {
            ok: false,
            mensaje: "El correo electrónico ya está registrado.",
        };
    }

    usuariosRegistrados.push({
        dni: datos.dni,
        nombrePerfil:
            ciudadano.nombres.split(" ")[0] || ciudadano.nombres,
        correo: datos.correo,
        celular: datos.celular,
        password: datos.password,
    });

    return {
        ok: true,
        mensaje: "Su cuenta fue creada correctamente.",
    };
}

export function obtenerNombreCompleto(dni: string): string {
    const ciudadano = obtenerCiudadanoPorDni(dni);

    if (!ciudadano) {
        return "Usuario";
    }

    return `${ciudadano.nombres} ${ciudadano.apellidoPaterno} ${ciudadano.apellidoMaterno}`;
}