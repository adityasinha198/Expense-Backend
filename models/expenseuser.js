const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Expenseuser = sequelize.define('expenseuser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
    
  },
  username: Sequelize.STRING,
  email: {
    type:Sequelize.STRING   ,
    allowNull: false ,
    unique: true,
    

  
  },

  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
 
})

//

module.exports = Expenseuser