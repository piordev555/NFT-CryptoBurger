const {ingredients, rarityPerBox, rarityInfo, burgerLevels, metadata_standard} = require('../data');

exports.generateMetadataForBoxType = (tokenId, boxId) => {
    // determine which ingredients will be used to mint burger NFT.
    let ingredientTypeIndexes = getIngredientType(); 

    // determine rarity and price per ingredient
    let ingredientsWithRarity = getIngredientWithRarity(boxId, ingredientTypeIndexes);

    //calculate total burger price
    let burgerPrice = getBurgerPrice(ingredientsWithRarity);

    //retrieve burger level and burger image url based on burger price
    let burger = burgerLevels.find(item => (burgerPrice <= item.price.max && burgerPrice >= item.price.min));

    //configure metadata
    let metadata = {
        ...metadata_standard
    };
    metadata.tokenId = tokenId;
    metadata.name = burger.name;
    metadata.image = burger.imageUrl;
    metadata.description = burger.description;
    metadata.external_url = burger.imageUrl;
    metadata.price = burgerPrice;
    metadata.level = burger.level;
    let attributes = [];
    for (let ingredient of ingredientsWithRarity) {
        let trait_type = ingredients[ingredient.ingredientIndex].name;
        let value = ingredient.rarityPrice;
        let rarity = ingredient.rarity;
        let rarity_id = ingredient.rarityId;
        let imageUrl = ingredients[ingredient.ingredientIndex].images[rarity_id - 1];
        let type = 'ingredient';
        let name = ingredients[ingredient.ingredientIndex].rarity_names[rarity_id - 1];
        attributes.push({
            trait_type,
            name,
            value,
            rarity,
            rarity_id,    
            imageUrl,
            type
        });
    }

    metadata.attributes = attributes;
    //

    return metadata;
};

const getIngredientType = () => {
    let n = getRandomInt(0, 3); //get 0 ~ 3. 
    let arr = getMultiRandomNumbers(n, 3, 5);
    let ingredientArray = [0, 1, 2].concat(arr);
    return ingredientArray;
}

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getMultiRandomNumbers(count, min, max) {
    var arr = [];
    while(arr.length < count) {
        var r = getRandomInt(min, max);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);
    return arr;
}

function getIngredientWithRarity(boxId, ingredientTypeIndexes) {
    let _rarityPercent = rarityPerBox.find(item => item.boxId == boxId);
    let rarityProbabilities = _rarityPercent.rarityProbabilities; 

    let result = [];
    for (let i = 0; i < ingredientTypeIndexes.length ; i ++) {
        let ingredientIndex = ingredientTypeIndexes[i];
        let percentage = getRandomInt(0, 100);
        let selectedRarityIndex;
        for (let j = 0; j <= rarityProbabilities.length ; j ++) {
            let probability = getSumRarityProbability(j, rarityProbabilities);
            if (percentage <= probability) {
                selectedRarityIndex = j;
                break;
            }
        }
        let selectedRarityInfo = rarityInfo[selectedRarityIndex];
        let rarityPrice = getRandomInt(selectedRarityInfo.price.min, selectedRarityInfo.price.max);
        result.push({
            ingredientIndex,
            rarityId: selectedRarityInfo.rarity_id,
            rarityPrice: rarityPrice,
            rarity: selectedRarityInfo.name,
            imageUrl: selectedRarityInfo.imageUrl
        });
    }
    return result;
}

function getSumRarityProbability(index, rarityProbabilities) {
    let i = 0;
    let sum = 0;
    while( i <= index ) {
        sum += rarityProbabilities[i];
        i ++;
    }
    return sum;
}

function getBurgerPrice(ingredientsWithRarity) {
    let sum = 0;
    for (let ingredient of ingredientsWithRarity) {
        sum += ingredient.rarityPrice;
    }
    return sum;
}

