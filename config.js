  // Config file for NodeJs Dev Test
 
  exports.config = {
    "FB_Access_Token": "",      // Need some token, required for batch requests
    "CSV_File": "users.csv",    // Name of csv file with received from FB data
    "FTP": {                    // Remote server to upload the file
      "login": "",
      "password": "",
      "host": "",
      "port": "21"
    }
  };
