import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import config from "../config/config.json";
import styles from "../styles/Base.js";
import deliveryModel from '../models/deliveries'

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || true;
    const [allDeliveries, setAllDeliveries] = useState([]);


    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <View key={index} style={styles.deliveryContainer}>
            <Text style={styles.items}>Produktnamn: {delivery.product_name}</Text>
            <Text style={styles.items}>Antal: {delivery.amount}st</Text>
            <Text style={styles.items}>Leveransdatum: {delivery.delivery_date}</Text>
            <Text style={styles.items}>Kommentar: {delivery.comment}</Text>
            </View>
        });

    return (
        <ScrollView style={styles.base2}>
            <Text style={styles.info}>Inleveranser</Text>
            {listOfDeliveries}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Form');
                }} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>
                    Skapa ny inleverans
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}