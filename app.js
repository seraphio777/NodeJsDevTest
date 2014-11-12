  // Application "NodeJs Dev Test"


  var app = {
    config: require('./config').config,
    csv: require('to-csv'),
    fs: require('fs'),
    FB: require('fb'),


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


    Save: function (users, callback) {
      this.fs.writeFile(this.config.CSV_File, this.csv(users), function (err) {
        if (err) {
          console.log('Error saving file: ', err); 
        } else {
          callback();
        }  
      });
    },


    Run: function (firstID, lastId) {
      var that = this;

      this.Request(firstID, lastId, function (users) {
        that.Save(users, function () {
          console.log('Saved to csv file "' + that.config.CSV_File + '"');
        });          
      });
    }

  };

  app.Run(1, 30);  
