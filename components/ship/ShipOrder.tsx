import { Text, View, StyleSheet } from "react-native";
import styles from "../../styles/Base.js";
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    return (
        <View style={styles.base}>
            <Text style={styles.info}>Skicka order</Text>
            <Text style={styles.left}>{order.name}</Text>
            <Text style={styles.left}>{order.address}</Text>
            <Text style={styles.left}>{order.zip}</Text>
            <Text style={styles.left}>{order.city}</Text>
            <Text style={styles.left}>{order.country}</Text>
            <View style={styles.container}>
                <MapView
                    style={styles2.map}
                    initialRegion={{
                        latitude: 58.334591,
                        longitude: 16.63733,
                        latitudeDelta: 8,
                        longitudeDelta: 8,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};


const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});