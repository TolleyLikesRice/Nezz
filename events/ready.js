const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'app');
const axios = require('axios').default;
require('dotenv').config();
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        logger.success('Ready!');
        if (process.env.UPTIMEPING) {
            logger.debug('Sending uptime ping...');
            setInterval(function() {
                // Ping uptime kuma every 60 seconds
                logger.trace('Pinging uptime server...');
                axios.get(process.env.UPTIMEPING)
                    .catch(err => logger.error(`error pinging uptime server: ${err}`));
            }, 60 * 1000);
        }
    },
};
