import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import config from "../config/config.json";
import StockList from './StockList';


import productModel from '../models/products'
import styles from "../styles/Base.js";


export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={styles.info}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}


