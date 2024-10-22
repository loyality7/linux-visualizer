import React from 'react';
import { Box, SimpleGrid, Button, Heading, Container, Text, VStack, useColorModeValue, Flex } from '@chakra-ui/react';
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
  const hoverBg = useColorModeValue(`${cmd.color}50`, `${cmd.color}900`);
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Link to={`/command/${cmd.name}`}>
      <Button
        width="100%"
        height={{ base: "80px", md: "100px" }}
        bg={bg}
        _hover={{ bg: hoverBg, transform: 'translateY(-5px)' }}
        boxShadow="md"
        borderRadius="lg"
        transition="all 0.3s"
        borderLeft={`4px solid ${cmd.color}`}
      >
        <VStack spacing={2}>
          <cmd.icon size="24" color={cmd.color} />
          <Text fontWeight="bold" color={textColor}>{cmd.name}</Text>
        </VStack>
      </Button>
    </Link>
  );
};

const LandingPage = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('blue.600', 'blue.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box bg={bg} minHeight="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex direction="column" align="center" mb={8}>
            <Heading as="h1" size="2xl" textAlign="center" color={headingColor} mb={4}>
              Linux Command Visualizer
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} textAlign="center" color={textColor} maxW="600px">
              Explore and learn Linux commands interactively. Click on a command to see it in action!
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={{ base: 4, md: 6 }}>
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
