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
    visible: true,
    active: true,
});

tabGroup.addTab({
    title: "BDD",
    src: "http://localhost:3500",
});
