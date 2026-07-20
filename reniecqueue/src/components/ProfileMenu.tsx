import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../styles/colors";

interface Props {
    visible: boolean;
    onClose: () => void;
    onProfile: () => void;
    onSettings: () => void;
    onLogout: () => void;
}

export default function ProfileMenu({
    visible,
    onClose,
    onProfile,
    onSettings,
    onLogout,
}: Props) {

    return (

        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >

            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >

                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.menu}
                >

                    <View style={styles.header}>

                        <Ionicons
                            name="person-circle"
                            size={55}
                            color={Colors.primary}
                        />

                        <View>

                            <Text style={styles.name}>
                                Usuario
                            </Text>

                            <Text style={styles.subtitle}>
                                RENIEC Queue
                            </Text>

                        </View>

                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.option}
                        onPress={onProfile}
                    >

                        <Ionicons
                            name="person-outline"
                            size={22}
                            color={Colors.primary}
                        />

                        <Text style={styles.optionText}>
                            Mi perfil
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={onSettings}
                    >

                        <Ionicons
                            name="settings-outline"
                            size={22}
                            color={Colors.primary}
                        />

                        <Text style={styles.optionText}>
                            Ajustes
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={onLogout}
                    >

                        <Ionicons
                            name="log-out-outline"
                            size={22}
                            color="#E53935"
                        />

                        <Text style={styles.logoutText}>
                            Cerrar sesión
                        </Text>

                    </TouchableOpacity>

                </TouchableOpacity>

            </TouchableOpacity>

        </Modal>

    );

}

const styles = StyleSheet.create({

    overlay: {

        flex: 1,

        backgroundColor: "rgba(0,0,0,0.25)",

        justifyContent: "flex-start",

        alignItems: "flex-end",

        paddingTop: 85,

        paddingRight: 15,

    },

    menu: {

        width: 240,

        backgroundColor: "#fff",

        borderRadius: 20,

        paddingVertical: 15,

        elevation: 12,

        shadowColor: "#000",

        shadowOpacity: 0.15,

        shadowRadius: 10,

        shadowOffset: {
            width: 0,
            height: 4,
        },

    },

    header: {

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 18,

        marginBottom: 12,

    },

    name: {

        fontSize: 18,

        fontWeight: "bold",

        color: Colors.text,

        marginLeft: 10,

    },

    subtitle: {

        marginLeft: 10,

        color: Colors.gray,

        marginTop: 2,

    },

    divider: {

        height: 1,

        backgroundColor: "#ECECEC",

        marginBottom: 8,

    },

    option: {

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 18,

        paddingVertical: 14,

    },

    optionText: {

        marginLeft: 15,

        fontSize: 16,

        color: Colors.text,

    },

    logoutText: {

        marginLeft: 15,

        fontSize: 16,

        color: "#E53935",

        fontWeight: "600",

    },

});