import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const accessKey = "5y-NG5XjsMJsItz1JyuqwFGz9A42g29CpJZVWSv8dF8";

  const searchImages = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=${accessKey}&query=${query}`
    );
    setImages(response.data);
  };

  const addToBookmarks = (id) => {
    const bookmarkedImg = images.find((img) => img.id === id);
    setBookmarks([...bookmarks, bookmarkedImg]);
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (storedBookmarks) {
      setBookmarks(storedBookmarks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const getRows = (images) => {
    const rows = [];
    let rowindex = 0;
    while (rowindex < images.length) {
      const row = images.slice(rowindex, rowindex + 3);
      rows.push(row);
      rowindex += 3;
    }
    return rows;
  };

  return (
    <div className="app">
      <h1>IMAGE-SEARCH</h1>
      
      <form onSubmit={searchImages}>
        <input
          type="text"
          placeholder="Search for images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /><br/>
        <button type="submit">Search</button>
      </form>

      <div className="image-container">
        {getRows(images).map((row, rowindex) => (
          <div key={rowindex} className="row">
            {row.map((img) => (
              <div key={img.id} className="image-card">
                <img src={img.urls.regular} alt={img.alt_description} />
                <div
                  className="bookmark"
                  onClick={() => addToBookmarks(img.id)}
                >
                  &#x2764;
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bookmarks-container">
        <h2>Bookmarks</h2>
        <div className="bookmarks">
          {bookmarks.map((img) => (
            <div key={img.id} className="bookmarked-image">
              <img src={img.urls.regular} alt={img.alt_description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
