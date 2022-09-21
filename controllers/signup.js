const Expenseuser = require("../models/expenseuser")
const bcrypt = require("bcrypt")

exports.postSignUp=async (req,res,next)=>{
    
    const username = req.body.name;
    const email = req.body.emailid;
    const password = req.body.password;
    try {
    
   let user = await Expenseuser.findAll({where:{email:email}})
   
      if (user.length > 0){
        console.log("User exists")
        return res.status(404).json({success:false, message:'User exists'})

      }
      
      //console.log(user[0].email)
      
      
    }
  
    
      catch(err){
        console.log(err)
        return res.status(406).json({success:false, message:'User logged in'})

        
      }
      
   
    const saltround = 8
    bcrypt.hash(password,saltround,(err,hash) => {
      
      console.log("first runned")
      Expenseuser
      .create({
          username: username,
          email: email,
          password: hash,
          
        })
        .then(result => {
          return res.status(406).json({message :"User Created"})
      
          console.log('Created ExpenseUser');
      })
        .catch(err => {
          console.log(err);
        });
        

    })
   
  };

  exports.login = (req,res,next) => {
    
    const email = req.body.emailid;
    const password = req.body.password;
    console.log(email,password)

   
    Expenseuser.findAll({where:{email:email}})
    .then(user=>{
      bcrypt.compare(password,user[0].password,(err,result) => {
    
      
      if (result == true) {
        //console.log(password)
        return res.status(200).json({success:true, message:'User logged in'}) 
  
      }
      else if(!result){
        return res.status(401).json({success:false, message:'User not authorised'}) 
        


      }
    })


      
  })
  
  .catch(err => {
    return res.status(404).json({success:false, message:'User not found'})
    
  })
  }
     
    
    