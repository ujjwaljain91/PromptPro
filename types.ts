
export type PromptModel = 
  | 'veo-3.1-generate-preview'
  | 'veo-3.1-fast-generate-preview'
  | 'gemini-3-pro-image-preview'
  | 'gemini-2.5-flash-image'
  | 'imagen-4.0-generate-001'
  | 'flux-1.1-pro'
  | 'midjourney-v6'
  | 'stable-diffusion-xl'
  | 'dalle-3'
  | 'runway-gen-2'
  | 'pika-art';

export interface FilterState {
  style: string;
  camera: string;
  lighting: string;
  duration: string;
  resolution: string;
  aspectRatio: string;
  realism: string;
  useThinking: boolean;
}

// Structured analysis used for all models internally
export interface SceneAnalysis {
  subject_attributes: string[];
  environment_elements: string[];
  lighting_physics: string;
  camera_grammar: string;
  color_palette: string;
  mood: string;
  spatial_depth: string;
  motion_logic: string;
  realism_score: string;
}

// Specific schema for Veo output
export interface VeoPrompt {
  shot_framing: string;
  subject_motion: string;
  environment_logic: string;
  lighting_design: string;
  cinematic_style: string;
  audio_beats: {
    ambient: string;
    sfx: string;
    dialogue: string;
  };
  timing_markers: { second: number; event: string }[];
  technical_negatives: string;
  resolution: string;
  duration_seconds: number;
  fps: number;
}

export interface VeoResponse {
  type: 'video';
  analysis: SceneAnalysis;
  veo_prompt: VeoPrompt;
  variation_presets: { style: string; modification: string }[];
}

// Generic structured text response for non-veo models
export interface TextResponse {
  type: 'text';
  master_prompt: string;
  variations: string[];
  negative_prompt?: string;
  analysis_summary: string;
}

export type AnalysisResult = VeoResponse | TextResponse;

export interface HistoryItem {
  id: string;
  result: AnalysisResult;
  refinement: string;
  timestamp: number;
  modelId: PromptModel;
}