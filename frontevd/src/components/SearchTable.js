import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchTable(props) {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios.get(`http://localhost:3001/elastic/${props.match.params.table}?input=${props.location.search.substring(7)}`);
      setSearchData(data);
    };
    getSearchData();
  }, [props]);

  return (
    <div className='tableResultsSection'>
      <h2>{props.match.params.table}</h2>
      {searchData.map(result => {
        let resultRow = "";
        Object.values(result).forEach(value => resultRow.concat(value));
        return resultRow;
      })}
    </div>
  );
}

export default SearchTable;
