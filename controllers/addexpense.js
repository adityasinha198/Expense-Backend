const bcrypt = require("bcrypt")
const Addexpense = require("../models/addexpense")
const jwt = require("jsonwebtoken")

exports.postaddexpense = (req,res,next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category
    const token = req.header("Authorisation")
    console.log(token)
    const user = jwt.verify(token,'aaaada')
    const expenseuserId = user.userid
    console.log(user.userid)
    
    console.log(amount,description,category)

    Addexpense
      .create({
          amount: amount,
          description: description,
          category: category,
          expenseuserId:expenseuserId
          
        })
        .then(result => {
            
          res.redirect('/getexpense')
          
      
          console.log('Created ExpenseUser');
      })
        .catch(err => {
          console.log(err);
        });

}

exports.getaddexpense = (req,res,next) => {
  const a = req.user

    Addexpense.
    findAll({where:{expenseuserId:a[0].id}})
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.deleteExpenses=(req,res,next)=>{
  const userId=req.params.Id;
    
    console.log(userId)
    Addexpense.findByPk(userId)
    .then(user=>{
        return user.destroy();
      })
      
      .then(result=>{
        console.log('Destroyed Expenses');
        Addexpense.findAll()
        .then(users=>{
            // console.log(users)
            res.json(users)
        })
        .catch(err=>{
            console.log(err)
        })
        // res.redirect('/admin/products')
      })
        .catch(err=>{
        console.log(err);
      });
    }
  
  
    
   
    
  