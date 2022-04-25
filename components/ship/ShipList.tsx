import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import config from "../config/config.json";
import styles from "../../styles/Base.js";
import deliveryModel from '../models/deliveries'

export default function ShipList({ navigation }) {

    return (
        <ScrollView style={styles.base2}>
            <Text style={styles.info}>Redo att skickas</Text>
            <Button
                title="Bengt Bengtsson"
                key="0"
                onPress={() => {
                    navigation.navigate('Skicka order', {
                        order: {
                            "id": 6156,
                            "name": "Bengt Bengtsson",
                            "address": "Blidvädersvägen 6D",
                            "zip": "22228",
                            "city": "Lund",
                            "country": "Sweden",
                            "status": "Packad",
                            "status_id": 200,
                        }
                    });
                }}
            />
        </ScrollView>
    );
}