import { render, fireEvent } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

const  navigation  = () => false;
const  route  = () => false;

test('Testing if orderlist contains title "ordrar"', async () => {
    const { getAllByText } = render(<OrderList
        route={route}
        navigation={navigation}
    />);
    // debug("OrderList component");
    const title = await getAllByText("Ordrar");

    expect(title).toBeDefined();

});