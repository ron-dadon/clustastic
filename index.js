var cluster = require('cluster');
var os = require('os');

module.exports = function clustastic(main, options) {

	options = Object.assign({
		logging: console.log,
		workers: os.cpus().length
	}, options);

	if (!Number.isInteger(options.workers) || 
		options.workers < 0 || 
		options.workers > os.cpus().length) {
		throw new Error('Invalid workers amount');
	}

	if (cluster.isMaster) {

	    for (var i = 0; i < options.workers; i++) {
	        cluster.fork();
	    }

	    cluster.on('exit', function (worker) {
	    	if (typeof options.logging == 'function') {
    			options.logging('Worker %d exited', worker.id);
    		}
    		cluster.fork();
		});

	} else {
		main();
		if (typeof options.logging == 'function') {
			options.logging('Worker %d running', cluster.worker.id);
		}
	};

};