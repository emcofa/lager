import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Button } from "react-native";
import config from "../../config/config.json";
import styles from "../../styles/Base.js";
import invoiceModel from '../../models/invoices';
import { Picker } from '@react-native-picker/picker';
import orderModel from "../../models/orders";
import auth from "../../models/auth";
import Order from '../../interfaces/order';
import storage from '../../models/storage';
import Invoices from '../../interfaces/invoices';
import { DataTable } from 'react-native-paper';


export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || true;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    // console.log(allInvoices);
    const invoicesRows = allInvoices.map((invoice, index) => {
        return (<DataTable.Row key={index}>
            <DataTable.Cell>{invoice.name}</DataTable.Cell>
            <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
            <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
        </DataTable.Row>
        );
    });

    return (
        <ScrollView style={styles.base2}>
            <Text style={styles.info}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Pris (kr)</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Skapa faktura");
                }} style={styles.appButtonContainer2}>
                <Text style={styles.appButtonText}>
                    Skapa ny faktura
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    auth.logout();
                    setIsLoggedIn(false);
                }} style={styles.appButtonContainer3}>
                <Text style={styles.appButtonText}>
                    Logga ut
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}