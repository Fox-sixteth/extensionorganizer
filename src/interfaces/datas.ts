import * as vscode from "vscode";

export interface RawData {
    id: string;
    name: string;
    description: string;
    version: string;
    iconUri: string;
    categories: string[]; 
}

export interface CustomData {
    id: string;           
    belomg: string;         
    isHidden:boolean; 
}

