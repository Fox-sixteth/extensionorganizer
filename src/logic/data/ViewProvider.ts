import * as vscode from 'vscode';
import * as fs from 'fs';
import { getCustomData, saveCustomData } from '../storagemanager'; // 引入你的存储逻辑
import { DEFAULT_DESCRIPTION, VIEW_ID } from '../../interfaces/constant';
import { getOrganizedData } from './dataProvider';

export class ExtensionOrganizerViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = VIEW_ID;
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) {}

    resolveWebviewView(webviewView: vscode.WebviewView) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'media')]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        //处理前端消息
        webviewView.webview.onDidReceiveMessage(async (message) => {
            const configs = getCustomData();
            
            switch (message.command) {
                case 'hideExtension':
                    if (!configs[message.extId]) {
                        configs[message.extId] = {id: message.extId, belong:DEFAULT_DESCRIPTION, isHidden: false };
                    }
                    configs[message.extId].isHidden = true;
                    await saveCustomData(configs);
                    this.updateWebview(); 

                    break;

                case 'unhideExtension':
                    if (configs[message.extId]) {
                        configs[message.extId].isHidden = false;
                        await saveCustomData(configs);
                        this.updateWebview();
                    }
                    break;

                case 'openExtension':
                    vscode.commands.executeCommand('extension.open', message.extId);
                    break;
            }
        });

        this.updateWebview();
    }

    // 发送数据给前端
    public updateWebview() {
        if (!this._view) {return;}

        const finalData = getOrganizedData(); 

        this._view.webview.postMessage({
            command: 'render',
            data: finalData
        });
    }

//HTML初始化
    private _getHtmlForWebview(webview: vscode.Webview): string {
        const htmlPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'index.html');
        let html = fs.readFileSync(htmlPath.fsPath, 'utf8');

        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'style.css'));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));

        html = html.replace('{{styleUri}}', styleUri.toString());
        html = html.replace('{{scriptUri}}', scriptUri.toString());

        // 注入 CSP 安全策略
        const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource}; script-src ${webview.cspSource};">`;
        html = html.replace('<head>', `<head>\n${csp}`);

        return html;
    }
}