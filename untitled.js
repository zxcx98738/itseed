UserDISC.findOne({
      id: 142
  })
  .exec(function(err, user) {
      
        console.log(user)
});

UserDISC.query('select id from UserDISC',function(err, rawResult){
  sails.log(rawResult);
});