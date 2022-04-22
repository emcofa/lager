export default interface Invoices {
    id: number,
    order_id: number,
    total_price: number,
    creation_date: string,
    due_date: string,
    api_key: string,
};