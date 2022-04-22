import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Button } from "react-native";
import config from "./../config/config.json";
import styles from "../styles/Base.js";
import orderModel from '../models/orders'

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || true;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <TouchableOpacity key={index} onPress={() => {
                navigation.navigate('Orderdetaljer', {
                    order: order
                });
            }} style={styles.appButtonContainer}>
                <Text key={index} style={styles.appButtonText}>
                    {order.name}
                </Text>
            </TouchableOpacity>
        });

    return (
        <View style={styles.base2}>
            <Text style={styles.info}>Ordrar</Text>
            <Text style={styles.items}>Följande ordrar kan plockas:</Text>
            {listOfOrders}
        </View>
    );
}