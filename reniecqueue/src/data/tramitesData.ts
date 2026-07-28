import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Tramite {
  id: number;
  idSede: number;
  nombre: string;
  descripcion: string;
  icono: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export const tramites: Tramite[] = [

    // RENIEC SAN ISIDRO

    {
        id: 1,
        idSede: 1,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 2,
        idSede: 1,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },

    {
        id: 3,
        idSede: 1,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada en tu DNI.",
        icono: "home-edit-outline",
    },

    {
        id: 4,
        idSede: 1,
        nombre: "Actualización de datos",
        descripcion: "Actualiza datos personales de tu DNI.",
        icono: "account-edit-outline",
    },

    {
        id: 5,
        idSede: 1,
        nombre: "Inscripción por primera vez",
        descripcion: "Obtén tu DNI por primera vez.",
        icono: "account-plus-outline",
    },

    // RENIEC SAN MIGUEL

    {
        id: 6,
        idSede: 2,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 7,
        idSede: 2,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },

    {
        id: 8,
        idSede: 2,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada en tu DNI.",
        icono: "home-edit-outline",
    },

    {
        id: 9,
        idSede: 2,
        nombre: "Actualización de datos",
        descripcion: "Actualiza datos personales.",
        icono: "account-edit-outline",
    },

    {
        id: 10,
        idSede: 2,
        nombre: "Inscripción por primera vez",
        descripcion: "Obtén tu DNI por primera vez.",
        icono: "account-plus-outline",
    },

    // RENIEC MIRAFLORES

    {
        id: 11,
        idSede: 3,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 12,
        idSede: 3,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },

    {
        id: 13,
        idSede: 3,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada.",
        icono: "home-edit-outline",
    },

    {
        id: 14,
        idSede: 3,
        nombre: "Actualización de datos",
        descripcion: "Actualiza los datos del DNI.",
        icono: "account-edit-outline",
    },

    {
        id: 15,
        idSede: 3,
        nombre: "Inscripción por primera vez",
        descripcion: "Obtén tu primer DNI.",
        icono: "account-plus-outline",
    },

    // RENIEC LOS OLIVOS

    {
        id: 16,
        idSede: 4,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 17,
        idSede: 4,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un duplicado de tu DNI.",
        icono: "card-account-details-outline",
    },

    {
        id: 18,
        idSede: 4,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada.",
        icono: "home-edit-outline",
    },

    {
        id: 19,
        idSede: 4,
        nombre: "Actualización de datos",
        descripcion: "Actualiza información personal.",
        icono: "account-edit-outline",
    },

    {
        id: 20,
        idSede: 4,
        nombre: "Inscripción por primera vez",
        descripcion: "Obtén tu primer DNI.",
        icono: "account-plus-outline",
    },

];