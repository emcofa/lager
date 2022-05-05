import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import config from "../config/config.json";
import styles from "../../styles/Base.js";
import orderModel from '../../models/orders'

export default function ShipList({ route, navigation }) {
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
    .filter(order => order.status === "Packad")
    .map((order, index) => {
        return <TouchableOpacity key={index} onPress={() => {
            navigation.navigate('Skicka', {
                order: order
            });
        }}
        accessibilityLabel={`skicka order`}
        style={styles.appButtonContainer2}>
            <Text key={index} style={styles.appButtonText}>
                {order.name}
            </Text>
        </TouchableOpacity>
    });

    return (
        <ScrollView style={styles.base2}>
            <Text style={styles.info}>Redo att skickas</Text>
            {listOfOrders}
        </ScrollView>
    );
}