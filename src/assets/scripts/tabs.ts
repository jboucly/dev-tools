import * as TabGroup from 'electron-tabs';
import { Tab } from 'electron-tabs';

class Tabs {
    public tabGroup: TabGroup;

    private viewElement = document.getElementById('views');
    private loadingElement = document.getElementById('spinner');

    constructor() {
        this.initTabs();
        this.setErrorLoadingEvent(this.tabGroup.getTabs());
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

    private setLogicOnNewTab(): void {
        this.tabGroup.on('tab-added', (tab: Tab, tabGroup: TabGroup) => {
            this.viewElement.style.display = 'none';
            this.loadingElement.style.display = 'block';

            tab.webview.src = 'https://google.fr';

            tab.webview.addEventListener('did-finish-load', () => {
                this.viewElement.style.display = 'block';
                this.loadingElement.style.display = 'none';
            });

            tab.webview.addEventListener('did-fail-load', () => {
                this.viewElement.style.display = 'block';
                this.loadingElement.style.display = 'none';

                tab.webview.loadURL(`file://${__dirname}/src/views/error-loading.html`);
            });
        });

    }

}

new Tabs();
