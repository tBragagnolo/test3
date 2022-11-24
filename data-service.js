var fs = require("fs");

var students = [];

exports.prep = function prep(){
    return new Promise((resolve, reject)=>{
        fs.readFile("./students.json", (err, data)=>{
            if(err) reject("Unable to read file");
            students = JSON.parse(data);
            resolve();
        });
    });
}

exports.cpa = function cpa(){
    return new Promise((resolve, reject)=>{
        var cpaStudents = [];

        for(var i = 0; i < students.length; i++){
            if(students[i].program == "CPA"){
                cpaStudents.push(students[i]);
            }
        }

        if(cpaStudents.length == 0) reject("No CPA Students");
        else resolve(cpaStudents);
    });
}

exports.bsd = function bsd(){
    return new Promise((resolve, reject)=>{
        var bsdStudents = [];

        for(var i = 0; i < students.length; i++){
            if(students[i].program == "BSD"){
                bsdStudents.push(students[i]);
            }
        }

        if(bsdStudents.length == 0) reject("No BSD Students");
        else resolve(bsdStudents);
    });
}

exports.highGPA = function highGPA(){
    return new Promise((resolve, reject)=>{
        var high = 0;
        var hStudent;

        for(var i = 0; i < students.length; i++){
            if(students[i].gpa > high){
                hStudent = students[i];
                high = students[i].gpa;
            }
        }

        if(!hStudent) reject("Cannot Find Student With Highest GPA");
        else resolve(hStudent);
    });
}

exports.allStudents = function allStudents(){
    return new Promise((resolve, reject)=>{
        if(students.length == 0) reject("No Students");
        else resolve(students);
    });
}