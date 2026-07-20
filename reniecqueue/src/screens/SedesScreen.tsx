import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";

const sedes = [

    {
        id: "1",
        nombre: "RENIEC San Isidro",
        direccion: "Av. Javier Prado Este 1890",
        distrito: "San Isidro",
        imagen: require("../assets/filar.png"),
    },

    {
        id: "2",
        nombre: "RENIEC San Miguel",
        direccion: "Av. La Marina 2450",
        distrito: "San Miguel",
        imagen: require("../assets/filar.png"),
    },

    {
        id: "3",
        nombre: "RENIEC Miraflores",
        direccion: "Av. Benavides 850",
        distrito: "Miraflores",
        imagen: require("../assets/filar.png"),
    },

    {
        id: "4",
        nombre: "RENIEC Los Olivos",
        direccion: "Av. Universitaria Norte 3200",
        distrito: "Los Olivos",
        imagen: require("../assets/filar.png"),
    },

];

const filtros = [
    "Todos",
    "San Isidro",
    "San Miguel",
    "Miraflores",
    "Los Olivos",
];

export default function SedesScreen() {

    const navigation = useNavigation<any>();

    const [menuVisible, setMenuVisible] = useState(false);

    const [busqueda, setBusqueda] = useState("");

    const [filtro, setFiltro] = useState("Todos");

    const [seleccionada, setSeleccionada] = useState("");

    const sedesFiltradas = useMemo(() => {

        return sedes.filter((sede) => {

            const coincideDistrito =
                filtro === "Todos" ||
                sede.distrito === filtro;

            const coincideBusqueda =
                sede.nombre
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) ||

                sede.distrito
                    .toLowerCase()
                    .includes(busqueda.toLowerCase());

            return coincideDistrito && coincideBusqueda;

        });

    }, [busqueda, filtro]);

    return (

        <SafeAreaView style={styles.container}>

            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.header}
            >

                <Image
                    source={require("../assets/logor.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.profile}
                    onPress={() => setMenuVisible(true)}
                >

                    <Ionicons
                        name="person-circle"
                        color="#fff"
                        size={42}
                    />

                </TouchableOpacity>

            </LinearGradient>

            <Text style={styles.title}>
                Selecciona una sede
            </Text>

            <View style={styles.searchBox}>

                <Ionicons
                    name="search"
                    size={22}
                    color={Colors.gray}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Buscar por nombre o distrito..."
                    value={busqueda}
                    onChangeText={setBusqueda}
                />

            </View>

            <FlatList

                horizontal

                data={filtros}

                showsHorizontalScrollIndicator={false}

                contentContainerStyle={styles.filterContainer}

                keyExtractor={(item) => item}

                renderItem={({ item }) => (

                    <TouchableOpacity

                        onPress={() => setFiltro(item)}

                        style={[
                            styles.filter,
                            filtro === item && styles.filterActive,
                        ]}

                    >

                        <Text
                            style={[
                                styles.filterText,
                                filtro === item &&
                                    styles.filterTextActive,
                            ]}
                        >

                            {item}

                        </Text>

                    </TouchableOpacity>

                )}

            />

            <FlatList

                horizontal

                pagingEnabled

                snapToAlignment="center"

                decelerationRate="fast"

                showsHorizontalScrollIndicator={false}

                data={sedesFiltradas}

                keyExtractor={(item) => item.id}

                renderItem={({ item }) => (

    <TouchableOpacity

        activeOpacity={0.9}

        onPress={() => setSeleccionada(item.id)}

        style={[
            styles.card,
            seleccionada === item.id &&
                styles.cardSelected,
        ]}

    >

        <Image
            source={item.imagen}
            style={styles.cardImage}
            resizeMode="cover"
        />

        <View style={styles.cardBody}>

            <Text style={styles.cardTitle}>
                {item.nombre}
            </Text>

            <View style={styles.locationRow}>

                <Ionicons
                    name="location"
                    size={18}
                    color={Colors.primary}
                />

                <Text style={styles.cardAddress}>
                    {item.direccion}
                </Text>

            </View>

            {seleccionada === item.id && (

                <View style={styles.selectedBox}>

                    <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#fff"
                    />

                    <Text style={styles.selectedText}>
                        Sede seleccionada
                    </Text>

                </View>

            )}

        </View>

    </TouchableOpacity>

)}

contentContainerStyle={styles.cardsContainer}

/>

<BottomNav active="Sedes" />

<ProfileMenu

    visible={menuVisible}

    onClose={() => setMenuVisible(false)}

    onProfile={() => {

        setMenuVisible(false);

    }}

    onSettings={() => {

        setMenuVisible(false);

    }}

    onLogout={() => {

        setMenuVisible(false);

        navigation.replace("Login");

    }}

/>

</SafeAreaView>

);

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: "#F4F7FB",

    },

    header: {
        height: 120,

        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        elevation: 8,
    },

    logo: {

        width: 250,
        height: 200,

    },

    profile: {

        position: "absolute",

        top: 55,

        right: 20,

    },

    title: {

        fontSize: 28,

        fontWeight: "bold",

        color: Colors.text,

        marginTop: 20,

        marginHorizontal: 20,

    },

    searchBox: {

        marginHorizontal: 20,

        marginTop: 18,

        backgroundColor: "#fff",

        borderRadius: 18,

        paddingHorizontal: 15,

        flexDirection: "row",

        alignItems: "center",

        elevation: 3,

    },

    input: {

        flex: 1,

        marginLeft: 10,

        height: 55,

        color: Colors.text,

    },

    filterContainer: {

        paddingHorizontal: 20,

        paddingVertical: 18,

    },

    filter: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 10,
    elevation: 2,

    
    alignSelf: "flex-start",
    minWidth: 0,
},

filterActive: {
    backgroundColor: Colors.primary,
},

filterText: {
    color: Colors.gray,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
},

filterTextActive: {
    color: "#fff",
    textAlign: "center",
},
    cardsContainer: {

    paddingHorizontal: 15,

    paddingBottom: 230,

},

card: {

    width: 300,

    backgroundColor: "#fff",

    borderRadius: 25,

    marginHorizontal: 10,

    elevation: 6,

    overflow: "hidden",

    borderWidth: 2,

    borderColor: "transparent",

},

cardSelected: {

    borderColor: Colors.primary,

},

cardImage: {

    width: "100%",

    height: 180,

},

cardBody: {

    padding: 18,

},

cardTitle: {

    fontSize: 22,

    fontWeight: "bold",

    color: Colors.text,

},

locationRow: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 12,

},

cardAddress: {

    flex: 1,

    marginLeft: 8,

    color: Colors.gray,

    fontSize: 15,

    lineHeight: 22,

},

selectedBox: {

    marginTop: 20,

    backgroundColor: Colors.primary,

    borderRadius: 15,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    paddingVertical: 10,

},

selectedText: {

    color: "#fff",

    marginLeft: 8,

    fontWeight: "bold",

    fontSize: 15,

},

});