'use strict'

console.log('userPref connected')

const USER_INFO_KEY = 'user prefs'

var gUserPrefs = {
    bgColor: '',
    txtColor: '',
    birthDate: '',
}

function changePageStyle() {
    document.querySelector('body').style.color = gUserPrefs.txtColor;
    document.querySelector('body').style.backgroundColor = gUserPrefs.bgColor;

    _savePrefsToStorage()
}


function _savePrefsToStorage() {
    saveToStorage(USER_INFO_KEY, gUserPrefs)
}