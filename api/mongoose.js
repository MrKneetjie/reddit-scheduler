const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb+srv://david:Mongo001@cluster0.vtaha.mongodb.net/onlybands?retryWrites=true&w=majority');

        require('./models/post');
    }
    catch (err) {
        console.log(err)
    }
};
