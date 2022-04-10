import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Button } from "react-native";
import config from "./../config/config.json";
import styles from "../styles/Base.js";
import orderModel from '../models/orders'

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setAllOrders(result.data));
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <TouchableOpacity key={index} onPress={() => {
                navigation.navigate('Details', {
                    order: order
                });
            }} style={styles.appButtonContainer}>
                <Text key={index} style={styles.appButtonText}>
                    {order.name}
                </Text>
            </TouchableOpacity>

        });

    return (
        <View>
            <Text style={styles.header2}>Ordrar redo att plockas:</Text>
            {listOfOrders}
        </View>
    );
}