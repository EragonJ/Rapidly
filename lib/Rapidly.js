var fs = require('fs');

exports.Rapidly = Rapidly;

function Rapidly() {

    var that = this;

    // Current Request passed from app
    this.req = null;

    // Current Responde that passed to clent
    this.res = null;

    // Cache all settings 
    this.settingsCache = {};
    
    return function(req, res, next) {

        that.req = req;
        that.res = res;
        // that.app = req.app;

        that.exec();
    };
};

Rapidly.prototype = {

    isHTTPMethodValid : function( schemaName, actionName, method ) {

        var schemaPath = getSchemaPath( schemaName );

        if ( typeof this.settingsCache[ schemaName ] === 'undefined' ) {

            // I/O Once, cache forever
            this.settingsCache[ schemaName ] = JSON.parse( fs.readFileSync( schemaPath ) );
        }

        return (this.settingsCache[ schemaName ][ actionName ]['method'] === method);
    },
    exec : function() {

        var url = this.req.params[0],
            routePath,
            schemaName,
            actionName,
            callback;
            
        var o = urlToSchemaNameAndActionName( url );

        schemaName = o[0];
        actionName = o[1];

        routePath = getRoutePath( schemaName, actionName );
        
        if ( !this.isHTTPMethodValid( schemaName, actionName, this.req.method ) ) {
            this.res.send('Wrong HTTP method');
        }

        cb = require( routePath );
        cb(this.req, this.res); 
    }
};

function urlToSchemaNameAndActionName( url ) {

    var url = url.toLowerCase()
    ,   parts = url.split('/');

    /*
     * Support /api/xxx/ or /api/xxx
     *
     * Example : /api/(note/add), /api/(note/add/)
     *           then parts would be [ 'note', 'add' ]
     */
    if ( parts[ parts.length - 1 ] === "" ) {
        parts.pop();
    }

    return [ parts[0], parts[1] ];
}

function getSchemaPath( schemaName ) {
    return getAppRootPath() + 'schema/' + schemaName + '.js';
}

function getRoutePath( schemaName, actionName ) {
    return getAppRootPath() + 'routes/' + schemaName + '/' + actionName + '.js';
}

function getAppRootPath() {
    return __dirname + '/../../../';
}
