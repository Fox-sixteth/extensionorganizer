//提供：提供原生数据的方法
import * as vscode from"vscode";
import { RawData } from "../../interfaces/datas";

export function getRawData(): RawData[] {
    return vscode.extensions.all
        .filter(ext => !ext.id.startsWith('vscode.'))
        .map(ext => ({
            id: ext.id,
            name: ext.packageJSON.displayName || ext.id,
            description: ext.packageJSON.description || '未获取',
            version: ext.packageJSON.version || '?',
            iconUri: ext.packageJSON.iconUri|| '',
            categories: ext.packageJSON.categories || ['未获取']
        }));
}


