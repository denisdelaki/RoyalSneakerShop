export class Review {
    public user_id!: string;
    public product_id!: string;
    public rating!: number;
    public comment!: string;
    public date_added!: Date;

    constructor(
        user_id: string,
        product_id: string,
        rating: number,
        comment: string,
        date_added: Date
    ) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.rating = rating;
        this.comment = comment;
        this.date_added = date_added;
    }
}
