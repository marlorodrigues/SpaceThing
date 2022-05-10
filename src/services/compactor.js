const gzipme = require('gzipme')
const logger = require('./logger')
const { currentDate: currentDate_ } = require('../utils/helpers')
const path = './logs/';
const keep_on = './logs/archive/';
const fs = require('fs')

function compressLogFile() {
    try {
        fs.readdir(path, async (err, files) => {
            if (err) throw err;

            for (const file of files) {
                if (file !== 'archive') {
                    if (fs.statSync(path + file).birthtime.getTime() < new Date().getTime() - 86400000000000) {
                        logger.info(`${currentDate_()} - Arquivo ${file} com mais de um dia, compactando arquivo`)
                        let currentDate = new Date().toISOString().replace(/T/g, '.').replace(/:/g, '.');
                        currentDate = currentDate.substring(0, currentDate.length - 8);

                        let newFileName = keep_on + file.replace('.log', '.') + currentDate + '.gz';

                        logger.info(`${currentDate_()} - Renomeando para ${newFileName}`);

                        await gzipme((path + file), { output: newFileName }).then((unused, error) => {
                            if(error) logger.info(`${currentDate_()} - Error on gzip ${(path + file)}: ${error}`)
                            else fs.truncateSync(path + file, 0);
                        });
                    }
                }
            }
        });
    } catch (error) {
        logger.info(`${currentDate_()} - Error on compressLogFile: ${error}`)
    }
}


module.exports = {
    compressLogFile
}
