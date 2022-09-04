const crypto = require('crypto');

let key = '1234';
let iv = '1234';

let derivedKey = crypto.pbkdf2Sync(key, iv, 1000, 48, 'sha256');

let keyBuf = Buffer.from(derivedKey.buffer.slice(0, 32));
let ivBuf = Buffer.from(derivedKey.buffer.slice(32, 48));

let cipher = crypto.createCipheriv('aes-256-cbc', keyBuf, ivBuf);
let crypted = cipher.update("TEST", 'utf8', 'binary');
crypted += cipher.final('binary');
crypted = Buffer.from(crypted, 'binary').toString('base64');

console.log(crypted);

crypted = Buffer.from(crypted, 'base64').toString('binary');
let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuf, ivBuf);
let decoded = decipher.update(crypted, 'binary', 'utf8');
decoded += decipher.final('utf8');

console.log(decoded);
