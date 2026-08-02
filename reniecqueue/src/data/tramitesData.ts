import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Tramite {
    id: number;
    idSede: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    icono: React.ComponentProps<
        typeof MaterialCommunityIcons
    >["name"];
}

export const tramites: Tramite[] = [
    // RENIEC SAN ISIDRO

    {
        id: 1,
        idSede: 1,
        codigo: "TRA-001",
        nombre: "Renovación de DNI",
        descripcion:
            "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },
    {
        id: 2,
        idSede: 1,
        codigo: "TRA-002",
        nombre: "Duplicado de DNI",
        descripcion:
            "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },
    {
        id: 3,
        idSede: 1,
        codigo: "TRA-003",
        nombre: "Rectificación de datos",
        descripcion:
            "Modifica información registrada en tu DNI.",
        icono: "account-edit-outline",
    },
    {
        id: 4,
        idSede: 1,
        codigo: "TRA-004",
        nombre: "Inscripción de DNI",
        descripcion:
            "Realiza la primera inscripción para obtener tu DNI.",
        icono: "account-plus-outline",
    },

    // RENIEC MIRAFLORES

    {
        id: 5,
        idSede: 2,
        codigo: "TRA-001",
        nombre: "Renovación de DNI",
        descripcion:
            "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },
    {
        id: 6,
        idSede: 2,
        codigo: "TRA-002",
        nombre: "Duplicado de DNI",
        descripcion:
            "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },
    {
        id: 7,
        idSede: 2,
        codigo: "TRA-003",
        nombre: "Rectificación de datos",
        descripcion:
            "Modifica información registrada en tu DNI.",
        icono: "account-edit-outline",
    },
    {
        id: 8,
        idSede: 2,
        codigo: "TRA-004",
        nombre: "Inscripción de DNI",
        descripcion:
            "Realiza la primera inscripción para obtener tu DNI.",
        icono: "account-plus-outline",
    },

    // RENIEC VILLA EL SALVADOR

    {
        id: 9,
        idSede: 3,
        codigo: "TRA-001",
        nombre: "Renovación de DNI",
        descripcion:
            "Renueva tu Documento Nacional de Identidad.",
        icono: "card-account-details-outline",
    },
    {
        id: 10,
        idSede: 3,
        codigo: "TRA-002",
        nombre: "Duplicado de DNI",
        descripcion:
            "Solicita un nuevo DNI por pérdida o robo.",
        icono: "card-account-details-outline",
    },
    {
        id: 11,
        idSede: 3,
        codigo: "TRA-003",
        nombre: "Rectificación de datos",
        descripcion:
            "Modifica información registrada en tu DNI.",
        icono: "account-edit-outline",
    },
    {
        id: 12,
        idSede: 3,
        codigo: "TRA-004",
        nombre: "Inscripción de DNI",
        descripcion:
            "Realiza la primera inscripción para obtener tu DNI.",
        icono: "account-plus-outline",
    },
];