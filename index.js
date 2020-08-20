const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let PORT = process.env.PORT || 3508;

app.listen(PORT, function () {
    console.log("App starting on port", PORT)
});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(("/"), function (req, res) {
    res.render("index");
});

app.post(("/settings"), function (req, res) {
    console.log(req.body)
    res.redirect("/")
});

app.post(("/action"), function (req, res) {

});

app.get(("/actions"), function (req, res) {

});

app.get(("/actions/:type"), function (req, res) {

});