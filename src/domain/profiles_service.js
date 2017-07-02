/**
 * Created by graham on 7/1/17.
 */

var fs = require('fs');
var fileService = require('../data/file_service.js');

module.exports = {
    getPagesForProfile: getPagesForProfile

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
