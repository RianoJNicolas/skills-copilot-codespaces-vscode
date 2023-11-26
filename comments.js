// Create a web server for comments with node.js

// Import modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Create server
http.createServer(function (request, response) {
    // Parse the request url
    var url_parts = url.parse(request.url, true);

    // Get the file name
    var filename = url_parts.pathname.substring(1);

    // Get the file extension
    var ext = filename.split('.').pop();

    // Get the file type
    var type = 'text/html';
    switch(ext) {
        case 'css':
            type = 'text/css';
            break;
        case 'js':
            type = 'application/javascript';
            break;
        case 'png':
            type = 'image/png';
            break;
    }

    // Read the file
    fs.readFile(filename, function(err, content) {
        // If the file doesn't exist
        if(err) {
            // Return a 404 error
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write('File not found');
            response.end();
        }
        // If the file exists
        else {
            // Return the file
            response.writeHead(200, {'Content-Type': type});
            response.write(content);
            response.end();
        }
    });
}).listen(8080);

// Create the comment list
var comments = [];

// Create the server for comments
http.createServer(function (request, response) {
    // Parse the request url
    var url_parts = url.parse(request.url, true);

    // Get the file name
    var filename = url_parts.pathname.substring(1);

    // Get the file extension
    var ext = filename.split('.').pop();

    // Get the file type
    var type = 'text/html';
    switch(ext) {
        case 'css':
            type = 'text/css';
            break;
        case 'js':
            type = 'application/javascript';
            break;
        case 'png':
            type = 'image/png';
            break;
    }

    // If the url is /comments
    if(filename == 'comments') {
        // If the request method is GET
        if(request.method == 'GET') {
            // Return the comments
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(comments));
            response.end();
        }
        // If the request method is POST
        else if(request.method == 'POST') {
            // Get the comment text
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                var comment = JSON.parse(body);
                // Add the comment to the list
                comments.push(comment);
                // Return the comment
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(comment));
                response.end();
            });
        }
    }
}
).listen(8081);

// Print to the console
console.log('Server running at http://localhost:8080/');
