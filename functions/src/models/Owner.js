class Owner {
    constructor( userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber) {
        this.userUid = userUid;
        this.activityName = activityName;
        this.activityDescription = activityDescription;
        this.activityLocation = activityLocation;
        this.activityWebsite = activityWebsite;
        this.activityNumber = activityNumber;
    }
    toFirestoreObject() {
        return {
            userUid: this.userUid,
            activityName: this.activityName,
            activityDescription: this.activityDescription,
            activityLocation: this.activityLocation,
            activityWebsite: this.activityWebsite,
            activityNumber: this.activityNumber,
        }
    }
}

module.exports = Owner;