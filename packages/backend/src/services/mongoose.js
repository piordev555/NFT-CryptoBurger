const db = require("../model");
const {
  dbConfig
} = require('../config');
const Burger = db.burger;
console.log('dbName: ', dbConfig.DB);
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

async function saveTokenMetadataToDB(burgerData) {
  // Burger.estimatedDocumentCount((err, count) => {
    const burger = await Burger.find({tokenId: burgerData.tokenId}).exec();
    if (!burger || burger.length === 0) {
      try {
        await new Burger(burgerData).save();
        console.log('new burger: ', burgerData);
        return burgerData;
      } catch(err) {
        console.log('new burger err: ', err)
        return null;
      }
    } else if (burger && burger.length > 0) {
        console.log('exist burger: ', burger[0]);
        return 'exist';
    } else {
      return null;
    }
  // });
}

function clearTable() {
  Burger.remove({}, (err, burgers) => {
    if (!err) {
      console.log('delete all records:');
    }
  })
}

// clearTable();


module.exports = {
  db,
  saveTokenMetadataToDB
};