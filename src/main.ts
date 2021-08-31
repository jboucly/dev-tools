import { app, BrowserWindow } from "electron";

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('ready-to-show',  () => {
        mainWindow.show();
        mainWindow.focus();
    });
});
