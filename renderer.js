const TabGroup = require("electron-tabs");

let tabGroup = new TabGroup({
    newTab: {
        title: "Nouvelle page",
        src: 'https://google.fr'
    },
});

tabGroup.addTab({
    title: "Swaggger",
    src: "http://localhost:3000",
    closable: false,
    visible: true,
    active: true,
});

tabGroup.addTab({
    title: "BDD",
    closable: false,
    src: "http://localhost:3500",
});
