/*jshint esversion:6 */
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
let db = require('./models');
let Users = db.users;
//const { Users } = require('./models');
// const { checkPassword } = require('../utils/hash.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    Users.findById(userId).then(data => done(null, data)).catch(err => {
      done(err, false);
    });
  });

  passport.use(
    'local',
    new LocalStrategy(function(username, password, done) {
      Users.findOne({ where: { name: username } })
        .then(user => {
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) return done(null, user);
            return done(null, false);
          });
        })
        .catch(err => { return done(err); } );
    })
  );
};

//NIGEL'S CODE
// module.exports = () => {
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser((id, done) => {
//     User.findById(id)
//       .then(user => {
//         done(null, user);
//       })
//       .catch(err => {
//         done(err, false);
//       });
//   });
//   passport.use('local', new LocalStrategy(
//       { usernameField: 'email', passwordField: 'password'},
//       (email, password, done) =>
//         { User.findOne({ where: { email } })
//           .then(user => { if (!user) { return done(null, false); }
//             checkPassword(password, user.password) // pass .then block down chain
//               .then(isValid => { if (isValid) { return done(null, user); }
//                    return done(null, false); }); })
//           .catch(err => {return done(err);});
//       }));};
