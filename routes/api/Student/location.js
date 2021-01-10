const Route = require("express").Router();
const Firebase = require("firebase-admin");
const google = require("../../../google.json");

//This Initializes firebase
Firebase.initializeApp({
    credential: Firebase.credential.cert(google),
    databaseURL: "https://shuttle-app-5926a.firebaseio.com/",
});

Route.get("/", async function (req, res) {
    const { latitude, longitude } = req.query;

    sendLocation(latitude, longitude);

    res.status(200).send("location sent to firebase");
});

// This function sends data to the firebase realtime database
const sendLocation = (lat, lon) => {
    Firebase.database().ref("Shuttle_Location").set({
        latitude: lat,
        longitude: lon,
    });

    console.log("sent");
};
module.exports = Route;
