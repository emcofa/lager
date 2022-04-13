import config from "../config/config.json";

import Delivery from "../interfaces/delivery"


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
        await deliveries.updateDelivery(changedOrder);

    },
    updateDelivery: async function updateDelivery(delivery: Partial<Delivery>) {
        try {
            await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then(response => response.json()) 
            // .then(json => console.log(json));
        } catch (error) {
            console.log("Could not add delivery ")
        }
        
    }
};

export default deliveries;