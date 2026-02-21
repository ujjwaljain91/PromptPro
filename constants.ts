import { PromptModel } from "./types";

export const MODELS: { id: PromptModel; name: string; type: 'video' | 'image'; description: string }[] = [
  { 
    id: 'veo-3.1-generate-preview', 
    name: 'Veo 3.1', 
    type: 'video',
    description: 'High-fidelity cinematic video with granular control.'
  },
  { 
    id: 'veo-3.1-fast-generate-preview', 
    name: 'Veo 3.1 Fast', 
    type: 'video',
    description: 'Optimized for rapid iteration and testing.'
  },
  { 
    id: 'runway-gen-2', 
    name: 'Runway Gen-2', 
    type: 'video',
    description: 'Strong temporal consistency and motion physics.'
  },
  { 
    id: 'pika-art', 
    name: 'Pika Art', 
    type: 'video',
    description: 'Specialized in character performance and FX.'
  },
  { 
    id: 'gemini-3-pro-image-preview', 
    name: 'Gemini 3 Pro Image (Nano Banana Pro)', 
    type: 'image',
    description: 'Complex reasoning for dense, textured prompts.'
  },
  { 
    id: 'gemini-2.5-flash-image', 
    name: 'Gemini 2.5 Flash Image', 
    type: 'image',
    description: 'Fast, precise spatial composition.'
  },
  { 
    id: 'imagen-4.0-generate-001', 
    name: 'Imagen 4', 
    type: 'image',
    description: 'Photorealistic coherence and semantic fidelity.'
  },
  { 
    id: 'flux-1.1-pro', 
    name: 'Flux 1.1 Pro', 
    type: 'image',
    description: 'Superior prompt adherence and text rendering.'
  },
  { 
    id: 'midjourney-v6', 
    name: 'Midjourney v6', 
    type: 'image',
    description: 'Artistic, stylistically dense visuals.'
  },
  { 
    id: 'stable-diffusion-xl', 
    name: 'Stable Diffusion XL', 
    type: 'image',
    description: 'Granular control with extensive styling.'
  },
  { 
    id: 'dalle-3', 
    name: 'DALL·E 3', 
    type: 'image',
    description: 'Nuanced natural language understanding.'
  },
];

export const STYLES = ['Cinematic', 'Cyberpunk', 'Vintage 35mm', 'Anime', 'Photorealistic', 'Surrealist', 'Minimalist', 'Noir', 'Ethereal'];
export const CAMERAS = ['35mm', '85mm Portrait', 'Wide Angle 16mm', 'Macro', 'Drone', 'Handheld', 'Telephoto'];
export const LIGHTING = ['Natural', 'Studio Softbox', 'Neon Noir', 'Golden Hour', 'Volumetric Fog', 'Rembrandt', 'Cinematic Low-Key'];
export const RESOLUTIONS = ['720p', '1080p', '4K'];
export const DURATIONS = ['4s', '8s'];
export const ASPECT_RATIOS = ['16:9', '9:16', '1:1', '4:3', '3:4', '21:9', '2:3'];