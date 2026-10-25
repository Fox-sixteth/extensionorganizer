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
    belong: string|null;         
    isHidden:boolean; 
}

export interface OrganizedData extends RawData, Omit<CustomData, 'id'> {}

export function createOrganizedData(raw: RawData, custom: CustomData | undefined): OrganizedData {
    return {
        ...raw,
        belong: custom?.belong ?? null,
        isHidden: custom?.isHidden ?? false
    };
}

