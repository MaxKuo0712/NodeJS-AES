const crypto = require('crypto');


async function AES256EncryptText(aesKey, aesIv, text) {
    return new Promise(function(resolve, reject){
        try {
            const derivedKey = crypto.pbkdf2Sync(aesKey, Buffer.from(aesIv, 'base64'), 1000, 48, 'sha256');
            const keyBuf = Buffer.from(derivedKey.buffer.slice(0, 32));
            const ivBuf = Buffer.from(derivedKey.buffer.slice(32, 48));
            let cipher = crypto.createCipheriv('aes-256-cbc', keyBuf, ivBuf);
            let crypted = cipher.update(text, 'utf8', 'hex');
            crypted += cipher.final('hex');
            resolve(crypted);
        } catch (error) {
            reject(error);
        }
    })
}

async function AES256DecryptText(aesKey, aesIv, text) {
    return new Promise(function(resolve, reject){
        try {
            const derivedKey = crypto.pbkdf2Sync(aesKey, Buffer.from(aesIv, 'base64'), 1000, 48, 'sha256');
            const keyBuf = Buffer.from(derivedKey.buffer.slice(0, 32));
            const ivBuf = Buffer.from(derivedKey.buffer.slice(32, 48));
            let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuf, ivBuf);
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            resolve(decrypted);
        } catch (error) {
            reject(error);
        }
    })
}

async function AES256EncryptFile(aesKey, aesIv, inputFile) {
    return new Promise(function(resolve, reject){
        try {
            const derivedKey = crypto.pbkdf2Sync(aesKey, Buffer.from(aesIv, 'base64'), 1000, 48, 'sha256');
            const keyBuf = Buffer.from(derivedKey.buffer.slice(0, 32));
            const ivBuf = Buffer.from(derivedKey.buffer.slice(32, 48));
            let cipher = crypto.createCipheriv('aes-256-cbc', keyBuf, ivBuf);
            let crypted = cipher.update(inputFile);
            crypted = Buffer.concat([crypted , cipher.final()]);
            resolve(crypted);
        } catch (error) {
            reject(error);
        }
    })
}

async function AES256DecryptFile(aesKey, aesIv, inputFile) {
    return new Promise(function(resolve, reject){
        try {
            const derivedKey = crypto.pbkdf2Sync(aesKey, Buffer.from(aesIv, 'base64'), 1000, 48, 'sha256');
            const keyBuf = Buffer.from(derivedKey.buffer.slice(0, 32));
            const ivBuf = Buffer.from(derivedKey.buffer.slice(32, 48));
            let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuf, ivBuf);
            let decrypted = decipher.update(inputFile);
            decrypted = Buffer.concat([decrypted , decipher.final()]);
            resolve(decrypted);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    AES256EncryptText, AES256DecryptText,
    AES256EncryptFile, AES256DecryptFile
}
