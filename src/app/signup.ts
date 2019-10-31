export class Signup {

    constructor(
        public fname: string,
        public lname:string,
        public age: number,
        public gender: string,
        public email: string,
        public phone: number,
        public pwd: string,
        public confirmpwd: string,
    )
    {

    }
}


export class Login
{
    constructor(
        public email: string,
        public pwd: string
    ) {}
}
