// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExtensionOrganizerViewProvider } from './logic/data/ViewProvider';
import { VIEW_ID } from './interfaces/constant';
import { initStorage } from './logic/storagemanager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

/*
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extensionorganizer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from ExtensionOrganizer!');
	});

	context.subscriptions.push(disposable);
	*/
	initStorage(context);
	context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(VIEW_ID, 
            new ExtensionOrganizerViewProvider(context.extensionUri))
    );
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
