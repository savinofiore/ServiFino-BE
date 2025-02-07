const admin = require("firebase-admin");

admin.initializeApp();

// Importa le funzioni degli user
const { createUser, updateUser} = require("./src/userFunctions");
// Importa le funzioni degli owner
const {addOrUpdateOwner, getNonOwnerUsers, addReservation} = require('./src/ownerFunctions');

//Users
exports.createUser = createUser;
exports.updateUser = updateUser;

//Owner
exports.addOrUpdateOwner = addOrUpdateOwner;
exports.getNonOwnerUsers = getNonOwnerUsers;
exports.addReservation = addReservation;
