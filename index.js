const logger = require('./Logger'); 
/**
 * Log level priority is as follows-
 * TRACE << DEBUG << INFO << WARN << ERROR
 */
logger.error('THIS IS A ERROR MESSAGE');
logger.warn ('THIS IS A WARNING MESSAGE');
logger.info ('THIS IS A INFO MESSAGE');
logger.debug('THIS IS A DEBUG MESSAGE');
logger.trace('THIS IS A TRACE MESSAGE');


