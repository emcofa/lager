import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import config from "../config/config.json";

import productModel from '../models/products'
import styles from "../styles/Base.js";



function StockList({products, setProducts}) {

    useEffect(async () => {
        setProducts(await productModel.getProducts());
      }, []);


    const list = products.map((product, index) => {
        return <Text
            key={index} style={styles.items}
        >
            {product.name} - Antal: {product.stock}st
        </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={styles.info}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}


