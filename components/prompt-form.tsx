"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shuffle, Sparkles, Plus, X } from 'lucide-react';
import { PromptFormData, productTemplates, randomSlogans } from '@/lib/prompt-generator';

interface PromptFormProps {
  onFormChange: (data: PromptFormData) => void;
  formData: PromptFormData;
}

export function PromptForm({ onFormChange, formData }: PromptFormProps) {
  const [newFeature, setNewFeature] = useState('');

  const updateFormData = (updates: Partial<PromptFormData>) => {
    onFormChange({ ...formData, ...updates });
  };

  const addFeature = () => {
    if (newFeature.trim() && formData.features.length < 5) {
      updateFormData({
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    updateFormData({
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const loadTemplate = (template: typeof productTemplates[0]) => {
    updateFormData({
      productName: template.name,
      features: [...template.features],
      visualStyle: template.visualStyle,
      musicMood: template.musicMood,
      slogan: template.slogan
    });
  };

  const generateRandomSlogan = () => {
    const randomSlogan = randomSlogans[Math.floor(Math.random() * randomSlogans.length)];
    updateFormData({ slogan: randomSlogan });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Product Templates */}
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            Quick Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {productTemplates.map((template, index) => (
              <motion.div
                key={template.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto p-3 bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-100 justify-start"
                  onClick={() => loadTemplate(template)}
                >
                  <div className="text-left">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-slate-300 mt-1">
                      {template.visualStyle} • {template.musicMood}
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Information */}
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-100">Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="productName" className="text-slate-200">Product Name</Label>
            <Input
              id="productName"
              placeholder="e.g., Nike Air Max 270"
              value={formData.productName}
              onChange={(e) => updateFormData({ productName: e.target.value })}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>

          <div>
            <Label className="text-slate-200">Key Features</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature..."
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                  className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500"
                />
                <Button 
                  onClick={addFeature}
                  disabled={!newFeature.trim() || formData.features.length >= 5}
                  size="icon"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge variant="secondary" className="bg-slate-600 text-slate-100 hover:bg-slate-500">
                      {feature}
                      <button
                        onClick={() => removeFeature(index)}
                        className="ml-2 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Style Settings */}
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-100">Visual & Audio Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Visual Style</Label>
              <Select value={formData.visualStyle} onValueChange={(value: any) => updateFormData({ visualStyle: value })}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="futuristic" className="text-slate-100 hover:bg-slate-700">🚀 Futuristic</SelectItem>
                  <SelectItem value="minimalist" className="text-slate-100 hover:bg-slate-700">⚪ Minimalist</SelectItem>
                  <SelectItem value="luxury" className="text-slate-100 hover:bg-slate-700">👑 Luxury</SelectItem>
                  <SelectItem value="streetwear" className="text-slate-100 hover:bg-slate-700">🏙️ Streetwear</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-200">Music Mood</Label>
              <Select value={formData.musicMood} onValueChange={(value: any) => updateFormData({ musicMood: value })}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="trap" className="text-slate-100 hover:bg-slate-700">🎵 Trap</SelectItem>
                  <SelectItem value="cinematic" className="text-slate-100 hover:bg-slate-700">🎬 Cinematic</SelectItem>
                  <SelectItem value="electronic" className="text-slate-100 hover:bg-slate-700">🎛️ Electronic</SelectItem>
                  <SelectItem value="ambient" className="text-slate-100 hover:bg-slate-700">🌊 Ambient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creative Elements */}
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-100">Creative Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="slogan" className="text-slate-200">Slogan/Tagline</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomSlogan}
                className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <Shuffle className="h-3 w-3 mr-1" />
                Random
              </Button>
            </div>
            <Input
              id="slogan"
              placeholder="e.g., Just Do It"
              value={formData.slogan || ''}
              onChange={(e) => updateFormData({ slogan: e.target.value })}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="customInstructions" className="text-slate-200">Custom Instructions</Label>
            <Textarea
              id="customInstructions"
              placeholder="Any specific requirements or creative directions..."
              value={formData.customInstructions || ''}
              onChange={(e) => updateFormData({ customInstructions: e.target.value })}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}