var bcrypt = require('bcrypt');

module.exports = function(req,res) {
  if(!req.body.username || !req.body.password){
        res.status("400");
        res.send("Invalid details!");
     } else {

       bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            return next(err);
          }

          req.body.password = hash;

       let newUser = {
           "username" : req.body.username,
           "password" : req.body.password
       }

       let collection = req.app.get('DB').collection('User');
       let p = collection.insertOne(newUser);

       p.then(function(result) {
         console.log("kayıt başarılı")
         req.session.user = newUser;
        res.send("kayit olundu");
       }).catch(function(err) { // insertion error!
         console.log(err);
         res.sendStatus(500);
       });




       })

     }

}
