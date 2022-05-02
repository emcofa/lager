import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Ship from "./components/ship/Ship";
import Pick from "./components/Pick";
import Auth from "./components/auth/Auth";
import AuthModel from './models/auth';
import Invoices from "./components/auth/Invoices";
import Deliveries from "./components/Deliveries";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import styles from "./styles/Base.js";
import FlashMessage from "react-native-flash-message";

const routeIcons = {
  "Lager": "home-outline",
  "Plock": "list-outline",
  "Inleverans": "car-outline",
  "Logga in": "log-in-outline",
  "Faktura": "newspaper-outline",
  "Skicka order": "map-outline",
};

const Tab = createBottomTabNavigator();

export default function App() {

  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await AuthModel.loggedIn());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#59724A',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Inleverans">
            {() => <Deliveries setProducts={setProducts}
            />}
          </Tab.Screen>
          <Tab.Screen name="Skicka order">
            {() => <Ship setProducts={setProducts}
            />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
