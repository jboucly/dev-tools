import { ConsoleMessageEvent } from 'electron';
import * as TabGroup from 'electron-tabs';
import { Tab } from 'electron-tabs';
import { isNil } from 'lodash';

class Tabs {
    public tabGroup: TabGroup;

    private viewElement = document.getElementById('views');
    private loadingElement = document.getElementById('spinner');

    constructor() {
        this.initTabs();
        this.setErrorLoadingEvent(this.tabGroup.getTabs());
        this.setWebviewEventConsole(this.tabGroup.getTabs());
        this.setLogicOnNewTab();
    }

    /**
     * @description Init dev tabs
     */
    public initTabs(): void {
        this.tabGroup = new TabGroup({
            newTab: {
                active: true,
                visible: true,
                title: 'New page',
            },
        });

        this.tabGroup.addTab({
            active: true,
            visible: true,
            closable: false,
            title: 'Swaggger',
            iconURL: 'src/assets/icons/swagger.png',
            src: 'http://localhost:3000',
        });

        this.tabGroup.addTab({
            title: 'BDD',
            closable: false,
            iconURL: 'src/assets/icons/bdd.png',
            src: 'http://localhost:3500',
        });
    }

    /**
     * @description Set error loading page
     */
    public setErrorLoadingEvent(tabs: Tab[]): void {
        tabs.forEach((tab: Tab) => {
            tab.webview.addEventListener('did-fail-load', () => {
                this.viewElement.style.display = 'block';
                this.loadingElement.style.display = 'none';

                tab.webview.loadURL(`file://${__dirname}/src/views/error-loading.html`);
            });
        });
    }

    /**
     * @description Set event console-message on all tabs
     */
    private setWebviewEventConsole(tabs: Tab[]): void {
        tabs.forEach((tab: Tab) => {
            tab.webview.addEventListener('console-message', (e: ConsoleMessageEvent) => {
                console.info(`Webview ${tab.getTitle()} :`);
                switch (e.level) {
                    case 0:
                        console.log(e.message);
                        break;
                    case 1:
                        console.info(e.message);
                        break;
                    case 2:
                        console.warn(e.message);
                        break;
                    case 3:
                        console.error(e.message);
                        break;
                }
            });
        });
    }

    private setLogicOnNewTab(): void {
        this.tabGroup.on('tab-added', (tab: Tab, tabGroup: TabGroup) => {
            let isLoaded = false;
            let titleIsSet = false;

            this.viewElement.style.display = 'none';
            this.loadingElement.style.display = 'block';

            this.setErrorLoadingEvent([tab]);
            this.setWebviewEventConsole([tab]);

            tab.webview.addEventListener('did-stop-loading', () => {
                const title = tab.webview.getTitle();
                if (!isNil(title) && title !== 'undefined' && !titleIsSet) tab.setTitle(title);

                if (!isLoaded) {
                    this.viewElement.style.display = 'block';
                    this.loadingElement.style.display = 'none';

                    tab.webview.loadURL(`file://${__dirname}/src/views/new-tab.html`);

                    isLoaded = true;
                }
            });
        });
    }
}

new Tabs();
