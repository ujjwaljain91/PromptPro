import React, { useState } from 'react';
import { AnalysisResult, PromptModel, VeoResponse, TextResponse, HistoryItem } from '../types';
import { Copy, Check, Terminal, Sparkles, RefreshCw, Send, SlidersHorizontal, ChevronDown, Clock, Maximize2, FileJson, FileText, Undo2, Redo2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { STYLES, CAMERAS, LIGHTING } from '../constants';

interface ResultViewProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  model: PromptModel;
  onRefine: (refinement: string) => void;
  history: HistoryItem[];
  onHistorySelect: (item: HistoryItem) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ 
  result, 
  isLoading, 
  model, 
  onRefine, 
  history, 
  onHistorySelect,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  const [copied, setCopied] = React.useState(false);
  const [refinementText, setRefinementText] = useState('');
  const [showPresets, setShowPresets] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    
    let textToCopy = '';
    if (result.type === 'video') {
      textToCopy = JSON.stringify(result, null, 2);
    } else {
      const r = result as TextResponse;
      textToCopy = `**Master Prompt:**\n${r.master_prompt}\n\n**Negative Prompt:**\n${r.negative_prompt || 'N/A'}\n\n**Variations:**\n${r.variations.join('\n')}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refinementText.trim()) {
      onRefine(refinementText);
      setRefinementText('');
      setShowPresets(false);
    }
  };

  const applyPreset = (category: string, value: string) => {
    const instruction = `Change ${category.toLowerCase()} to ${value}`;
    setRefinementText(prev => {
      const trimmed = prev.trim();
      if (!trimmed) return instruction;
      if (trimmed.includes(instruction)) return trimmed;
      return `${trimmed}. ${instruction}`;
    });
  };

  if (isLoading) {
    return (
      <div className="h-full w-full rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 z-0"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-zinc-900 border-r-zinc-900/30 border-b-zinc-900/10 border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <Sparkles className="w-6 h-6 text-zinc-300 animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2 max-w-md px-6">
            <p className="text-lg font-semibold text-zinc-900 tracking-tight">Deconstructing Scene Physics</p>
            <p className="text-sm text-zinc-500">Gemini is analyzing lighting vectors, spatial depth, and material textures...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full w-full rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400 p-8 text-center group">
        <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-500">
           <Terminal className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity" />
        </div>
        <p className="text-sm font-medium text-zinc-600">No output generated</p>
        <p className="text-xs mt-2 max-w-[240px] leading-relaxed text-zinc-400">
          Upload an image or video to begin the multimodal prompt synthesis process.
        </p>
      </div>
    );
  }

  const isVeo = result.type === 'video';

  return (
    <div className="h-full flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm relative">
      {/* Header */}
      <div className="h-14 border-b border-zinc-100 flex items-center justify-between px-5 bg-white z-20">
        <div className="flex items-center gap-3">
           <div className={`p-1.5 rounded-md ${isVeo ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
             {isVeo ? <FileJson className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
           </div>
           <div className="flex flex-col">
             <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
               {isVeo ? 'Veo JSON Schema' : 'Structured Prompt'}
             </span>
             <span className="text-[10px] text-zinc-400 font-mono">
               {model}
             </span>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Undo/Redo Controls */}
          <div className="flex items-center bg-zinc-50 rounded-lg border border-zinc-100 p-0.5 mr-2">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Undo"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3 bg-zinc-200 mx-0.5"></div>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Redo"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {history.length > 0 && (
            <div className="relative">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-medium ${showHistory ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>History</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showHistory && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-zinc-200 shadow-xl shadow-zinc-200/50 z-50 overflow-hidden"
                  >
                    <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {history.map((item) => {
                        const isSelected = item.result === result;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              onHistorySelect(item);
                              setShowHistory(false);
                            }}
                            className={`
                              w-full text-left p-3 rounded-lg mb-1 transition-all duration-200
                              ${isSelected 
                                ? 'bg-zinc-900 text-white' 
                                : 'hover:bg-zinc-50 text-zinc-600'}
                            `}
                          >
                            <div className="flex justify-between items-start mb-1">
                               <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-zinc-400' : 'text-zinc-400'}`}>
                                 {item.modelId.split('-')[0]}
                               </span>
                               <span className={`text-[10px] font-mono ${isSelected ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                 {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                               </span>
                            </div>
                            <p className={`text-xs truncate ${isSelected ? 'text-zinc-100' : 'text-zinc-900'}`}>
                              {item.refinement}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          
          <div className="h-4 w-px bg-zinc-200 mx-1"></div>
          
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors group relative"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#09090b] flex flex-col">
        {/* Code/Text Display */}
        <div className="flex-1 overflow-auto custom-scrollbar p-6">
          {isVeo ? (
            <VeoJsonDisplay data={result as VeoResponse} />
          ) : (
            <TextPromptDisplay data={result as TextResponse} />
          )}
        </div>

        {/* Floating Refinement Bar */}
        <div className="p-4 bg-[#09090b]/90 backdrop-blur border-t border-white/10 z-30">
          <form onSubmit={handleRefineSubmit} className="relative max-w-3xl mx-auto">
             <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
               <div className="relative flex items-center bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
                  <button
                    type="button"
                    onClick={() => setShowPresets(!showPresets)}
                    className={`p-3 text-zinc-400 hover:text-zinc-200 transition-colors ${showPresets ? 'text-blue-400' : ''}`}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                  <input 
                    type="text" 
                    value={refinementText}
                    onChange={(e) => setRefinementText(e.target.value)}
                    placeholder="Refine output (e.g., 'Make it more cinematic', 'Change lighting')..."
                    className="flex-1 bg-transparent border-none text-sm text-zinc-100 placeholder:text-zinc-600 focus:ring-0 py-3"
                  />
                  <button 
                    type="submit"
                    disabled={!refinementText.trim()}
                    className="p-2 mr-1 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
               </div>
             </div>
             
             <AnimatePresence>
              {showPresets && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginBottom: 12 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className="absolute bottom-full left-0 right-0 mb-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
                >
                  <div className="p-4 grid grid-cols-3 gap-4">
                    <PresetSelect label="Style" options={STYLES} onSelect={(v) => applyPreset('Style', v)} />
                    <PresetSelect label="Camera" options={CAMERAS} onSelect={(v) => applyPreset('Camera', v)} />
                    <PresetSelect label="Lighting" options={LIGHTING} onSelect={(v) => applyPreset('Lighting', v)} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

const PresetSelect = ({ label, options, onSelect }: { label: string, options: string[], onSelect: (val: string) => void }) => (
  <div className="space-y-1">
    <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{label}</label>
    <div className="flex flex-wrap gap-1.5">
      {options.slice(0, 4).map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="text-[10px] px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors"
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const VeoJsonDisplay = ({ data }: { data: VeoResponse }) => {
  const jsonString = JSON.stringify(data, null, 2);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 pb-4 border-b border-zinc-800/50">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        <span className="ml-2 text-xs text-zinc-500 font-mono">output.json</span>
      </div>
      <pre className="text-xs md:text-[13px] font-mono leading-relaxed text-zinc-300">
        <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(jsonString) }} />
      </pre>
    </div>
  );
};

const TextPromptDisplay = ({ data }: { data: TextResponse }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      
      {/* Analysis Card */}
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-5 space-y-3">
        <div className="flex items-center gap-2 text-zinc-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-widest">Scene Analysis</h3>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed font-mono">
          {data.analysis_summary}
        </p>
      </div>

      {/* Master Prompt */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Master Prompt</h3>
          <span className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">High Fidelity</span>
        </div>
        <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-50 text-sm md:text-base leading-relaxed font-medium font-mono select-text shadow-inner">
          {data.master_prompt}
        </div>
      </div>

      {/* Negative Prompt */}
      {data.negative_prompt && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest">Negative Prompt</h3>
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-200/90 text-xs leading-relaxed font-mono select-text">
            {data.negative_prompt}
          </div>
        </div>
      )}

      {/* Variations */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Creative Variations</h3>
        <div className="grid gap-3">
          {data.variations.map((v, i) => (
            <div key={i} className="group p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors flex gap-4">
              <span className="text-zinc-700 font-mono text-xs pt-1">{`0${i + 1}`}</span>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors font-mono">{v}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// Syntax highlighter for JSON
function syntaxHighlight(json: string) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-amber-300'; // number
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-blue-300'; // key
      } else {
        cls = 'text-emerald-300'; // string
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-purple-300'; // boolean
    } else if (/null/.test(match)) {
      cls = 'text-zinc-600'; // null
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}