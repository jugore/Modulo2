export class User {
    constructor(
        public id: string,
        public email: string,
        public imageUrl: string,
        public nickname: string
    ) { }
}

export class UserMemberChat{
    constructor(
        public email: string,
        public imageUrl: string,
        public nickname: string
    ) { }
}
