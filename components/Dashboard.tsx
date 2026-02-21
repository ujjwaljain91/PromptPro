import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { UploadZone } from './UploadZone';
import { ResultView } from './ResultView';
import { generatePrompt } from '../services/geminiService';
import { PromptModel, FilterState, AnalysisResult, HistoryItem } from '../types';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2, Sparkles, MessageSquare, Zap } from 'lucide-react';
import { Logo } from './Logo';
import { FeedbackModal } from './FeedbackModal';
import { PricingModal } from './PricingModal';
import { ApiKeyModal } from './ApiKeyModal';

const DEFAULT_FILTERS: FilterState = {
  style: 'Cinematic',
  camera: '35mm',
  lighting: 'Natural',
  duration: '8s',
  resolution: '4K',
  aspectRatio: '16:9',
  realism: 'High',
  useThinking: false,
};

export const Dashboard = () => {
  const [selectedModel, setSelectedModel] = useState<PromptModel>('veo-3.1-generate-preview');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Undo/Redo State
  const [historyStack, setHistoryStack] = useState<AnalysisResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [tokens, setTokens] = useState(5);

  React.useEffect(() => {
    // Check for payment success
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setTokens(prev => prev + 50); // Add tokens (mock amount)
      toast.success('Payment successful! 50 tokens added.');
      setIsPricingOpen(false);
      
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('canceled') === 'true') {
      toast.error('Payment canceled.');
      setIsPricingOpen(true);
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Check for API key on load
    const apiKey = localStorage.getItem('GEMINI_API_KEY');
    if (!process.env.API_KEY && !apiKey) {
      setTimeout(() => setIsApiKeyOpen(true), 1000);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setResult(null);
    setHistory([]); 
    // Reset undo/redo stack
    setHistoryStack([]);
    setCurrentIndex(-1);
  };

  const handleGenerate = async (refinement?: string) => {
    if (!file) return;

    if (tokens <= 0) {
      setIsPricingOpen(true);
      return;
    }

    setIsAnalyzing(true);
    // Don't clear result immediately if refining, so we don't flash empty state if we want to show loading overlay
    if (!refinement) setResult(null);

    try {
      const data = await generatePrompt(file, selectedModel, filters, refinement);
      setResult(data);
      
      // Update Undo/Redo Stack
      setHistoryStack(prev => {
        const newStack = prev.slice(0, currentIndex + 1);
        return [...newStack, data];
      });
      setCurrentIndex(prev => prev + 1);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        result: data,
        refinement: refinement || 'Initial Analysis',
        timestamp: Date.now(),
        modelId: selectedModel,
      };

      setHistory(prev => [newHistoryItem, ...prev]);
      setTokens(prev => Math.max(0, prev - 1));
      
      toast.success(refinement ? 'Prompt refined' : 'Prompt generated');
    } catch (error) {
      console.error(error);
      toast.error('Generation failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setResult(historyStack[newIndex]);
      toast.success('Undid last change');
    }
  };

  const handleRedo = () => {
    if (currentIndex < historyStack.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setResult(historyStack[newIndex]);
      toast.success('Redid change');
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResult(item.result);
    setSelectedModel(item.modelId);
    
    // When selecting from history, we treat it as a new branch or just jump to it?
    // For simplicity, let's push it to the stack as a new state so we can undo back to where we were.
    setHistoryStack(prev => {
      const newStack = prev.slice(0, currentIndex + 1);
      return [...newStack, item.result];
    });
    setCurrentIndex(prev => prev + 1);
    
    toast.success('History restored');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans text-zinc-900 bg-[#f4f4f5]">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#18181b',
          color: '#fafafa',
          borderRadius: '8px',
          fontSize: '13px',
          border: '1px solid #27272a'
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        },
      }}/>
      
      <Sidebar 
        selectedModel={selectedModel} 
        onModelChange={setSelectedModel}
        filters={filters}
        onFilterChange={setFilters}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative shadow-2xl">
        {/* Glass Header */}
        <header className="h-16 flex items-center px-8 justify-between bg-white/80 backdrop-blur-md border-b border-zinc-200 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-zinc-900 text-white p-1.5 rounded-lg">
              <Logo className="w-4 h-4" />
            </div>
            <h1 className="text-sm font-semibold tracking-tight text-zinc-900">
              Prompt<span className="text-zinc-500 font-normal">Pro</span>
            </h1>
            <span className="mx-2 text-zinc-300">/</span>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
              v2.0.0
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
             <button
               onClick={() => setIsPricingOpen(true)}
               className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors shadow-sm ${tokens > 0 ? 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'}`}
             >
               <Zap className={`w-3.5 h-3.5 ${tokens > 0 ? 'text-amber-500 fill-amber-500' : 'text-red-500'}`} />
               <span>{tokens} Tokens</span>
             </button>

             <button
               onClick={() => setIsFeedbackOpen(true)}
               className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm"
             >
               <MessageSquare className="w-3.5 h-3.5" />
               <span>Feedback</span>
             </button>

             {isAnalyzing && (
               <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-200">
                 <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                 <span className="text-xs font-medium text-zinc-600">
                   {filters.useThinking ? 'Reasoning with Gemini 3 Pro...' : 'Processing...'}
                 </span>
               </div>
             )}
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 shadow-sm"></div>
          </div>
        </header>

        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
        <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        <ApiKeyModal isOpen={isApiKeyOpen} onClose={() => setIsApiKeyOpen(false)} />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-white/50">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
            
            {/* Left Column: Input */}
            <div className="xl:col-span-5 flex flex-col gap-6 h-full">
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-1 overflow-hidden">
                <UploadZone 
                  onFileSelect={handleFileSelect} 
                  previewUrl={previewUrl}
                  fileType={file?.type}
                />
              </div>
              
              <div className="flex-1 min-h-[100px] flex flex-col justify-end">
                {file ? (
                   <button
                   onClick={() => handleGenerate()}
                   disabled={isAnalyzing}
                   className={`
                     group relative w-full py-4 px-6 rounded-xl font-medium text-sm transition-all duration-300
                     flex items-center justify-center gap-3 overflow-hidden
                     ${isAnalyzing 
                       ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200' 
                       : filters.useThinking 
                          ? 'bg-zinc-900 text-white shadow-lg hover:shadow-violet-500/25 hover:scale-[1.01]' 
                          : 'bg-zinc-900 text-white shadow-lg hover:shadow-xl hover:scale-[1.01]'}
                   `}
                 >
                   {filters.useThinking && !isAnalyzing && (
                     <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-100 transition-opacity" />
                   )}
                   
                   <div className="relative flex items-center gap-2">
                     {isAnalyzing ? (
                       <>
                         <Loader2 className="w-4 h-4 animate-spin" />
                         <span>Synthesizing...</span>
                       </>
                     ) : (
                       <>
                         <Sparkles className={`w-4 h-4 ${filters.useThinking ? 'text-violet-200' : 'text-blue-200'}`} />
                         <span>Generate {selectedModel.includes('veo') ? 'Video' : 'Image'} Prompt</span>
                       </>
                     )}
                   </div>
                 </button>
                ) : (
                  <div className="p-6 rounded-xl bg-zinc-50 border border-dashed border-zinc-200 text-center">
                    <p className="text-sm text-zinc-400">Waiting for media input...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Output */}
            <div className="xl:col-span-7 h-full min-h-[600px]">
              <ResultView 
                result={result} 
                isLoading={isAnalyzing} 
                model={selectedModel}
                onRefine={handleGenerate}
                history={history}
                onHistorySelect={handleHistorySelect}
                canUndo={currentIndex > 0}
                canRedo={currentIndex < historyStack.length - 1}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
