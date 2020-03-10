const funHttp = require('../functions/fnhttp');
const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    let lista = [];
    funHttp.getColeccion('contactos').then((snapshot) => {
        snapshot.forEach((doc) => {
            var contacto = {id:doc.id,data:doc.data()};
            lista.push(contacto);
          });
          res.render('index', {contacts: lista});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });;
    
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    funHttp.getColeccionById('contactos',id).then((snapshot) => {
        var contacto = {id:snapshot.id,data:snapshot.data()};
        res.render('index', {contact: contacto});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

});

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }

    funHttp.pushDocumento('contactos',newContact);
    res.redirect('/');
});

router.post('/modify-contact', (req, res) => {
    let id = req.body.key;

    const modifyContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }

    funHttp.updateDocumento('contactos', id ,modifyContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    let id = req.params.id;
    funHttp.deleteDocumento('contactos', id);
    res.redirect('/');
});

module.exports = router;