class Owner {
    constructor( userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber, activityProvinces) {
        this.userUid = userUid;
        this.activityName = activityName;
        this.activityDescription = activityDescription;
        this.activityLocation = activityLocation;
        this.activityWebsite = activityWebsite;
        this.activityNumber = activityNumber;
        this.activityProvinces = activityProvinces;
    }
    toFirestoreObject() {
        return {
            userUid: this.userUid,
            activityName: this.activityName,
            activityDescription: this.activityDescription,
            activityLocation: this.activityLocation,
            activityWebsite: this.activityWebsite,
            activityNumber: this.activityNumber,
            activityProvinces: this.activityProvinces,
        }
    }
}

module.exports = Owner;