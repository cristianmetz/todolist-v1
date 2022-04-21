const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({
    extended: true
}));

//Used to link up files in the public folder
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();

    /*Looks into the page called lists and finds the variable 
    called listTitle then places the value of the var called day*/
    res.render("lists", {
        listTitle: day,
        newListItems: items
    });

});

app.post("/", function (req, res) {
    const item = req.body.newItem
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/");
    }


})

app.get("/work", function (req, res) {
    res.render("lists", {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server started on port 3000")
});