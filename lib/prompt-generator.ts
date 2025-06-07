export interface PromptFormData {
  productName: string;
  features: string[];
  visualStyle: 'futuristic' | 'minimalist' | 'luxury' | 'streetwear';
  musicMood: 'trap' | 'cinematic' | 'electronic' | 'ambient';
  slogan?: string;
  customInstructions?: string;
}

export interface GeneratedPrompt {
  id: string;
  title: string;
  prompt: string;
  metadata: PromptFormData;
  createdAt: Date;
}

const visualStylePrompts = {
  futuristic: "ultra-modern, sci-fi aesthetic with neon lighting, holographic elements, metallic surfaces, and high-tech environments",
  minimalist: "clean, simple design with lots of white space, subtle shadows, geometric shapes, and sophisticated lighting",
  luxury: "premium, elegant presentation with rich textures, gold accents, marble surfaces, and dramatic lighting",
  streetwear: "urban, edgy atmosphere with graffiti elements, concrete backgrounds, street culture vibes, and dynamic lighting"
};

const musicMoodPrompts = {
  trap: "hard-hitting beats, bass-heavy soundtrack, urban rhythm",
  cinematic: "orchestral score, dramatic build-up, epic soundtrack",
  electronic: "synthesized beats, digital soundscape, futuristic audio",
  ambient: "atmospheric sounds, subtle background music, ethereal tones"
};

const cameraMovements = [
  "smooth 360-degree rotation around the product",
  "dramatic zoom-in from wide shot to close-up detail",
  "cinematic dolly push with depth of field transitions",
  "orbital camera movement with dynamic lighting changes",
  "slow-motion reveal with particle effects",
  "tracking shot following the product's key features"
];

const lightingEffects = [
  "dynamic rim lighting that highlights product edges",
  "volumetric fog with dramatic spotlights",
  "color-changing LED environment that matches product tones",
  "golden hour lighting with warm color grading",
  "high-contrast studio lighting with deep shadows",
  "rainbow prism effects creating colorful reflections"
];

export function generatePrompt(data: PromptFormData): string {
  const randomCamera = cameraMovements[Math.floor(Math.random() * cameraMovements.length)];
  const randomLighting = lightingEffects[Math.floor(Math.random() * lightingEffects.length)];
  
  const featuresText = data.features.filter(f => f.trim()).join(", ");
  const visualStyle = visualStylePrompts[data.visualStyle];
  const musicMood = musicMoodPrompts[data.musicMood];
  
  let prompt = `Create a cinematic product showcase video for "${data.productName}".

VISUAL STYLE: ${visualStyle}

KEY FEATURES TO HIGHLIGHT: ${featuresText}

CAMERA WORK: ${randomCamera}

LIGHTING: ${randomLighting}

MUSIC & AUDIO: ${musicMood}

SCENE DESCRIPTION:
The video opens with ${data.visualStyle === 'luxury' ? 'an elegant fade-in revealing' : data.visualStyle === 'futuristic' ? 'a high-tech materialization of' : data.visualStyle === 'streetwear' ? 'a dynamic street-style entrance showing' : 'a clean, minimal reveal of'} the ${data.productName}. ${featuresText ? `Focus on showcasing: ${featuresText}.` : ''} 

The environment should embody ${visualStyle}. Use ${randomLighting} to create visual drama and highlight the product's premium quality.

TECHNICAL SPECS:
- Duration: 15-30 seconds
- Resolution: 4K (3840×2160)
- Frame rate: 24fps for cinematic feel
- Color grading: Professional commercial standard
- Logo placement: Subtle brand integration in final frames`;

  if (data.slogan) {
    prompt += `\n\nTAGLINE INTEGRATION: "${data.slogan}" - Display this text with elegant typography in the final 3 seconds.`;
  }

  if (data.customInstructions) {
    prompt += `\n\nADDITIONAL NOTES: ${data.customInstructions}`;
  }

  prompt += `\n\nOUTPUT FORMAT: Professional commercial-quality video optimized for social media platforms (Instagram, TikTok, YouTube Shorts) and product marketing campaigns.`;

  return prompt;
}

export function savePrompt(prompt: GeneratedPrompt): void {
  const savedPrompts = getSavedPrompts();
  savedPrompts.unshift(prompt);
  localStorage.setItem('ai-video-prompts', JSON.stringify(savedPrompts.slice(0, 20))); // Keep only last 20
}

export function getSavedPrompts(): GeneratedPrompt[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('ai-video-prompts');
  return saved ? JSON.parse(saved) : [];
}

export function deletePrompt(id: string): void {
  const savedPrompts = getSavedPrompts();
  const filtered = savedPrompts.filter(p => p.id !== id);
  localStorage.setItem('ai-video-prompts', JSON.stringify(filtered));
}

export const productTemplates = [
  {
    name: "Nike Air Max 270",
    features: ["Air Max heel unit", "Breathable mesh upper", "Comfortable cushioning"],
    visualStyle: "streetwear" as const,
    musicMood: "trap" as const,
    slogan: "Just Do It"
  },
  {
    name: "iPhone 15 Pro",
    features: ["Titanium design", "48MP camera system", "Action button"],
    visualStyle: "futuristic" as const,
    musicMood: "electronic" as const,
    slogan: "Pro. Beyond."
  },
  {
    name: "MacBook Pro M3",
    features: ["M3 chip performance", "Liquid Retina display", "All-day battery"],
    visualStyle: "minimalist" as const,
    musicMood: "ambient" as const,
    slogan: "Supercharged for pros"
  },
  {
    name: "Rolex Submariner",
    features: ["Swiss craftsmanship", "Water resistant to 300m", "Ceramic bezel"],
    visualStyle: "luxury" as const,
    musicMood: "cinematic" as const,
    slogan: "A crown for every achievement"
  }
];

export const randomSlogans = [
  "Redefine your limits",
  "Where innovation meets style",
  "Crafted for excellence",
  "Beyond expectations",
  "Unleash your potential",
  "The future is now",
  "Precision perfected",
  "Born to stand out",
  "Excellence in every detail",
  "Revolutionary by design"
];