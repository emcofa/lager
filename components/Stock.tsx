import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import config from "../config/config.json";



function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);


    const list = products.map((product, index) => <Text key={index} style={styles.items}>{product.name} - Antal: {product.stock}</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
            <Text style={styles.info}>Lagerförteckning</Text>
            <StockList />
        </View>
    );
}


const styles = StyleSheet.create({
    items: {
        width: 360,
        fontSize: 18,
        marginBottom: 20,
        lineHeight: 20,
        letterSpacing: 1.2,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
    },
    info: {
        width: 360,
        lineHeight: 74,
        letterSpacing: 1.2,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
        color: '#59724A',
        fontSize: 32,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },
});

