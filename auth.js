const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
module.exports = function (app, myDataBase) {
    passport.use(new LocalStrategy((username, password, done) => {
        myDataBase.findOne({ username: username }, (err, user) => {
          console.log(`User ${username} attempted to log in.`);
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          if (!bcrypt.compareSync(password, user.password)) { 
            return done(null, false);
          }
      
          //console.log("debug:" + user.username);
          return done(null, user);
           });
      }));
      
      passport.serializeUser((user, done) => {
        //console.log("debug: " +user._id) 
        done(null, user._id);
      });
      
      passport.deserializeUser((id, done) => {
         myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
         //   console.log("debug: " + doc.username) 
          done(null, doc); //doc es todo el usuario
         });
      });
}