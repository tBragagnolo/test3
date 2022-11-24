var express = require("express");
var exphbs = require("express-handlebars");
var dat = require("./data-service");

var app = express();
var port = process.env.PORT || 8080;

function onStart(){
    console.log("Express http server listening on", port);
}

app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set("view engine", ".hbs");

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/CPA", (req, res)=>{
    dat.cpa().then((data)=>{
        res.json(data);
    }).catch((mes)=>{
        res.json({message: mes});
    });
});

app.get("/BSD", (req, res)=>{
    dat.bsd().then((data)=>{
        res.json(data);
    }).catch((mes)=>{
        res.json({message: mes});
    });
});

app.get("/highGPA", (req, res)=>{
    dat.highGPA().then((data)=>{
        var resText = "<h2>Highest GPA: </h2>";
        resText += "<p>Student ID: ";
        resText += data.studId;
        resText += "</p>";
        resText += "<p>Name: ";
        resText += data.name;
        resText += "</p>";
        resText += "<p>Program: ";
        resText += data.program;
        resText += "</p>";
        resText += "<p>GPA: ";
        resText += data.gpa;
        resText += "</p>";

        res.send(resText);
    });
});

app.use("", (req, res)=>{
    res.status(404).send("Error 404: Page Not Found");
});

dat.prep().then(()=>{
    app.listen(port, onStart);
}).catch((err)=>{
    console.log(err);
});