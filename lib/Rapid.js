var fs = require('fs');

module.exports = core;

function core(req, res, next) {

    var url = req.params[0].toLowerCase()
    ,   parts = url.split('/')
    ,   routePath = __dirname + '../../../' + 'routes/';

    // Support /api/xxx/ or /api/xxx
    if ( parts[ parts.length - 1 ] === "" ) {
        parts.pop();
    }

    fs.readdirSync( routePath, function( err, list ) {

        if ( err ) {
            fs.mkdirSync( routePath );
        }
    });

    next();
/*      fs.mkdir(__filename + '../../../' + 'routes' +);
      fs.readdirSync(__filename + );*/
}
