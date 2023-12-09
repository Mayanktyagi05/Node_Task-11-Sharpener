const fs = require('fs');

const requestHandler =((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter a message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split("=")[1];

            // Save the name to name.txt
            fs.writeFileSync('name.txt', name);

            // Read the name from name.txt
            const savedName = fs.readFileSync('name.txt', 'utf8');

            // Display the saved name on the screen
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Saved Name</title></head>');
            res.write(`<body><h1> ${savedName}</h1></body>`);
            res.write('</html>');
            return res.end();
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Welcome to Node</h1></body>');
    res.write('</html>');
    res.end();
});

module.exports = requestHandler;
