
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Flag, 
  Circle,
  Share2,
  Download
} from 'lucide-react';

const PostRoundSummary = () => {
  const [selectedRound] = useState({
    date: "Today",
    course: "Pebble Beach Golf Links",
    score: 82,
    par: 72,
    weather: "Partly Cloudy, 15mph Wind"
  });

  const roundStats = {
    fairwaysHit: { value: 8, total: 14, percentage: 57 },
    greensInRegulation: { value: 9, total: 18, percentage: 50 },
    putts: { total: 32, average: 1.8 },
    upAndDowns: { value: 6, total: 9, percentage: 67 },
    penalties: 2,
    birdies: 2,
    pars: 10,
    bogeys: 4,
    doubleBogeys: 2
  };

  const taggedTips = [
    {
      hole: 7,
      situation: "Downhill lie, 150 yards",
      tip: "Ball above feet - aim right and take one less club",
      outcome: "Pin high, 8 feet"
    },
    {
      hole: 12,
      situation: "Into the wind, 175 yards",
      tip: "Smooth swing, let the 6-iron work",
      outcome: "Center of green"
    },
    {
      hole: 16,
      situation: "Sidehill putt, 12 feet",
      tip: "Start it high side, firm stroke",
      outcome: "Made for birdie!"
    }
  ];

  const practiceRecommendations = [
    {
      area: "Short Iron Accuracy",
      priority: "High",
      description: "Practice 7-9 irons from 120-150 yards. Focus on tempo and follow-through.",
      time: "30 minutes"
    },
    {
      area: "Putting - Breaking Putts",
      priority: "Medium",
      description: "Work on reading green slope and pace control on 6-12 foot putts.",
      time: "20 minutes"
    },
    {
      area: "Wedge Distance Control",
      priority: "Medium",
      description: "Practice half-swings with gap and sand wedge for precise yardages.",
      time: "15 minutes"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Round Overview */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                {selectedRound.course}
              </CardTitle>
              <CardDescription>{selectedRound.date} • {selectedRound.weather}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-800">{selectedRound.score}</div>
              <Badge variant={selectedRound.score <= selectedRound.par ? "default" : "secondary"}>
                {selectedRound.score <= selectedRound.par ? 
                  `${selectedRound.score - selectedRound.par}` : 
                  `+${selectedRound.score - selectedRound.par}`
                }
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/50">
          <TabsTrigger value="stats" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="tips" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Tagged Tips
          </TabsTrigger>
          <TabsTrigger value="practice" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Practice Plan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-800">
                  {roundStats.fairwaysHit.value}/{roundStats.fairwaysHit.total}
                </p>
                <p className="text-sm text-muted-foreground">Fairways Hit</p>
                <Progress value={roundStats.fairwaysHit.percentage} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <Flag className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-800">
                  {roundStats.greensInRegulation.value}/{roundStats.greensInRegulation.total}
                </p>
                <p className="text-sm text-muted-foreground">GIR</p>
                <Progress value={roundStats.greensInRegulation.percentage} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <Circle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-800">{roundStats.putts.total}</p>
                <p className="text-sm text-muted-foreground">Total Putts</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {roundStats.putts.average} avg
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-800">
                  {roundStats.upAndDowns.value}/{roundStats.upAndDowns.total}
                </p>
                <p className="text-sm text-muted-foreground">Up & Downs</p>
                <Progress value={roundStats.upAndDowns.percentage} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Score Breakdown */}
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{roundStats.birdies}</div>
                  <p className="text-sm text-muted-foreground">Birdies</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{roundStats.pars}</div>
                  <p className="text-sm text-muted-foreground">Pars</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{roundStats.bogeys}</div>
                  <p className="text-sm text-muted-foreground">Bogeys</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{roundStats.doubleBogeys}</div>
                  <p className="text-sm text-muted-foreground">Double+</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{roundStats.penalties}</div>
                  <p className="text-sm text-muted-foreground">Penalties</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Tagged Tips from Today's Round
              </CardTitle>
              <CardDescription>Successful strategies to remember and practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {taggedTips.map((tip, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">Hole {tip.hole}</Badge>
                    <Badge className="bg-green-600">Success</Badge>
                  </div>
                  <p className="font-medium text-green-800 mb-1">{tip.situation}</p>
                  <p className="text-green-700 italic mb-2">"{tip.tip}"</p>
                  <p className="text-sm text-green-600">Result: {tip.outcome}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">WYC Practice Recommendations</CardTitle>
              <CardDescription>Personalized practice plan based on today's round</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {practiceRecommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-green-800">{rec.area}</h4>
                    <div className="flex gap-2">
                      <Badge variant={rec.priority === 'High' ? 'destructive' : 'secondary'}>
                        {rec.priority}
                      </Badge>
                      <Badge variant="outline">{rec.time}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{rec.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          <Share2 className="h-4 w-4 mr-2" />
          Share Round
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default PostRoundSummary;
