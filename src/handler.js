const fs = require("fs-plus");
const path = require("path");

getPublicPages = (target, req, res) => {
    const reqPage = {
      signup: "public/signup/signup.html",
      login: "public/login/login.html",
      static: req.url
    };
    const filePath = path.join(__dirname, "..", reqPage[target]);
    console.log(filePath + 55);
  
    fs.readFile(filePath, (err, file) => {
      res.writeHead(200);
  
      if (err) throw err;
      else {
        res.end(file);
      }
    });
  };
  
  getHome = (target, req, res) => {
    const reqPage = {
      home: "public/home/home.html",
      static: req.url
    };
    fs.readFile(path.join(__dirname, "..", reqPage[target]), (err, file) => {
      res.writeHead(200);
        if (err) throw err;
      else {
        res.end(file);
      }
    });
  };

  module.exports = { getHome };