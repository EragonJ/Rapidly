var fs = require('fs');

exports.Rapidly = Rapidly;

function Rapidly() {

    var that = this;

    this.req = null;
    this.res = null;
    
    return function(req, res, next) {

        that.req = req;
        that.res = res;
        // that.app = req.app;

        that.exec();
    };
};

Rapidly.prototype = {
    
    getRouteFilePath : function( url ) {

        var url = url.toLowerCase()
        ,   parts = url.split('/')
        ,   routeRootDirPath = __dirname + '/../../../' + 'routes/';

        /*
         * Support /api/xxx/ or /api/xxx
         *
         * Example : /api/note/add, /api/note/add/ 
         *           then parts would be [ 'api', 'note', 'add' ]
         */
        if ( parts[ parts.length - 1 ] === "" ) {
            parts.pop();
        }

        return routeRootDirPath + parts.join('/') + '.js';
    },
    exec : function() {

        var url = this.req.params[0],
            filePath = this.getRouteFilePath( url ),
            relatedAction = require( filePath );

        relatedAction(this.req, this.res); 
    }
};
