import { GoogleGenAI } from "@google/genai";
import { PromptModel, FilterState, AnalysisResult, VeoResponse, TextResponse } from "../types";

// Helper to convert File to Base64
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generatePrompt = async (
  file: File,
  modelId: PromptModel,
  filters: FilterState,
  customRefinement?: string
): Promise<AnalysisResult> => {
  const isVeo = modelId.includes('veo');
  const isThinking = filters.useThinking;
  
  // Initialize GenAI
  // Check for API key in env or localStorage
  const apiKey = process.env.API_KEY || localStorage.getItem('GEMINI_API_KEY');
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please add your Gemini API Key in settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Prepare image/video part
  const mediaPart = await fileToGenerativePart(file);

  let systemInstruction = '';

  if (isVeo) {
    systemInstruction = `You are an expert cinematic prompt engineer for Google Veo. 
       Analyze the input media and generate a strict JSON response following the schema provided.
       
       Target Config:
       - Duration: ${filters.duration}
       - Resolution: ${filters.resolution}
       - Aspect Ratio: ${filters.aspectRatio}
       - Style: ${filters.style}
       - Camera: ${filters.camera}
       - Lighting: ${filters.lighting}
       ${customRefinement ? `- USER REFINEMENT INSTRUCTION: ${customRefinement} (Prioritize this over other configs)` : ''}

       Output JSON Schema (Strict):
       {
          "type": "video",
          "analysis": {
            "subject_attributes": ["string"],
            "environment_elements": ["string"],
            "lighting_physics": "string",
            "camera_grammar": "string",
            "color_palette": "string",
            "mood": "string",
            "spatial_depth": "string",
            "motion_logic": "string",
            "realism_score": "string"
          },
          "veo_prompt": {
            "shot_framing": "string",
            "subject_motion": "string",
            "environment_logic": "string",
            "lighting_design": "string",
            "cinematic_style": "string",
            "audio_beats": {
              "ambient": "string",
              "sfx": "string",
              "dialogue": "string"
            },
            "timing_markers": [
              { "second": 0, "event": "string" }
            ],
            "technical_negatives": "string",
            "resolution": "4k",
            "duration_seconds": 8,
            "fps": 30
          },
          "variation_presets": [
            { "style": "string", "modification": "string" }
          ]
        }
        
        Ensure "type" is always "video". Do NOT include markdown formatting. Return raw JSON.`;
  } else {
    // Specific logic for text-based models
    let optimizationRules = "";

    switch (modelId) {
      case 'midjourney-v6':
        optimizationRules = `
          - **Model**: Midjourney v6
          - **Core Philosophy**: Token-dense, stylistic, non-grammatical.
          - **Structure**: [Subject::3] [Environment::2] [Lighting::2] [Camera::1] [Style Parameters]
          - **Formatting**: Use commas as soft breaks. Avoid "In this image", "The image shows", or filler words.
          - **Required Parameters**: You MUST append '--v 6.0' and '--ar ${filters.aspectRatio}' to the end of the master_prompt.
          - **Style**: ${filters.style}. Use dense stylistic keywords (e.g., "photorealistic", "8k", "cinematic lighting", "unreal engine 5", "octane render").
          - **Negative Prompt**: Midjourney uses '--no'. If needed, put parameters in negative_prompt field or append '--no [text]' to master_prompt.
          - **Structure**: [Subject] + [Environment] + [Lighting/Mood] + [Camera/Technique] + [Global Parameters]
        `;
        break;
      case 'stable-diffusion-xl':
        optimizationRules = `
          - **Model**: Stable Diffusion XL (SDXL)
          - **Core Philosophy**: Keyword-heavy, tag-based weighting.
          - **Structure**: (Subject:1.5), (Action), (Context), (Art Style), (Tech Specs)
          - **Formatting**: Descriptive natural language mixed with Danbooru-style tags. Use parenthesis for weighting if essential, e.g., "(masterpiece:1.2)".
          - **Style**: ${filters.style}. Mandatory quality boosters: "masterpiece", "best quality", "ultra-detailed", "8k", "hdr", "highres".
          - **Negative Prompt**: CRITICAL. Generate a comprehensive negative prompt (e.g., "text, watermark, low quality, medium quality, blur, censored, deformed, bad anatomy, disfigured, mutation, extra limbs, missing limbs, floating limbs, disconnected limbs, malformed hands").
          - **Camera/Lighting**: Explicitly state "${filters.camera}" and "${filters.lighting}".
        `;
        break;
      case 'dalle-3':
        optimizationRules = `
          - **Model**: DALL·E 3
          - **Core Philosophy**: Natural language understanding, instruction following.
          - **Structure**: A cohesive, descriptive paragraph (3-4 sentences).
          - **Formatting**: High grammatical correctness. Do NOT use markdown or list format.
          - **Prohibitions**: Do NOT use aspect ratio flags, technical parameters (like --v 6), or "HD" in the prompt text. DALL-E follows instruction, not tokens.
          - **Style Integration**: Embed the style "${filters.style}" into the narrative description (e.g., "A cinematic, wide-angle photograph capturing...").
          - **Detail**: Describe textures, lighting, and mood explicitly in prose.
        `;
        break;
      case 'runway-gen-2':
        optimizationRules = `
          - **Model**: Runway Gen-2 (Video)
          - **Core Philosophy**: Cinematic realism and temporal motion.
          - **Structure**: [Cinematic Shot Type] of [Subject] [Action] in [Environment] with [Lighting].
          - **Camera Movement**: MANDATORY. Explicitly describe camera movement using industry terms: "Zoom in", "Truck left", "Pan right", "Tilt up", "Static shot", "Rack focus".
          - **Motion**: Describe the physics of movement.
          - **Style**: ${filters.style}. Focus on "cinematic", "film grain", "depth of field".
        `;
        break;
      case 'pika-art':
        optimizationRules = `
          - **Model**: Pika Art (Video)
          - **Core Philosophy**: Specific physics (hair, water, cloth, fire) and character performance.
          - **Structure**: [Medium/Style] of [Subject] [Specific Action] [Environment].
          - **Formatting**: Concise description of the scene and the specific action.
          - **Parameters**: You can include suggested parameters like "-motion 2" or "-camera_zoom 1" or "-fps 24" in the variations list, but keep the master prompt clean.
          - **Key Elements**: Focus on "hair blowing", "waves crashing", "blinking", "talking" if relevant to the input.
        `;
        break;
      case 'flux-1.1-pro':
        optimizationRules = `
          - **Model**: Flux 1.1 Pro
          - **Focus**: High fidelity, prompt adherence, natural language.
          - **Formatting**: Clear, structural description. Less "word salad" than SDXL, more structured than DALL-E.
        `;
        break;
       case 'imagen-4.0-generate-001':
        optimizationRules = `
          - **Model**: Imagen 4
          - **Focus**: Photorealism and high semantic coherence.
          - **Formatting**: Detailed narrative description.
        `;
        break;
      default:
        // Generic / Gemini Image models
        optimizationRules = `
          - **Model**: ${modelId}
          - **Formatting**: High-fidelity structured prompt.
          - **Style**: ${filters.style}
        `;
        break;
    }

    systemInstruction = `You are an expert prompt engineer for ${modelId}.
       Analyze the input media and generate a structured text prompt optimized for ${modelId}.
       
       Target Config:
       - Style: ${filters.style}
       - Camera: ${filters.camera}
       - Lighting: ${filters.lighting}
       - Aspect Ratio: ${filters.aspectRatio}
       ${customRefinement ? `- USER REFINEMENT INSTRUCTION: ${customRefinement} (Prioritize this over other configs)` : ''}
       
       Optimization Rules:
       ${optimizationRules}

       Output JSON Schema (Strict):
       {
         "type": "text",
         "analysis_summary": "Brief analysis of the visual input (max 50 words).",
         "master_prompt": "The fully optimized prompt string ready for copy-pasting.",
         "variations": ["Variation 1 (Different angle)", "Variation 2 (Different lighting)", "Variation 3 (Creative interpretation)", "Variation 4", "Variation 5"],
         "negative_prompt": "String of negative terms (if applicable for model)."
       }
       
       Ensure "type" is always "text". Do NOT include markdown formatting. Return raw JSON.`;
  }

  try {
    const promptText = `Analyze this image/video and generate the prompt structure for ${modelId}.${
        customRefinement ? `\n\nAdditional User Refinement: ${customRefinement}` : ''
    }`;

    // Select model and config based on Thinking Mode
    // Use gemini-3-pro-preview for Thinking, otherwise fallback to flash
    const modelName = isThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    // Define config type as any to accommodate thinkingConfig
    const requestConfig: any = {
      systemInstruction: systemInstruction,
      responseMimeType: 'application/json',
    };

    if (isThinking) {
      // thinkingConfig is only available on specific models and might require billing if high budget
      // For now, we remove the explicit budget to let the model decide or use default
      // requestConfig.thinkingConfig = { thinkingBudget: 32768 };
    }

    const response = await ai.models.generateContent({
      model: modelName, 
      contents: {
        parts: [
          mediaPart,
          { text: promptText }
        ]
      },
      config: requestConfig
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    // Clean potential markdown code blocks if the model ignores the instruction (redundant safety)
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(cleanJson);
    return parsed as AnalysisResult;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to analyze media");
  }
};