import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Tramite {

    id: number;

    idSede: number;

    nombre: string;

    descripcion: string;

    icono: keyof typeof MaterialCommunityIcons.glyphMap;

}

export const tramites: Tramite[] = [

 
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
        icono: "card-multiple-outline",
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
        nombre: "Actualización de fotografía",
        descripcion: "Actualiza la fotografía de tu documento.",
        icono: "camera-account",
    },

 
    {
        id: 5,
        idSede: 2,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 6,
        idSede: 2,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-multiple-outline",
    },

    {
        id: 7,
        idSede: 2,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada en tu DNI.",
        icono: "home-edit-outline",
    },

    {
        id: 8,
        idSede: 3,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 9,
        idSede: 3,
        nombre: "Duplicado de DNI",
        descripcion: "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-multiple-outline",
    },

 
    {
        id: 10,
        idSede: 4,
        nombre: "Renovación de DNI",
        descripcion: "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },

    {
        id: 11,
        idSede: 4,
        nombre: "Cambio de domicilio",
        descripcion: "Actualiza la dirección registrada en tu DNI.",
        icono: "home-edit-outline",
    },

];