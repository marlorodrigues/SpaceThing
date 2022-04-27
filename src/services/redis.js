const logger = require("./logger");
const redis = require("redis");
// redis.commandOptions

async function setValue(key, value) {
    try {
        var client = await redis.createClient(6379, "127.0.0.1");
        await client.connect()

        client.on('error', (e) => {
            logger.error(`Open Redis Error - ${e}`)
            return false
        });

        await client.set(key, value)
        await client.quit()
    }
    catch (err) {
        logger.error("Redis erro on getValue: " + err);
    }
}

async function getValue(key) {
    try {
        var client = await redis.createClient(6379, "127.0.0.1");
        await client.connect()

        client.on('error', (e) => {
            logger.error(`Open Redis Error - ${e}`)
            return false
        });
        
        const value = await client.get(key); 
        await client.quit()

        if (value === null)
            return false

        return value
    }
    catch (err) {
        logger.error("Redis erro on getValue: " + err);
        return err
    }   
}

async function delKey(key) {
    try {
        var client = await redis.createClient(6379, "127.0.0.1");
        await client.connect()

        client.on('error', (e) => {
            logger.error(`Open Redis Error - ${e}`)
            return false
        });

        await client.del(key)
        await client.quit()
    }
    catch (err) {
        logger.error("Redis erro on delKey: " + err);
    }
}

async function flushAll() {
    try {
        var client = await redis.createClient(6379, "127.0.0.1");
        await client.connect()

        client.on('error', (e) => {
            logger.error(`Open Redis Error - ${e}`)
            return false
        });

        await client.flushAll()
        await client.quit()
    }
    catch (err) {
        logger.error("Redis erro on flushAll: " + err);
    }
}


module.exports = {
    setValue,
    getValue,
    delKey,
    flushAll
}

