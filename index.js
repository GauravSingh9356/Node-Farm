const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceHtml = require('./modules/replacehtml');

const data = fs.readFileSync('./dev-data/data.json', 'utf8');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf8'
);

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);

  //const pathname = req.url;
  //console.log(url.parse(req.url, true));

  const { query, pathname } = url.parse(req.url, true);
  //overview or homepage route
  if (pathname == '/overview' || pathname == '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const newhtmleditedArray = dataObj.map((element) => {
      return replaceHtml(element, tempCard);
    });

    const htmlFinal = newhtmleditedArray.join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', htmlFinal);
    res.end(output);
  }
  // product page route
  else if (pathname == '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    const product = dataObj[query.id];
    const output = replaceHtml(product, tempProduct);

    res.end(output);
  } else if (pathname == '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);
  }
});
// const fs = require('fs');

// // Async example
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   try {
//     console.log(dat);
//   } catch (error) {
//     console.log(err);
//   }
// });

// console.log('raeding File');
server.listen(3000, () => {
  console.log('Listening on port 3000');
});

//hello
