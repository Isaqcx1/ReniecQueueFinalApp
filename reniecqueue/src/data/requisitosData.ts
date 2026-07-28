export interface RequisitoTramite {

    id: number;

    idTramite: number;

    titulo: string;

    descripcion: string;

    costo: string;

    codigoPago: string;

    tiempo: string;

    modalidad: string;

    lugaresPago: string[];

    requisitos: string[];

    observaciones: string[];

}

export const requisitos: RequisitoTramite[] = [

    {

        id: 1,

        idTramite: 1,

        titulo: "Renovación del DNI",

        descripcion:
            "Permite renovar el Documento Nacional de Identidad por vencimiento, deterioro o actualización de fotografía.",

        costo: "S/ 30.00",

        codigoPago: "02121",

        tiempo: "15 a 20 minutos",

        modalidad: "Presencial",

        lugaresPago: [

            "Banco de la Nación",

            "Págalo.pe"

        ],

        requisitos: [

            "Presentar el DNI anterior (si lo posee).",

            "Realizar el pago correspondiente.",

            "No registrar observaciones en RENIEC.",

            "Actualizar la fotografía cuando corresponda.",

            "Verificar que los datos personales sean correctos."

        ],

        observaciones: [

            "Presentarse 15 minutos antes de la atención.",

            "Conservar el comprobante de pago.",

            "El trámite es personal."

        ]

    }

];