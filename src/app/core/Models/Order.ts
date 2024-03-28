export class Order {
    public user_id!: string;
    public order_date!: Date;
    public payment_status!: Boolean;
    public total_price!: number;
    public tran_id!: string;
    public shipping_address!: string;

    constructor(
        user_id: string,
        order_date: Date,
        payment_status: Boolean,
        total_price: number,
        tran_id: string,
        shipping_address: string
    ) {
        this.user_id = user_id;
        this.order_date = order_date;
        this.payment_status = payment_status;
        this.total_price = total_price;
        this.tran_id = tran_id;
        this.shipping_address = shipping_address;
    }
}
