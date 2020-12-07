const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'build:dev' || TARGET === 'default:dev' || TARGET === 'dev' || !TARGET) {
    module.exports = require('./config/webpack.config.dev');
    console.info('--> ./config/webpack.config.dev.js');
}
else if (TARGET === 'build' || TARGET === 'build:chunk') {
    module.exports = require('./config/webpack.config.prod');
    console.info('--> ./config/webpack.config.prod.js');
}

else if(TARGET === 'stats' || TARGET === 'stats:chunk') {
    module.exports = require('./config/webpack.config.stats');
}
