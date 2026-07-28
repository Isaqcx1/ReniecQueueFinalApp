import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SedesScreen from "../screens/SedesScreen";
import DetalleSedeScreen from "../screens/DetalleSedeScreen";
import TramiteScreen from "../screens/TramitesScreen";
import RequisitosScreen from "../screens/RequisitosScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Sedes"
                    component={SedesScreen}
                />
                <Stack.Screen
                    name="DetalleSede"
                    component={DetalleSedeScreen}
                />
                <Stack.Screen
                    name="Tramites"
                    component={TramiteScreen}
                />
                <Stack.Screen
                    name="Requisitos"
                    component={RequisitosScreen}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>

        </NavigationContainer>

    );

}