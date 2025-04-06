import { Box, Flex, Grid, Button, useColorModeValue } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

function App() {
  const { isLoggedIn, toggleAuth } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

 
  const navBg = theme === 'light' ? 'gray.100' : 'gray.700';
  const cardBg = theme === 'light' ? 'gray.200' : 'gray.600';
  const footerBg = theme === 'light' ? 'gray.300' : 'gray.800';
  const textColor = theme === 'light' ? 'black' : 'white';

  return (
    <Box color={textColor} minH="100vh" bg={theme === 'light' ? 'white' : 'gray.900'}>
      {/* Navbar */}
      <Flex as="nav" p="4" bg={navBg} justifyContent="space-between">
        <Button onClick={toggleAuth}>
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </Button>
        <Button onClick={toggleTheme}>
          Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </Button>
      </Flex>

      {/* Main Grid */}
      <Grid
        templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} // Responsive
        gap="4"
        p="4"
      >
        {['Card 1', 'Card 2', 'Card 3'].map((card) => (
          <Box key={card} p="6" shadow="md" borderRadius="md" bg={cardBg}>
            {card}
          </Box>
        ))}
      </Grid>

      {/* Footer */}
      <Box as="footer" p="4" bg={footerBg} textAlign="center">
        {isLoggedIn ? 'Welcome, User' : 'Please log in'}
      </Box>
    </Box>
  );
}

export default App;
