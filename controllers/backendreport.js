const Addexpense = require("../models/addexpense")
const Expenseuser = require("../models/expenseuser")

exports.backendreport = (req,res,next) =>{
    const arrmonth = []
    const arrday = []
    let arrweek = []
    const a = req.user
    
    if(a.ispremiumuser == true){
      
        Addexpense.findAll({where:{expenseuserId:req.user.id}})
        .then(users =>{
          for(let i=0;i<users.length;i++){
            const monthinfo = users[i].createdAt.getMonth()
            const dateinfo = users[i].createdAt.getDate()
            
            const yearinfo = users[i].createdAt.getYear()
            const dayinfo =  users[i].createdAt.getDay()
            
            
            const curr = new Date()
            const month = curr.getMonth()
            const date = curr.getDate()
            console.log(date)
            const year = curr.getYear()
            const day = curr.getDay()
            console.log(day)
            
            
            if(monthinfo== month && yearinfo == year) {
             arrmonth.push(users[i])
          
             }


             if(dateinfo == date && monthinfo== month && yearinfo == year){
                arrday.push(users[i])
                console.log(arrday,"OK")

            }
            let weekly =[]

            let newdate = date-day
            for(let j=date;j>=newdate;j--)
            {
                for(let k=0;k<users.length;k++){
                const monthinfo2 = users[k].createdAt.getMonth()
            const dateinfo2 = users[k].createdAt.getDate()
            
            const yearinfo2 = users[k].createdAt.getYear()
            const dayinfo2 =  users[k].createdAt.getDay()

            const curr2 = new Date()
            const month2 = curr2.getMonth()
            const date2 = curr2.getDate()
            console.log(date)
            const year2 = curr2.getYear()
            const day2 = curr2.getDay()
            console.log(day)

            if(dateinfo2 == j && monthinfo2 == month2 && yearinfo2 == year2){
                console.log("OK")

                weekly.push(users[k])
                
            }
            

                }
            }
            arrweek = weekly
            console.log(weekly)

            
       
           }
            
           
            res.json({arrday:arrday,arrmonth:arrmonth,arrweek:arrweek})
        
        })
           
           
  
          
          
        
          
  
  
        
        .catch(err => console.log(err))
      }
  
      else{
        res.json("Nothing to show")
  
      }

    }


    
  
  
      



