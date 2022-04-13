// components/DeliveryForm.tsx
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity, ScrollView, Text, TextInput, Button, View } from "react-native";
import styles from "../styles/Base.js";
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import Delivery from '../interfaces/delivery';
import deliveryModel from "../models/deliveries";

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker 
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

export default function DeliveryForm({ navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };
        console.log(updatedProduct);
        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={styles.base}>
            <Text style={styles.info}>Ny inleverans</Text>

            <Text style={styles.header2}>Kommentar</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />
            <Text style={styles.header2}>Antal</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Text style={styles.header2}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
            <Text style={styles.header2}>Leveransdatum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            setDropDownDate={setDropDownDate}
            />

            <TouchableOpacity
                onPress={() => {
                    addDelivery();
                }} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>
                    Gör inleverans
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

