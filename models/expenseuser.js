const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Expenseuser = sequelize.define('expenseuser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    
  },
  username: Sequelize.STRING,
  email: {
    type:Sequelize.STRING   ,
    allowNull: false ,
    unique: true,
    primaryKey: true

  
  },

  password:{
    type:Sequelize.STRING,
    allowNull:false
  }
 
})

module.exports = Expenseuser