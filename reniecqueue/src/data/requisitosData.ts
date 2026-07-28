export interface Requisito {
    id: number;
    idTramite: number;
    descripcion: string;
}

export const requisitos: Requisito[] = [

    // Renovación de DNI
    {
        id: 1,
        idTramite: 1,
        descripcion: "Presentar el DNI anterior.",
    },
    {
        id: 2,
        idTramite: 1,
        descripcion: "Presentar el comprobante de pago.",
    },
    {
        id: 3,
        idTramite: 1,
        descripcion: "Presencia del titular.",
    },

    // Duplicado de DNI
    {
        id: 4,
        idTramite: 2,
        descripcion: "Declaración de pérdida o robo.",
    },
    {
        id: 5,
        idTramite: 2,
        descripcion: "Comprobante de pago del duplicado.",
    },

    // Cambio de domicilio
    {
        id: 6,
        idTramite: 3,
        descripcion: "Recibo de servicio del nuevo domicilio.",
    },
    {
        id: 7,
        idTramite: 3,
        descripcion: "DNI vigente.",
    },

    // Actualización de fotografía
    {
        id: 8,
        idTramite: 4,
        descripcion: "Presencia del titular.",
    },
    {
        id: 9,
        idTramite: 4,
        descripcion: "DNI vigente.",
    },

];