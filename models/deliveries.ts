import config from "../config/config.json";

import Delivery from "../interfaces/delivery"
import { showMessage } from "react-native-flash-message";


const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;

    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {

        let changedOrder = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            api_key: config.api_key,
            comment: delivery.comment,
        };
        const result = await deliveries.updateDelivery(changedOrder);

        if (result.type === "success") {
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
        } else {
            showMessage({
                message: "Det gick inte att lägga till leverans",
                description: "Du glömde fylla i ett eller flera fält",
                type: "warning",
            });
        }

    },
    updateDelivery: async function updateDelivery(delivery: Partial<Delivery>) {
        const response = await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }
        return {
            title: "Inleverans lyckades",
            message: "De tillagda produkterna har uppdaterats i produktlistan",
            type: "success",
        };
    }
};

export default deliveries;