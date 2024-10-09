import React from 'react';
import { ChakraProvider, Box, VStack, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/FileSystem/LandingPage';
import FileSystemVisualizer from './components/FileSystem/FileSystemVisualizer';
import ColorModeToggle from './components/FileSystem/ColorModeToggle';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Box minHeight="100vh">
          <VStack spacing={0} align="stretch">
            <ColorModeToggle />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/command/:command" element={<FileSystemVisualizer />} />
            </Routes>
          </VStack>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;