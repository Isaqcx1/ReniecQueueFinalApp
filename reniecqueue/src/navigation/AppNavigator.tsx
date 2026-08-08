import {
    NavigationContainer,
} from "@react-navigation/native";

import {
    createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen
    from "../screens/HomeScreen";

import LoginScreen
    from "../screens/LoginScreen";

import RegisterScreen
    from "../screens/RegisterScreen";

import SedesScreen
    from "../screens/SedesScreen";

import DetalleSedeScreen
    from "../screens/DetalleSedeScreen";

import TramiteScreen
    from "../screens/TramitesScreen";

import RequisitosScreen
    from "../screens/RequisitosScreen";

import TurnoScreen
    from "../screens/TurnoScreen";

import ProfileScreen
    from "../screens/ProfileScreen";

import HistorialTurnosScreen
    from "../screens/HistorialTurnosScreen";

import {
    TurnoProvider,
} from "../screens/TurnoContext";

import {
    UsuarioProvider,
} from "../screens/UsuarioContext";

import TurnoMonitor
    from "../components/TurnoMonitor";

const Stack =
    createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <UsuarioProvider>
            <TurnoProvider>

                <TurnoMonitor />

                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown:
                                false,
                        }}
                    >
                        <Stack.Screen
                            name="Login"
                            component={
                                LoginScreen
                            }
                        />

                        <Stack.Screen
                            name="Register"
                            component={
                                RegisterScreen
                            }
                        />

                        <Stack.Screen
                            name="Home"
                            component={
                                HomeScreen
                            }
                        />

                        <Stack.Screen
                            name="Sedes"
                            component={
                                SedesScreen
                            }
                        />

                        <Stack.Screen
                            name="DetalleSede"
                            component={
                                DetalleSedeScreen
                            }
                        />

                        <Stack.Screen
                            name="Tramites"
                            component={
                                TramiteScreen
                            }
                        />

                        <Stack.Screen
                            name="Requisitos"
                            component={
                                RequisitosScreen
                            }
                        />

                        <Stack.Screen
                            name="Turno"
                            component={
                                TurnoScreen
                            }
                        />

                        <Stack.Screen
                            name="Profile"
                            component={
                                ProfileScreen
                            }
                        />

                        <Stack.Screen
                            name="HistorialTurnos"
                            component={
                                HistorialTurnosScreen
                            }
                        />
                    </Stack.Navigator>
                </NavigationContainer>

            </TurnoProvider>
        </UsuarioProvider>
    );
}