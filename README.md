# Mystery of the Three Bots

Mystery of the Three Bots is a simple dialog-based game utilizing machine learning to enable you to communicate with three characters. The goal is to determine which of several guests stole the precious MacGuffin Diamond. You interrogate the butler, the maid and the chef--three robot servants who were present during the crime.

The game is built as an Angular app in Typescript. The machine learning model uses a Javascript implementation of the [Universal Sentence Encoder Lite](https://tfhub.dev/google/universal-sentence-encoder-lite/2), which it preloads using JSON files that were generated from CSV files ([./butler.csv], [./maid.csv], [./chef.csv]) for each of the characters (see [generate_models.js](./generate_models.js)).

The game works by matching a representation of the player's input to precomputed representations of candidate strings and calculates a similarity score. For example, if the player types "Where'd the diamond go?", the game might determine that it has a similarity of 0.86 to "Where is the diamond?", and if that's a greater score than the other candidates, the game will use that as the question to the bot and return the corresponding response. See `getResponse()` in [BotResponseService](./src/app/bot-response.service.ts) for implementation.

## Updating the models

To update a model, changing the list of possible queries and responses, change the entries in the correponding bot's .csv file, then run `node ./generate_models.js` from the root directory of the project. This will update the JSON file under [./src/assets/models] which is read by the app to populate the models on the client side.
