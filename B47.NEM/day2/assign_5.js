
const express = require('express');
const os = require('os');
const dns = require('dns');
const readDataFile = require('./read');

const app = express();
const PORT = 3000;


app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/readfile', (req, res) => {
  const content = readDataFile();
  res.send(content);
});

app.get('/systemdetails', (req, res) => {
  const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(2); 
  const freeMem = (os.freemem() / (1024 ** 3)).toFixed(2);   
  const cpus = os.cpus();

  const systemDetails = {
    platform: os.platform(),
    totalMemory: `${totalMem} GB`,
    freeMemory: `${freeMem} GB`,
    cpuModel: cpus[0].model,
    cpuCores: cpus.length
  };

  res.json(systemDetails);
});


app.get('/getip', (req, res) => {
  dns.lookup('masaischool.com', { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: 'DNS lookup failed' });
    }

    const result = {
      hostname: 'masaischool.com',
      ipAddresses: addresses.map(addr => addr.address)
    };

    res.json(result);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
