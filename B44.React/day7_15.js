import React from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import { AuthProvider } from './AuthContext';
import { ThemeProvider, useThemeContext } from './ThemeContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

const ThemedApp = () => {
  const { theme } = useThemeContext();
  const bg = theme === 'light' ? 'gray.50' : 'gray.800';
  const color = theme === 'light' ? 'black' : 'white';

  return (
    <Box minH="100vh" bg={bg} color={color}>
      <Navbar />
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Sidebar />
        <MainContent />
      </Flex>
      <Footer />
    </Box>
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <AuthProvider>
          <ThemedApp />
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
