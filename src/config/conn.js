const sequelize = require('./sequelize');
const connectMongo = require('./mongoose');

async function connDBs() {
    //connect mysql
    try {
        await sequelize.authenticate();
        console.log('MySQL connected!');
        await sequelize.sync({ alter: true });
        console.log('MySQL models synchronized!');
    }
    catch(err) {
        console.error('Error connecting to MySQL:', err);
        throw err; //thow error to prevent server from starting if MySQL connection fails
    }

    //connect mongo
    try {
        await connectMongo();
    }
    catch(err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; //thow error to prevent server from starting if Mongo connection fails
    }
}

module.exports = connDBs;