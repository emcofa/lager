import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock';


// API-key: b14d3d731d24a4979327e2179104bfba

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Image source={warehouse} style={styles.img} />
        <Text style={styles.headline}>Sticklingar</Text>
        <Stock />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  headline: {
    color: '#000',
    fontSize: 52,
    fontWeight: "bold",
    letterSpacing: 1.2,
    position: 'absolute',
    marginHorizontal: 50,
    marginTop: 30,
    fontFamily: "Cochin",
  },
  img: {
    width: 360,
    height: 240,
    borderRadius: 20,
  }
});
