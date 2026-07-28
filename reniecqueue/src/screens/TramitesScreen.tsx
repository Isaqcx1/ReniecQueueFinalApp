import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";
import Input from "../components/Input";
import { tramites, Tramite } from "../data/tramitesData";

export default function TramitesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { sede } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState<Tramite | null>(null);

  const tramitesFiltrados = useMemo(() => {

    return tramites.filter((tramite) =>

        tramite.idSede === sede.id &&

        tramite.nombre
            .toLowerCase()
            .includes(buscar.toLowerCase())

    );

}, [buscar, sede]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.header}>
        <Image
          source={require("../assets/logor.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.profile} onPress={() => setMenuVisible(true)}>
          <Ionicons name="person-circle" size={42} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={tramitesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.sedeCard}>
              <View style={styles.sedeIcon}>
                <Ionicons name="business" size={26} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sedeNombre}>{sede.nombre}</Text>
                <Text style={styles.sedeDireccion}>{sede.direccion}</Text>
              </View>
            </View>

            <Text style={styles.title}>Seleccione el trámite</Text>
            <Text style={styles.subtitle}>
              Elija el trámite que desea realizar en esta sede.
            </Text>
            <Input
              placeholder="Buscar trámite..."
              value={buscar}
              onChangeText={setBuscar}
            />
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setTramiteSeleccionado(item)}
            style={[
              styles.card,
              tramiteSeleccionado?.id === item.id && styles.cardSelected,
            ]}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icono}
                size={34}
                color={tramiteSeleccionado?.id === item.id ? "#fff" : Colors.primary}
              />
            </View>
            <View style={styles.info}>
              <Text
                style={[
                  styles.nombre,
                  tramiteSeleccionado?.id === item.id && styles.nombreSeleccionado,
                ]}
              >
                {item.nombre}
              </Text>
              <Text
                style={[
                  styles.descripcion,
                  tramiteSeleccionado?.id === item.id && styles.descripcionSeleccionada,
                ]}
              >
                {item.descripcion}
              </Text>
            </View>
            <Ionicons
              name={
                tramiteSeleccionado?.id === item.id
                  ? "checkmark-circle"
                  : "chevron-forward"
              }
              size={26}
              color={tramiteSeleccionado?.id === item.id ? "#fff" : Colors.primary}
            />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          tramiteSeleccionado ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={() =>
                navigation.navigate("Requisitos", {
                  sede,
                  tramite: tramiteSeleccionado,
                })
              }
            >
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Continuar</Text>
                <Ionicons name="arrow-forward" color="#fff" size={22} />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={{ height: 30 }} />
          )
        }
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
        backgroundColor: Colors.background,
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
        right: 20,
        top: 50,
    },

    sedeCard: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        marginTop: 18,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 6,
    },

    sedeIcon: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: "#EAF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    sedeNombre: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },

    sedeDireccion: {
        marginTop: 4,
        color: Colors.gray,
        fontSize: 14,
    },

    title: {
        marginHorizontal: 20,
        marginTop: 25,
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.text,
    },

    subtitle: {
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 18,
        color: Colors.gray,
        fontSize: 15,
    },

    card: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        marginBottom: 15,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
        borderWidth: 2,
        borderColor: "transparent",
    },

    cardSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.secondary,
    },

    iconContainer: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: "#EAF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    info: {
        flex: 1,
    },

    nombre: {
        fontSize: 17,
        fontWeight: "bold",
        color: Colors.text,
    },

    descripcion: {
        marginTop: 4,
        fontSize: 14,
        color: Colors.gray,
        lineHeight: 20,
    },

    nombreSeleccionado: {
        color: "#fff",
    },

    descripcionSeleccionada: {
        color: "#E8F4FF",
    },

    button: {
        marginHorizontal: 18,
        marginTop: 10,
        marginBottom: 95,
    },

    gradient: {
        height: 56,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
    },

});