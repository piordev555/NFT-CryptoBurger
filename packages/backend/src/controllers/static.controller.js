var fs = require('fs');

exports.getStaticFiles = async (req, res) => {
    const dirName = req.params.dirName;
    const fileName = req.params.fileName
    console.log('request assets params: ', req.params.dirName, req.params.fileName);
    const url = `src/assets/${dirName}/${fileName}`;
    console.log('request assets uri: ', url);
    fs.readFile(url, function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
    });
}