const fs = require('fs');
const path = require('path');
const use = require('@tensorflow-models/universal-sentence-encoder');
const papaparse = require('papaparse');

async function generateBotModel(botName) {
  const model = await use.load();
  const file = fs.readFileSync(path.join(__dirname, `${botName}.csv`), {
    encoding: 'utf8',
  });

  const parsed = papaparse.parse(file, {
    header: true,
    delimiter: ',',
    comments: '#',
    skipEmptyLines: true,
  });
  const queryMap = {};
  for (const {Query, Response} of parsed.data) {
    queryMap[Query] = Response;
  }
  const embeddingMap = {};
  await Promise.all(Object.keys(queryMap).map(async (query) => {
    const embedding = await model.embed([query]);
    embeddingMap[query] = embedding.arraySync()[0];
  }));
  fs.writeFileSync(path.join(__dirname, 'models', `${botName}.model.json`),
                   JSON.stringify({
                     queryMap,
                     embeddingMap,
                   }));
}

Promise.all(['maid', 'butler', 'chef'].map(
    (botName) => generateBotModel(botName)));
