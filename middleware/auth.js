const Expenseuser = require("../models/expenseuser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.authenticate = (req,res,next) => {
    const token = req.header("Authorisation")
    console.log(token)
    const user = jwt.verify(token,'aaaada')
    console.log(user.userid)
    Expenseuser.findAll({where :{id :user.userid}})
    //Expenseuser.findByPk(user.userid)
    .then(user =>{
        console.log(user[0].username)
       req.user = user
        next()
    })
    .catch(err => {
        console.log("Not found")
    })
    
}


