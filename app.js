const path = require('path');

const express = require('express');

const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');
const Addexpense = require('./models/addexpense')
const Expenseuser = require('./models/expenseuser')
const Order = require('./models/orders');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors())

const sequelize = require('./util/database')
const signup=require('./routes/signup')
const addexpense = require('./routes/addexpense')
const purchaseRoutes = require('./routes/purchase')
const forgetpass = require('./routes/forgetpass')



app.use(signup)
app.use(addexpense)
app.use(purchaseRoutes)
app.use(forgetpass)

Expenseuser.hasMany(Addexpense)
Addexpense.belongsTo(Expenseuser)

 Expenseuser.hasMany(Order);
 Order.belongsTo(Expenseuser);

sequelize
//.sync({force: true}) //
.sync()
.then(result=>{
    app.listen(8000)
    console.log(result)    //console.log(result)
   

})
.catch(err => console.log(err))

