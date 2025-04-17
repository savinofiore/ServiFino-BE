/*const admin = require("firebase-admin");
const v2 = require('firebase-functions/v2');
const cors = require("cors")({ origin: true });


const provinces = [
    { code: "AG", name: "Agrigento" },
    { code: "AL", name: "Alessandria" },
    { code: "AN", name: "Ancona" },
    { code: "AO", name: "Aosta" },
    { code: "AR", name: "Arezzo" },
    { code: "AP", name: "Ascoli Piceno" },
    { code: "AT", name: "Asti" },
    { code: "AV", name: "Avellino" },
    { code: "BA", name: "Bari" },
    { code: "BT", name: "Barletta-Andria-Trani" },
    { code: "BL", name: "Belluno" },
    { code: "BN", name: "Benevento" },
    { code: "BG", name: "Bergamo" },
    { code: "BI", name: "Biella" },
    { code: "BO", name: "Bologna" },
    { code: "BZ", name: "Bolzano" },
    { code: "BS", name: "Brescia" },
    { code: "BR", name: "Brindisi" },
    { code: "CA", name: "Cagliari" },
    { code: "CL", name: "Caltanissetta" },
    { code: "CB", name: "Campobasso" },
    { code: "CI", name: "Carbonia-Iglesias" },
    { code: "CE", name: "Caserta" },
    { code: "CT", name: "Catania" },
    { code: "CZ", name: "Catanzaro" },
    { code: "CH", name: "Chieti" },
    { code: "CO", name: "Como" },
    { code: "CS", name: "Cosenza" },
    { code: "CR", name: "Cremona" },
    { code: "KR", name: "Crotone" },
    { code: "CN", name: "Cuneo" },
    { code: "EN", name: "Enna" },
    { code: "FM", name: "Fermo" },
    { code: "FE", name: "Ferrara" },
    { code: "FI", name: "Firenze" },
    { code: "FG", name: "Foggia" },
    { code: "FC", name: "Forlì-Cesena" },
    { code: "FR", name: "Frosinone" },
    { code: "GE", name: "Genova" },
    { code: "GO", name: "Gorizia" },
    { code: "GR", name: "Grosseto" },
    { code: "IM", name: "Imperia" },
    { code: "IS", name: "Isernia" },
    { code: "AQ", name: "L'Aquila" },
    { code: "SP", name: "La Spezia" },
    { code: "LT", name: "Latina" },
    { code: "LE", name: "Lecce" },
    { code: "LC", name: "Lecco" },
    { code: "LI", name: "Livorno" },
    { code: "LO", name: "Lodi" },
    { code: "LU", name: "Lucca" },
    { code: "MC", name: "Macerata" },
    { code: "MN", name: "Mantova" },
    { code: "MS", name: "Massa-Carrara" },
    { code: "MT", name: "Matera" },
    { code: "ME", name: "Messina" },
    { code: "MI", name: "Milano" },
    { code: "MO", name: "Modena" },
    { code: "MB", name: "Monza e della Brianza" },
    { code: "NA", name: "Napoli" },
    { code: "NO", name: "Novara" },
    { code: "NU", name: "Nuoro" },
    { code: "OR", name: "Oristano" },
    { code: "PD", name: "Padova" },
    { code: "PA", name: "Palermo" },
    { code: "PR", name: "Parma" },
    { code: "PV", name: "Pavia" },
    { code: "PG", name: "Perugia" },
    { code: "PU", name: "Pesaro e Urbino" },
    { code: "PE", name: "Pescara" },
    { code: "PC", name: "Piacenza" },
    { code: "PI", name: "Pisa" },
    { code: "PT", name: "Pistoia" },
    { code: "PN", name: "Pordenone" },
    { code: "PZ", name: "Potenza" },
    { code: "PO", name: "Prato" },
    { code: "RG", name: "Ragusa" },
    { code: "RA", name: "Ravenna" },
    { code: "RC", name: "Reggio Calabria" },
    { code: "RE", name: "Reggio Emilia" },
    { code: "RI", name: "Rieti" },
    { code: "RN", name: "Rimini" },
    { code: "RM", name: "Roma" },
    { code: "RO", name: "Rovigo" },
    { code: "SA", name: "Salerno" },
    { code: "SS", name: "Sassari" },
    { code: "SV", name: "Savona" },
    { code: "SI", name: "Siena" },
    { code: "SR", name: "Siracusa" },
    { code: "SO", name: "Sondrio" },
    { code: "TA", name: "Taranto" },
    { code: "TE", name: "Teramo" },
    { code: "TR", name: "Terni" },
    { code: "TO", name: "Torino" },
    { code: "TP", name: "Trapani" },
    { code: "TN", name: "Trento" },
    { code: "TV", name: "Treviso" },
    { code: "TS", name: "Trieste" },
    { code: "UD", name: "Udine" },
    { code: "VA", name: "Varese" },
    { code: "VE", name: "Venezia" },
    { code: "VB", name: "Verbano-Cusio-Ossola" },
    { code: "VC", name: "Vercelli" },
    { code: "VR", name: "Verona" },
    { code: "VV", name: "Vibo Valentia" },
    { code: "VI", name: "Vicenza" },
    { code: "VT", name: "Viterbo" }
];


const populateProvinces = v2.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            console.log('Inizio popolamento province...');

            const batch = admin.firestore().batch();
            const provincesRef = admin.firestore().collection('provinces');

            provinces.forEach(prov => {
                const docRef = provincesRef.doc(prov.code);
                batch.set(docRef, { name: prov.name });
            });

            await batch.commit();

            console.log('Province inserite con successo!');
            return res.status(201).send({
                data: {
                    message: "Province populate successfully",
                    total: provinces.length,
                }
            });

        } catch (e) {
            console.error("Errore durante il popolamento delle province:", e);
            return res.status(500).send({ message: e.message });
        }
    });
});

module.exports = {populateProvinces};*/