'use strict'

console.log('controller connected')

function onInit() {
    gUserPrefs = loadFromStorage(USER_INFO_KEY);
    changePageStyle()
}

function onChangeDisplay(ev) {
    ev.preventDefault()
    var elBgColor = document.querySelector('input[name=bg-color]').value;
    var elTextColor = document.querySelector('input[name=text-color]').value;
    var elBirthday = document.querySelector('input[name=date]').value;

    gUserPrefs.bgColor = elBgColor
    gUserPrefs.txtColor = elTextColor
    changePageStyle()

    if (!elBirthday.length) return;
    gUserPrefs.birthDate = elBirthday;
}