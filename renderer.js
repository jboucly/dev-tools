const TabGroup = require("electron-tabs");
const path = require('path');

let tabGroup = new TabGroup({
    newTab: {
        title: "Nouvelle page",
        src: 'https://google.fr'
    },
});

tabGroup.addTab({
    active: true,
    visible: true,
    closable: false,
    title: "Swaggger",
    iconURL: 'icons/swagger.png',
    src: "http://localhost:3000",
});

tabGroup.addTab({
    title: "BDD",
    closable: false,
    iconURL: 'icons/bdd.png',
    src: "http://localhost:3500",
});
