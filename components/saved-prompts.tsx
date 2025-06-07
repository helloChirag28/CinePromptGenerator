"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { History, Copy, Trash2, Eye, Calendar } from 'lucide-react';
import { getSavedPrompts, deletePrompt, GeneratedPrompt } from '@/lib/prompt-generator';
import { useToast } from '@/hooks/use-toast';

export function SavedPrompts() {
  const [savedPrompts, setSavedPrompts] = useState<GeneratedPrompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<GeneratedPrompt | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setSavedPrompts(getSavedPrompts());
  }, []);

  const handleCopy = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id: string) => {
    deletePrompt(id);
    setSavedPrompts(getSavedPrompts());
    toast({
      title: "Deleted",
      description: "Prompt removed from your library",
    });
  };

  if (savedPrompts.length === 0) {
    return (
      <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
        <CardContent className="py-12 text-center">
          <History className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-200 mb-2">No Saved Prompts</h3>
          <p className="text-slate-400">Your saved prompts will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <History className="h-5 w-5 text-purple-400" />
          Saved Prompts ({savedPrompts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            <AnimatePresence>
              {savedPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-700 border-slate-600 hover:bg-slate-600 transition-colors shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-100 truncate">{prompt.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="bg-blue-600/20 text-blue-200 border-blue-400/30 text-xs">
                              {prompt.metadata.visualStyle}
                            </Badge>
                            <Badge variant="outline" className="bg-purple-600/20 text-purple-200 border-purple-400/30 text-xs">
                              {prompt.metadata.musicMood}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-xs text-slate-300">
                            <Calendar className="h-3 w-3" />
                            {new Date(prompt.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-300 hover:text-slate-100 hover:bg-slate-600"
                                onClick={() => setSelectedPrompt(prompt)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] bg-slate-800 border-slate-600 shadow-lg">
                              <DialogHeader>
                                <DialogTitle className="text-slate-100">{selectedPrompt?.title}</DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-96">
                                <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 shadow-inner">
                                  <pre className="whitespace-pre-wrap text-slate-100 text-sm leading-relaxed">
                                    {selectedPrompt?.prompt}
                                  </pre>
                                </div>
                              </ScrollArea>
                              <div className="flex gap-2 pt-4">
                                <Button
                                  onClick={() => selectedPrompt && handleCopy(selectedPrompt.prompt)}
                                  className="bg-blue-600 hover:bg-blue-700 text-slate-100"
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Prompt
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-300 hover:text-slate-100 hover:bg-slate-600"
                            onClick={() => handleCopy(prompt.prompt)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-300 hover:text-red-400 hover:bg-slate-600"
                            onClick={() => handleDelete(prompt.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}