const express = require('express');
const { exec } = require('child_process');
const cors = require("cors");
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())

const port = 4000;

app.get('/api/isActive', (req, res) => {
  const virtualIp = process.env.VIRTUAL_IP;
  const command = `hostname -I | grep ${virtualIp}`;
  const command2 = "whoami";

  // Object to hold the results of both commands
  const results = {};

  exec(command, (error, stdout, stderr) => {
    if (!error) {
      const isActive = stdout.trim().length > 0;
      results.isActive = isActive.toString();
    } else {
      console.error(error)
      results.isActive = false;
    }

    // Execute the second command
    exec(command2, (error2, stdout2, stderr2) => {
      if (!error2) {
        results.username = stdout2.trim();
      } else {
        console.error('Error executing command:', error2);
        results.username = 'Unknown';
      }
      res.json(results);
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
