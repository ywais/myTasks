const router = require("express").Router();
const mysql = require('mysql');
const { Client } = require('@elastic/elasticsearch');

let mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mySQLpassword',
  database: 'sql_music_service',
  multipleStatements: true
});

mysqlCon.connect(err => {
  if (err) throw err;
  console.log('Connected!');
});

const client = new Client({
  cloud: {
    id: 'name:ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDMzZDZmY2ZmMmUwNjQ0Mzc4MzVhNTAzNjE0MWFkYTZlJDI1M2NlNDA2ZTgyZTQwNTM5NGU2M2NkMjkzNDQ2ODk4',
  },
  auth: {
    username: 'elastic',
    password: 'koVJLCXxpoxj6zInmA4iyhti'
  }
});

async function uploads() {
  router.get("/uploadSongs", async (req, res) => {
    try {
      let allSongs;
      mysqlCon.query(`SELECT songs.id, songs.title, songs.length, artists.name AS artist,albums.name AS album, songs.track_number AS trackNumber, songs.lyrics, songs.youtube_link AS youtubeLink, songs.thumbnails, songs.created_at AS createdAt, songs.upload_at AS uploadAt
      FROM sql_music_service.songs
      LEFT JOIN artists
      ON songs.artist=artists.id
      LEFT JOIN albums
      ON songs.album=albums.id`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        allSongs = results;
      });
      const bodySongs = allSongs.flatMap((song) => [
        { index: { _index: "songs" } },
        song,
      ]);
      const { bodySongs: bulkResponseSongs } = await client.bulk({
        refresh: true,
        bodySongs,
      });
      if (bulkResponseSongs.errors) {
        return res.json(bulkResponseSongs.errors);
      }
      const { bodySongs: countSongs } = await client.count({ index: "songs" });
      res.send(countSongs);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

  router.get("/uploadArtists", async (req, res) => {
    try {
      let allArtists;
      mysqlCon.query(`SELECT id, name, cover_img AS coverImg, created_at AS createdAt, upload_at AS uploadAt
      FROM sql_music_service.artists`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        allArtists = results;
      });
      const bodyArtists = allArtists.flatMap((artist) => [
        { index: { _index: "artists" } },
        artist,
      ]);
      const { bodyArtists: bulkResponseAlbums } = await client.bulk({
        refresh: true,
        bodyArtists,
      });
      if (bulkResponseAlbums.errors) {
        return res.json(bulkResponseAlbums.errors);
      }
      const { bodyArtists: countArtists } = await client.count({ index: "artists" });
      res.send(countArtists);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

  router.get("/uploadAlbums", async (req, res) => {
    try {
      let allAlbums;
      mysqlCon.query(`SELECT albums.id, albums.name, artists.name AS artist, albums.cover_img AS coverImg, albums.created_at AS createdAt, albums.upload_at AS uploadAt
      FROM sql_music_service.albums
      JOIN sql_music_service.artists
      ON albums.artist=artists.id`, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        allAlbums = results;
      });
      const bodyAlbums = allAlbums.flatMap((album) => [
        { index: { _index: "albums" } },
        album,
      ]);
      const { bodyAlbums: bulkResponseArtists } = await client.bulk({
        refresh: true,
        bodyAlbums,
      });
      if (bulkResponseArtists.errors) {
        return res.json(bulkResponseArtists.errors);
      }
      const { bodyAlbums: countAlbums } = await client.count({ index: "albums" });
      res.send(countAlbums);
    } catch (e) {
      res.json({ error: e.message });
    }
  });

  router.get("/uploadPlaylists", async (req, res) => {
    try {
      let allPlaylists;
      mysqlCon.query(`SELECT id, name, cover_img AS coverImg, created_at AS createdAt, upload_at AS uploadAt
      FROM sql_music_service.playlists`, (error, results, fields) => {
        if (error) {
          res.send(error.message);
          throw error;
        };
        res.send(results);
      });
      const bodyPlayLists = allPlaylists.flatMap((playlist) => [
        { index: { _index: "playlists" } },
        playlist,
      ]);
      const { bodyPlayLists: bulkResponsePlaylists } = await client.bulk({
        refresh: true,
        bodyPlayLists,
      });
      if (bulkResponsePlaylists.errors) {
        return res.json(bulkResponsePlaylists.errors);
      }
      const { bodyPlayLists: countPlaylists } = await client.count({
        index: "playlists",
      });
      res.send(countPlaylists);
    } catch (e) {
      res.json({ error: e.message });
    }
  });
}

uploads().catch(console.log);

router.get('/search',(req,res) => {
  const input = req.query.input;
  try {
    const results = elastic.searchAll(input);
    results.results.then(resultsArray => {
      const resultsByTable = {};
      results.indices.forEach((table, index) => resultsByTable[table] = resultsArray[index].slice(0, 3));
      res.json(resultsByTable);
    })
  } catch(error) {
    console.log(error);
  }
});

router.get('/:table',(req,res) => {
  const table = req.params.table;
  const input = req.query.input;
  try {
    elastic.search(input,table).then(results => res.json(results));
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;
