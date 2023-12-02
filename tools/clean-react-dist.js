const fs = require('fs');
const path = require('path');

const directory = './assets/react-dist';
const excludeExtension = '.meta';

fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        if (path.extname(file) !== excludeExtension) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    }
});