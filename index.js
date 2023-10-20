const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {

    const htmlMarkup = fs.readFileSync('./index.html', 'utf-8');
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

    const products = data.products;
    if (req.url.startsWith('/product')) {
        const id = req.url.split('/')[2];
        const product = products.find(p => p.id === (+id));
        console.log(`Product ${id} requested`);
        res.setHeader('Content-Type', 'text/html');
        let modifiedHtmlMarkup = htmlMarkup.replace('**title**', product.title)
            .replace('**url**', product.thumbnail)
            .replace('**price**', product.price)
            .replace('**rating**', product.rating);
        return res.end(modifiedHtmlMarkup);
    }


    //conditions
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(htmlMarkup);
            break;
        case '/api':
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            break;
        default:
            res.writeHead(404);
            res.end();
    }
    console.log(req.url);




    console.log("Server Created");
})
server.listen(8080);