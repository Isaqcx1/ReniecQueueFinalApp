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

import { requisitos } from "../data/requisitosData";

export default function RequisitosScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { sede, tramite } = route.params;

  const [menuVisible, setMenuVisible] = useState(false);

  const listaRequisitos = useMemo(() => {
    return requisitos.filter((item) => item.idTramite === tramite.id);
  }, [tramite]);

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
          <Ionicons name="person-circle" size={42} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={listaRequisitos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.sedeCard}>
              <View style={styles.circle}>
                <Ionicons name="business" size={26} color={Colors.primary} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.sedeTitle}>{sede.nombre}</Text>
                <Text style={styles.sedeAddress}>{sede.direccion}</Text>
              </View>
            </View>

            <View style={styles.tramiteCard}>
              <MaterialCommunityIcons
                name={tramite.icono}
                size={34}
                color={Colors.primary}
              />

              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={styles.tramiteTitle}>{tramite.nombre}</Text>
                <Text style={styles.tramiteDescription}>
                  {tramite.descripcion}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Requisitos</Text>
            <Text style={styles.sectionSubtitle}>
              Revise los requisitos antes de solicitar su turno.
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.requirementCard}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={18} color="#fff" />
            </View>
            <Text style={styles.requirementText}>{item.descripcion}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={() =>
                navigation.navigate("DescargarRequisitos", { sede, tramite })
              }
            >
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.gradient}
              >
                <Ionicons name="download" size={22} color="#fff" />
                <Text style={styles.buttonText}>Descargar requisitos</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.button}
              onPress={() =>
                navigation.navigate("RegistroCola", { sede, tramite })
              }
            >
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.gradient}
              >
                <Ionicons name="people" size={22} color="#fff" />
                <Text style={styles.buttonText}>Registrarme en la cola</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />

      <BottomNav active="Sedes" />

      <ProfileMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onProfile={() => setMenuVisible(false)}
        onSettings={() => setMenuVisible(false)}
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
        elevation: 5,
    },

    circle: {
        width: 55,
        height: 55,
        borderRadius: 28,
        backgroundColor: "#EAF4FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    sedeTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },

    sedeAddress: {
        marginTop: 4,
        fontSize: 14,
        color: Colors.gray,
    },

    tramiteCard: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        marginTop: 18,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
    },

    tramiteTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },

    tramiteDescription: {
        marginTop: 5,
        color: Colors.gray,
        lineHeight: 20,
    },

    sectionTitle: {
        marginHorizontal: 20,
        marginTop: 28,
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.text,
    },

    sectionSubtitle: {
        marginHorizontal: 20,
        marginTop: 6,
        marginBottom: 18,
        color: Colors.gray,
        fontSize: 15,
    },

    requirementCard: {
        backgroundColor: "#fff",
        marginHorizontal: 18,
        marginBottom: 14,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        elevation: 4,
    },

    checkCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    requirementText: {
        flex: 1,
        fontSize: 15,
        color: Colors.text,
        lineHeight: 22,
    },

    footer: {
        marginTop: 10,
        marginBottom: 95,
    },

    button: {
        marginHorizontal: 18,
        marginBottom: 15,
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
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 10,
    },

});