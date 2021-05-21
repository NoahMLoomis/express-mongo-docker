const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const connection = 'mongodb://mongo:27017/group'

const port = 4000;

const app = express();
const WEBROOT = path.join(__dirname, "src");

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const Person = mongoose.model("Person", new mongoose.Schema({
    fName: {
        type: String
    },
    lName: {
        type: String
    }
}));

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.get("/create", (req, res) => {
    res.sendFile("create.html", {root: WEBROOT}, (err) => {
        (err) ? console.log(err) : console.log("Send create.html");
    });
})

app.post("/create", async (req, res) => {
    const firstName = req.body.fName ?? "Jim";
    const lastName = req.body.lName ?? "Bean";

    const newPerson = new Person({ fName: firstName, lName: lastName });
    await newPerson.save()
        .then(() => console.log("New Person created"));

    res.send("Person Created");
});

app.get('/view', async (req, res) => {
    await Person.find({}, (err, data) => (err) ? res.send(err) : res.send(data));
    
    // res.sendFile('view.html');
})

app.listen(port, () => {
    console.log("listening on port " + port);
})

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo connected!!!");
});