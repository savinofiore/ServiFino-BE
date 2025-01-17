class User {
    constructor(email, password, displayName, phoneNumber = null, photoURL = null, disabled = false) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
        this.photoURL = photoURL;
        this.disabled = disabled;
    }

    // Formatta i dati per Firebase Authentication
    toFirebaseAuthObject() {
        return {
            email: this.email,
            password: this.password,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
            disabled: this.disabled,
        };
    }

    // Formatta i dati per Firestore
    toFirestoreObject() {
        return {
            email: this.email,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
            disabled: this.disabled,
        };
    }
}
module.exports = User;