
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, CheckCircle } from 'lucide-react';

interface VoiceInterfaceProps {
  isActive: boolean;
  onToggle: () => void;
  currentMode: string;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ isActive, onToggle, currentMode }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [response, setResponse] = useState('');

  const mockResponses = {
    'OK Caddie': "I'm here to help! What's your shot?",
    'wind direction': "Wind is 8mph from the southwest. Consider one club up.",
    'club recommendation': "Based on 155 yards and slight headwind, I recommend your 7-iron.",
    'let\'s go': "Focus on smooth tempo. You've got this!"
  };

  useEffect(() => {
    if (isActive) {
      // Simulate voice recognition
      const interval = setInterval(() => {
        setIsListening(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleVoiceCommand = (command: string) => {
    setLastCommand(command);
    setResponse(mockResponses[command as keyof typeof mockResponses] || "I'm listening...");
  };

  if (!isActive) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-40">
      <Card className="bg-green-600 text-white border-green-500 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-2 ${isListening ? 'bg-white/20 animate-pulse' : 'bg-white/10'}`}>
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">WYC is listening...</p>
                {lastCommand && (
                  <p className="text-sm text-green-100">Last: "{lastCommand}"</p>
                )}
              </div>
            </div>
            
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          
          {response && (
            <div className="mt-3 p-3 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <p className="text-sm">{response}</p>
              </div>
            </div>
          )}

          {/* Mock voice commands for demo */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(mockResponses).map((command) => (
              <Button
                key={command}
                onClick={() => handleVoiceCommand(command)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 text-xs"
              >
                "{command}"
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInterface;
