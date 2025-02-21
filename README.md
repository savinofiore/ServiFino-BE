# Nome del Progetto - Backend

Questo backend è sviluppato con **Firebase Functions** e gestisce la logica per la creazione e gestione di utenti, prenotazioni e ruoli (Owner/Worker).

---

## Sommario

- [Struttura del Progetto](#struttura-del-progetto)
- [Funzionalità Principali](#funzionalità-principali)
    - [Users](#users)
    - [Owner](#owner)
    - [Worker](#worker)

---

## Struttura del Progetto

La cartella principale contiene i file di configurazione di Firebase e il codice delle **Cloud Functions** all’interno di `src/`.

```bash
.
├── firebase.json           # Configurazioni per Firebase
├── .firebaserc             # File di configurazione del progetto Firebase
├── firestore.indexes.json  # Indici Firestore (se configurati)
├── firestore.rules         # Regole di sicurezza Firestore
├── package.json            # Dipendenze e script di progetto
├── src/
│   ├── models/
│   │   ├── Owner.js
│   │   ├── Reservation.js
│   │   ├── ReservationStatus.js
│   │   ├── User.js
│   │   ├── ownerFunctions.js
│   │   ├── userFunctions.js
│   │   └── workerFunctions.js
│   ├── index.js            # Punto di ingresso delle funzioni
│   └── ...
├── README.md               # Questo file
└── ...
```

### Cartelle Principali

- **models/**  
  Contiene i file JavaScript che definiscono le entità (Owner, User, Reservation) e le funzioni principali per gestirle.
    - `Owner.js`, `Reservation.js`, `ReservationStatus.js`, `User.js`: definiscono la struttura e i metodi dei vari modelli.
    - `ownerFunctions.js`, `userFunctions.js`, `workerFunctions.js`: raggruppano le funzioni principali di **Owner**, **User** e **Worker**.

- **index.js**  
  Qui vengono importate e inizializzate tutte le funzioni che verranno esposte come **Firebase Functions**.

---

## Funzionalità Principali

Di seguito un elenco sintetico delle funzioni principali esposte dal backend:

### Users

```js
// In userFunctions.js
exports.createUser = createUser;
exports.updateUser = updateUser;
```

- **createUser**: Crea un nuovo utente nel database.
- **updateUser**: Aggiorna i dati di un utente esistente.

### Owner

```js
// In ownerFunctions.js
exports.addOrUpdateOwner = addOrUpdateOwner;
exports.getNonOwnerUsers = getNonOwnerUsers;
exports.addReservation = addReservation;
exports.getReservationsSent = getReservationsSent;
// (Previsto: funzioni per modificare e cancellare prenotazioni)
```

- **addOrUpdateOwner**: Crea o aggiorna le informazioni di un Owner.
- **getNonOwnerUsers**: Restituisce la lista degli utenti che non sono Owner (ovvero i Worker).
- **addReservation**: Permette di aggiungere una nuova prenotazione.
- **getReservationsSent**: Restituisce la lista di prenotazioni inviate (o gestite) dall’Owner.
- *(In arrivo)* Funzioni per modificare o cancellare prenotazioni esistenti.

### Worker

```js
// In workerFunctions.js
exports.getReservationsWaitingByUserId = getReservationsWaitingByUserId;
exports.updateReservationStatus = updateReservationStatus;
```

- **getReservationsWaitingByUserId**: Restituisce la lista delle prenotazioni in stato “waiting” per uno specifico Worker.
- **updateReservationStatus**: Aggiorna lo stato di una prenotazione (ad esempio, accettata, rifiutata, completata).

---

