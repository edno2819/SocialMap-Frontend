export interface Profile {
    _id: string;
    name: string;
    user: string;
    midia: string;
    about: string;
    following: {
        name: string[]
    };
    followers: {
        name: string[]
    };
    active: boolean;
}