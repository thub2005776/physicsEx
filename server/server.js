const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');


// start server 
async function startServer() {
    try {
        mongoose
            .connect(process.env.DATABASE_URI)
            .then(() => { console.log("Database connected"); })
            .catch((err) => { console.log(err); });

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (error) {
        console.log('Cannot connect to the database!', error);
        process.exit();
    }
}

startServer();