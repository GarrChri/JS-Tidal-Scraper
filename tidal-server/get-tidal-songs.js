import express from "express";
import cors from "cors";
import Tidal from "@dastormer/tidal-api-wrapper";

const app = express();
app.use(cors());
const port = 8080;

async function getSongs(artist_id) {
  const tidal = new Tidal();
  const songs = tidal.getArtistTopTracks(artist_id, 500);

  // Retrieves songs released 2022 and later
  const transform = await songs;
  const filter_arr = transform.filter(
    (i) =>
      +i.streamStartDate.slice(0, 4) > 2021 &&
      i.streamStartDate.slice(0, 10) != "2023-02-17"
  );

  // Removes duplicate songs
  let key = "title";
  const new_arr = [
    ...new Map(filter_arr.map((item) => [item[key], item])).values(),
  ];

  // Converts dates to ints for sorting
  for (let i in new_arr) {
    new_arr[i].streamStartDate = +new_arr[i].streamStartDate
      .slice(0, 10)
      .replaceAll("-", "");
  }

  // Sorts songs by stream start date, newest -> oldest
  new_arr.sort(function (a, b) {
    return parseFloat(b.streamStartDate) - parseFloat(a.streamStartDate);
  });
  return new_arr;
}

app.get("/search", (req, res) => {
  let artist_id = req.query.artistID;
  let song_count = req.query.songCount;

  getSongs(artist_id)
    .then((songs) => {
      if (songs.length > 0) {
        res.send(songs.slice(0, song_count));
      } else {
        res.status(400).json({ Error: "Invalid Artist ID" });
      }
    })
    .catch((error) => {
      res.status(500).json({ Error: "Internal Server Error" });
    });
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
