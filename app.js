const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const url = "mongodb+srv://shihor:N1rSh1hor@cluster0.2h9o9.mongodb.net/UIF4?retryWrites=true&w=majority";
app.set("view engine", "ejs");

const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    firstName: String,
    secondName: String,
    email: String
});

const Detail = mongoose.model("Detail", detailSchema);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get("/", function (req, res) {
            var today = new Date();
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var day = today.toLocaleDateString("en-GB", options);
            res.render("list", { kindOfDay: day});

    });

    app.post("/UIF4", function (req, res) {
        var nameOne = req.body.firstName;
        var nameTwo = req.body.secondName;
        var emailOne = req.body.email;

        const detail = new Detail({
            firstName: nameOne,
            secondName: nameTwo,
            email: emailOne
        });

        detail.save();

        res.redirect("/");
    });

        let port = process.env.PORT;
        if (port == null || ""){
            port = 3000;
        }

        app.listen(port, function () {
            console.log('Server has started successfully');
        });

        if(err) return console.error(err);
        console.log("Connected to database");

});

const db = mongoose.connection
db.once('open', function() {
    console.log('Database connected:', url)
});

