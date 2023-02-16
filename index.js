const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://admin:adminpassword@krazycooking.lc8j21u.mongodb.net/KrazyCooking?retryWrites=true&w=majority',{

    useNewUrlParser: true
})
.then(() =>  console.log('connecting to database successful') )
.catch(err =>  console.error('could not connect to mongo DB', err) );

mongoose.set('strictQuery', true);

  const db = require('./DB');

  user1 = new db.User({
    admin:false,
    username: 'nick',
    password: 'pass',
    date_created: new Date()

  });
  
 

  user1.save();

  