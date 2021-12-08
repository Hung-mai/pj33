module.exports = function generateUsername(staffName, phone) {
    let nameArray = removeAccents(staffName).split(' ');
    let username = nameArray[nameArray.length - 1];
    for (let i = 0; i < nameArray.length - 1; i++) {
        username += nameArray[i][0];
    }
    username += phone;
    return username;
}

function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}