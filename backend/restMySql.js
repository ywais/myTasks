const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
  console.log('request fired ' + req.url + ' ' + req.method);
  next();
}

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

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/top_songs', (req, res) => {
  mysqlCon.query(`SELECT songs.id, songs.title, songs.length, artists.name AS artist,albums.name AS album, songs.track_number AS trackNumber, songs.lyrics, songs.youtube_link AS youtubeLink, songs.thumbnails, songs.created_at AS createdAt, songs.upload_at AS uploadAt
  FROM sql_music_service.songs
  LEFT JOIN artists
  ON songs.artist=artists.id
  LEFT JOIN albums
  ON songs.album=albums.id
  LIMIT 20;`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_artists', (req, res) => {
  mysqlCon.query(`SELECT id, name, cover_img AS coverImg, created_at AS createdAt, upload_at AS uploadAt
  FROM sql_music_service.artists
  LIMIT 20`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_albums', (req, res) => {
  mysqlCon.query(`SELECT albums.id, albums.name, artists.name AS artist, albums.cover_img AS coverImg, albums.created_at AS createdAt, albums.upload_at AS uploadAt
  FROM sql_music_service.albums
  JOIN sql_music_service.artists
  ON albums.artist=artists.id
  LIMIT 20`, (error, results, fields) => {
    if (error) {
        res.send(error.message);
        throw error;
    };
    res.send(results);
  });
});

