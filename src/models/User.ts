import { MusicFile } from "./MusicFile.ts";
import { Currency } from "./Currency.ts";

export type User = {
    id: number;
    name: string;
    email: string; 
    password: string;
    passwordHash?: string;
    profilePicturePath: string;
    role: string;
    files: MusicFile[]; 
    currency?: Currency;
    isIn: boolean;
};
