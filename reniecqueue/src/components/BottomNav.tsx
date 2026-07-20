import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Colors from "../styles/colors";

interface Props {
    active: "Inicio" | "Sedes" | "Turno";
}

export default function BottomNav({ active }: Props) {

    const navigation = useNavigation<any>();

    const Item = (
        name: "Inicio" | "Sedes" | "Turno",
        icon: any,
        screen: string
    ) => {

        const selected = active === name;

        if (selected) {

            return (

                <LinearGradient
                    colors={[Colors.primary, Colors.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.activeItem}
                >

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name={icon}
                            size={22}
                            color="#fff"
                        />

                        <Text style={styles.activeText}>
                            {name}
                        </Text>

                    </TouchableOpacity>

                </LinearGradient>

            );

        }

        return (

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(screen)}
            >

                <Ionicons
                    name={icon}
                    size={22}
                    color={Colors.gray}
                />

                <Text style={styles.text}>
                    {name}
                </Text>

            </TouchableOpacity>

        );

    };

    return (

        <View style={styles.container}>

            {Item("Inicio", "home", "Home")}

            {Item("Sedes", "business", "Sedes")}

            {Item("Turno", "ticket", "Turno")}

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        position: "absolute",

        bottom: 20,

        left: 18,

        right: 18,

        backgroundColor: "#fff",

        borderRadius: 25,

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",

        paddingVertical: 12,

        elevation: 12,

        shadowColor: "#000",

        shadowOpacity: 0.12,

        shadowRadius: 12,

        shadowOffset: {
            width: 0,
            height: 4,
        },

    },

    button: {

        width: 90,

        alignItems: "center",

        justifyContent: "center",

        paddingVertical: 8,

    },

    activeItem: {

        borderRadius: 18,

    },

    activeText: {

        color: "#fff",

        marginTop: 4,

        fontWeight: "bold",

        fontSize: 13,

    },

    text: {

        marginTop: 4,

        color: Colors.gray,

        fontSize: 13,

        fontWeight: "600",

    },

});