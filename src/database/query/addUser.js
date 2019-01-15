
const dbconnection = require('../db_connection');

const signUpQuery= (first_name, surname, email, gender, password, cb)=>{
  

    const sql = {
        text:"INSERT INTO users (first_name, surname, email, gender, password) VALUES ($1,$2,$3,$4,$5) RETURNING *",
        values:[first_name, surname, email, gender, password]
    }
    dbconnection.query(sql,(err, result)=>{
        if(err){
            console.log('err',err);
            
        return cb(err);

        }else{
            console.log('result',result);
            
            cb(null, result.rows)
        }
    })
}
 module.exports = signUpQuery