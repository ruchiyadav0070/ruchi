import { useState, useEffect } from 'react';
import { FileItem, DownloadResponse } from '../types';

export const useFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching files
    const fetchFiles = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockFiles: FileItem[] = [
        {
          id: '1',
          name: 'Q4_Financial_Report.xlsx',
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          size: 2457600,
          uploadedBy: 'admin@company.com',
          uploadedAt: '2025-01-07T10:30:00Z',
          downloads: 23,
        },
        {
          id: '2',
          name: 'Project_Proposal.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          size: 1048576,
          uploadedBy: 'ops@company.com',
          uploadedAt: '2025-01-06T14:15:00Z',
          downloads: 15,
        },
        {
          id: '3',
          name: 'Marketing_Strategy.pptx',
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          size: 5242880,
          uploadedBy: 'admin@company.com',
          uploadedAt: '2025-01-05T09:45:00Z',
          downloads: 8,
        },
      ];
      
      setFiles(mockFiles);
      setIsLoading(false);
    };

    fetchFiles();
  }, []);

  const uploadFile = async (file: File): Promise<boolean> => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newFile: FileItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedBy: 'current-user@company.com',
      uploadedAt: new Date().toISOString(),
      downloads: 0,
    };

    setFiles(prev => [newFile, ...prev]);
    return true;
  };

  const getDownloadLink = async (fileId: string): Promise<DownloadResponse> => {
    // Simulate API call to get secure download link
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const encryptedId = btoa(fileId + Date.now() + Math.random().toString(36));
    
    return {
      downloadLink: `https://api.secureshare.app/download/${encryptedId}`,
      message: 'success',
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    };
  };

  return {
    files,
    isLoading,
    uploadFile,
    getDownloadLink,
  };
};