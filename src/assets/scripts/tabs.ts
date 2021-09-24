import { ConsoleMessageEvent } from 'electron';
import * as TabGroup from 'electron-tabs';
import { Tab } from 'electron-tabs';
import { isNil } from 'lodash';

class Tabs {
    public tabGroup: TabGroup;

    private goBackBtn = document.getElementById('goBack');
    private reloadBtn = document.getElementById('reload');
    private viewElement = document.getElementById('views');
    private loadingElement = document.getElementById('spinner');

    constructor() {
        this.initTabs();
        this.setErrorLoadingEvent(this.tabGroup.getTabs());
        this.setWebviewEventConsole(this.tabGroup.getTabs());
        this.setLogicOnNewTab();
        this.setLogicForGoBackBtn();
        this.setLogicForReloadBtn();
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
                src: `file://${__dirname}/src/views/new-tab.html`,
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
            tab.webview.addEventListener('did-fail-load', (event) => {
                console.log(event);

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

            tab.webview.addEventListener('dom-ready', () => {
                const title = tab.webview.getTitle();
                if (!isNil(title) && title !== 'undefined' && !titleIsSet) tab.setTitle(title);

                if (!isLoaded) {
                    this.viewElement.style.display = 'block';
                    this.loadingElement.style.display = 'none';
                    isLoaded = true;
                }
            });
        });
    }

    private setLogicForGoBackBtn(): void {
        this.goBackBtn.addEventListener('click', () => {
            const activeWebview = this.tabGroup.getActiveTab().webview;

            console.info('Can go back :', activeWebview.canGoBack());

            if (activeWebview.canGoBack()) {
                activeWebview.goBack();
            }
        });
    }

    private setLogicForReloadBtn(): void {
        this.reloadBtn.addEventListener('click', () => {
            const activeWebview = this.tabGroup.getActiveTab().webview;
            activeWebview.reload();
        });
    }
}

new Tabs();
