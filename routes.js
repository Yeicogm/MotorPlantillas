const passport = require('passport');
const bcrypt = require('bcrypt');
module.exports = function (app, myDataBase) {
 app.route('/').get((req, res) => {
  // Change the response to render the Pug template
    res.render('index', {
      title: 'La Base de datos OK!',
      message: 'Entra si puedes...',
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true
    });
  });

    app.route('/chat').get(ensureAuthenticated,(req, res) => {
          res.render('chat', {user: req.user });
    });

app.route('/login').post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
  res.render('chat', {user: req.user });
  //autenticación es exitosa,usuario será guardado en req.user.
})

app.route('/profile').get(ensureAuthenticated,(req,res) => {
  res.render('profile',{
    username: req.user.username
  }); //lleva a profile verificando login
})

app.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
});

app.route('/register')
  .post((req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password, 12);
   console.log("U: " + req.body.username + " P: "+ req.body.password)
    myDataBase.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        res.redirect('/');
      } else {
          myDataBase.insertOne({
          username: req.body.username,
          password: hash
        },
          (err, doc) => {
            if (err) {
              res.redirect('/');
            } else {
              // The inserted document is held within
              // the ops property of the doc
              next(null, doc.ops[0]);
            }
          }
        )
      }
    })
  },
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
      res.redirect('/profile');
    }
  );
  
  app.route('/auth/github').get(passport.authenticate('github'));

  app.route('/auth/github/callback').get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    req.session.user_id = req.user.id;
    res.redirect("/chat");
  })

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
    });

    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { //comprueba si esta logIn
          return next();
        }
        res.redirect('/');
      };
}
