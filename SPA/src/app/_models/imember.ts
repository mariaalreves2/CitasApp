import { IPhoto } from "./iphoto";

export interface IMember {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knowAs: any;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: IPhoto[];
  }
  
