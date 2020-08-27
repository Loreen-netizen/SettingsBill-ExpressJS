let express = require("express");
let handlebars = require("express-handlebars");
let bodyParser = require("body-parser");
let app = express();
let SettingsBill = require("./settingsBill")
let settingsBill = SettingsBill();
app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');
let moment = require("moment");
    moment().format();
let PORT = process.env.PORT || 3508;

app.listen(PORT, function () {
    console.log("App starting on port", PORT)
});

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get(("/"), function (req, res) {
    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        code: settingsBill.colors(),
      
    }
    );
});

app.post(("/settings"), function (req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });

    console.log(settingsBill.getSettings());

    res.redirect("/")
});

app.post(("/action"), function (req, res) {
    console.log(req.body.actionType)

    settingsBill.recordAction(req.body.actionType);

    res.redirect("/")
});

app.get(("/actions"), function (req, res) {
    var action = settingsBill.actions();
    for (let props of action){
props.ago = moment(props.timeStamp).fromNow()
    }
    res.render("actions", { actions: action });
});

app.get(("/actions/:actionType"), function (req, res) {
    let actionType = req.params.actionType;
    let actionList = settingsBill.actionsFor(actionType);
    for (let props of actionList){
        props.ago = moment(props.timeStamp).fromNow();
    }
    res.render("actions", { actions: actionList });
});