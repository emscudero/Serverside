const Sequelize = require('sequelize');
const sequelize = new Sequelize('Workout-Log',
'postgres', 'password', {
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connnected to Workout-Log postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;