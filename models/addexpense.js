const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Addexpense = sequelize.define('addexpense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey: true
    
  },
  amount: {
    type:Sequelize.INTEGER   ,
  allowNull: false,
 },

  description: {
    type:Sequelize.STRING   ,
    allowNull: false ,
   

  
  },

  category:{
    type:Sequelize.STRING,
    allowNull:false
  }
 
})

//

module.exports = Addexpense