export class Cart {
    public user_id!: string;
    public product_id!: string;
    public quantity!: number;
    public price!: number;
    public total_price!: number;

    constructor(
        user_id: string,
        product_id: string,
        quantity: number,
        price: number,
        total_price: number
    ) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.price = price;
        this.total_price = total_price;
    }
}
