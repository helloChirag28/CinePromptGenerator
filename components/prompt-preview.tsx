"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, Share2, Save, CheckCircle, Play, Eye } from 'lucide-react';
import { PromptFormData, generatePrompt, savePrompt, GeneratedPrompt } from '@/lib/prompt-generator';
import { useToast } from '@/hooks/use-toast';

interface PromptPreviewProps {
  formData: PromptFormData;
}

export function PromptPreview({ formData }: PromptPreviewProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const generatedPrompt = generatePrompt(formData);
  const isValidPrompt = formData.productName.trim() && formData.features.length > 0;

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [label]: true });
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [label]: false });
      }, 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.productName.replace(/\s+/g, '_')}_video_prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Prompt saved to your device",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AI Video Prompt for ${formData.productName}`,
          text: generatedPrompt,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      handleCopy(generatedPrompt, "Prompt");
    }
  };

  const handleSave = () => {
    const prompt: GeneratedPrompt = {
      id: Date.now().toString(),
      title: formData.productName,
      prompt: generatedPrompt,
      metadata: { ...formData },
      createdAt: new Date(),
    };
    
    savePrompt(prompt);
    toast({
      title: "Saved!",
      description: "Prompt saved to your library",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Preview Header */}
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              Generated Prompt Preview
            </CardTitle>
            <Badge variant="outline" className="bg-blue-600/20 text-blue-200 border-blue-400/30 hover:bg-blue-500/30">
              <Play className="h-3 w-3 mr-1" />
              Ready for AI
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Prompt Content */}
      <AnimatePresence mode="wait">
        {isValidPrompt ? (
          <motion.div
            key="prompt-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-100 text-lg font-semibold">
                    {formData.productName || "Your Product"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 text-slate-100 shadow-sm">
                      {formData.visualStyle}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 text-slate-100 shadow-sm">
                      {formData.musicMood}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/90 rounded-lg p-4 border border-slate-600 shadow-inner ring-1 ring-inset ring-slate-500/10">
                  <pre className="whitespace-pre-wrap text-slate-100 text-sm leading-relaxed font-mono selection:bg-blue-500/20">
                    {generatedPrompt}
                  </pre>
                </div>

                <Separator className="bg-slate-600/80" />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => handleCopy(generatedPrompt, "Prompt")}
                    className="bg-blue-600 hover:bg-blue-700 text-slate-100 flex items-center gap-2 shadow-sm"
                  >
                    {copiedStates["Prompt"] ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copiedStates["Prompt"] ? "Copied!" : "Copy Prompt"}
                  </Button>

                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="bg-slate-700/90 border-slate-600 text-slate-200 hover:bg-slate-600 flex items-center gap-2 shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="bg-slate-700/90 border-slate-600 text-slate-200 hover:bg-slate-600 flex items-center gap-2 shadow-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>

                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="bg-slate-700/90 border-slate-600 text-slate-200 hover:bg-slate-600 flex items-center gap-2 shadow-sm"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>

                {/* Feature Summary */}
                {formData.features.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-slate-200 font-medium mb-2">Features to Highlight:</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {feature}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <Card className="border-0 bg-white/5 backdrop-blur-sm shadow-lg border border-white/10">
              <CardContent className="py-12">
                <div className="text-white/70 space-y-3">
                  <Play className="h-12 w-12 mx-auto opacity-70" />
                  <h3 className="text-lg font-medium text-white">Ready to Create?</h3>
                  <p className="text-white/80">Fill in the product details to generate your cinematic AI video prompt</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}