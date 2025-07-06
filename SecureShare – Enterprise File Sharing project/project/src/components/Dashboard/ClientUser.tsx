import React, { useState } from 'react';
import { Download, FileText, Copy, CheckCircle, Clock, Shield } from 'lucide-react';
import { useFiles } from '../../hooks/useFiles';
import { DownloadResponse } from '../../types';
import Header from '../Layout/Header';

const ClientUserDashboard: React.FC = () => {
  const { files } = useFiles();
  const [downloadLinks, setDownloadLinks] = useState<{ [key: string]: DownloadResponse }>({});
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});
  const [loadingDownloads, setLoadingDownloads] = useState<{ [key: string]: boolean }>({});

  const { getDownloadLink } = useFiles();

  const handleGetDownloadLink = async (fileId: string) => {
    setLoadingDownloads(prev => ({ ...prev, [fileId]: true }));
    
    try {
      const response = await getDownloadLink(fileId);
      setDownloadLinks(prev => ({ ...prev, [fileId]: response }));
    } catch (error) {
      console.error('Failed to get download link:', error);
    } finally {
      setLoadingDownloads(prev => ({ ...prev, [fileId]: false }));
    }
  };

  const copyToClipboard = async (text: string, fileId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLinks(prev => ({ ...prev, [fileId]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [fileId]: false }));
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (type: string) => {
    if (type.includes('presentation')) return '📊';
    if (type.includes('document')) return '📄';
    if (type.includes('sheet')) return '📈';
    return '📁';
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">File Library</h1>
          <p className="mt-2 text-gray-600">Access and download shared files securely</p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Secure Download Links</h3>
              <p className="text-sm text-blue-700 mt-1">
                Download links are encrypted and expire after 1 hour for security. Only authenticated client users can access these files.
              </p>
            </div>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => {
            const downloadData = downloadLinks[file.id];
            const isLoading = loadingDownloads[file.id];
            const isCopied = copiedLinks[file.id];

            return (
              <div key={file.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getFileIcon(file.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-gray-500">
                    <p>Uploaded: {formatDate(file.uploadedAt)}</p>
                    <p>Downloads: {file.downloads}</p>
                  </div>

                  {!downloadData ? (
                    <button
                      onClick={() => handleGetDownloadLink(file.id)}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>{isLoading ? 'Generating...' : 'Get Download Link'}</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-700">Secure Download Link</span>
                          <div className="flex items-center space-x-1 text-xs text-green-600">
                            <Clock className="h-3 w-3" />
                            <span>{getTimeRemaining(downloadData.expiresAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={downloadData.downloadLink}
                            readOnly
                            className="flex-1 text-xs bg-white border border-gray-200 rounded px-2 py-1 font-mono"
                          />
                          <button
                            onClick={() => copyToClipboard(downloadData.downloadLink, file.id)}
                            className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span className="text-green-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <a
                        href={downloadData.downloadLink}
                        className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download File</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {files.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files available</h3>
            <p className="text-gray-600">Files uploaded by operations team will appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientUserDashboard;