import React from 'react';
import { Folder, FileText, Image, Code } from 'lucide-react';

const FileIcon = ({ fileName, isDirectory }) => {
  if (isDirectory) return <Folder className="text-yellow-400" />;
  if (fileName.endsWith('.txt')) return <FileText className="text-blue-400" />;
  if (fileName.endsWith('.jpg') || fileName.endsWith('.png')) return <Image className="text-green-400" />;
  if (fileName.endsWith('.js') || fileName.endsWith('.py')) return <Code className="text-purple-400" />;
  return <FileText className="text-gray-400" />;
};

export default FileIcon;