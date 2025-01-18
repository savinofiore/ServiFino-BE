
const validateAddOwner = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const { userUid, activityName, activityDescription, activityLocation, activityWebsite, activityNumber } = req.body;
    if( !userUid || !activityName || !activityDescription || !activityLocation || !activityNumber ) {
        return res.status(400).send({ error: "Required parameter" });
    }
    next();
}


module.exports = { validateAddOwner}