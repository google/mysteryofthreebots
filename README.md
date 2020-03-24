# Mystery of the Three Bots

Mystery of the Three Bots is a simple dialog-based game utilizing machine learning to enable you to communicate with three characters. The goal is to determine which of several guests stole the precious MacGuffin Diamond. You interrogate the butler, the maid and the chef--three robot servants who were present during the crime.

The game is built as an Angular app in Typescript. The machine learning model uses a Javascript implementation of the [Universal Sentence Encoder Lite](https://tfhub.dev/google/universal-sentence-encoder-lite/2), which it preloads using JSON files that were generated from CSV files ([butler.csv](./butler.csv), [./maid.csv]()./maid.csv), [chef.csv](./chef.csv)) for each of the characters (see [generate_models.js](./generate_models.js)).

The game works by matching a representation of the player's input to precomputed representations of candidate strings and calculates a similarity score. For example, if the player types "Where'd the diamond go?", the game might determine that it has a similarity of 0.86 to "Where is the diamond?", and if that's a greater score than the other candidates, the game will use that as the question to the bot and return the corresponding response. See `getResponse()` in [BotResponseService](./src/app/bot-response.service.ts) for implementation.

## Updating the models

To update a model, changing the list of possible queries and responses, change the entries in the correponding bot's .csv file, then run `node ./generate_models.js` from the root directory of the project. This will update the JSON file under [./src/assets/models] which is read by the app to populate the models on the client side.

## How were the corpora created?

The corpora (the response lists) for the Butler and the Maid were created like this:

1. Set up the four key events: the welcoming, the speech, the cocktails, and the dinner.
2. Set up the five rooms: living room, dining room, kitchen, study and office.
3. Run the bots and the suspects through each event and room.
4. Record everything the bot sees in each room during each event. Those records of what the bot witnessed, go into that bot’s corpus.

For example the maid was in the dining room (location) during cocktails (time period), so the maid can tell the player that during cocktails she was in the dining room with Ms. Red who was drinking a glass of wine.

She has no idea what was going on in the study, as she wasn’t in the room. But the Butler was, so if the player asked the Butler about the cocktail period, the Butler will be able to report what he witnessed.

It’s up to the players to ask questions of the bots, figure out what they saw and didn’t see, and then deduce the answer.

## Experiments to try

This iteration of the game is pretty simple, essentially a tutorial for what could be a much larger, more complex game. If you want to experiment with making a bigger better version, here are some things to try:

Add a new room and a new event to the storyline. Maybe a game room and a bridge game. Write new QA response pairs and add them to the corpora.

Add some supporting characters. What happens if you add other robot witnesses? What did the gardener see? Or the eccentric aunt who lives in the attic? Or the robot vacuum who wanders the house once an hour?

You’ll notice that Chef doesn’t really have a corpus. He’s a bit of an easter egg who is meant to show a different kind of behavior. You could give him some things to say and do by giving him a real corpus.

Experiment with emotional states. If you wanted to give the bots “moods,” you could have them shift corpora. For instance, the Butler might be calm, and so responds from his calm corpus, and when he gets mad (from a triggering question, for instance), he could switch to his “angry corpus.” This could make the butler seem just a little more lifelike.

Experiment with randomization. It is theoretically possible to randomize the bots, changing what they saw in what rooms at what times, and build their corpus fresh every game. It would be a bit of work, but doable.

These are just a few ideas, and there are probably dozens of others that make good use of NLU models. We look forward to seeing what you create from this sample code!
