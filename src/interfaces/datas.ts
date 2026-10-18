import * as vscode from "vscode";

export interface RawData {
    id: string;
    name: string;
    description: string;
    version: string;
    iconUri: string;
    categories: string[]; 
}

// 用户自定义的文件夹
export interface CustomData {
    id: string;           
    name: string;         
    extensions: string[]; 
}

