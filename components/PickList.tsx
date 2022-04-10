import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import orderModel from "../models/orders";
import { useState, useEffect } from 'react';
import styles from "../styles/Base.js";
import productModel from '../models/products'

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock < item.amount) {
            allInStock = false;
        }
        return <Text
            key={index} style={styles.items}
        >
            {item.name} - {item.amount} - {item.location}
        </Text>;
    });

    return (
        <SafeAreaView>
            <Text style={styles.info}>Kund:</Text>
            <Text style={styles.items}>{order.name}</Text>
            <Text style={styles.items}>{order.address}</Text>
            <Text style={styles.items}>{order.zip} {order.city}</Text>

            <Text style={styles.info}>Produkter:</Text>

            {orderItemsList}
            {allInStock

                ? <TouchableOpacity onPress={pick} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>
                        Plocka order
                    </Text>
                </TouchableOpacity>
                : <Text style={styles.color}>Varor saknas, order går ej att plocka</Text>
            }
        </SafeAreaView>
    )
};