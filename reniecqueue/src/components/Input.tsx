import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps
} from "react-native";

import Colors from "../styles/colors";

interface Props extends TextInputProps {}

export default function Input(props: Props) {

    return (

        <View style={styles.container}>

            <TextInput
                placeholderTextColor={Colors.placeholder}
                {...props}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        backgroundColor: Colors.white,

        borderRadius: 15,

        borderWidth: 1,

        borderColor: Colors.border,

        paddingHorizontal: 15,

        height: 55,

        justifyContent: "center",

        marginBottom: 18

    }

});