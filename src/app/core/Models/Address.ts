export class Address {
    public user_id!: string;
    public street_address!: string;
    public city!: string;
    public state!: string;
    public country!: string;
    public postal_code!: string;

    constructor(
        user_id: string,
        street_address: string,
        city: string,
        state: string,
        country: string,
        postal_code: string
    ) {
        this.user_id = user_id;
        this.street_address = street_address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postal_code = postal_code;
    }
}
