  var express = require('express');
  var router = express.Router();
  var jwt = require('jsonwebtoken');

  const users = [];

  const isEmailUnique = function(email) {
    return ! users.find(u => {
      return u.email === email;
    });
  }

  router.post('/login', function(req, res) {
    try {
      const user = users.find(u => {
        return u.email === req.body.email && u.password === req.body.password;
      });
    
      if(!user) {
        return res.status(400).json({ message: 'User not found'});
      }
    
      const token = jwt.sign(user, KEY);
      res.status(200).json({ token });
    } catch(e) {
      console.log(e);
      res.status(500).json({message: 'Internal Server Error'});
    }
  });

  router.post('/signup', function(req, res) {
    try {
      if(!isEmailUnique(req.body.email)) {
        return res.status(400).json({ message: 'Duplicate Email'});
      }
    
      users.push(req.body);
      const token = jwt.sign(req.body, KEY);
      res.status(200).json({ token });
    }
    catch(e) {
      console.log(e);
      res.status(500).json({message: 'Internal Server Error'});
    }

  });



  module.exports = router;
