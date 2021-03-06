const fs = require("fs-plus");
const path = require("path");
const addUserQuery = require ('../src/database/query/addUser');
const queryString = require('query-string');
const bcrypt = require("bcryptjs");
const dbCheckEmail = require('../src/database/query/dbCheckEmail');

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

const postSignup = (request, response) => {
    let newUser = "";
    request.on("data", chunk => {
    newUser += chunk;
    console.log(newUser)
     });

   request.on("end", () => {

      const userObj = queryString.parse(newUser);
      const {
      first_name,
      surname,
      email,
      password,
      gender
   } = userObj;
   console.log('newUser', userObj)

    bcrypt.hash(password, 10, (err, hash) => {
      addUserQuery(first_name, surname, email, gender, hash, (err, result) => {
        if (err) {
          response.end(JSON.stringify({
            err: err.detail
          }));

        } else {
            response.end(JSON.stringify({
            err: null,
            msg: "suc"
          }));
         }
      });
    });
  });
};

const postLogin = (request, response) => {
  let userDate = "";
  request.on("data", chunk => {
    userDate += chunk;
  });

  request.on("end", () => {
    userDateParse = JSON.parse(userDate);
    console.log('userDateParse', userDateParse);
    if(userDateParse.email.trim().length===0 || userDateParse.password.trim().length===0)
    return response.end(JSON.stringify({ err: "Please ! Enter Your Email/Password" }));
    dbCheckEmail(userDateParse.email, (err, dbResult) => {
      if (!dbResult[0])
        return response.end(JSON.stringify({ err: "Email Not Found" }));
      bcrypt.compare(userDateParse.password, dbResult[0].pass, (err, res) => {
        if (err) return response.end(JSON.stringify({ err }));
        if (res === false)
          return response.end(JSON.stringify({ err: "Wrong Password !" }));
        cookieAndAuth.createCookie(dbResult[0].id, (err, token) => {
          if (err) return response.end(JSON.stringify({ err }));

          response.setHeader(
            "Set-Cookie",
            `data=${token};httpOnly;Max-Age=90000000`
          );

          response.end(JSON.stringify({ err: null, result: "Login" }));
        });
      });
    });
  });
};

module.exports = { getHome, getPublicPages, postSignup,  postLogin};