let fs = require('fs');

var settings, privateKey, publicKey;

  privateKey = fs.readFileSync('./keys/private.key');
  publicKey = fs.readFileSync('./keys/public.pem');


settings = {
  privateKey: privateKey,
  publicKey: publicKey
};

module.exports = settings;
