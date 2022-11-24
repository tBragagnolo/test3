var express = require("express");
var dat = require("./data-service");

var app = express();
var port = process.env.PORT || 8080;

function onStart(){
    console.log("Express http server listening on", port);
}

app.get("/", (req, res)=>{
    var resText = "<h2>Declaration: </h2>";
    resText += "<p> The rest text is displayed in paragraph as shown in screenshot. </p>";
    resText += " <p> I acknowledge the College’s academic integrity policy and my own integrity ";
    resText += "remain in effect whether my work is done remotely or onsite.";
    resText += " Any test or assignment is an act of trust between me and my instructor, ";
    resText += " and especially with my classmates even when no one is watching.";
    resText += " I declare I will not break that trust. </p>";
    resText += "<p>Name: <mark> <b> Tom Bragagnolo </b> </mark> </p>";
    resText += "<p>Student Number: <mark><b> 139157218 </b> </mark> </p>";
    
    resText += `<p> <a href = "/BSD"> Click to visit BSD Students </a></p>
                <p> <a href = "/highGPA"> Click to see who has the highest GPA </a></p>`;

    res.send(resText);
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