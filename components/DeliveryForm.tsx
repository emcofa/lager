// components/DeliveryForm.tsx
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, TouchableOpacity, ScrollView, Text, TextInput, Button, View } from "react-native";
import styles from "../styles/Base.js";
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import Delivery from '../interfaces/delivery';
import deliveryModel from "../models/deliveries";
import { showMessage } from "react-native-flash-message";

function validateAmount(text: string) {
    if (parseInt(text) <= 0) {
        showMessage({
            message: "Antalet uppfyller inte kraven.",
            description: "Du måste fylla i ett antal större än 0",
            type: "warning"
        });
    }
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={styles.dropdown}>
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
        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView style={styles.base}>
            <Text style={styles.info}>Ny inleverans</Text>
            <Text style={styles.form}>Produkt: </Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
            <Text style={styles.form}>Antal:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    validateAmount(content)
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
                testID = "amount-field"
            />
            <Text style={styles.form}>Leveransdatum:</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setDropDownDate={setDropDownDate}
            />
            <Text style={styles.form}>Kommentar:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <TouchableOpacity
                onPress={() => {
                    addDelivery();
                }} accessibilityLabel={`Skapa inleverans genom att trycka`}
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>
                    Gör inleverans
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

