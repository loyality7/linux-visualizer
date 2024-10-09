import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      position="fixed"
      top={4}
      right={4}
      onClick={toggleColorMode}
      size="sm"
      zIndex={1}
    >
      {colorMode === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
};

export default ColorModeToggle;
