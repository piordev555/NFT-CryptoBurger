const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');

require('dotenv').config()

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const gateway_url = "https://gateway.pinata.cloud/ipfs/";

// deploy images first to get the ipfs hash
upload = ( name, images_dir) => {
    imageCount = 0;

    //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
    recursive.readdirr(images_dir, function (err, dirs, files) {
        console.log('upload Image: ', err);
        let data = new FormData();
        files.forEach((file) => {
            imageCount++;
            //for each file stream, we need to include the correct relative file path
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(images_dir, file)
            })
        });

        return axios.post(url,
            data,
            {
                maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'pinata_api_key': process.env.PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
                }
            }
        ).then(function (response) {
            //handle response here
            images_hash = response.data.IpfsHash;

            console.log("image count: " , imageCount);
            console.log(`image url: ${name} : `, gateway_url + images_hash);
            
        }).catch(function (error) {
            //handle error here
            console.log("Error ---");
            console.log(error);
        });
    });    
};

upload('burgers', './src/assets/burgers');
// upload( 'cheese', './src/assets/ingredients/cheese');
// upload( 'lettuce', './src/assets/ingredients/lettuce');
// upload('meat', './src/assets/ingredients/meat');
// upload('sauce', './src/assets/ingredients/sauce');
// upload('tomato', './src/assets/ingredients/tomato');
// upload('muffin', './src/assets/ingredients/muffin');