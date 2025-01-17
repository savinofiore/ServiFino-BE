const {getWorksSet} = require("../utils/loadWorks");
const validateAddWorker = (req, res, next) => {
    if (req.method !== "POST") {
        return res.status(405).send({ error: "Method Not Allowed" });
    }
    const {userId, workId} = req.body;
    if(!userId || !workId) {
        return res.status(400).send({ error: "Required parameter" });
    }
    console.log("cda")
    const worksSet = getWorksSet(); // Ottieni il set dei lavori
    console.log("Works: ",worksSet);
    if (!worksSet.has(workId)) {
        return res.status(400).send({ error: `Work ID '${workId}' is not valid` });
    }

    next();
}

module.exports = {validateAddWorker};