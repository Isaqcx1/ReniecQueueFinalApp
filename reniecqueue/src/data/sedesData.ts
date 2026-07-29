export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  distrito: string;
  imagen: any;
}

export const sedes: Sede[] = [
  {
    id: 1,
    nombre: "RENIEC San Isidro",
    direccion: "Av. Javier Prado Este 1890",
    distrito: "San Isidro",
    imagen: require("../assets/filar.png"),
  },
  {
    id: 2,
    nombre: "RENIEC San Miguel",
    direccion: "Av. La Marina 2450",
    distrito: "San Miguel",
    imagen: require("../assets/filar.png"),
  },
  {
    id: 3,
    nombre: "RENIEC Miraflores",
    direccion: "Av. Benavides 850",
    distrito: "Miraflores",
    imagen: require("../assets/filar.png"),
  },
  {
    id: 4,
    nombre: "RENIEC Los Olivos",
    direccion: "Av. Universitaria Norte 3200",
    distrito: "Los Olivos",
    imagen: require("../assets/filar.png"),
  },
];

export const filtros = [
  "Todos",
  "San Isidro",
  "San Miguel",
  "Miraflores",
  "Los Olivos",
];