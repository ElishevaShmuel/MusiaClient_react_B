import { MusicFile } from "./MusicFile.ts";
import { Currency } from "./Currency.ts";

export type User = {
    Id: number;
    Name: string;
    Email?: string; 
    Password: number;
    PasswordHash?: string[];
    ProfilePicturePath: string;
    Role: string;
    Files: MusicFile[]; 
    Currency: Currency;
    IsIn: boolean;
};
