import * as vscode from 'vscode';
import { CustomData } from '../interfaces/datas';
import { STORAGE_KEY } from '../interfaces/constant';

let context:vscode.ExtensionContext;
let configs: Record<string, CustomData>;

export function initStorage(rawcontext:vscode.ExtensionContext){
    context = rawcontext;
    configs = context.globalState.get(STORAGE_KEY) || {};
}

export function getCustomData(): Record<string, CustomData> {
    return configs;
}

export async function saveCustomData(data:Record<string, CustomData>){
    await context.globalState.update(STORAGE_KEY, data);
}

export function update_CustomData(){
    configs = context.globalState.get(STORAGE_KEY) || {};
}
