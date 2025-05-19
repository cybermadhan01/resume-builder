import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface ImageUploaderProps {
  onImageUpload: (imageData: string | number) => void;
  currentImage?: string;
  storeToServer?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImage,
  storeToServer = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentImage);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [onImageUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [onImageUpload]
  );

  const processFile = async (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    if (storeToServer) {
      await uploadToServer(file);
    } else {
      // Client-side processing for immediate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        onImageUpload(result);

        toast({
          title: "Image Uploaded",
          description: "Your image has been successfully uploaded"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToServer = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Create a preview immediately for better UX
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);

      // Set up simulated progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Use the actual API for file upload
      const uploadResponse = await window.ezsite.apis.upload({
        filename: file.name,
        file: file
      });

      // Clear the progress interval
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadResponse.error) throw new Error(uploadResponse.error);

      // Get the file ID from the response
      const storeFileId = uploadResponse.data;

      // Update with server file ID
      onImageUpload(storeFileId);

      toast({
        title: "Image Uploaded",
        description: "Your image has been successfully uploaded to the server"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000); // Reset progress after a short delay
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage(undefined);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    toast({
      title: "Image Removed",
      description: "Your profile image has been removed"
    });
  };

  // Detect if running on mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Profile Image</h3>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*" />

      
      {previewImage ?
      <div className="relative">
          <Card className="overflow-hidden">
            <img
            src={previewImage}
            alt="Profile"
            className="w-full h-auto max-h-64 object-contain" />

            <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full w-8 h-8"
            onClick={handleRemoveImage}
            disabled={isUploading}>
              <X size={16} />
            </Button>
            
            {isUploading &&
          <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-center mt-1">Uploading: {uploadProgress}%</p>
              </div>
          }
          </Card>
        </div> :

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'}`
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}>

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full bg-primary/10 p-3">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isMobile ? 'Tap to upload an image' : 'Drop your image here or click to browse'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG or JPEG (max. 5MB)
              </p>
            </div>
            <Button
            variant="outline"
            className="mt-2"
            type="button"
            disabled={isUploading}>
              {isUploading ?
            <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </> :

            <>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </>
            }
            </Button>
          </div>
        </div>
      }
      
      {isUploading && !previewImage &&
      <div className="mt-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-center mt-1">Uploading: {uploadProgress}%</p>
        </div>
      }
    </div>);

};

export default ImageUploader;