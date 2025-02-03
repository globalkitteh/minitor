const express = require('express');
const { exec } = require('child_process');
const app = express();

// iptable nat rule exists to rewrite 80 to 8080
const port = 8080;

app.use(express.static('public'));

app.get('/history', (req, res) => {
    exec('/usr/local/bin/minitor/exportHistory.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        res.send(`${stdout}`);
    });
});

app.post('/restart-server', (req, res) => {
    exec('/usr/local/bin/minitor/runEpicserverDetached.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        // console.log(`stdout: ${stdout}`);
        // console.log(`stderr: ${stderr}`);
        res.send(`Script output: ${stdout}`);
    });
});

app.listen(port, () => {
    console.log(`Server running at mulberry:${port}`);
    console.log(`iptables is rewriting :80 to :8080 for access `);
})

// Create link to most recent crash report?