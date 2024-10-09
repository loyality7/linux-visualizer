import React from 'react';
import { Box, SimpleGrid, Button, Heading, Container, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaTerminal, FaFolder, FaFile, FaCopy, FaTrash, FaSearch, FaUserLock, FaNetworkWired } from 'react-icons/fa';

const commands = [
  { name: 'ls', icon: FaFolder, color: 'blue.500' },
  { name: 'cd', icon: FaFolder, color: 'green.500' },
  { name: 'pwd', icon: FaTerminal, color: 'purple.500' },
  { name: 'mkdir', icon: FaFolder, color: 'yellow.500' },
  { name: 'touch', icon: FaFile, color: 'cyan.500' },
  { name: 'rm', icon: FaTrash, color: 'red.500' },
  { name: 'cp', icon: FaCopy, color: 'orange.500' },
  { name: 'mv', icon: FaFile, color: 'pink.500' },
  { name: 'cat', icon: FaFile, color: 'teal.500' },
  { name: 'grep', icon: FaSearch, color: 'blue.300' },
  { name: 'chmod', icon: FaUserLock, color: 'red.300' },
  { name: 'ssh', icon: FaNetworkWired, color: 'green.300' },
  { name: 'awk', icon: FaSearch, color: 'purple.300' },
];

const CommandButton = ({ cmd }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Link to={`/command/${cmd.name}`}>
      <Button
        width="100%"
        height="100px"
        bg={bg}
        _hover={{ bg: hoverBg }}
        boxShadow="md"
        borderRadius="lg"
        transition="all 0.3s"
      >
        <VStack spacing={2}>
          <cmd.icon size="24" color={cmd.color} />
          <Text fontWeight="bold">{cmd.name}</Text>
        </VStack>
      </Button>
    </Link>
  );
};

const LandingPage = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bg} minHeight="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center">
            Linux Command Visualizer
          </Heading>
          <Text fontSize="xl" textAlign="center">
            Click on a command to learn more and see it in action!
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing={6}>
            {commands.map((cmd) => (
              <CommandButton key={cmd.name} cmd={cmd} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
