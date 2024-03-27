export class Users {
    public username!: string;
    public email!: string;
    public profile_pic!: string;
    public password!: string;
    public confirm_password!: string;

    constructor(username: string, email: string, profile_pic: string, password: string, confirm_password: string) {
        this.username = username;
        this.email = email;
        this.profile_pic = profile_pic;
        this.password = password;
        this.confirm_password = confirm_password;
}
}