import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipOrder from './ShipOrder';
import ShipList from './ShipList';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="Lista över ordrar">
             <Stack.Screen name="Lista över ordrar" component={ShipList} />
             <Stack.Screen name="Skicka" component={ShipOrder} />
        </Stack.Navigator>
    );
};