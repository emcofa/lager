import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import config from "../config/config.json";

import productModel from '../models/products'
import styles from "../styles/Base.js";



function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    // useEffect(async () => {
    //     setProducts(await productModel.getProducts());
    // }, []);

    // const list = products.map((product, index) => <Text key={index} style={styles.items}>{product.name} - Antal: {product.stock}</Text>);

    console.log("hej", products)

    const list = products.map((product, index) => {
        return <Text
            key={index} style={styles.items}
        >
            {product.name} - Antal: {product.stock}
        </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock(products, setProducts) {
    return (
        <View>
            <Text style={styles.info}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}


