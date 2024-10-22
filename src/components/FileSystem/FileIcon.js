import React from 'react';
import { FaFolder, FaFile, FaFileAlt, FaFileImage, FaFileCode, FaLock, FaUserLock } from 'react-icons/fa';

const FileIcon = ({ fileName, isDirectory, permissions }) => {
  const getIconColor = () => {
    if (isDirectory) return "gold";
    if (fileName.endsWith('.txt')) return "skyblue";
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) return "limegreen";
    if (fileName.endsWith('.js') || fileName.endsWith('.py')) return "violet";
    return "gray";
  };

  const getIcon = () => {
    if (isDirectory) return FaFolder;
    if (fileName.endsWith('.txt')) return FaFileAlt;
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) return FaFileImage;
    if (fileName.endsWith('.js') || fileName.endsWith('.py')) return FaFileCode;
    return FaFile;
  };

  const Icon = getIcon();
  const color = getIconColor();

  const isLocked = permissions && permissions[2] !== 'w';
  const isSpecial = permissions && permissions[0] === 's';

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Icon style={{ color, fontSize: '24px' }} />
      {isLocked && (
        <FaLock 
          style={{ 
            position: 'absolute', 
            bottom: '-5px', 
            right: '-5px', 
            color: 'red', 
            fontSize: '12px' 
          }} 
        />
      )}
      {isSpecial && (
        <FaUserLock 
          style={{ 
            position: 'absolute', 
            top: '-5px', 
            right: '-5px', 
            color: 'purple', 
            fontSize: '12px' 
          }} 
        />
      )}
    </div>
  );
};

export default FileIcon;
