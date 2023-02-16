# JS-Tidal-Scraper

## Created By: Chris Garrett

### V 1.0

#### Welcome to my Tidal music scraper! This program will wait for an HTTP GET request containing a Tidal artist ID and number of songs to return. It will then return a JSON object containing a list of the newest songs released from the artist requested, based on the number of songs requested.

##### The scraper file can be found in the tidal-server folder. Tidal-ui was a React program used for testing purposes.

## Prerequisites
#### Node.js
This program requires Node.js to run. To install Node, please visit: https://nodejs.org/en/ and then run the following command in a terminal to create a new Node project:

```
npm init
```

## Installation
The following liraries are needed: Express.js, cors, and @dastormer/tidal-api-wrapper, and can be installed using the following commands:
#### Express.js
```
npm i express
```
#### Cors
```
npm i cors
```
#### @dastormer/tidal-api-wrapper
```
npm i @dastormer/tidal-api-wrapper
```

To run the program, open a terminal and navigate to the directory that contains the file and type:
```
node get-tidal-songs.js
```
(Optional): IP/port are set to localhost:8080 and can be changed by editing get-tidal-songs.js

## Usage
### Requesting Data
Data is requested using HTTP GET requests in the following form:
```
http://<host-address>:<port>/search?&artistID=<integer>songCount=<integer>
```
**Host-address:** IP/Domain of the server running the program.

**Port:** The port listening for GET requests.

**artistID:** Tidal artist ID for search queries.

**songCount:** Number of songs to return.
#### Example: Requesting the last 12 songs released by Skrillex
```
http://localhost:8080/search?&artistID=3853703&songCount=12
```

### Receiving data

The received resonse will be an array of JSON objects that each contain the following information

```

    "id": 275028357,    
    "title": "Don’t Get Too Close",    
    "duration": 244,    
    "replayGain": -6.01,    
    "peak": 0.999993,    
    "allowStreaming": true,    
    "streamReady": true,    
    "streamStartDate": 20230213,
    "premiumStreamingOnly": false,
    "trackNumber": 1,
    "volumeNumber": 1,
    "version": null,
    "popularity": 0,
    "copyright": "℗ 2023 OWSLA/Atlantic Records, Inc.",
    "url": "http://www.tidal.com/track/275028357",
    "isrc": "USAT22300344",
    "editable": false,
    "explicit": false,
    "audioQuality": "HI_RES",
    "audioModes": [
        "STEREO"
    ],
    "artist": {
        "id": 3853703,
        "name": "Skrillex",
        "type": "MAIN",
        "picture": "1c1dd6ee-b6a0-49f8-88c5-2fa83ecafefd"
    },
    "artists": [
        {
            "id": 3853703,
            "name": "Skrillex",
            "type": "MAIN",
            "picture": "1c1dd6ee-b6a0-49f8-88c5-2fa83ecafefd"
        },
        {
            "id": 7043760,
            "name": "Bibi Bourelly",
            "type": "MAIN",
            "picture": "46da1ff9-2050-468e-81e3-ce685812c196"
        },
        {
            "id": 37250583,
            "name": "Sonny Moore",
            "type": "MAIN",
            "picture": "820ad930-fdb2-4f68-8d2a-8cba825076ec"
        }
    ],
    "album": {
        "id": 275028356,
        "title": "Don’t Get Too Close",
        "cover": "e613b685-5984-46da-b0dd-2c5b02c3be80",
        "vibrantColor": "#eae651",
        "videoCover": null
    },
    "mixes": {
        "MASTER_TRACK_MIX": "014a5260527c2ba275d7d1e3463f7a",
        "TRACK_MIX": "0019d51c604a60ebb69416240c8fa8"
    }
    
```
The following shows an example of how to extract the artist name, song title, song url, album name, and album cover from each returned object by creating a new class and looping through the results:
```
class Song {
  constructor(artist, title, url, album, cover) {
    this.artist = artist;
    this.title = title;
    this.url = url;
    this.album = album;
    this.cover = cover;
  }
}

let results = JSON.parse(data);
for (let i in results) {
  let res = new Song(
    results[i].artist.name,
    results[i].title,
    results[i].url,
    results[i].album.title,
    results[i].album.cover
  );
}
```

## UML Sequence Diagram
\
