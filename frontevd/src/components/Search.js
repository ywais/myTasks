import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search(props) {
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios.get(`http://localhost:3001/elastic/search?input=${props.location.search.substring(7)}`);
      setSearchData(data);
    };
    getSearchData();
  }, [props]);
  
  return (
    <div className='searchContainer'>
      <div className="searchButtons">
        {Object.keys(searchData).map(table => 
          <button
            key={table}
            onClick={() =>
              window.location.href = `http://localhost:3001/elastic/${table}?input=${props.location.search.substring(7)}`
            }
          >
            {table}
          </button>
        )}
      </div>
      <div className="resultsSection">
        {Object.keys(searchData).map(table =>
          <div key={table} className="resultsFromTable">
            <h2>{table}</h2>
            {searchData[table].map(result => {
              let resultRow = "";
              Object.values(result).forEach(value => resultRow.concat(value));
              return resultRow;
            })}
            <button
              key={table}
              onClick={() =>
                window.location.href = `http://localhost:3001/elastic/${table}?input=${props.location.search.substring(7)}`
              }
            >
              "SHOW ALL"
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
