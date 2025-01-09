class User {
    constructor(email, password, displayName, phoneNumber = null, photoURL = null, disabled = false) {
        this.email = email; // Email dell'utente
        this.password = password; // Password dell'utente (necessaria solo alla creazione dell'utente)
        this.displayName = displayName; // Nome visualizzato
        this.phoneNumber = phoneNumber; // Numero di telefono (opzionale)
        this.photoURL = photoURL; // URL della foto del profilo (opzionale)
        this.disabled = disabled; // Stato dell'utente (attivo o disabilitato)
    }

    /**
     * Metodo per convertire la classe in un oggetto compatibile con Firebase Authentication.
     */
    toFirebaseAuthObject() {
        const firebaseUser = {
            email: this.email,
            emailVerified: false, // Imposta come false di default; è possibile attivare la verifica email separatamente
            password: this.password,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
            disabled: this.disabled,
        };

        // Escludere proprietà null o undefined
        Object.keys(firebaseUser).forEach((key) => {
            if (firebaseUser[key] === null || firebaseUser[key] === undefined) {
                delete firebaseUser[key];
            }
        });

        return firebaseUser;
    }
}

module.exports = User;