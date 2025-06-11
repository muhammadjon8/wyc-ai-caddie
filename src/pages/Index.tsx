
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, MapPin, Target, TrendingUp, Settings, Golf } from 'lucide-react';
import VoiceInterface from '@/components/VoiceInterface';
import CalibrationCard from '@/components/CalibrationCard';
import ShotDecision from '@/components/ShotDecision';
import PerformanceStats from '@/components/PerformanceStats';
import PostRoundSummary from '@/components/PostRoundSummary';

const Index = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentMode, setCurrentMode] = useState('ready'); // ready, pre-shot, post-shot, summary

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Golf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">WYC</h1>
            <span className="text-sm text-green-600 font-medium">What's Your Caddie</span>
          </div>
          <Button variant="outline" size="sm" className="text-green-700 border-green-300">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      {/* Voice Interface - Always visible when active */}
      {isVoiceActive && (
        <VoiceInterface 
          isActive={isVoiceActive} 
          onToggle={() => setIsVoiceActive(!isVoiceActive)}
          currentMode={currentMode}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="play" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50">
            <TabsTrigger value="calibration" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              Calibration
            </TabsTrigger>
            <TabsTrigger value="play" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Golf className="h-4 w-4 mr-2" />
              Play
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="summary" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <MapPin className="h-4 w-4 mr-2" />
              Summary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calibration" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Club Calibration</h2>
              <p className="text-green-600">Establish your baseline for accurate recommendations</p>
            </div>
            <CalibrationCard />
          </TabsContent>

          <TabsContent value="play" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">On Course Assistant</h2>
              <p className="text-green-600">Your AI caddie is ready to help</p>
            </div>
            
            {/* Voice Activation */}
            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Button
                    onClick={() => setIsVoiceActive(!isVoiceActive)}
                    size="lg"
                    className={`${
                      isVoiceActive 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    } rounded-full h-20 w-20 shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    {isVoiceActive ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>
                  <p className="mt-4 text-lg font-medium text-green-800">
                    {isVoiceActive ? 'Voice Active - Say "OK Caddie"' : 'Tap to Activate Voice'}
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    {isVoiceActive ? 'Listening for commands...' : 'Start your round with voice assistance'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <ShotDecision />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Performance Analytics</h2>
              <p className="text-green-600">Track your improvement over time</p>
            </div>
            <PerformanceStats />
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">Round Summary</h2>
              <p className="text-green-600">Review your performance and get practice tips</p>
            </div>
            <PostRoundSummary />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
