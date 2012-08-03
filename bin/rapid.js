var fs = require('fs'),
    program = require('commander');

program
    .version('0.0.1')
    .option('build [schemaName]', 'Create Necessary Files/Directories')
    .option('--rebuild', 'Rebuild the Schema File ')
    .parse(process.argv);

if ( !!program.build ) {

    var schemaName = program.build;
    create( schemaName );
}

function create( schemaName ) {

    var cwd = process.cwd()                                          // ~/Sites/Test/
    ,   schemaFileName = schemaName + '.js'                          // user.js
    ,   routeRootPath = cwd + '/routes/'                             // ~/Sites/Test/routes/
    ,   routePath = routeRootPath + schemaName + '/'                 // ~/Sites/Test/routes/user/
    ,   schemaRootPath = cwd + '/schema/'                            // ~/Sites/Test/schema/
    ,   schemaFilePath = schemaRootPath + schemaFileName             // ~/Sites/Test/schema/user.js

    ,   actions = ['create', 'read', 'update', 'delete'];            // This would create : 
                                                                     // ~/Sites/Test/routes/user/create.js
                                                                     // ~/Sites/Test/routes/user/read.js
                                                                     // ~/Sites/Test/routes/user/update.js
                                                                     // ~/Sites/Test/routes/user/delete.js

    // Check Route Root Directory exists or not
    fs.exists( routeRootPath, function( exists ) {
        if ( !exists ) {
            fs.mkdirSync( routeRootPath );
        }
    });

    // Check Schema Root Directory exists or not
    fs.exists( schemaRootPath, function( exists ) {
        if ( !exists ) {
            fs.mkdirSync( schemaRootPath );
        }
    });

    // Check Route Path Directory exists or not
    fs.exists( routePath, function( exists ) {
        if ( !exists ) {
            fs.mkdirSync( routePath );
        }
    });

    // Chech SchemaFile exists or not
    fs.exists( schemaFilePath, function( exists ) {

        if ( exists && !program.rebuild ) {
            console.log('You have already define the schema : ' + schemaName + ' (' + schemaFilePath + ')' );
            console.log('Overwite it with --rebuild option');
            return false;
        }

        // TODO: Fix here with confirm
        /*
        if ( program.rebuild ) {
            console.log( 'IMPORTANT :' );
            console.log( 'This action will erase your originally defined CRUD js files' );
            console.log( 'And your originally defined schema File' );
        }
        */
        fs.writeFileSync(schemaFilePath, "{\n\n}");

        for ( var i in actions ) {
            fs.writeFileSync( routePath + actions[i] + '.js', "");
        }
    });
}
