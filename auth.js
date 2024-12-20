const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
const GitHubStrategy = require('passport-github').Strategy;
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

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://3000-freecodecam-boilerplate-gpsvsp8c5pi.ws-eu117.gitpod.io/auth/github/callback'
  },
  function (accessToken, refreshToken, profile, cb) {
    //console.log(profile); //Perfil github
    //Database logic here with callback containing our user object
    myDataBase.findOneAndUpdate(
      { id: profile.id },// campo busqueda
      {
        $setOnInsert: { //inserta si es nuevo
          id: profile.id, //id gihub
          username: profile.username,
          name: profile.displayName || profile.username,
          photo: profile.photos[0].value || '',
          email: Array.isArray(profile.emails)
            ? profile.emails[0].value
            : 'No public email',
          created_on: new Date(),
          provider: profile.provider || ''
        }, // se hace siempre
        $set: {
          last_login: new Date()
        },
        $inc: { //incremento
          login_count: 1
        }
      },
      { upsert: true, new: true },
      //upsert: true: Si no se encuentra ningún documento que coincida con el criterio de búsqueda, se insertará un nuevo documento.
      //new: true: Devuelve el documento modificado después de la actualización (en lugar del original).
      (err, doc) => {
        return cb(null, doc.value);
        //doc: Este argumento contendrá el documento actualizado o insertado.
      }
    );

  }
  ));
      
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