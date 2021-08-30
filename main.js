
const electron = require('electron');
const app = electron.app;

app.on('ready', function () {
    const mainWindow = new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadFile('index.html');
    mainWindow.on('ready-to-show', function () {
        mainWindow.show();
        mainWindow.focus();
    });
});
