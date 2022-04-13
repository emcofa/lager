import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock';
import styles from "../styles/Base.js";


// API-key: b14d3d731d24a4979327e2179104bfba

export default function Home({products, setProducts}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Image source={warehouse} style={styles.img} />
        <Text style={styles.headline}>Sticklingar</Text>
        <Stock products={products} setProducts={setProducts} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

