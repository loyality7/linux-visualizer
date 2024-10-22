import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Text, SimpleGrid, VStack, Flex } from '@chakra-ui/react';
import FileIcon from './FileIcon';
import { FaFile } from 'react-icons/fa';

const FileList = ({ files, isVertical, showDetailedView, animatingFile, folderIcon }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const FileItem = ({ file }) => {
    const isAnimating = animatingFile && animatingFile.name === file.name;
    const animationProps = isAnimating ? getAnimationProps(animatingFile.animation) : {};
    const hasExecutablePermission = file.permissions && file.permissions.includes('x');

    const getPermissionString = (permissions) => {
      if (!permissions) return '---';
      let result = '';
      result += permissions.includes('r') ? 'r' : '-';
      result += permissions.includes('w') ? 'w' : '-';
      result += permissions.includes('x') ? 'x' : '-';
      return result;
    };

    return (
      <motion.div variants={itemVariant} {...animationProps}>
        <Box
          bg="white"
          p={2}
          borderRadius="md"
          boxShadow="md"
          display="flex"
          flexDirection={isVertical ? 'row' : 'column'}
          alignItems="center"
          width="100%"
        >
          <FileIcon 
            fileName={file.name} 
            isDirectory={file.type === 'directory'} 
            permissions={file.permissions || ''}
            hasExecutablePermission={hasExecutablePermission}
          />
          <Text 
            ml={isVertical ? 2 : 0} 
            mt={isVertical ? 0 : 2} 
            fontSize="sm"
            color={hasExecutablePermission ? "green.500" : "inherit"}
          >
            {file.name}
          </Text>
          {showDetailedView && (
            <Text ml="auto" fontSize="xs" color={hasExecutablePermission ? "green.500" : "gray.500"}>
              {`${getPermissionString(file.permissions)} ${file.owner || 'unknown'} ${file.group || 'unknown'} ${file.type === 'directory' ? '4096' : '0'} Jan 1 00:00`}
            </Text>
          )}
        </Box>
      </motion.div>
    );
  };

  const getAnimationProps = (animation) => {
    switch (animation) {
      case 'create':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.3 }
        };
      case 'delete':
        return {
          exit: { scale: 0, opacity: 0 },
          transition: { duration: 0.3 }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <AnimatePresence>
        {isVertical ? (
          <VStack spacing={2} align="stretch" width="100%">
            {files.map((file) => (
              <FileItem key={file.name} file={file} />
            ))}
          </VStack>
        ) : (
          <SimpleGrid columns={3} spacing={4}>
            {files.map((file) => (
              <FileItem key={file.name} file={file} />
            ))}
          </SimpleGrid>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FileList;
