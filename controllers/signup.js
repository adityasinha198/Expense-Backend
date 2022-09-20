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
    
    Expenseuser.findAll({where:{email:email}})
    .then(user=>{
      
      if (password == user[0].password){
        //console.log(password)
        return res.status(200).json({success:true, message:'User logged in'}) 
  
      }
      else if(password != user[0].password){
        return res.status(401).json({success:false, message:'User not authorised'}) 
        


      }


      
  })
  
  .catch(err => {
    return res.status(404).json({success:false, message:'User not found'})
    
  })
  }
     
    
    