const express = require('express');
const app = express();
const fs = require('fs');


app.set('view engine', 'pug');


app.get('/', function (req, res) {

  const tests = fs.readdirSync('/tests')
      .map(fname => {

        const c = fs.readFileSync(`/tests/${fname}`, {encoding: 'utf8'});
        if (c.trim().length) {
          return JSON.parse(c);
        }
        return false;
      })
      .filter(c => !!c);

  res.render('index', {
    tests: tests,
    downloads: JSON.stringify(tests.map(test => ({
      t: test.timestamp,
      y: test.download
    }))),
    uploads: JSON.stringify(tests.map(test => ({
      t: test.timestamp,
      y: test.upload
    }))),
    labels: JSON.stringify(tests.map(test => test.timestamp))
  });
  return;
});

const port = process.env.PORT || 3000;
console.log(`UI started on port: ${port}`);
app.listen(port);
