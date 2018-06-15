var config = require('./config.json');

var lang = 'es';

var localized_strings = require('./strings.js')

function str(id) {
  if(localized_strings[id] != undefined && localized_strings[id][lang] != undefined) {
    return localized_strings[id][lang];
  } else {
    return id;
  }
}

function setLang(code) {
  lang = code;
}

function getLang() {
  return lang;
}

function pageTitle(title) {
  if(title === undefined) {
    return config.siteName;
  } else {
    return title + ' - ' + config.siteName;
  }
}

module.exports = {
  str: str,
  setLang: setLang,
  getLang: getLang,
  pageTitle: pageTitle,
  config: config
};