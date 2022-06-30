import axios from './axios';
const crypto = require("crypto");

const getMetadata = async (boxId, address) => {
    try {
        let response = axios.get(`/getMetadata/${boxId}/${address}`)
            .then(res => {
                console.log('data: ', res)
                return res.data;
            }, err => {
                return Promise.reject(JSON.stringify(err.response.data.message));
            });
        return response;
    } catch (error) {
        console.log('loginerror: ', error)
        return Promise.reject(error.response.data.message);
    };
}

const decryptMessage = (encryptedData, securitykey, initVector) => {
    const algorithm = "aes-256-cbc"; 
    // the decipher function
    const initVectorBuffer = Buffer.from(initVector, 'hex');
    const securityKeyBuffer = Buffer.from(securitykey, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, securityKeyBuffer, initVectorBuffer);

    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    decryptedData += decipher.final("utf-8");

    return decryptedData;
}

const getTokenMetadataList = async (tokenIds) => {
    try {
        let response = axios.get(`/tokens/`, {params: {
            tokenIds
        }})
            .then(res => {
                console.log('data: ', res)
                return res.data;
            }, err => {
                return Promise.reject(JSON.stringify(err.response.data.message));
            });
        return response;
    } catch (error) {
        console.log('loginerror: ', error)
        return Promise.reject(error.response.data.message);
    };
}

const getWhiteListInfo = (address) => {
    try {
        let response = axios.get(`/whitelist/${address}`)
            .then(res => {
                console.log('data: ', res)
                return res.data;
            }, err => {
                return Promise.reject(JSON.stringify(err.response.data.message));
            });
        return response;
    } catch (error) {
        console.log('loginerror: ', error)
        return Promise.reject(error.response.data.message);
    };
}

export const apiService = {
    getMetadata,
    decryptMessage,
    getTokenMetadataList,
    getWhiteListInfo
};