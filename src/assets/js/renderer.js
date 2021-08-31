const TabGroup = require("electron-tabs");

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
