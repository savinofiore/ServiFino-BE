class User {
    constructor(email, password, displayName,  disabled = false, work = null, isOwner = false, isAvailable = true) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        //this.phoneNumber = phoneNumber;
        //this.photoURL = photoURL;
        this.disabled = disabled;
        //this.assignment = assignment;
        this.work = work;
        this.isOwner = isOwner;
        this.isAvailable = isAvailable;
    }
    // Formatta i dati per Firestore
    toFirestoreObject() {
        return {
            email: this.email,
            displayName: this.displayName,
            disabled: this.disabled,
            work: this.work,
            isOwner : this.isOwner,
            isAvailable: this.isAvailable
        };
    }
}
module.exports = User;