# ServiFino-BE
## Implementazioni future
- <s>aggiungere creazione user su db</s>
- aggiungere token per le richieste in ingresso e in uscita?
- aggiungere tutte le funzionalità degli utenti
- categorizzare gli utenti, se come lavoratori o come locali

## Collections previste
- users: conterrà tutti gli utenti registrati alla piattaforma 
- spots: conterrà tutti i locali o i servizi registrati dagli utenti. Un utente può registrare uno spot per richiedere prestazioni presso il suo spot. Distinzione tra locale e agenzia, in futuro.
- careers: conterrà le carriere degli utenti e le loro valutazioni. Ogni carriera avrà l'id dell'utente e conterrà lo storico con le valutazioni per gli spot.
- workers: utenti disponibili ad essere chiamati (prevedere flag). Gli utenti dovranno configurare il loro profilo come workers.
- owners: utenti proprietari dei locali o servizi (prevedere flag).

## Interazioni
