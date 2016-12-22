# Clustastic

A simple wrapper module for basic nodejs cluster application.
This module enables you to run your "main" function code within a cluster of workers.

### Installation

```sh
$ npm i clustastic --save
```

### Usage

Just require the module, and pass your main function as the argument to the module function.

```javascript
var clustastic = require('clustastic');

clustastic(main);

function main() {
	// Put your app initialization code here
}
```

Express application example:

```javascript
var clustastic = require('clustastic');

clustastic(main);

function main() {
    var express = require('express');
    var cluster = require('cluster');
    var app = express();

    app.get('/', function (req, res) {
        res.send('Response from worker ' + cluster.worker.id);
    });

    app.listen(3000);
}
```


### Options

The module function second argument is an options object. If the options object is not provided, or a specific option is not provided, the module will fall back to a default value.

#### Number of workers

By default, clustastic will spawn workers as the number of CPU cores available on the machine. If you wish to override this, pass a `workers` property with the number of workers you wish to spawn. Any number between 1 and the number of CPU cores is accepted.

If you will provide an invalid value, an `Error` will be thrown with the message 'Invalid workers amount'.

#### Logging function

By default, clustastic will use `console.log` for logging. You may pass your own function to override this, by setting the `logging` property in the options object.

Any value that is not a function, will disable the logging.