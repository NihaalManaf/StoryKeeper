// Simple script to check if server is running
import http from 'http';

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`PARTIAL BODY: ${chunk.toString().substring(0, 100)}...`);
  });
  
  res.on('end', () => {
    console.log('Response complete. Server is running!');
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
  if (e.code === 'ECONNREFUSED') {
    console.error('Server is not running on port 8080');
  }
});

req.end(); 