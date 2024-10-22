import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Flex, VStack, Text, Heading, Input } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import FileList from './FileList';
import { createMockFileSystem, getDirectoryContents, hasPermission, deleteFile, createFile, createDirectory } from '../../utils/fileSystemUtils';
import { parseCommand } from '../../utils/commandParser';
import { getCommandDescription,  getManPageDescription } from '../../utils/commandDescriptions';
import { getIpInfo } from '../../utils/networkUtils'; // Add this import


// Add this new import for the SVG icon
// import { ReactComponent as FolderIcon } from '../../assets/folder-icon.svg';

const FileSystemVisualizer = () => {
  const { command } = useParams();
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [fileSystem, setFileSystem] = useState(createMockFileSystem());
  const [files, setFiles] = useState(getDirectoryContents(fileSystem, currentDir));
  const [isVertical, setIsVertical] = useState(false);
  const [terminalLineData, setTerminalLineData] = useState([{ type: 'input', value: '' }]);
  const [animatingFile, setAnimatingFile] = useState(null);
  const [currentUser] = useState('user');
  const [displayedContent, setDisplayedContent] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [commandDescription, setCommandDescription] = useState('');
  const [commandInfo, setCommandInfo] = useState(null);
  const [commandHistory, setCommandHistory] = useState([]);

  useEffect(() => {
    const directoryContents = getDirectoryContents(fileSystem, currentDir);
    setFiles(directoryContents || []); // Ensure files is always an array
    setDisplayedContent(null);
    setCommandDescription(getCommandDescription(command));
  }, [currentDir, fileSystem, command]);

  // Add this function at the top level of your component
  const refreshFileList = () => {
    setFiles(getDirectoryContents(fileSystem, currentDir));
  };

  const handleCommand = (input) => {
    let { command, args } = parseCommand(input);
    let isSudo = false;

    if (command === 'sudo') {
      isSudo = true;
      command = args.shift();
    }

    setCommandHistory(prevHistory => [...prevHistory, input]);

    let output = '';

    switch (command) {
      case 'man':
        if (args.length === 0) {
          output = 'What manual page do you want?\nFor example, try \'man ls\'.';
        } else {
          const manPage = getManPageDescription(args[0]);
          if (manPage) {
            setDisplayedContent(manPage);
            output = `Displaying manual page for ${args[0]}`;
          } else {
            output = `No manual entry for ${args[0]}`;
          }
        }
        break;
      case 'clear':
        setTerminalLineData([]);
        setDisplayedContent(null);
        setIsVertical(false);
        setShowDetailedView(false);
        setCommandInfo(null);
        return ''; // Return empty string to avoid adding output to cleared terminal
      case 'ls':
        setDisplayedContent(null); // Clear displayed content
        const currentDirContents = fileSystem[currentDir] || [];
        if (args.includes('-l') || args.includes('-al') || args.includes('-la')) {
          setIsVertical(true);
          setShowDetailedView(true);
          output = currentDirContents.map(f => 
            `${f.permissions} ${f.owner} group ${f.type === 'directory' ? '4096' : '0'} Jan 1 00:00 ${f.name}`
          ).join('\n');
        } else if (args.includes('-a') || args.includes('-al') || args.includes('-la')) {
          output = ['.', '..', ...currentDirContents.map(f => f.name)].join(' ');
        } else {
          setIsVertical(false);
          setShowDetailedView(false);
          output = currentDirContents.map(f => f.name).join(' ');
        }
        break;
      case 'cd':
        setDisplayedContent(null); // Clear displayed content
        if (args.length === 0 || args[0] === '~') {
          setCurrentDir('/home/user');
          output = 'Changed directory to /home/user';
        } else if (args[0] === '..') {
          const newPath = currentDir.split('/').slice(0, -1).join('/') || '/';
          setCurrentDir(newPath);
          output = `Changed directory to ${newPath}`;
        } else {
          const newPath = args[0].startsWith('/')
            ? args[0]
            : `${currentDir}/${args[0]}`.replace(/\/+/g, '/');
          if (fileSystem[newPath]) {
            setCurrentDir(newPath);
            output = `Changed directory to ${newPath}`;
          } else {
            output = `Directory not found: ${args[0]}`;
          }
        }
        setIsVertical(false);
        setShowDetailedView(false);
        break;
      case 'pwd':
        output = currentDir;
        break;
      case 'cat':
        if (args[0]) {
          const file = files.find(f => f.name === args[0]);
          if (file && file.type === 'file') {
            if (isSudo || hasPermission(file, currentUser, 'read')) {
              if (file.content) {
                setDisplayedContent(`Contents of ${args[0]}:\n${file.content}`);
              } else {
                setDisplayedContent(`Contents of ${args[0]}:\nThis file is empty or has no content defined.`);
              }
              output = `Displaying contents of ${args[0]}`;
            } else {
              output = 'Permission denied';
            }
          } else {
            output = `cat: ${args[0]}: No such file or directory`;
          }
        } else {
          output = 'Usage: cat <filename>';
        }
        break;
      case 'echo':
        if (args.length === 0) {
          output = '';
        } else {
          const joinedArgs = args.join(' ');
          const redirectIndex = joinedArgs.indexOf('>');
          if (redirectIndex !== -1) {
            // Handle redirection
            const content = joinedArgs.slice(0, redirectIndex).trim().replace(/^"(.*)"$/, '$1');
            const fileName = joinedArgs.slice(redirectIndex + 1).trim();
            if (fileName) {
              const newFile = {
                name: fileName,
                type: 'file',
                permissions: '-rw-r--r--',
                owner: currentUser,
                content: content
              };
              const updatedFileSystem = {...fileSystem};
              if (!updatedFileSystem[currentDir]) {
                updatedFileSystem[currentDir] = [];
              }
              const existingFileIndex = updatedFileSystem[currentDir].findIndex(f => f.name === fileName);
              if (existingFileIndex !== -1) {
                // Update existing file
                updatedFileSystem[currentDir][existingFileIndex] = newFile;
              } else {
                // Create new file
                updatedFileSystem[currentDir].push(newFile);
              }
              setFileSystem(updatedFileSystem);
              output = `Content written to ${fileName}`;
            } else {
              output = 'Invalid file name for redirection';
            }
          } else {
            // Regular echo
            output = joinedArgs.replace(/^"(.*)"$/, '$1');
          }
        }
        setDisplayedContent(output);
        break;
      case 'rm':
        if (args.includes('-r') || args.includes('-rf')) {
          if (args.length < 2) {
            output = 'Usage: rm -rf <directory>';
          } else {
            const dirName = args[args.length - 1];
            const dirPath = `${currentDir}/${dirName}`.replace(/\/+/g, '/');
            
            if (fileSystem[currentDir].some(item => item.name === dirName && item.type === 'directory')) {
              if (isSudo || hasPermission(fileSystem[currentDir].find(item => item.name === dirName), currentUser, 'write')) {
                delete fileSystem[dirPath];
                fileSystem[currentDir] = fileSystem[currentDir].filter(item => item.name !== dirName);
                setFileSystem({...fileSystem});
                setFiles(getDirectoryContents(fileSystem, currentDir)); // Update files state
                output = `Removed directory: ${dirName}`;
              } else {
                output = 'Permission denied. Try using sudo.';
              }
            } else {
              output = `rm: cannot remove '${dirName}': No such file or directory`;
            }
          }
        } else {
          if (args.length === 0) {
            output = 'Usage: rm <filename>';
          } else {
            const fileName = args[0];
            const file = files.find(f => f.name === fileName);
            if (file) {
              if (isSudo || hasPermission(file, currentUser, 'write')) {
                const success = deleteFile(fileSystem, currentDir, fileName);
                if (success) {
                  setFileSystem({...fileSystem}); // Trigger re-render
                  output = `Deleted file: ${fileName}`;
                } else {
                  output = `Failed to delete file: ${fileName}`;
                }
              } else {
                output = 'Permission denied. Try using sudo.';
              }
            } else {
              output = `rm: cannot remove '${fileName}': No such file or directory`;
            }
          }
        }
        break;
      case 'touch':
        if (args.length === 0) {
          output = 'Usage: touch <filename>';
        } else {
          const fileName = args[0];
          if (files.find(f => f.name === fileName)) {
            output = `File '${fileName}' already exists`;
          } else {
            const success = createFile(fileSystem, currentDir, fileName, currentUser);
            if (success) {
              setFileSystem({...fileSystem}); // Trigger re-render
              output = `Created file: ${fileName}`;
            } else {
              output = `Failed to create file: ${fileName}`;
            }
          }
        }
        break;
      case 'mkdir':
        if (args.includes('-p')) {
          // Add logic to create parent directories if they don't exist
          output = 'Creating parent directories not implemented in this demo';
        } else if (args.length === 0) {
          output = 'Usage: mkdir <directory_name>';
        } else {
          const dirName = args[0];
          if (files.find(f => f.name === dirName)) {
            output = `Directory '${dirName}' already exists`;
          } else {
            const success = createDirectory(fileSystem, currentDir, dirName, currentUser);
            if (success) {
              setFileSystem({...fileSystem}); // Trigger re-render
              output = `Created directory: ${dirName}`;
              // Animate the new directory
              setAnimatingFile(dirName);
              setTimeout(() => setAnimatingFile(null), 300);
            } else {
              output = `Failed to create directory: ${dirName}`;
            }
          }
        }
        break;
      case 'cp':
        if (args.length < 2) {
          output = 'Usage: cp <source> <destination>';
        } else {
          // Add file copy logic here
          output = `Copied ${args[0]} to ${args[1]}`;
        }
        break; // Make sure this break statement is here

      case 'mv':
        if (args.length < 2) {
          output = 'Usage: mv <source> <destination>';
        } else {
          const sourcePath = args[0];
          const destPath = args[1];
          const sourceDir = currentDir;
          const destDir = destPath.startsWith('/') ? destPath.split('/').slice(0, -1).join('/') || '/' : currentDir;
          const destFileName = destPath.split('/').pop();
          
          // Find the file to move
          const fileToMove = fileSystem[sourceDir]?.find(f => f.name === sourcePath);
          
          if (fileToMove) {
            // Remove file from source directory
            fileSystem[sourceDir] = fileSystem[sourceDir].filter(f => f.name !== sourcePath);
            
            // Add file to destination directory
            if (!fileSystem[destDir]) {
              fileSystem[destDir] = [];
            }
            fileSystem[destDir].push({...fileToMove, name: destFileName});
            
            setFileSystem({...fileSystem});
            setFiles(getDirectoryContents(fileSystem, currentDir)); // Update current directory contents
            output = `Moved ${sourcePath} to ${destPath}`;
          } else {
            output = `mv: cannot stat '${sourcePath}': No such file or directory`;
          }
        }
        break;

      case 'grep':
        if (args.length < 2) {
          output = 'Usage: grep <pattern> <file>';
        } else {
          // Add grep logic here
          output = `Grep results for pattern '${args[0]}' in ${args[1]}`;
        }
        break;
      case 'chmod':
        if (args.length < 2) {
          output = 'Usage: chmod <mode> <file>';
        } else {
          const mode = args[0];
          const fileName = args[1];
          const file = fileSystem[currentDir].find(f => f.name === fileName);
          if (file) {
            if (isSudo || hasPermission(file, currentUser, 'write')) {
              // Update the file's permissions
              file.permissions = updatePermissions(file.permissions, mode);
              setFileSystem({...fileSystem});
              refreshFileList();
              output = `Changed permissions of ${fileName} to ${mode}`;
            } else {
              output = 'Permission denied. Try using sudo.';
            }
          } else {
            output = `chmod: cannot access '${fileName}': No such file or directory`;
          }
        }
        break;
      case 'ssh':
        if (args.length < 1) {
          output = 'Usage: ssh <user@host>';
        } else {
          output = `SSH connection to ${args[0]} not implemented in this demo`;
        }
        break;
      case 'awk':
        if (args.length < 2) {
          output = 'Usage: awk <pattern> <file>';
        } else {
          const pattern = args[0];
          const fileName = args[args.length - 1];
          const file = files.find(f => f.name === fileName);
          if (file && file.type === 'file') {
            if (hasPermission(file, currentUser, 'read')) {
              if (file.content) {
                const lines = file.content.split('\n');
                const processedLines = lines.map(line => {
                  const fields = line.split(/\s+/);
                  // Simple implementation of '{print $1}'
                  if (pattern === "'{print $1}'") {
                    return fields[0] || '';
                  }
                  // Add more pattern implementations here as needed
                  return line;
                }).filter(line => line !== '');
                output = processedLines.join('\n') || 'No matches found';
              } else {
                output = 'File is empty';
              }
              setDisplayedContent(`awk ${pattern} ${fileName}:\n${output}`);
            } else {
              output = 'Permission denied';
            }
          } else {
            output = `awk: ${fileName}: No such file or directory`;
          }
        }
        break;
      case 'rmdir':
        if (args.length === 0) {
          output = 'Usage: rmdir <directory>';
        } else {
          const dirName = args[0];
          const dirPath = `${currentDir}/${dirName}`.replace(/\/+/g, '/');
          
          if (fileSystem[currentDir].some(item => item.name === dirName && item.type === 'directory')) {
            if (isSudo || hasPermission(fileSystem[currentDir].find(item => item.name === dirName), currentUser, 'write')) {
              if (fileSystem[dirPath] && fileSystem[dirPath].length === 0) {
                delete fileSystem[dirPath];
                fileSystem[currentDir] = fileSystem[currentDir].filter(item => item.name !== dirName);
                setFileSystem({...fileSystem});
                setFiles(getDirectoryContents(fileSystem, currentDir)); // Update files state
                output = `Removed directory: ${dirName}`;
              } else {
                output = `rmdir: failed to remove '${dirName}': Directory not empty`;
              }
            } else {
              output = 'Permission denied. Try using sudo.';
            }
          } else {
            output = `rmdir: failed to remove '${dirName}': No such file or directory`;
          }
        }
        break;
      case 'id':
        output = `uid=1000(${currentUser}) gid=1000(${currentUser}) groups=1000(${currentUser}),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),113(lpadmin),128(sambashare)`;
        setDisplayedContent(output);
        break;

      case 'uid':
        output = '1000';
        setDisplayedContent(output);
        break;

      case 'uname':
        if (args.includes('-a')) {
          output = 'Linux localhost 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux';
        } else {
          output = 'Linux';
        }
        setDisplayedContent(output);
        break;

      case 'history':
        output = commandHistory.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        setDisplayedContent(output);
        break;
      case 'ip':
        if (args.length === 0 || args[0] === 'a' || args[0] === 'addr') {
          const ipInfo = getIpInfo();
          output = ipInfo;
          setDisplayedContent(output);
        } else {
          output = `Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }\n       ip [ -force ] -batch filename`;
        }
        break;
      default:
        setDisplayedContent(null); // Clear displayed content for unknown commands
        output = `Command not found: ${command}. Type 'man <command>' for help.`;
    }

    return output;
  };

  const onInput = (input) => {
    setTerminalLineData(prevData => [...prevData, { type: 'input', value: input }]);
    const output = handleCommand(input);
    if (output !== '') {
      setTerminalLineData(prevData => [...prevData, { type: 'output', value: output }]);
    }
  };

  // Add this function to update permissions
  const updatePermissions = (currentPermissions, mode) => {
    let newPermissions = currentPermissions;
    if (mode.includes('+x')) {
      newPermissions = newPermissions.slice(0, 3) + 'x' + newPermissions.slice(4);
    }
    // Add more cases for other chmod options as needed
    return newPermissions;
  };

  // Update the renderFolderIcon function
  const renderFolderIcon = () => (
    <svg viewBox="0 0 347.479 347.479" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_iconCarrier">
        <path style="fill:#E0B03B;" d="M292.251,79.766H103.644v-8.544c0-5.974-4.888-10.862-10.862-10.862H30.414 c-5.975,0-10.862,4.888-10.862,10.862v8.544h-3.258C7.332,79.766,0,87.098,0,96.059v174.766c0,8.961,7.332,16.293,16.293,16.293 h275.958c8.961,0,16.293-7.332,16.293-16.293V96.059C308.545,87.098,301.213,79.766,292.251,79.766z"></path>
        <rect x="23.243" y="95.385" style="fill:#FFFFFF;" width="262.059" height="176.113"></rect>
        <path style="fill:#FFC843;" d="M312.426,271.293c-2.135,8.704-11.213,15.825-20.175,15.825H16.293 c-8.961,0-14.547-7.121-12.412-15.825l34.598-141.05c2.135-8.704,11.213-15.825,20.175-15.825h275.958 c8.961,0,14.547,7.121,12.412,15.825L312.426,271.293z"></path>
      </g>
    </svg>
  );

  
  return (
    <ChakraProvider>
      <Flex height="100vh" width="100vw">
        <Box width="50%" p={4} bg="gray.900" color="white" overflowY="auto">
          <Heading as="h2" size="lg" mb={4}>{command}</Heading>
          <Text mb={4}>{commandDescription}</Text>
          <VStack align="stretch" spacing={2}>
            {terminalLineData.map((line, index) => (
              <Text key={index} whiteSpace="pre-wrap">
                {line.type === 'input' ? `${currentUser}@localhost:${currentDir}$ ` : ''}{line.value}
              </Text>
            ))}
            <Input
              placeholder="Enter command"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onInput(e.target.value);
                  e.target.value = '';
                }
              }}
              bg="transparent"
              border="none"
              _focus={{ outline: 'none' }}
            />
          </VStack>
        </Box>
        <VStack width="50%" p={4} bg="gray.100" spacing={4} align="stretch">
          <Text fontSize="lg" fontWeight="bold">Current directory: {currentDir}</Text>
          {displayedContent ? (
            <Box bg="white" p={4} borderRadius="md" whiteSpace="pre-wrap">
              <Text>{displayedContent}</Text>
            </Box>
          ) : (
            <FileList 
              files={files || []}
              isVertical={isVertical} 
              showDetailedView={showDetailedView}
              animatingFile={animatingFile}
              folderIcon={renderFolderIcon()} // This should now correctly pass the SVG
            />
          )}
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default FileSystemVisualizer;
