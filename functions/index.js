const admin = require("firebase-admin");

admin.initializeApp();

const {createUser, updateUser} = require("./src/userFunctions");
const {addOrUpdateOwner, getNonOwnerUsers, addReservation, getReservationsSent} = require('./src/ownerFunctions');
const {getReservationsWaitingByUserId, updateReservationStatus} = require("./src/workerFunctions");

//Users
exports.createUser = createUser;
exports.updateUser = updateUser;

//Owner
exports.addOrUpdateOwner = addOrUpdateOwner;
exports.getNonOwnerUsers = getNonOwnerUsers;
exports.addReservation = addReservation;
exports.getReservationsSent = getReservationsSent;
// aggiungere funzioni per modificare e cancellare le prenotazioni

//Worker
exports.getReservationsWaitingByUserId = getReservationsWaitingByUserId;
exports.updateReservationStatus = updateReservationStatus;
