const admin = require('firebase-admin')

var serviceAccount = require("../../node-firebase-ejemplo-3c46d-firebase-adminsdk-ykipa-1ff3d61237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-ejemplo-3c46d.firebaseio.com/',

});

const db = admin.database();
const dbf = admin.firestore();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
     let lista = [];

     dbf.collection('contactos').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            var contacto = {id:doc.id,data:doc.data()};
            lista.push(contacto);
          });
          res.render('index', {contacts: lista});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
});

router.get('/:id', (req, res) => {
    /*db.ref('contacts/' + req.params.id).on('value', (snapshot) => {
        data = snapshot.val();
        res.render('index', {contact: data , key: snapshot.key});
     });*/

     let id = req.params.id;

     dbf.collection('contactos').doc(id).get()
    .then((snapshot) => {
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
    dbf.collection('contactos').add(newContact);
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

    dbf.collection('contactos').doc(id).update(modifyContact);
    res.redirect('/');
});

router.get('/delete-contact/:id', (req, res) => {
    let id = req.params.id;
    dbf.collection('contactos').doc(id).delete();
    res.redirect('/');
});

module.exports = router;