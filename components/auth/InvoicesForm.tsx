import { useState, useEffect } from 'react';
import { Platform, View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import config from "../../config/config.json";
import styles from "../../styles/Base.js";
import invoiceModel from '../../models/invoices';
import { Picker } from '@react-native-picker/picker';
import orderModel from "../../models/orders";
import auth from "../../models/auth";
import Order from '../../interfaces/order';
import DateTimePicker from '@react-native-community/datetimepicker';


function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
}

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
            }}>
            {ordersList}
        </Picker>
    );
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

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}
export default function Invoices({ navigation, setOrdersList }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);

        navigation.navigate("Översikt fakturor", { reload: true });
    };

    return (
        <ScrollView style={styles.base}>
            <Text style={styles.info}>Ny faktura</Text>
            <Text style={styles.form}>Order:</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
            <Text style={styles.form}>Faktureringsdatum:</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <TouchableOpacity
                onPress={() => {
                    createInvoice();
                }} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>
                    Skapa faktura
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}