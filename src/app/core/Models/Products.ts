export class Product {
    public title!: string;
    public brand_name!: string;
    public size!: string;
    public description!: string;
    public colors!: string[];
    public price!: number;
    public likes!: number;
    public date_added!: Date;
    public quantity!: number;
    public images!: {
        img1: string;
        image_thumbnail: string;
        img2: string;
    };
    public category!: string;

    constructor(
            title: string, brand_name: string, size: string,
            description: string, colors: string[], price: number,
            likes: number, date_added: Date, quantity: number, 
            images: {
             img1: string;
             image_thumbnail: string; 
             img2: string 
            },
        category: string
    ) {
        this.title = title;
        this.brand_name = brand_name;
        this.size = size;
        this.description = description;
        this.colors = colors;
        this.price = price;
        this.likes = likes;
        this.date_added = date_added;
        this.quantity = quantity;
        this.images = images;
        this.category = category;
    }
}
