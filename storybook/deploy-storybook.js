const ghpages = require('gh-pages');

ghpages.publish('storybook-static', function (err) {
  if (err) {
    console.log('Failed', err);
  } else {
    console.log('Success');
  }
});
