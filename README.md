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
http://127.0.0.1:5001/servifino/us-central1/api
- Elenco di tutti gli utenti (GET): /users
- Creazione di un utente (POST): /users/create
- Eliminazione di un utente (POST): /users/delete
- Modifica dati di un utente (POST); /users/update
- Elenco di tutti i lavoratori (GET): /workers

### JSON per test Endpoints /users
#### /create
{
"email": "test1@example.com",
"password": "SecurePassword123",
"displayName": "John Doe",
"phoneNumber": "+391210456987",
"photoURL": "https://example.com/photo.jpg",
"disabled": false
}
#### /delete
{
"password": "SecurePassword123",
"confirmedPassword": "SecurePassword123",
"user": {
"uid": "iX7DGh3MGzVTyrFsohyVKR2fpMX2",
"email": "test1@example.com",
"displayName": "John Doe",
"phoneNumber": "+391210456987",
"photoURL": "https://example.com/photo.jpg",
"disabled": false
}
}
#### /update
{
"displayName": "Mario Red",
"phoneNumber": "+391210456985",
"user": {
"uid": "Iep0RXaticesACla6JEGRqyQU6f1",
"email": "test1@example.com",
"displayName": "John Doe",
"phoneNumber": "+391210456987",
"photoURL": "https://example.com/photo.jpg",
"disabled": false
}
}

### JSON per test Endpoints /workers
#### /add
{
"userId": "6uuNxHOOtXhAqFflEDPOdpc1PhH2",
"workId": "barman",
"available": true
}
#### /update
{
"userId": "6uuNxHOOtXhAqFflEDPOdpc1PhH2",
"workId": "barman",
"available": false
}

### JSON per test Endpoints /owners
#### /add
{
"userUid": "6uuNxHOOtXhAqFflEDPOdpc1PhH2",
"activityName": "activityName",
"activityDescription": "activityDescription,",
"activityLocation": "activityLocation",
"activityWebsite": "activityWebsite",
"activityNumber": "activityNumber"
}
#### /update
{
"userUid": "6uuNxHOOtXhAqFflEDPOdpc1PhH2",
"activityName": "test",
"activityDescription": "activityDescription,",
"activityLocation": "activityLocation",
"activityWebsite": "activityWebsite",
"activityNumber": "activityNumber"
}

## Perché due file index.js?
- functions/index.js è specifico per Firebase, che si occupa di esportare la funzione cloud.
- src/index.js è il cuore della tua applicazione Express, che può essere facilmente testato o spostato su un altro ambiente (ad esempio, un server Node.js puro) senza dipendere da Firebase.
### Vantaggi
- Separation of Concerns: Ogni file ha un compito specifico.
- Testabilità: Puoi testare facilmente l'app Express separatamente.
- Portabilità: Se un giorno vuoi migrare da Firebase Functions a un altro servizio, dovrai solo modificare functions/index.js.

## Trasformazione progetto
Ho deciso di rimuovere express e usare le fuction di firebase, per una migliore implementazione con flutter nativo.
