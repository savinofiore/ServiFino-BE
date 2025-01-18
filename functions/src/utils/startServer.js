// Funzione per caricare i lavori e avviare il server solo dopo

const {loadWorks} = require("./loadWorks");

 function startServer(admin) {
    try {
        // Carica il set di lavori
         loadWorks(admin);
    } catch (error) {
        console.error("Error loading works set:", error);
        process.exit(1); // Termina l'esecuzione del server in caso di errore
    }
}
module.exports = startServer;