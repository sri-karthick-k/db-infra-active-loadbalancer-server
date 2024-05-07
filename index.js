const express = require('express');
const { exec } = require('child_process');
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json())

const port = 4000;

const virtualIp = "192.168.64.13";

app.get('/api/isActive/:ip', (req, res) => {
  const {ip} = req.params;
  const command = `ssh -q -o StrictKeyHostKeyChecking=no ubuntu@${ip} "hostname -I | grep ${virtualIp}"`;
  const command2 = "hostname";

  // Object to hold the results of both commands
  const results = {};

  exec(command, (error, stdout, stderr) => {
    if (!error) {
      const isActive = stdout.trim().length > 0;
      console.log(stdout)
      results.isActive = isActive.toString();
    } else {
      console.error(error)
      results.isActive = false;
    }

    // Execute the second command
    exec(command2, (error2, stdout2, stderr2) => {
      if (!error2) {
        results.hostname = stdout2.trim();
      } else {
        console.error('Error executing command:', error2);
        results.hostname = 'Unknown';
      }
      res.json(results);
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
