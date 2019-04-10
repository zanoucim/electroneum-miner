const CoinHive = require('coin-hive');
const http = require('http');

(async () => {

  // Create miner
  const miner = await CoinHive('00dcf7ce6e458f9454185e67d5e5d3e3a27a5e900f095526e9dd684f00b24a83', {
    pool: {
      host: 'eupool.electroneum.com',
      port: 3333,
      pass: 'x' // default 'x' if not provided
    }
  }); // Coin-Hive's Site Key

  // Start miner
  await miner.start();

  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));

  const requestHandler = (request, response) => {
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
