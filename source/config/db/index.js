const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0.wbevo.mongodb.net/final-web?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connect to database success'))