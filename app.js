  // Application "NodeJs Dev Test"

  var app = {
    FB: require('fb'),
    config: require('./config').config,


    Request: function (firstID, lastId, callback) {
      this.FB.setAccessToken(this.config.FB_Access_Token);

      var batch_data = [];
      for (var id = firstID; id <= lastId; id++) {
        batch_data.push({"method": "get", "relative_url": id});
      }

      this.FB.api('', 'post', { 
        batch: batch_data
      }, function(res) {
        var users = [];
        res.forEach(function (response) {
          if (200 == response.code) {
            var user = JSON.parse(response.body);
            users.push({"id": user.id, "name": user.name});
          }
        });

        callback(users);
      });

    },


    Run: function (firstID, lastId) {
      this.Request(firstID, lastId, function (users) {
        console.log(users);
      });
    }


  };

  app.Run(1, 30);  
