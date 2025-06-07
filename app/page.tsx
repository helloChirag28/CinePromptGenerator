"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { Video, Sparkles, Zap, Target } from 'lucide-react';
import { PromptForm } from '@/components/prompt-form';
import { PromptPreview } from '@/components/prompt-preview';
import { SavedPrompts } from '@/components/saved-prompts';
import { PromptFormData } from '@/lib/prompt-generator';

export default function Home() {
  const [formData, setFormData] = useState<PromptFormData>({
    productName: '',
    features: [],
    visualStyle: 'futuristic',
    musicMood: 'cinematic',
    slogan: '',
    customInstructions: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px] opacity-20" />
      
      <div className="relative">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12 px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              AI Video Prompt
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Generator
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Create cinematic AI video prompts for your products in seconds. 
            Perfect for RunwayML, Pika Labs, Sora, and other AI video platforms.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Sparkles className="h-3 w-3 mr-1" />
              Cinematic Quality
            </Badge>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Zap className="h-3 w-3 mr-1" />
              AI-Ready
            </Badge>
            <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Target className="h-3 w-3 mr-1" />
              Production-Ready
            </Badge>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          <Tabs defaultValue="create" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-slate-900/50 backdrop-blur-sm border border-slate-700">
                <TabsTrigger 
                  value="create" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
                >
                  Create Prompt
                </TabsTrigger>
                <TabsTrigger 
                  value="library" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
                >
                  Saved Prompts
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="create" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Form Column */}
                <div>
                  <PromptForm formData={formData} onFormChange={setFormData} />
                </div>

                {/* Preview Column */}
                <div className="lg:sticky lg:top-4">
                  <PromptPreview formData={formData} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="library">
              <div className="max-w-4xl mx-auto">
                <SavedPrompts />
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-slate-800">
          <p className="text-slate-400">
            Built for creators, marketers, and product designers. 
            <span className="text-blue-400"> Make every product shine.</span>
          </p>
        </footer>
      </div>

      <Toaster />
    </div>
  );
}