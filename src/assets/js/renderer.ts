import * as TabGroup from "electron-tabs";
import { Tab } from "electron-tabs";

let tabGroup = new TabGroup({
    newTab: {
        active: true,
        visible: true,
        title: "Nouvelle page",
        src: 'https://google.fr',
    },
});

tabGroup.addTab({
    active: true,
    visible: true,
    closable: false,
    title: "Swaggger",
    iconURL: 'src/assets/icons/swagger.png',
    src: "http://localhost:3000",
});

tabGroup.addTab({
    title: "BDD",
    closable: false,
    iconURL: 'src/assets/icons/bdd.png',
    src: "http://localhost:3500",
});


tabGroup.on("tab-added", (tab: Tab, tabGroup: TabGroup) => {
    console.log(tab);
    console.log(tabGroup);
});
