const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://admin:adminpassword@krazycooking.lc8j21u.mongodb.net/?retryWrites=true&w=majority',{

    useNewUrlParser: true
})
.then(() =>  console.log('connecting to database successful') )
.catch(err =>  console.error('could not connect to mongo DB', err) );

const userSchema = new mongoose.Schema({
    admin: Boolean,
    username: String,
    password: String,
    date_created: Date
  });
  
  const User = mongoose.model('Users', userSchema);
  
  const user1 = new User({
    admin: true,
    username: 'john_smith',
    password: 'password',
    date_created: new Date()
  });

  user1.save();