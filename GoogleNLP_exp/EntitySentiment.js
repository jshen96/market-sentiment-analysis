var fs = require('fs');
 
var contents = fs.readFileSync('./Article', 'utf8');
//console.log(contents);
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
 const text = contents;

// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects sentiment of entities in the document
client
  .analyzeEntitySentiment({document: document})
  .then(results => {
    const entities = results[0].entities;

    console.log(`Entities and sentiments:`);
    entities.forEach(entity => {
      console.log(`  Name: ${entity.name}`);
      console.log(`  Type: ${entity.type}`);
      console.log(`  Score: ${entity.sentiment.score}`);
      console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });