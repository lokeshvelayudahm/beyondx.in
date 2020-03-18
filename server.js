'use strict';

var express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');
var morgan = require('morgan');
app.use(morgan('combined'))
var os = require('os');
var ifaces = os.networkInterfaces();

const staticFileDirectory = "public";
var date = new Date();
var logDate = "logger: "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+": ";
var PORT = 3000;

const directoryPath = path.join(__dirname, staticFileDirectory);

app.use('/',express.static(staticFileDirectory));
console.log(logDate+'Loaded Static Files from: '+staticFileDirectory);

fs.readdir(directoryPath, function (err, files) {
    
    files.forEach(function (file) {
        console.log(logDate+"Loaded files "+file); 
        console.log(logDate+staticFileDirectory+"/"+file)
    });
    if (err) {
        return console.log(logDate+'Unable to scan directory: ' + err);
    } 
});

app.listen(PORT, function () {
    console.log(logDate+'Application Started');
});

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }
    if (alias >= 1) {
      console.log(ifname + ':' + alias, iface.address);
    } else {
      console.log(logDate+"IP Address: "+iface.address);
    }
    ++alias;
  });
});