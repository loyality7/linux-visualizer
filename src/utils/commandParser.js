export const parseCommand = (commandString) => {
    const [command, ...args] = commandString.trim().split(' ');
    return { command, args };
  };