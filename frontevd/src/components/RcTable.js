import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'rc-table';

// songs (array): first item - array of song data for table
//                second item - array of data for links
// type (string): which page sent the data
function RcTable({songs, type}) {
  if(songs.length && songs[0][0].Title !== null) {
    const columns = Object.keys(songs[0][0]).map(key => ({
        title: key,
        dataIndex: key,
        key: key
      }));

    const data = songs.map((song, index) => {
      let songInfo = Object.keys(song[0]).map(key => {
        if(key === 'Title') {
          return {[key]: <Link to={`/song/${song[1].songId}?${type}=${song[1].myId}`}>{song[0][key]}</Link>, key: `song ${index} column ${key}`};
        } else if(key === 'Artist') {
          return {[key]: <Link to={`/artist/${song[1].artistId}`}>{song[0][key]}</Link>, key: `song ${index} column ${key}`};
        } else if(key === 'Album') {
          return {[key]: <Link to={`/album/${song[1].albumId}`}>{song[0][key]}</Link>, key: `song ${index} column ${key}`};
        } else {
          return {[key]: song[0][key]};
        }
      });
      return Object.assign({}, ...songInfo);
    });
    return (
      <Table
        columns={columns}
        data={data}
        tableLayout='auto'
      />
    );
  } else {
    return <h4>No songs {type==='artist'?'for':'in'} {type}</h4>;
  }
};

export default RcTable;