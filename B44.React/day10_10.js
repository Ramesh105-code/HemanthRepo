import { useSelector, useDispatch } from "react-redux";
import { deleteBook, markRead } from "../redux/actions/bookActions";
import { Box, Button, Stack, Text } from "@chakra-ui/react";

export default function BookList() {
  const books = useSelector(state => state.books);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  const filteredBooks = books.filter(book => {
    const genreMatch = filters.genre ? book.genre === filters.genre : true;
    const authorMatch = filters.author ? book.author.includes(filters.author) : true;
    const statusMatch =
      filters.status === "read" ? book.read :
      filters.status === "unread" ? !book.read : true;
    return genreMatch && authorMatch && statusMatch;
  });

  return (
    <Stack spacing={4} mt={4}>
      {filteredBooks.map(book => (
        <Box key={book.id} borderWidth="1px" p={4} rounded="md" shadow="sm">
          <Text fontWeight="bold">{book.title}</Text>
          <Text>Author: {book.author}</Text>
          <Text>Genre: {book.genre}</Text>
          <Text>Status: {book.read ? "Read" : "Unread"}</Text>
          <Button size="sm" colorScheme="blue" mr={2} onClick={() => dispatch(markRead(book.id))}>Mark as Read</Button>
          <Button size="sm" colorScheme="red" onClick={() => dispatch(deleteBook(book.id))}>Delete</Button>
        </Box>
      ))}
    </Stack>
  );
}
