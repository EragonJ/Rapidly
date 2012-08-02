var fs = require('fs');

module.exports = function() {
    

};

function core(req, res, next) {

    var path = req.param.apipath
      , filepath  = path.split('/');


      fs.mkdir(__filename + '../../../' + 'routes' +);
      fs.readdirSync(__filename + );
}
