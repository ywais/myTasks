import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search(props) {
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios.get(`http://localhost:3001/elastic/search?input=${props.input}`);
      setSearchData(data);
    };
    getSearchData();
  }, [props]);
  
  return (
    <div className='searchContainer'>
      <div className="searchButtons">
        {Object.keys(searchData).map(table => 
          <button key={table}>{table}</button>
        )}
      </div>
    </div>
  );
}

export default Search;