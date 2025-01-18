const {worksSet} = require("../utils/loadWorks");

const validateAddWorker = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const {userId, workId} = req.body;
    if(!userId || !workId) {
        return res.status(400).send({ error: "Required parameter" });
    }
    next();
}

const validateUpdateWorker = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const {userId, workId} = req.body;
    if(!userId || !workId ) {
        return res.status(400).send({ error: "Required parameter" });
    }
    next();
}

module.exports = {validateAddWorker, validateUpdateWorker};