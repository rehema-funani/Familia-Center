'use client';

import { useState, useRef } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

export default function FileUpload({ 
  onFilesUploaded, 
  maxFiles = 5, 
  maxFileSize = 10,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.txt']
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `${file.name} is too large. Maximum size is ${maxFileSize}MB.`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `${file.name} is not a supported file type. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    // Check if adding these files would exceed the limit
    if (files.length + fileArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed. You can only add ${maxFiles - files.length} more file(s).`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        // Check if file with same name already exists
        if (!files.some(existingFile => existingFile.name === file.name)) {
          validFiles.push(file);
        } else {
          newErrors.push(`${file.name} is already selected.`);
        }
      }
    });

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesUploaded(updatedFiles);
    }

    setErrors(newErrors);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
    setErrors([]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      case 'txt':
        return '📄';
      default:
        return '📁';
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="text-center">
          <Upload className={`mx-auto h-12 w-12 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedTypes.join(', ')} up to {maxFileSize}MB each
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Errors</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(file.name)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Info */}
      <div className="mt-4 text-xs text-gray-500">
        <p>• Maximum {maxFiles} files allowed</p>
        <p>• Maximum file size: {maxFileSize}MB per file</p>
        <p>• Accepted formats: {acceptedTypes.join(', ')}</p>
        <p>• Files are uploaded securely and only visible to you and your counselor</p>
      </div>
    </div>
  );
}