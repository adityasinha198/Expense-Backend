const bcrypt = require("bcrypt")
const Addexpense = require("../models/addexpense")
const jwt = require("jsonwebtoken");
const Expenseuser = require("../models/expenseuser");

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
  console.log(a.ispremiumuser,"Yesssss")
  
 

    Addexpense.
    findAll({where:{expenseuserId:a.id}})
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
  

    exports.leaderboard = (req,res,next) => {
      

      let obj = {}
      
      const a = req.user
      if(a.ispremiumuser == true){
      
      Addexpense.findAll()
      .then(users =>{
        for(let i=0;i<users.length;i++){
          console.log(users)
          
          if(users[i].expenseuserId in obj){
         obj[users[i].expenseuserId] =  obj[users[i].expenseuserId] + users[i].amount
        
           }
          else{
            
            //console.log(a)
            obj[users[i].expenseuserId] = users[i].amount
          }

        }
        
        console.log(obj)
        res.json(obj)
        


      })
      .catch(err => console.log(err))
    }

    else{
      res.json("Nothing to show")

    }


    }
  
    exports.showuserboard = (req,res,next) => {
      const userId=req.params.Id;
      Addexpense.findAll({where:{expenseuserId:userId}})
      .then(values =>{
        res.json(values)
        
      })
      .catch(err => console.log(err))
      console.log(userId)
    }
    
   
    
  