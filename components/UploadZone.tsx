import React, { useCallback, useState } from 'react';
import { Upload, FileVideo, FileImage, X } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  previewUrl: string | null;
  fileType?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, previewUrl, fileType }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={`
        relative w-full aspect-video rounded-xl transition-all duration-300 overflow-hidden group
        ${previewUrl ? 'bg-zinc-900' : isDragging ? 'bg-blue-50/50 border-2 border-dashed border-blue-400' : 'bg-zinc-50 border border-dashed border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300'}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input 
        type="file" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
        accept="image/*,video/*"
        onChange={handleChange}
      />
      
      {previewUrl ? (
        <div className="relative w-full h-full flex items-center justify-center bg-[#09090b]">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
           {fileType?.startsWith('video/') ? (
             <video src={previewUrl} className="max-w-full max-h-full object-contain shadow-2xl" controls />
           ) : (
             <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain shadow-2xl" />
           )}
           
           <div className="absolute top-4 left-4 z-30">
             <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-white/70 uppercase tracking-widest">
               Source Input
             </div>
           </div>

           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
               <Upload className="w-4 h-4 mr-2" />
               Replace Media
             </div>
           </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 pointer-events-none">
          <div className={`
            w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-300
            ${isDragging ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-white border border-zinc-100 text-zinc-300 group-hover:scale-105 group-hover:border-zinc-200 group-hover:text-zinc-400'}
          `}>
            {isDragging ? <Upload className="w-8 h-8 animate-bounce" /> : <FileImage className="w-8 h-8" />}
          </div>
          <div className="text-center space-y-2">
             <p className={`text-base font-semibold transition-colors ${isDragging ? 'text-blue-600' : 'text-zinc-700'}`}>
               {isDragging ? 'Drop to upload' : 'Drag & drop media'}
             </p>
             <p className="text-xs text-zinc-400 max-w-[200px] mx-auto leading-relaxed">
               Supports high-res JPG, PNG, and MP4 for frame-by-frame analysis.
             </p>
          </div>
        </div>
      )}
    </div>
  );
};