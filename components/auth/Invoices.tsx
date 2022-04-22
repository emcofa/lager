import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Invoice from './InvoicesForm';
import InvoiceList from './InvoicesList';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="InvoiceList">
            <Stack.Screen name="Översikt fakturor">
                {(screenProps) => <InvoiceList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Skapa faktura" component={Invoice} />
        </Stack.Navigator>
    );
};