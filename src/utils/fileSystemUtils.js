export const createMockFileSystem = () => ({
    '/': [
      { name: 'bin', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'boot', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'dev', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'etc', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'home', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'lib', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'media', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'mnt', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'opt', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'proc', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'root', type: 'directory', permissions: 'drwx------', owner: 'root' },
      { name: 'run', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'sbin', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'srv', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'sys', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'tmp', type: 'directory', permissions: 'drwxrwxrwt', owner: 'root' },
      { name: 'usr', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'var', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'README.txt', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/bin': [
      { name: 'bash', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'ls', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'cd', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'pwd', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'cat', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'grep', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
    ],
    '/etc': [
      { name: 'passwd', type: 'file' },
      { name: 'hosts', type: 'file' },
      { name: 'resolv.conf', type: 'file' },
      { name: 'fstab', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'group', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/home': [
      { name: 'user', type: 'directory', permissions: 'drwxr-xr-x', owner: 'user' },
      { name: 'README.txt', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
  '/home/user': [
  { name: 'Documents', type: 'directory', permissions: 'drwxr-xr-x', owner: 'user' },
  { name: 'Pictures', type: 'directory', permissions: 'drwxr-xr-x', owner: 'user' },
  { name: 'Downloads', type: 'directory', permissions: 'drwxr-xr-x', owner: 'user' },
  { 
    name: '.bashrc', 
    type: 'file', 
    permissions: '-rw-r--r--', 
    owner: 'user',
    content: '# ~/.bashrc\n\n# If not running interactively, don\'t do anything\n[ -z "$PS1" ] && return\n\n# Alias definitions\nalias ll=\'ls -alF\'\nalias la=\'ls -A\'\nalias l=\'ls -CF\'\n\n# Enable color support\nif [ -x /usr/bin/dircolors ]; then\n    eval "$(dircolors -b)"\n    alias ls=\'ls --color=auto\'\nfi\n\n# Prompt customization\nPS1=\'\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ \'\n'
  },
  { 
    name: '.profile', 
    type: 'file', 
    permissions: '-rw-r--r--', 
    owner: 'user',
    content: '# ~/.profile\n\n# Set PATH so it includes user\'s private bin if it exists\nif [ -d "$HOME/bin" ] ; then\n    PATH="$HOME/bin:$PATH"\nfi\n\n# Set environment variables\nexport EDITOR=nano\nexport LANG=en_US.UTF-8\n'
  },
  { 
    name: 'todo.txt', 
    type: 'file', 
    permissions: '-rw-r--r--', 
    owner: 'user',
    content: '1. Learn more about Linux file systems\n2. Practice shell scripting\n3. Set up a virtual machine for testing\n4. Read documentation on system administration\n5. Backup important files\n'
  },
],
    '/home/user/Documents': [
      { name: 'report.pdf', type: 'file' },
      { name: 'notes.txt', type: 'file' },
      { name: 'project.docx', type: 'file', permissions: '-rw-r--r--', owner: 'user' },
    ],
    '/home/user/Pictures': [
      { name: 'vacation.jpg', type: 'file' },
      { name: 'profile.png', type: 'file' },
      { name: 'screenshot.png', type: 'file', permissions: '-rw-r--r--', owner: 'user' },
    ],
    '/root': [
      { name: '.bashrc', type: 'file' },
      { name: '.profile', type: 'file' },
      { name: 'admin_notes.txt', type: 'file', permissions: '-rw-------', owner: 'root' },
    ],
    '/var': [
      { name: 'log', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'www', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'README.txt', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/var/log': [
      { name: 'syslog', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'auth.log', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'messages', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/usr': [
      { name: 'bin', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'lib', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'README.txt', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/usr/bin': [
      { name: 'python', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'gcc', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
    ],
    '/usr/lib': [
      { name: 'libssl.so', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'libcrypto.so', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/boot': [
      { name: 'grub', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'vmlinuz', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'initrd.img', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/dev': [
      { name: 'null', type: 'file', permissions: 'crw-rw-rw-', owner: 'root' },
      { name: 'zero', type: 'file', permissions: 'crw-rw-rw-', owner: 'root' },
      { name: 'sda', type: 'file', permissions: 'brw-rw----', owner: 'root' },
    ],
    '/lib': [
      { name: 'modules', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'libc.so.6', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'libm.so.6', type: 'file', permissions: '-rw-r--r--', owner: 'root' },
    ],
    '/media': [
      { name: 'cdrom', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'usb', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/mnt': [
      { name: 'backup', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/opt': [
      { name: 'custom_app', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/proc': [
      { name: 'cpuinfo', type: 'file', permissions: '-r--r--r--', owner: 'root' },
      { name: 'meminfo', type: 'file', permissions: '-r--r--r--', owner: 'root' },
    ],
    '/run': [
      { name: 'lock', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'user', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/sbin': [
      { name: 'init', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
      { name: 'fsck', type: 'file', permissions: '-rwxr-xr-x', owner: 'root' },
    ],
    '/srv': [
      { name: 'www', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/sys': [
      { name: 'devices', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'kernel', type: 'directory', permissions: 'drwxr-xr-x', owner: 'root' },
    ],
    '/tmp': [
      { name: 'temp_file.txt', type: 'file', permissions: '-rw-rw-rw-', owner: 'root' },
    ],
  });
  
  export const getDirectoryContents = (fileSystem, path) => {
    return fileSystem[path] || [];
  };

  export const hasPermission = (file, user, action) => {
    if (user === 'root') return true;
    const permissions = file.permissions.slice(1);
    const userPerms = permissions.slice(0, 3);
    const otherPerms = permissions.slice(6);
    const relevantPerms = file.owner === user ? userPerms : otherPerms;
    
    switch (action) {
      case 'read': return relevantPerms[0] === 'r';
      case 'write': return relevantPerms[1] === 'w';
      case 'execute': return relevantPerms[2] === 'x';
      default: return false;
    }
  };

  export const deleteFile = (fileSystem, path, fileName) => {
    if (fileSystem[path]) {
      const index = fileSystem[path].findIndex(item => item.name === fileName && item.type === 'file');
      if (index !== -1) {
        fileSystem[path].splice(index, 1);
        return true;
      }
    }
    return false;
  };

  export const createFile = (fileSystem, path, fileName, owner) => {
    if (fileSystem[path]) {
      const newFile = {
        name: fileName,
        type: 'file',
        permissions: '-rw-r--r--',
        owner: owner
      };
      fileSystem[path].push(newFile);
      return true;
    }
    return false;
  };

  export const createDirectory = (fileSystem, path, dirName, owner) => {
    if (fileSystem[path]) {
      const newDir = {
        name: dirName,
        type: 'directory',
        permissions: 'drwxr-xr-x',
        owner: owner
      };
      fileSystem[path].push(newDir);
      // Create a new empty array for the contents of this directory
      fileSystem[`${path}/${dirName}`.replace(/\/+/g, '/')] = [];
      return true;
    }
    return false;
  };