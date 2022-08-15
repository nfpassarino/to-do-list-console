const fs = require('fs');

const pathFile = './db/data.json';

const writeFile = (data) => {
    fs.writeFileSync(pathFile, JSON.stringify(data));
};

const readFile = () => {
    if (!fs.existsSync(pathFile)) {
        return null;
    }
    const data = fs.readFileSync(pathFile, { enconding: 'utf-8' });
    return JSON.parse(data);
};

module.exports = {
    writeFile,
    readFile,
};
