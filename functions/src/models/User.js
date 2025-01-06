class User {
    constructor(email, password, displayName, phoneNumber = null) {

        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.phoneNumber = phoneNumber;
    }

    toFirebaseAuthObject() {
        return {

            email: this.email,
            password: this.password,
            displayName: this.displayName,
            phoneNumber: this.phoneNumber,
        };
    }
}

module.exports = User;
