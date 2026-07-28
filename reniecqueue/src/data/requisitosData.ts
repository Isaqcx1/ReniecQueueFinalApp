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

            "Actualizar la fotografía cuando sea requerida.",

            "Presentarse personalmente para la atención."

        ],

        observaciones: [

            "Llegar 15 minutos antes del horario de atención.",

            "Conservar el comprobante de pago.",

            "La entrega del DNI dependerá de la disponibilidad de la sede."

        ]

    },

    {

        id: 2,

        idTramite: 2,

        titulo: "Duplicado de DNI",

        descripcion:
            "Solicita un nuevo DNI en caso de pérdida, robo o deterioro del documento actual.",

        costo: "S/ 24.00",

        codigoPago: "00521",

        tiempo: "10 a 15 minutos",

        modalidad: "Presencial",

        lugaresPago: [

            "Banco de la Nación",

            "Págalo.pe"

        ],

        requisitos: [

            "Realizar el pago del trámite.",

            "Presentar la denuncia si corresponde.",

            "No registrar observaciones en RENIEC.",

            "Confirmar la identidad del solicitante."

        ],

        observaciones: [

            "El trámite es personal.",

            "Se recomienda verificar la disponibilidad antes de acudir."

        ]

    },

    {

        id: 3,

        idTramite: 3,

        titulo: "Cambio de domicilio",

        descripcion:
            "Permite actualizar la dirección registrada en el Documento Nacional de Identidad.",

        costo: "S/ 22.00",

        codigoPago: "00728",

        tiempo: "15 minutos",

        modalidad: "Presencial",

        lugaresPago: [

            "Banco de la Nación",

            "Págalo.pe"

        ],

        requisitos: [

            "Presentar el DNI vigente.",

            "Presentar un recibo de agua, luz o teléfono con la nueva dirección.",

            "Realizar el pago correspondiente.",

            "La dirección debe pertenecer al solicitante."

        ],

        observaciones: [

            "El comprobante de domicilio no debe superar los seis meses de antigüedad.",

            "La actualización queda registrada en el nuevo DNI."

        ]

    },

    {

        id: 4,

        idTramite: 4,

        titulo: "Actualización de datos",

        descripcion:
            "Permite actualizar datos personales registrados en el Documento Nacional de Identidad.",

        costo: "S/ 30.00",

        codigoPago: "02122",

        tiempo: "20 minutos",

        modalidad: "Presencial",

        lugaresPago: [

            "Banco de la Nación",

            "Págalo.pe"

        ],

        requisitos: [

            "Presentar documentos que sustenten el cambio solicitado.",

            "Presentar el DNI vigente.",

            "Realizar el pago correspondiente.",

            "Verificación de la información en RENIEC."

        ],

        observaciones: [

            "Algunos cambios requieren documentación adicional.",

            "RENIEC validará toda la información presentada."

        ]

    },

    {

        id: 5,

        idTramite: 5,

        titulo: "Inscripción por primera vez",

        descripcion:
            "Permite obtener el Documento Nacional de Identidad por primera vez.",

        costo: "S/ 41.00",

        codigoPago: "00647",

        tiempo: "25 minutos",

        modalidad: "Presencial",

        lugaresPago: [

            "Banco de la Nación",

            "Págalo.pe"

        ],

        requisitos: [

            "Acta o partida de nacimiento.",

            "Fotografía actual cuando sea requerida.",

            "Presencia del titular.",

            "Pago del trámite."

        ],

        observaciones: [

            "Para menores de edad deberá acudir con uno de sus padres o tutor.",

            "La documentación presentada será validada por RENIEC."

        ]

    }

];