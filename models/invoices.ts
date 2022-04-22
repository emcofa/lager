import config from "../config/config.json";
import Invoice from "../interfaces/invoices"
import storage from "./storage";
import orderModel from "./orders"

const invoices = {
    getInvoices: async function getInvoices() {
        const tokenObject: any = await storage.readToken();
        // console.log(tokenObject)
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
            },
        });
        const result = await response.json();
        return result.data;
    },
    createInvoice: async function createInvoice(invoiceObject: Partial<Invoice>) {
        let order = await orderModel.getOrders();

        let dueDate = new Date(invoiceObject.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);

        const tokenObject: any = await storage.readToken();

        let getOrder = order.find(e => e.id === invoiceObject.order_id);
        let totalPrice = getOrder.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);

        let changedOrder = {
            id: getOrder.id,
            name: getOrder.name,
            status_id: 600,
            api_key: config.api_key,
        };
        console.log(changedOrder);
        orderModel.updateOrder(changedOrder);

        invoiceObject.due_date = dueDate.toLocaleDateString();
        invoiceObject.total_price = totalPrice;
        invoiceObject.api_key = config.api_key;

        try {
            await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoiceObject),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => console.log(data));
        } catch (error) {
            console.log("error")
        }
    }
};

export default invoices;