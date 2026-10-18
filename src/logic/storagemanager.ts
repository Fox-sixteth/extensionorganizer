import * as vscode from 'vscode';
import { CustomData,RawData } from '../interfaces/datas';
import { cachedRawDatas, initCustomDatas } from './data/dataProvider';

let context:vscode.ExtensionContext;
let configs: Record<string, CustomData>;

export function initStorage(rawcontext:vscode.ExtensionContext){
    context = rawcontext;
    configs = context.globalState.get('organizer_data') || {};
    initCustomDatas(configs);
}

