export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ops' | 'client';
  verified: boolean;
  createdAt: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  downloads: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DownloadResponse {
  downloadLink: string;
  message: string;
  expiresAt: string;
}