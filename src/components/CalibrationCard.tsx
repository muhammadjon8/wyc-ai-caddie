
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, CheckCircle } from 'lucide-react';

const CalibrationCard = () => {
  const [calibrationMethod, setCalibrationMethod] = useState('');
  const [clubDistances, setClubDistances] = useState({
    driver: '',
    '3wood': '',
    '5iron': '',
    '7iron': '',
    '9iron': '',
    'pw': '',
    'sw': ''
  });
  const [swingTendencies, setSwingTendencies] = useState<string[]>([]);

  const clubs = [
    { key: 'driver', label: 'Driver', typical: '250-280y' },
    { key: '3wood', label: '3 Wood', typical: '220-240y' },
    { key: '5iron', label: '5 Iron', typical: '170-190y' },
    { key: '7iron', label: '7 Iron', typical: '150-170y' },
    { key: '9iron', label: '9 Iron', typical: '120-140y' },
    { key: 'pw', label: 'Pitching Wedge', typical: '100-120y' },
    { key: 'sw', label: 'Sand Wedge', typical: '80-100y' }
  ];

  const tendencies = ['Slight fade', 'Slight draw', 'Occasional slice', 'High ball flight', 'Low ball flight'];

  const handleDistanceChange = (club: string, distance: string) => {
    setClubDistances(prev => ({ ...prev, [club]: distance }));
  };

  const toggleTendency = (tendency: string) => {
    setSwingTendencies(prev => 
      prev.includes(tendency) 
        ? prev.filter(t => t !== tendency)
        : [...prev, tendency]
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Calibration Method */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Target className="h-5 w-5" />
            Calibration Method
          </CardTitle>
          <CardDescription>Choose how you want to establish your baseline data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={calibrationMethod} onValueChange={setCalibrationMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select calibration method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trackman-pro">TrackMan with Golf Pro (Recommended)</SelectItem>
              <SelectItem value="trackman-solo">Solo TrackMan Session</SelectItem>
              <SelectItem value="manual">Manual Distance Entry</SelectItem>
              <SelectItem value="coach">Golf Coach Assessment</SelectItem>
            </SelectContent>
          </Select>
          
          {calibrationMethod === 'trackman-pro' && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">
                <strong>Recommended:</strong> 10 shots per club with putting and wedge work. 
                Your pro will add swing insights for optimal recommendations.
              </p>
            </div>
          )}
          
          {calibrationMethod === 'manual' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                Enter your typical carry distances for each club below.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Club Distances */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Club Distances</CardTitle>
          <CardDescription>Your typical carry distances (yards)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {clubs.map(club => (
            <div key={club.key} className="flex items-center gap-3">
              <Label className="w-20 text-sm font-medium">{club.label}</Label>
              <Input
                type="number"
                placeholder="Yards"
                value={clubDistances[club.key as keyof typeof clubDistances]}
                onChange={(e) => handleDistanceChange(club.key, e.target.value)}
                className="w-20"
              />
              <span className="text-xs text-muted-foreground">{club.typical}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Swing Tendencies */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Swing Tendencies</CardTitle>
          <CardDescription>Select your typical ball flight patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tendencies.map(tendency => (
              <Badge
                key={tendency}
                variant={swingTendencies.includes(tendency) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  swingTendencies.includes(tendency) 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'hover:bg-green-50'
                }`}
                onClick={() => toggleTendency(tendency)}
              >
                {swingTendencies.includes(tendency) && <CheckCircle className="h-3 w-3 mr-1" />}
                {tendency}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Profile */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardContent className="pt-6">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Save Calibration Profile
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            This data helps WYC give you personalized recommendations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalibrationCard;
