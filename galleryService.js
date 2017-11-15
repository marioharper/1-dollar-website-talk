const contentful = require('contentful');

module.exports = {
  getGallery
};

const client = contentful.createClient({
  space: 'rprfeafqwgam',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // your contentful access token
});

function getGallery() {
  return client.getEntries({
    'content_type': '7leLzv8hW06amGmke86y8G', // content type for Photo Gallery
  }).then((entries) => entries.items[0].fields.images); // let error throw if not defined
}