app.get('/top_playlists', (req, res) => {
  mysqlCon.query(`SELECT id, name, cover_img AS coverImg, created_at AS createdAt, upload_at AS uploadAt
  FROM sql_music_service.playlists
  LIMIT 20`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/song/:id', async (req, res) => {
  let paramsQuery = 'none';
  if (req.query.artist) {
    mysqlCon.query(`SELECT songs.id AS songId, songs.title, artists.id AS artistId, artists.name AS artist, songs.length, artists.id
    FROM sql_music_service.songs
    LEFT JOIN artists
    ON songs.artist=artists.id
    WHERE artists.id=${req.query.artist}`, (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      };
      paramsQuery = results;
    });
  } else if (req.query.album) {
    mysqlCon.query(`SELECT songs.id AS songId, songs.title, artists.id AS artistId, artists.name AS artist, songs.length, albums.id
    FROM sql_music_service.songs
    LEFT JOIN artists
    ON songs.artist=artists.id
    LEFT JOIN albums
    ON songs.album=albums.id
    WHERE albums.id=${req.query.album}`, (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      };
      paramsQuery = results;
    });
  } else if (req.query.playlist) {
    mysqlCon.query(`SELECT songs.id AS songId, songs.title, artists.id AS artistId, artists.name AS artist, songs.length, playlists.id
    FROM sql_music_service.playlists
    LEFT JOIN sql_music_service.songs_in_playlists
    ON playlists.id=songs_in_playlists.playlist_id
    LEFT JOIN sql_music_service.songs
    ON songs_in_playlists.song_id=songs.id
    LEFT JOIN sql_music_service.artists
    ON songs.artist=artists.id
    where playlists.id=${req.query.playlist}`, (error, results, fields) => {
      if (error) {
        res.send(error.message);
        throw error;
      };
      paramsQuery = results;
    });
  }
  mysqlCon.query(`SELECT songs.id AS songId, songs.youtube_link AS youtubeLink, songs.title, artists.id AS artistId, artists.name AS artist, albums.id AS albumId, albums.name AS album, songs.track_number AS trackNumber, songs.length, songs.lyrics
  FROM sql_music_service.songs
  LEFT JOIN artists
  ON songs.artist=artists.id
  LEFT JOIN albums
  ON songs.album=albums.id
  WHERE songs.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    if(paramsQuery !== 'none') {
      res.send(results.concat([paramsQuery]));
    } else {
      res.send(results);
    }
  });
});

app.get('/artist/:id', async (req, res) => {
  mysqlCon.query(`SELECT artists.id, artists.name, artists.cover_img AS coverImg, artists.created_at AS createdAt, artists.upload_at AS uploadAt,songs.id AS songId, songs.title AS title, songs.length, albums.id AS albumId, albums.name AS album
  FROM sql_music_service.artists
  LEFT JOIN sql_music_service.songs
  ON songs.artist=artists.id
  LEFT JOIN sql_music_service.albums
  ON albums.id=songs.album
  WHERE artists.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/album/:id', async (req, res) => {
  mysqlCon.query(`SELECT albums.id, albums.name, artists.id AS artistId, artists.name AS artist, albums.cover_img AS coverImg, albums.created_at AS createdAt, albums.upload_at AS uploadAt, songs.id AS songId, songs.title AS title, songs.length
  FROM sql_music_service.albums
  JOIN sql_music_service.artists
  ON artists.id=albums.artist
  LEFT JOIN sql_music_service.songs
  ON songs.album=albums.id
  WHERE albums.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/playlist/:id', (req, res) => {
  mysqlCon.query(`SELECT playlists.id, playlists.name, playlists.cover_img AS coverImg, playlists.created_at AS createdAt, playlists.upload_at AS uploadAt, songs.id AS songId, songs.title AS title, artists.id AS artistId, artists.name AS artist, songs.length
  FROM sql_music_service.playlists
  LEFT JOIN sql_music_service.songs_in_playlists
  ON playlists.id=songs_in_playlists.playlist_id
  LEFT JOIN sql_music_service.songs
  ON songs_in_playlists.song_id=songs.id
  LEFT JOIN sql_music_service.artists
  ON songs.artist=artists.id
  where playlists.id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.get('/artist/:id/albums', async (req, res) => {
  mysqlCon.query(`SELECT albums.id, albums.name, artists.name AS artist, albums.cover_img AS coverImg, albums.created_at AS createdAt, albums.upload_at AS uploadAt
  FROM sql_music_service.albums
  INNER JOIN sql_music_service.artists
  ON albums.artist=artists.id
  WHERE albums.artist=${req.params.id}`, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.post('/song', async (req, res) => {
  mysqlCon.query('INSERT INTO songs SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.post('/artist', async (req, res) => {
  mysqlCon.query('INSERT INTO artists SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error.message);
      throw error;
    };
    res.send(results);
  });
});

app.post('/album', async (req, res) => {
  mysqlCon.query('INSERT INTO albums SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error);
      throw error;
    };
    res.send(results);
  });
});

app.post('/playlist', async (req, res) => {
  mysqlCon.query('INSERT INTO playlists SET ?',req.body, (error, results, fields) => {
    if (error) {
      res.send(error);
      throw error;
    };
    res.send(results);
  });
});

app.put('/song', async (req, res) => {
  mysqlCon.query('UPDATE songs SET title = ?, length = ?, artist = ?, album = ?, track_number = ?, lyrics = ?, youtube_link = ?, created_at = ? WHERE id = ?',
  [req.body.title, req.body.length, req.body.artist, req.body.album, req.body.track_number, req.body.lyrics, req.body.youtube_link, req.body.created_at, req.body.id], (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.put('/artist', async (req, res) => {
  mysqlCon.query('UPDATE artists SET name = ?, cover_img = ?, created_at = ? WHERE id = ?',
  [req.body.name, req.body.cover_img, req.body.created_at, req.body.id], (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.put('/album', async (req, res) => {
  mysqlCon.query('UPDATE albums SET name = ?, artist = ?, cover_img = ?, created_at = ? WHERE id = ?',
  [req.body.name, req.body.artist, req.body.cover_img, req.body.created_at, req.body.id], (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.put('/playlist', async (req, res) => {
  mysqlCon.query('UPDATE playlists SET name = ?, cover_img = ?, created_at = ? WHERE id = ?',
  [req.body.name, req.body.cover_img, req.body.created_at, req.body.id], (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.delete('/song/:id', async (req, res) => {
  mysqlCon.query('DELETE FROM songs WHERE id = ?',req.params.id, (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.delete('/artist/:id', async (req, res) => {
  mysqlCon.query('DELETE FROM artists WHERE id = ?',req.params.id, (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.delete('/album/:id', async (req, res) => {
  mysqlCon.query('DELETE FROM albums WHERE id = ?',req.params.id, (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.delete('/playlist/:id', async (req, res) => {
  mysqlCon.query('DELETE FROM playlists WHERE id = ?',req.params.id, (error, results, fields) => {
    if (error) {
      res.send(err.message);
      throw error;
    };
    res.send(results);
  });
});

app.use('/elastic', require('./elastic'))

app.listen(3001);