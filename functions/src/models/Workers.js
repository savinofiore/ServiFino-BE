class Worker {
    constructor(userId, workId, available = true) {
        this.userId = userId; // ID dell'utente
        this.workId = workId; // ID del lavoro
        this.available = available; // Disponibilità (true/false)
    }
}

module.exports = Worker;