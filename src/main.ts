import { app, BrowserWindow, Menu, MenuItem } from 'electron';

export class Main {
    public mainWindow: BrowserWindow;

    constructor() {
        this.createMainWindows();
        // this.setMenu();
    }

    public createMainWindows(): void {
        app.on('ready', () => {
            this.mainWindow = new BrowserWindow({
                width: 1280,
                height: 720,
                webPreferences: {
                    nodeIntegration: true,
                    webviewTag: true,
                    contextIsolation: false,
                },
            });

            this.mainWindow.loadFile('index.html');
            this.mainWindow.on('ready-to-show', () => {
                this.mainWindow.show();
                this.mainWindow.focus();

                // this.mainWindow.webContents.openDevTools();
            });
        });
    }

    public setMenu(): void {
        const menu = Menu.buildFromTemplate([
            new MenuItem({
                label: 'Dev Tools',
                submenu: [
                    {
                        label: 'Show console',
                        role: 'toggleDevTools',
                        accelerator: process.platform === 'darwin' ? 'Cmd+Shift+D' : 'ctrl+Shift+D',
                    },
                    {
                        label: 'Reload app',
                        role: 'reload',
                        accelerator: process.platform === 'darwin' ? 'Cmd+r' : 'ctrl+r',
                    },
                    { type: 'separator' },
                    {
                        label: 'Exit',
                        click: () => app.quit(),
                        accelerator: process.platform === 'darwin' ? 'Cmd+q' : 'ctrl+q',
                    },
                ],
            }),
        ]);

        Menu.setApplicationMenu(menu);
    }
}

new Main();
