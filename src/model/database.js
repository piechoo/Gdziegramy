// Include Sequelize module
const Sequelize = require('sequelize')

// Creating new Object of Sequelize
module.exports = new Sequelize(
    'gdziegramy',
    'nodeuser',
    'node', {

        dialect: 'mysql',

        // By default host is 'localhost'
        host: 'localhost',
        define: { timestamps: false }
    },

);
