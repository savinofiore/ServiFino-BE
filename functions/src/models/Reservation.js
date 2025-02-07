class Reservation {
    constructor( workerId, owner, bookDate, bookStatus, rating = null) {
        this.workerId = workerId;
        this.owner = owner;
        this.bookDate = bookDate;
        this.bookStatus = bookStatus;
        this.rating = rating;
    }
    toFirestoreObject() {
        return {
            workerId: this.workerId,
            owner: this.owner,
            bookDate: this.bookDate,
            bookStatus: this.bookStatus,
            rating: this.rating,
        }
    }
}

module.exports = Reservation;