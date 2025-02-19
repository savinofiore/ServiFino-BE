class Reservation {
    constructor( user, owner, bookDate, bookStatus, rating = null, message = null) {
        this.owner = owner;
        this.bookDate = bookDate;
        this.bookStatus = bookStatus;
        this.rating = rating;
        this.message = message;
        this.user = user;
    }
    toFirestoreObject() {
        return {
            owner: this.owner,
            user: this.user,
            bookDate: this.bookDate,
            bookStatus: this.bookStatus,
            rating: this.rating,
            message: this.message,
        }
    }
}

module.exports = Reservation;