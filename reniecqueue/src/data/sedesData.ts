export interface Sede {
    id: number;
    codigo: string;
    nombre: string;
    direccion: string;
    distrito: string;
    imagen: any;
}

export const sedes: Sede[] = [
    {
        id: 1,
        codigo: "SED-001",
        nombre: "RENIEC San Isidro",
        direccion: "Av. Javier Prado Este 1890",
        distrito: "San Isidro",
        imagen: require("../assets/filar.png"),
    },
    {
        id: 2,
        codigo: "SED-002",
        nombre: "RENIEC Miraflores",
        direccion: "Av. Benavides 850",
        distrito: "Miraflores",
        imagen: require("../assets/filar.png"),
    },
    {
        id: 3,
        codigo: "SED-003",
        nombre: "RENIEC Villa El Salvador",
        direccion: "Dirección de prueba - Villa El Salvador",
        distrito: "Villa El Salvador",
        imagen: require("../assets/filar.png"),
    },
];

export const filtros = [
    "Todos",
    "San Isidro",
    "Miraflores",
    "Villa El Salvador",
];