const Library = require('../models/Library');


exports.getAllBooks = async (req, res) => {
  try {
    const libraries = await Library.find();
    const books = libraries.flatMap(lib =>
      lib.books.map(book => ({
        title: book.title,
        author: book.author,
        genre: book.genres,
        libraryName: lib.name,
      }))
    );
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addGenre = async (req, res) => {
  const { libraryId, bookTitle } = req.params;
  const { newGenre } = req.body;

  try {
    const library = await Library.findById(libraryId);
    if (!library) return res.status(404).json({ error: 'Library not found' });

    const book = library.books.find(b => b.title === bookTitle);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (!book.genres.includes(newGenre)) {
      book.genres.push(newGenre);
      await library.save();
      return res.json({ message: 'Genre added', book });
    }

    res.json({ message: 'Genre already exists', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getLibrariesByGenres = async (req, res) => {
  const genres = req.query.genres?.split(',') || [];

  try {
    const libraries = await Library.find({
      books: {
        $elemMatch: {
          genres: { $in: genres },
        },
      },
    });

    res.json(libraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBooksByCriteria = async (req, res) => {
  const { author, minPublicationYear, genres } = req.query;
  const genreArray = genres?.split(',') || [];

  try {
    const libraries = await Library.find({
      books: {
        $elemMatch: {
          ...(author && { author }),
          ...(minPublicationYear && { publicationYear: { $gte: parseInt(minPublicationYear) } }),
          ...(genres && { genres: { $in: genreArray } }),
        },
      },
    });

    const matchedBooks = libraries.flatMap(lib =>
      lib.books.filter(book =>
        (!author || book.author === author) &&
        (!minPublicationYear || book.publicationYear >= minPublicationYear) &&
        (!genres || book.genres.some(g => genreArray.includes(g)))
      ).map(book => ({
        ...book.toObject(),
        libraryName: lib.name,
      }))
    );

    res.json(matchedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeBook = async (req, res) => {
  const { libraryId, bookTitle } = req.params;

  try {
    const library = await Library.findById(libraryId);
    if (!library) return res.status(404).json({ error: 'Library not found' });

    const originalLength = library.books.length;
    library.books = library.books.filter(b => b.title !== bookTitle);

    if (originalLength === library.books.length)
      return res.status(404).json({ error: 'Book not found in library' });

    await library.save();
    res.json({ message: 'Book removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
