const admin = require("firebase-admin");

admin.initializeApp();

const {createUser, updateUser} = require("./src/prod/userFunctions");
const {addOrUpdateOwner, getNonOwnerUsers, addReservation, getReservationsSent} = require('./src/prod/ownerFunctions');
const {getReservationsWaitingByUserId, updateReservationStatus} = require("./src/prod/workerFunctions");

const {createUser_stg, updateUser_stg} = require("./src/stg/userFunctions_stg");
const {addOrUpdateOwner_stg, getNonOwnerUsers_stg, addReservation_stg, getReservationsSent_stg} = require('./src/stg/ownerFunctions_stg');
const {getReservationsWaitingByUserId_stg, updateReservationStatus_stg} = require("./src/stg/workerFunctions_stg");

//just for populate the DB
//const {populateUsersStg, populateOwnersStg, populateReservationsStg, populateWorksStg} = require("./src/population/prod_collections");
//const {populateProvinces} = require("./src/population/provinces")


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


//Staging
exports.createUser_stg = createUser_stg;
exports.updateUser_stg = updateUser_stg;
exports.addOrUpdateOwner_stg = addOrUpdateOwner_stg;
exports.getNonOwnerUsers_stg = getNonOwnerUsers_stg;
exports.addReservation_stg = addReservation_stg;
exports.getReservationsSent_stg = getReservationsSent_stg;
exports.getReservationsWaitingByUserId_stg = getReservationsWaitingByUserId_stg;
exports.updateReservationStatus_stg = updateReservationStatus_stg;

//just for populate the DB
//exports.populateProvinces = populateProvinces;

//Populate DB from stg to prod
//exports.populateUsersStg = populateUsersStg;
//exports.populateOwnersStg = populateOwnersStg;
//exports.populateReservationsStg = populateReservationsStg;






