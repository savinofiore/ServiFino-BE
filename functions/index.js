
const admin = require("firebase-admin");

admin.initializeApp();

// Importa le funzioni degli user
const { createUser, deleteUser, updateUser, getUsers } = require("./src/userFunctions");
// Importa le funzioni dei worker
const { updateWorker } = require('./src/workerFunctions');
// Importa le funzioni degli owner
const { addOwner, updateOwner, addOrUpdateOwner} = require('./src/ownerFunctions');

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getUsers = getUsers;
//exports.loginUser = loginUser;

exports.updateWorker = updateWorker;

exports.addOrUpdateOwner = addOrUpdateOwner;
