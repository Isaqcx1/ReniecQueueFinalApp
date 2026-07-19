import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Colors from "../styles/colors";

interface Props{

    title:string;

    onPress:()=>void;

}

export default function Button({title,onPress}:Props){

    return(

        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>

            <LinearGradient

                colors={[Colors.primary, Colors.secondary]}

                start={{x:0,y:0}}

                end={{x:1,y:1}}

                style={styles.button}

            >

                <Text style={styles.text}>{title}</Text>

            </LinearGradient>

        </TouchableOpacity>

    );

}

const styles=StyleSheet.create({

    button:{

        height:55,

        borderRadius:18,

        justifyContent:"center",

        alignItems:"center",

        marginTop:10,

        shadowColor:"#000",

        shadowOpacity:0.2,

        shadowRadius:8,

        elevation:5

    },

    text:{

        color:"#fff",

        fontSize:18,

        fontWeight:"bold"

    }

});