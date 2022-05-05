import { render, fireEvent } from '@testing-library/react-native';
import Home from '../components/Home';

let products = [
    { name: "Bröd", stock: 7 },
    { name: "Mjölk", stock: 3 },
    { name: "Havregryn", stock: 12 },
];
const setProducts = () => false;

test('Testing Home background color', async () => {
    const { getByTestId } = render(<Home
        products={products}
        setProducts={setProducts}
    />);
    const baseElement = getByTestId('base');

    expect(baseElement.props.style.backgroundColor).toEqual('#fff');

});