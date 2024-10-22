export const getCommandDescription = (command) => {
  const descriptions = {
    ls: "List directory contents. ",
    cd: "Change the current directory. ",
    pwd: "Print the current working directory.",
    mkdir: "Make directories",
    rmdir: "Remove empty directories",
    touch: "Change file timestamps or create an empty file",
    rm: "Remove files or directories",
    cp: "Copy files and directories",
    mv: "Move (rename) files",
    cat: "Concatenate files and print on the standard output",
    less: "Display file contents one screen at a time",
    head: "Display the first part of files",
    tail: "Display the last part of files",
    grep: "Search for patterns in files",
    find: "Search for files in directories",
    chmod: "Change file mode bits",
    chown: "Change file owner and group",
    ps: "Report a snapshot of current processes",
    top: "Display Linux processes",
    awk: "Pattern scanning and processing language",
    ip: "Show / manipulate routing, network devices, interfaces and tunnels",
  };

  return descriptions[command] || "No description available for this command.";
};

export const getDetailedCommandDescription = (command) => {
  const descriptions = {
    ls: {
      short: "List directory contents.",
      long: "Lists information about files and directories within the file system.",
      usage: "ls [OPTION]... [FILE]...",
      examples: [
        "ls",
        "ls -l",
        "ls -a",
        "ls -la /home/user"
      ]
    },
    cd: {
      short: "Change the current directory.",
      long: "Changes the shell working directory.",
      usage: "cd [DIRECTORY]",
      examples: [
        "cd /",
        "cd ..",
        "cd Documents"
      ]
    },
    awk: {
      short: "Pattern scanning and processing language",
      long: "AWK is a versatile programming language for pattern scanning and processing.",
      usage: "awk [OPTIONS] [SCRIPT] [FILE]...",
      examples: [
        "awk '{print $1}' NewFile.txt",
        "awk '/pattern/ {print $0}' NewFile.txt"
      ]
    },
    pwd: {
      short: "Print the current working directory.",
      long: "Prints the current working directory.",
      usage: "pwd",
      examples: [
        "pwd"
      ]
    },
    mkdir: {
      short: "Make directories",
      long: "Creates a new directory with the specified name.",
      usage: "mkdir [DIRECTORY]",
      examples: [
        "mkdir NewFolder",
        "mkdir Documents/NewFolder"
      ]
    },
    rmdir: {
      short: "Remove empty directories",
      long: "Removes an empty directory with the specified name.",
      usage: "rmdir [DIRECTORY]",
      examples: [
        "rmdir NewFolder",
        "rmdir Documents/NewFolder"
      ]
    },
    touch: {
      short: "Change file timestamps or create an empty file",
      long: "Creates an empty file with the specified name.",
      usage: "touch [FILE]",
      examples: [
        "touch NewFile.txt",
        "touch Documents/NewFile.txt"
      ]
    },
    rm: {
      short: "Remove files or directories",
      long: "Removes files or directories with the specified name.",
      usage: "rm [FILE]...",
      examples: [
        "rm NewFile.txt",
        "rm Documents/NewFile.txt"
      ]
    },
    cp: {
      short: "Copy files and directories",
      long: "Copies files or directories to the specified location.",
      usage: "cp [OPTION]... SOURCE DEST",
      examples: [
        "cp NewFile.txt Documents",
        "cp Documents/NewFile.txt Documents/NewFolder"
      ]
    },
    mv: {
      short: "Move (rename) files",
      long: "Moves files or directories to the specified location.",
      usage: "mv [OPTION]... SOURCE DEST",
      examples: [
        "mv NewFile.txt Documents",
        "mv Documents/NewFile.txt Documents/NewFolder"
      ]
    },
    cat: {
      short: "Concatenate files and print on the standard output",
      long: "Displays the contents of files on the standard output.",
      usage: "cat [FILE]...",
      examples: [
        "cat NewFile.txt",
        "cat Documents/NewFile.txt"
      ]
    },
    less: { 
        short: "Display file contents one screen at a time",
        long: "Displays the contents of files one screen at a time.",
        usage: "less [FILE]",
        examples: [
          "less NewFile.txt",
          "less Documents/NewFile.txt"
        ]
    },
    head: {     
        short: "Display the first part of files",
        long: "Displays the first part of files.",
        usage: "head [FILE]...",
        examples: [
          "head NewFile.txt",
          "head Documents/NewFile.txt"
        ]
    },
    tail: {             
        short: "Display the last part of files",
        long: "Displays the last part of files.",
        usage: "tail [FILE]...",
        examples: [
          "tail NewFile.txt",
          "tail Documents/NewFile.txt"
        ]
    },  
    grep: {
        short: "Search for patterns in files",
        long: "Searches for patterns in files.",
        usage: "grep [OPTION]... PATTERN [FILE]...",
        examples: [
          "grep 'hello' NewFile.txt",
          "grep 'hello' Documents/NewFile.txt"
        ]
    },      
    find: {
        short: "Search for files in directories",
        long: "Searches for files in directories.",
        usage: "find [PATH] [EXPRESSION]",
        examples: [
          "find Documents -name '*.txt'",
          "find / -name 'NewFile.txt'"
        ]
    },      
    chmod: {
        short: "Change file mode bits",
        long: "Changes the file mode bits of the specified file.",
        usage: "chmod [MODE] FILE",
        examples: [
          "chmod 755 NewFile.txt",
          "chmod 644 Documents/NewFile.txt"
        ]
    },      
    chown: {
        short: "Change file owner and group",
        long: "Changes the owner and group of the specified file.",
        usage: "chown [USER]:[GROUP] FILE",
        examples: [
          "chown user:group NewFile.txt",
          "chown user:group Documents/NewFile.txt"
        ]       
    },
    ps: {
        short: "Report a snapshot of current processes",
        long: "Reports a snapshot of current processes.",
        usage: "ps [OPTION]...",
        examples: [
          "ps",
          "ps aux"                              
        ]
    },
    top: {
        short: "Display Linux processes",
        long: "Displays Linux processes.",
        usage: "top [OPTION]...",
        examples: [
          "top",
          "top -u user"
        ]
    },
    // Add more commands with detailed descriptions
  };

  return descriptions[command] || null;
};

// Add this new function to handle 'man' command
export const getManPageDescription = (command) => {
  const description = getDetailedCommandDescription(command);
  if (!description) return null;

  return `
NAME
    ${command} - ${description.short}

SYNOPSIS
    ${description.usage}

DESCRIPTION
    ${description.long}

EXAMPLES
    ${description.examples.join('\n    ')}

`;

 };
