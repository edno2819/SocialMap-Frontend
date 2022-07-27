import { Profile } from './Profile'

export interface Post {
    _id: string;
    title: string;
    content: string;
    midia: string;
    profile: Profile;
    comments: string[];
    likes: string[];
}