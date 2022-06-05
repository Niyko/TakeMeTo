const vscode = require('vscode');

function activate(context){
	context.subscriptions.push(
		vscode.commands.registerCommand('takemeto.dropToGoogle', function (){
			vscode.env.clipboard.readText().then((clipboardContent) => {
				let searchKeyword = getSearchKeyWord(clipboardContent);
				openBrowser(`https://www.google.com/search?q=${searchKeyword}`);
			});
		})
	);
}

function getSearchKeyWord(clipboardContent){
	let searchKeyword = clipboardContent;
	let activeEditor = vscode.window.activeTextEditor;
	let selection = activeEditor.selection;
	let selectionText = activeEditor.document.getText(selection);
	if(selectionText!="") searchKeyword = selectionText;
	return searchKeyword;
}

function openBrowser(url){
	vscode.env.openExternal(vscode.Uri.parse(url));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
