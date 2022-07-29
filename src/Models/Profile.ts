export interface Profile {
    _id: string;
    name: string;
    user: string;
    midia: string;
    about: string;
    following: string[]
    followers: string[]
    active: boolean;
}