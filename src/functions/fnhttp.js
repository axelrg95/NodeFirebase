const admin = require('firebase-admin');
const variables = require('../environment/dev');

var serviceAccount = require("../../node-firebase-ejemplo-3c46d-firebase-adminsdk-ykipa-1ff3d61237.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: variables.databaseURL,

});

const dbf = admin.firestore();

function getColeccion(coleccion) {
    return new Promise(function(resolve, reject) {
        resolve(dbf.collection(coleccion).get());
    });    
  }

function getColeccionById(coleccion ,id){
    return new Promise(function(resolve, reject) {
        resolve(dbf.collection(coleccion).doc(id).get());
    });
  }

  function pushDocumento(coleccion ,dato) {
    try {
      dbf.collection(coleccion).add(dato);
    }
    catch(error) {
      console.error(error);
    }
  }

  function updateDocumento(coleccion, id ,newdato) {
    try {
      dbf.collection(coleccion).doc(id).update(newdato);
    }
    catch(error) {
      console.error(error);
    }
  }

  function deleteDocumento(coleccion, id) {
    try {
      dbf.collection(coleccion).doc(id).delete();
    }
    catch(error) {
      console.error(error);
    }
  }

  exports.getColeccion = getColeccion;
  exports.getColeccionById = getColeccionById;
  exports.pushDocumento = pushDocumento;
  exports.updateDocumento = updateDocumento;
  exports.deleteDocumento = deleteDocumento;