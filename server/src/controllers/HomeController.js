const data = {}
const homeController = {
    title: "Главная",
    url: '/',
    path: '../views/pages/home',
    content: "Главная",
    navigation: true,
    links: [
        { name: "Главная", href: '/', active: true  },
        { name: "Контакты", href: '/contacts', active: false  },
        { name: "О нас", href: '/about', active: false  }
    ],
    data: data
};

module.exports.index = function (req, res) {
    res.render(homeController.path, homeController);
}