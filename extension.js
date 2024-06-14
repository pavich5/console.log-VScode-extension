const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "pavic" is now active!');

    let disposable = vscode.commands.registerCommand('pavic.transformPavic', function () {
        transformPavic();
    });

    context.subscriptions.push(disposable);

    vscode.workspace.onDidChangeTextDocument(event => {
        transformPavic();
    });

    transformPavic();
}

function transformPavic() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    const document = editor.document;
    const regex = /\bpavic\(\s*\)/g;

    editor.edit(editBuilder => {
        let match;
        while ((match = regex.exec(document.getText())) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            editBuilder.replace(range, 'console.log("pavic", )');

            const newPosition = startPos.translate(0, 11);
            editor.selection = new vscode.Selection(newPosition, newPosition);
        }
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
