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

app.get("/BSD", (req, res)=>{
    dat.bsd().then((data)=>{
        res.render("students", {students: data})
    }).catch((mes)=>{
        res.json({"Message": mes});
    });
});

app.get("/allStudents", (req, res)=>{
    dat.allStudents().then((data)=>{
        res.render("students", {students: data});
    }).catch((mes)=>{
        res.json({"Message": mes});
    });
});

app.get("/highGPA", (req, res)=>{
    dat.highGPA().then((data)=>{
        res.render("student", {student: data});
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