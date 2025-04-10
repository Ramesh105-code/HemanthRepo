import { Box, Heading } from "@chakra-ui/react";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg">
      <Heading mb={6} textAlign="center">Redux Todo App</Heading>
      <TodoInput />
      <TodoList />
    </Box>
  );
}

export default App;
