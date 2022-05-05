import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

let products = [
    { name: "Bröd", stock: 7 },
    { name: "Mjölk", stock: 3 },
    { name: "Havregryn", stock: 12 },
];

const navigation = () => false;

test('Testing form for Delivery', async () => {
    const { getAllByText, getByTestId, getByA11yLabel } = render(<DeliveryForm
        setProducts={products}
        navigation={navigation}
    />);
    const titleElements = await getAllByText("Ny inleverans");

    expect(titleElements).toBeDefined();

    const amountField = await getByTestId("amount-field");

    expect(amountField).toBeDefined();

    const a11yLabel = `Skapa inleverans genom att trycka`;
    const submitButton = getByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();

});