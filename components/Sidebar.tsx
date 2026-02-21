import React from 'react';
import { PromptModel, FilterState } from '../types';
import { MODELS, STYLES, CAMERAS, LIGHTING, RESOLUTIONS, DURATIONS, ASPECT_RATIOS } from '../constants';
import { Settings2, Video, Image as ImageIcon, BrainCircuit, ChevronDown } from 'lucide-react';

interface SidebarProps {
  selectedModel: PromptModel;
  onModelChange: (model: PromptModel) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedModel, 
  onModelChange, 
  filters, 
  onFilterChange 
}) => {
  
  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const currentModel = MODELS.find(m => m.id === selectedModel);
  const isVideo = currentModel?.type === 'video';

  return (
    <aside className="w-[340px] h-full border-r border-zinc-200 bg-white flex flex-col shrink-0 z-20">
      <div className="p-5 border-b border-zinc-100 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Model Selection</h2>
          <span className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200">{MODELS.length} Available</span>
        </div>
        
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar -mr-2">
          {MODELS.map((model) => {
             const isSelected = selectedModel === model.id;
             return (
              <button
                key={model.id}
                onClick={() => onModelChange(model.id)}
                className={`
                  group w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-start border
                  ${isSelected 
                    ? 'bg-zinc-50 border-zinc-300 shadow-sm ring-1 ring-zinc-200' 
                    : 'bg-white border-transparent hover:bg-zinc-50 hover:border-zinc-200 text-zinc-600'}
                `}
              >
                <div className={`
                  mt-0.5 mr-3 shrink-0 p-2 rounded-lg transition-colors
                  ${isSelected ? 'bg-white border border-zinc-200 shadow-sm' : 'bg-zinc-100 group-hover:bg-white group-hover:shadow-sm'}
                `}>
                  {model.type === 'video' ? (
                    <Video className={`w-4 h-4 ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`} />
                  ) : (
                    <ImageIcon className={`w-4 h-4 ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`} />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-semibold truncate ${isSelected ? 'text-zinc-900' : 'text-zinc-700'}`}>{model.name}</span>
                  <span className={`text-[11px] mt-0.5 leading-snug line-clamp-2 ${isSelected ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {model.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar bg-zinc-50/30">
        <div className="flex items-center text-zinc-900 font-semibold text-sm">
          <Settings2 className="w-4 h-4 mr-2 text-zinc-500" />
          <span>Configuration</span>
        </div>

        {/* Thinking Mode Toggle */}
        <div className={`
          relative overflow-hidden p-4 rounded-xl border transition-all duration-300
          ${filters.useThinking 
            ? 'bg-gradient-to-br from-violet-50 to-white border-violet-200 shadow-md shadow-violet-100' 
            : 'bg-white border-zinc-200 shadow-sm'}
        `}>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className={`
                p-2 rounded-lg transition-colors border
                ${filters.useThinking 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-sm' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-400'}
              `}>
                <BrainCircuit className={`w-4 h-4 ${filters.useThinking ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold transition-colors ${filters.useThinking ? 'text-violet-900' : 'text-zinc-700'}`}>
                  Thinking Mode
                </span>
                <span className={`text-[10px] font-medium ${filters.useThinking ? 'text-violet-600' : 'text-zinc-400'}`}>
                  Gemini 3 Pro + Reasoning
                </span>
              </div>
            </div>
            <button
              onClick={() => updateFilter('useThinking', !filters.useThinking)}
              className={`
                relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                ${filters.useThinking ? 'bg-violet-600' : 'bg-zinc-200'}
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5
                  ${filters.useThinking ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
          
          {filters.useThinking && (
             <div className="mt-3 relative z-10">
               <div className="h-px w-full bg-violet-100 mb-2"></div>
               <p className="text-[10px] text-violet-700/80 leading-relaxed font-medium">
                 Allocating <span className="text-violet-900 font-bold">32k tokens</span> for deep chain-of-thought analysis to solve complex scenes.
               </p>
             </div>
          )}
        </div>

        <div className="space-y-6">
          <FilterGroup label="Aesthetic Style" value={filters.style} options={STYLES} onChange={(v) => updateFilter('style', v)} />
          <FilterGroup label="Camera Grammar" value={filters.camera} options={CAMERAS} onChange={(v) => updateFilter('camera', v)} />
          <FilterGroup label="Lighting Physics" value={filters.lighting} options={LIGHTING} onChange={(v) => updateFilter('lighting', v)} />
          <FilterGroup label="Aspect Ratio" value={filters.aspectRatio} options={ASPECT_RATIOS} onChange={(v) => updateFilter('aspectRatio', v)} />
          
          {isVideo && (
            <div className="pt-4 border-t border-zinc-200 space-y-6">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Video Settings</span>
              <FilterGroup label="Resolution" value={filters.resolution} options={RESOLUTIONS} onChange={(v) => updateFilter('resolution', v)} />
              <FilterGroup label="Duration" value={filters.duration} options={DURATIONS} onChange={(v) => updateFilter('duration', v)} />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const FilterGroup = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <div className="space-y-2 group">
    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide transition-colors group-hover:text-zinc-700">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-zinc-200 text-zinc-900 text-xs font-medium rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 transition-all cursor-pointer shadow-sm hover:border-zinc-300"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 group-hover:text-zinc-600 transition-colors">
        <ChevronDown className="h-3.5 w-3.5" />
      </div>
    </div>
  </div>
);