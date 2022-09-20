const Expenseuser = require("../models/expenseuser")


exports.postSignUp=(req,res,next)=>{
    
    const username = req.body.name;
    const email = req.body.emailid;
    const password = req.body.password;
    Expenseuser.findByPk(email).then(user=>{
      console.log('user exists');
      return res.status(404).json({success:false, message:'User Already exists'}) 
  })
    //console.log(name,email,price)
    //const description = req.body.description;
    Expenseuser
    .create({
        username: username,
        email: email,
        password: password,
        
      })
      .then(result => {
    
        console.log('Created ExpenseUser');
    })
      .catch(err => {
        console.log(err);
      });
      
  };

  exports.login = (req,res,next) => {
    
    const email = req.body.emailid;
    const password = req.body.password;
    console.log(email,password)
  }
     
    
    