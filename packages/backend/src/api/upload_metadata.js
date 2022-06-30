const axios = require('axios');
const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
const gateway_url = "https://gateway.pinata.cloud/ipfs/";

const upload_metadata_ipfs = async (metadata) => {
    return await axios.post(url,
        metadata,
        {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
            headers: {
                'Content-Type': `application/json`,
                'pinata_api_key': process.env.PINATA_API_KEY,
                'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
            }
        }
    ).then(function (response) {
        //handle response here
        let metadata_hash = response.data.IpfsHash;
        console.log("token hash : " + metadata_hash);
        return gateway_url + metadata_hash;
    }).catch(function (error) {
        //handle error here
        console.log("Error ---");
        console.log(error);
    });
}


module.exports = upload_metadata_ipfs;