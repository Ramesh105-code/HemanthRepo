// src/context/BookmarksContext.jsx
import { createContext, useContext, useState } from "react";

const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const addBookmark = (article) => {
    setBookmarks((prev) => {
      const updated = [...prev, article];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookmark = (url) => {
    setBookmarks((prev) => {
      const updated = prev.filter((item) => item.url !== url);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

 export default  function useBookmarks () {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within BookmarksProvider");
  }
  return context;
};
