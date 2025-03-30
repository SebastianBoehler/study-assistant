export interface FileInfo {
    file: File;
    gsUri?: string;
    status: 'uploading' | 'uploaded' | 'error';
    error?: string;
  }