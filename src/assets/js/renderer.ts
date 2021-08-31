import * as TabGroup from 'electron-tabs';
import { Tab } from 'electron-tabs';

let tabGroup = new TabGroup({
    newTab: {
        active: true,
        visible: true,
        title: 'New page',
    },
});

tabGroup.addTab({
    active: true,
    visible: true,
    closable: false,
    title: 'Swaggger',
    iconURL: 'src/assets/icons/swagger.png',
    src: 'http://localhost:3000',
});

tabGroup.addTab({
    title: 'BDD',
    closable: false,
    iconURL: 'src/assets/icons/bdd.png',
    src: 'http://localhost:3500',
});

tabGroup.on('tab-added', (tab: Tab, tabGroup: TabGroup) => {
    const viewElement = document.getElementById('views');
    const loadingElement = document.getElementById('spinner');

    viewElement.style.display = 'none';
    loadingElement.style.display = 'block';

    tab.webview.src = 'https://google.fr';

    tab.webview.addEventListener('did-finish-load', () => {
        viewElement.style.display = 'block';
        loadingElement.style.display = 'none';
    });

    tab.webview.addEventListener('did-fail-load', () => {
        viewElement.style.display = 'block';
        loadingElement.style.display = 'none';

        tab.webview.loadURL(`file://${__dirname}/src/views/error-loading.html`);
    });
});
