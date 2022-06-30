// crypto module
const crypto = require("crypto");

const encryptMessage = (message) => {
    const algorithm = "aes-256-cbc"; 

    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);
    
    // secret key generate 32 bytes of random data
    const securitykey = crypto.randomBytes(32);
    
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, securitykey, initVector);
    
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");
    
    encryptedData += cipher.final("hex");
    
    return {
        initVector: initVector.toString('hex'),
        securitykey: securitykey.toString(`hex`),
        encryptedData
    }
}

module.exports = {
    encryptMessage
}