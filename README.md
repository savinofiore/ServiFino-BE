# ServiFino-BE
ServiFino Back-End

## Panoramica Servifino
ServiFino è un servizio per la prenotazione e la gestione di lavoratori specializzati nel campo ristorazione e bar.
Consente di prenotare e richiedere in modo smart e rapido personale. Chiunque può registrarsi e prestare servizio ai 
locali aderenti all'iniziativa.

## Frameworks e tools utilizzati
- Firebase function
- Express
- Node
- Git

## Librerie implementate
- CORS (middleware cors, consente di gestire le richieste in ingresso al server)
- firebase-admin (consente accesso a db firebase)


## Comandi utili
Entrare all'interno della cartella function:
- <b>Lanciare emulatore firebase:</b> npm run serve
- <b>Deploy functions firebase:</b> npm run deploy

## Endpoints
- http://127.0.0.1:5001/servifino/us-central1/api
- Creazione di un utente (POST): /create
- Elenco di tutti gli utenti (GET): /users

### JSON per test Endpoints
#### /create
{
"email": "test1@example.com",
"password": "SecurePassword123",
"displayName": "John Doe",
"phoneNumber": "+391210456987",
"photoURL": "https://example.com/photo.jpg",
"disabled": false
}

## Perché due file index.js?
- functions/index.js è specifico per Firebase, che si occupa di esportare la funzione cloud.
- src/index.js è il cuore della tua applicazione Express, che può essere facilmente testato o spostato su un altro ambiente (ad esempio, un server Node.js puro) senza dipendere da Firebase.
### Vantaggi
- Separation of Concerns: Ogni file ha un compito specifico.
- Testabilità: Puoi testare facilmente l'app Express separatamente.
- Portabilità: Se un giorno vuoi migrare da Firebase Functions a un altro servizio, dovrai solo modificare functions/index.js.
