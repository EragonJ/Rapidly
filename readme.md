Rapidly
=======

This is an API helper built on Express.js, with this, you can rapidly manage your own API paths/actions on the fly.

Installation
============

    npm install -g rapidly

Command
=======

  Usage: 

    rapidly [options]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    build [schemaName]  Build Necessary Files/Directories
    --rebuild           Rebuild the Schema File 

Setup
=====

* Generate your API routes by rapidly first

* Set up Rapidly on the top of server.js ( express.js entry point )

```javascript
var Rapidly = require('rapidly');
```

* Set Rapidly route **on the last part** of your routes settings ( Make sure Rapidly would not override your routes ). You can change the path to your api routes ( In the example setting, all requests passed into **http://myDomain/api/XXXXX** would be routed to Rapidly )

```javascript
app.all('/api/*', new Rapidly);
```

Notice
======

* When using `rapidly`, **remember** to change current directory to the root path of your Express.js App. Otherwise, `rapidly` would generate files in a wrong place.

* Because Rapidly is based on express.js, it would be better to include some validation / sanisization logic here. For me, I will try to include `express-validator` to help.

* Set up expressValidator on the top of server.js ( express.js entry point )

```javascript
var expressValidator = require('express-validator');
```

* Use expressValidator middleware for express.js

```javascript
app.use(expressValidator);
```

Author
======

EragonJ ( Chia-Lung, Chen ) 

LICENSE
=======

MIT License
