# BAMAZON
**BAMAZON is an Amazon-like app using MySQL. It prompts the user for the item they wish to purchase and then completes the user's order if the quantity in stock is sufficient**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tech Used](#tech-used)
- [Installation](#installation)
- [Commands](#Commands)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Tech Used

- Node.js
- MySQL
- Inquirer.js
- cli-color

## Installation

* Clone repo
* Obtain API keys for Twitter, Spotify, and OMDB
* Create .env file that houses API keys
* Run `'npm install'` in terminal
* Run `'node liri.js'` followed by one of the commands listed below

## Commands
* `node liri.js 'my-tweets'`
- displays last 20 tweets and when they were created
* `node liri.js 'spotify-this-song' '<song name>'`
- displays information listed below for the song requested
- song name, artist, album song is from, and a preview link
* `node liri.js 'movie-this' '<movie name>'`
- displays information listed below for the movie requested
- title, year movie was released, IMDB rating, Rotten Tomatoes rating, country movie was produced, language of the movie, plot of the movie, actors in the movie
* `node liri.js 'do-what-it-says'`
- takes the text from 'random.txt' and run the `'spotify-this-song'` command for 'I Want it that Way'

## License
[MIT License](https://github.com/m-fiks/liriBot/blob/master/LICENSE)