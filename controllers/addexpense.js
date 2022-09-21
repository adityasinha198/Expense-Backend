const bcrypt = require("bcrypt")
const Addexpense = require("../models/addexpense")

exports.postaddexpense = (req,res,next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category
    console.log(amount,description,category)

    Addexpense
      .create({
          amount: amount,
          description: description,
          category: category,
          
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

    Addexpense.
    findAll()
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
    Addexpense.findByPk(userId).then(user=>{
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
  
  
    
   
    
  