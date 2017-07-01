
var fs = require('fs');


module.exports = {


};


function setUpProfileSelection() {


    _.each(profilesObj.profiles, function (profile) {
        profiles.push()
    })
}

function getProfiles() {
    var profilesFileObj = getJsonFile("./profiles/profiles.json");

    return profilesFileObj.profiles;
}

function getPagesForProfile(fileName) {
    var profileFileObj = getJsonFile('./profiles/' + fileName);

    return profileFileObj.pages;
}

function getJsonFile(fileLocation) {
    var openedFile = fs.open(fileLocation);

    var fileJson = JSON.parse(openedFile);

    return fileJson;
}


