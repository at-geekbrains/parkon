const data = {
    name: 'ParkOn Project',
    email: 'info@parkon.com',
    phone: '+7-777-7777777',
    address: 'RK, Nur-Sultan, Silent street 20, 20'
}
const aboutController = {
    title: "О нас",
    url: '/about',
    path: '../views/pages/about',
    content: "О нас",
    navigation: true,
    links: [
        { name: "Главная", href: '/', active: false  },
        { name: "Контакты", href: '/contacts', active: false  },
        { name: "О нас", href: '/about', active: true  }
    ],
    data: data,
};

module.exports.index = function (req, res) {
    res.render(aboutController.path, aboutController);
}