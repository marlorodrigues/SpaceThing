const logger = require("./logger");
const redis = require("redis");

async function get_client() {
    try {
        var client = await redis.createClient(6379, "127.0.0.1");
        await client.connect()

        client.on('error', (e) => {
            logger.error(`Open Redis Error - ${e}`)
            return false
        });
    } catch (error) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}

async function set_value(key, value) {
    try {
        const client = get_client();

        await client.set(key, value)
        await client.quit()
    }
    catch (err) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}

async function get_value(key) {
    try {
        const client = get_client();
        
        const value = await client.get(key); 
        await client.quit()

        if (value === null)
            return false

        return value
    }
    catch (err) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
        return err
    }   
}

async function delKey(key) {
    try {
        const client = get_client();

        await client.del(key)
        await client.quit()
    }
    catch (err) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}

async function del_key() {
    try {
        const client = get_client();

        await client.flushAll()
        await client.quit()
    }
    catch (err) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}

async function publish(channel, message) {
    try {
    }
    catch (error) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}

async function subscribe(client, channel) {
    try {
    }
    catch (error) {
        logger.error(`${currentDate()} - ${error.message} - ${error.stack}`)
    }
}
        


module.exports = {
    get_client,
    set_value,
    get_value,
    del_key,
    publish,
    subscribe
}

