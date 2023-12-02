'use strict'

const fs = require('fs');
const chokidar = require('chokidar');

const watcher = chokidar.watch('./assets/react-dist',
    {ignored: /^\./, persistent: true});

watcher.on('ready',function(){
    watcher.on('add', function(path) {
        if (path.endsWith('.js')) {
            const newPath = path.replace('.js', '.ts');
            fs.rename(path, newPath, err => {
                if (err) throw err;
            });
        }
    });
});
