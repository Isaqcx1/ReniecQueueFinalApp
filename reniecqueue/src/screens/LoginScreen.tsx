import React, { useState } from "react";

import {

    View,

    Text,

    StyleSheet,

    TouchableOpacity,

    SafeAreaView

} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import Input from "../components/Input";

import Button from "../components/Button";

import Colors from "../styles/colors";

export default function LoginScreen(){

    const [dni,setDni]=useState("");

    const [password,setPassword]=useState("");

    const [showPassword,setShowPassword]=useState(false);

    return(

        <SafeAreaView style={styles.container}>

            <LinearGradient

                colors={[Colors.primary,Colors.secondary]}

                style={styles.header}

            >

                <Ionicons

                    name="person-circle"

                    size={85}

                    color="white"

                />

                <Text style={styles.title}>

                    RENIEC Queue

                </Text>

                <Text style={styles.subtitle}>

                    Tu turno, sin filas.

                </Text>

            </LinearGradient>

            <View style={styles.card}>

                <Text style={styles.loginText}>

                    Bienvenido

                </Text>

                <Text style={styles.description}>

                    Ingresa con tu DNI y contraseña.

                </Text>

                <Input

                    placeholder="DNI"

                    keyboardType="numeric"

                    value={dni}

                    onChangeText={setDni}

                    maxLength={8}

                />

                <View style={styles.passwordContainer}>

                    <Input

                        placeholder="Contraseña"

                        secureTextEntry={!showPassword}

                        value={password}

                        onChangeText={setPassword}

                    />

                    <TouchableOpacity

                        style={styles.eye}

                        onPress={()=>setShowPassword(!showPassword)}

                    >

                        <Ionicons

                            name={showPassword?"eye":"eye-off"}

                            size={22}

                            color={Colors.gray}

                        />

                    </TouchableOpacity>

                </View>

                <TouchableOpacity>

                    <Text style={styles.forgot}>

                        ¿Olvidaste tu contraseña?

                    </Text>

                </TouchableOpacity>

                <Button

                    title="Ingresar"

                    onPress={()=>console.log("Login")}

                />

                <TouchableOpacity>

                    <Text style={styles.register}>

                        ¿No tienes cuenta? Registrarse

                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );

}

const styles=StyleSheet.create({

container:{

flex:1,

backgroundColor:Colors.background

},

header:{

height:280,

justifyContent:"center",

alignItems:"center",

borderBottomLeftRadius:35,

borderBottomRightRadius:35

},

title:{

color:"white",

fontSize:34,

fontWeight:"bold",

marginTop:10

},

subtitle:{

color:"white",

fontSize:16,

marginTop:5

},

card:{

backgroundColor:"white",

marginHorizontal:20,

marginTop:-40,

borderRadius:25,

padding:25,

elevation:10

},

loginText:{

fontSize:28,

fontWeight:"bold",

color:Colors.text

},

description:{

marginTop:5,

marginBottom:25,

color:Colors.gray

},

passwordContainer:{

position:"relative"

},

eye:{

position:"absolute",

right:15,

top:16

},

forgot:{

textAlign:"right",

color:Colors.primary,

marginBottom:15

},

register:{

textAlign:"center",

marginTop:25,

color:Colors.primary,

fontWeight:"600"

}

});