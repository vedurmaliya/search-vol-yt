import { useState } from "react";
import axios from "axios";


function App() {
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState(null);

  const handleSearch = async () => {
     
    fetch(`https://searchvolbackend.onrender.com/searchVolume?keyword=${keyword}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json(); // This is missing in your code
    })
    .then((data) => {
      console.log(data.totalResults);
      setSearchVolume(data.totalResults) // Now you have the JSON data
    })
    .catch((error) => {
      console.error(error);
    });
          
   
  };

  return (
      <div className="flex flex-col items-center h-screen  gap-4">

     
           <h1 className="flex justify-center font-serif text-3xl text-white bg-red-600 w-full py-6 px-6 ">Keyword Search Volume by YOUTUBE API</h1>
          <input
          className="border autofocus "
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="border-double border-4 rounded-md p-2 text-white bg-red-600" onClick={handleSearch}>Search</button>

          
          {searchVolume!= null && searchVolume >= 1000000 && "More than a million searches"}
          
          {searchVolume !== null && searchVolume <1000000 && <p>Search Volume: {searchVolume}</p>} 

         
      </div>
  );
}
  


export default App;
