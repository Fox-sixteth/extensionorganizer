import * as vscode from 'vscode';
import { CustomData } from '../interfaces/datas';
import { STORAGE_KEY } from '../extension';

let context:vscode.ExtensionContext;
let configs: Record<string, CustomData>;

export function initStorage(rawcontext:vscode.ExtensionContext){
    context = rawcontext;
    configs = context.globalState.get(STORAGE_KEY) || {};
}

export function getConfigs(): Record<string, CustomData> {
    return configs;
}

export async function saveCustomData(data:Record<string, CustomData>){
    await context.globalState.update(STORAGE_KEY, data);
}