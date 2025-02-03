
function validateReqOwner(req, res) {
    if (req.method !== "POST") {
        res.status(405).send({ error: "Method Not Allowed" });
        return false;
    }

    const { userUid, activityName, activityDescription, activityLocation, activityNumber } = req.body;

    if (!userUid || !activityName || !activityDescription || !activityLocation || !activityNumber) {
        res.status(400).send({ error: "Required parameter missing" });
        return false;
    }
    return true;
}

module.exports = { validateReqOwner };
