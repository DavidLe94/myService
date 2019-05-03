"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Get a database reference to our blog
const db = admin.database();
const ref = db.ref("users");
//add new Objects
exports.create_user = functions.https.onRequest((req, res) => {
    var key = ref.push().key;
    return ref.child(key).set({
        user_name: req.body.username,
        status: req.body.status,
        key: key
    }).then(function () {
        res.status(200).send("Add new user success!");
    }).catch(function (error) {
        res.status(400).send("Can't add new user!");
    });
});
//read all data users
exports.read_all_user = functions.https.onRequest((req, res) => {
    const notes = [];
    return ref.once("value", (snapshot) => {
        snapshot.forEach((snap) => {
            notes.push({
                username: snap.val().user_name,
                status: snap.val().status,
                key: snap.val().key
            });
            return false;
        });
        res.status(200).send(notes);
    }).catch(function (error) {
        res.status(400).send("Error");
    });
});
//update data
exports.update_item = functions.https.onRequest((req, res) => {
    return ref.child(req.body.key).update({
        status: req.body.status
    }).then(function () {
        res.status(200).send("Update user success!");
    }).catch(function (error) {
        res.status(400).send("Can't update user!");
    });
});
//detele item
exports.delete_item = functions.https.onRequest((req, res) => {
    return ref.child(req.body.key).remove().then(function () {
        res.status(200).send("Delete user success!");
    }).catch(function (error) {
        res.status(400).send("Can't delete user!");
    });
});
//# sourceMappingURL=index.js.map