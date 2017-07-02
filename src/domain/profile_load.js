
var fs = require('fs');
var fileService = require('./src/data/file_service.js');

module.exports = {


};

function setUpProfileSelection() {

    _.each(profilesObj.profiles, function (profile) {
        profiles.push()
    })
}

function getProfiles() {
    var profilesFileObj = fileService.getJsonFile("./profiles/profiles.json");

    return profilesFileObj.profiles;
}

function getPagesForProfile(fileName) {
    var profileFileObj = fileService.getJsonFile('./profiles/' + fileName);

    return profileFileObj.pages;
}



