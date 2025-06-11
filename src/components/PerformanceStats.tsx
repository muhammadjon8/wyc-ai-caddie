
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Target, Flag, CircleDot } from 'lucide-react';

const PerformanceStats = () => {
  const stats = [
    {
      title: "Fairways Hit",
      current: "8/14",
      percentage: 57,
      trend: "up",
      change: "+15%",
      icon: Target
    },
    {
      title: "Greens in Regulation",
      current: "9/18",
      percentage: 50,
      trend: "down",
      change: "-8%",
      icon: Flag
    },
    {
      title: "Average Putts",
      current: "2.1",
      percentage: 75,
      trend: "up",
      change: "+5%",
      icon: CircleDot
    },
    {
      title: "Up & Downs",
      current: "6/9",
      percentage: 67,
      trend: "stable",
      change: "0%",
      icon: TrendingUp
    }
  ];

  const recentRounds = [
    { date: "Today", score: 82, course: "Pebble Beach", par: 72 },
    { date: "3 days ago", score: 85, course: "Augusta National", par: 72 },
    { date: "1 week ago", score: 79, course: "St. Andrews", par: 72 },
    { date: "2 weeks ago", score: 88, course: "Whistling Straits", par: 72 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="h-8 w-8 text-green-600" />
                  <div className="flex items-center gap-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-green-800">{stat.current}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Rounds */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Recent Rounds</CardTitle>
          <CardDescription>Your performance over the last month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRounds.map((round, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-800">{round.course}</p>
                  <p className="text-sm text-muted-foreground">{round.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-800">{round.score}</span>
                    <Badge variant={round.score <= round.par ? "default" : "secondary"}>
                      {round.score <= round.par ? `${round.score - round.par}` : `+${round.score - round.par}`}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Par {round.par}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">WYC Insights</CardTitle>
          <CardDescription>AI-powered recommendations for improvement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">🎯 Focus Area: Approach Shots</h4>
            <p className="text-blue-700 text-sm">
              Your GIR percentage dropped 8% this week. Practice 7-iron to 9-iron distances 
              at the range, focusing on consistent contact.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">✅ Strength: Driving Accuracy</h4>
            <p className="text-green-700 text-sm">
              Fairways hit improved 15%! Your driver swing changes are paying off. 
              Keep the same tempo and setup routine.
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">⚡ Practice Tip</h4>
            <p className="text-orange-700 text-sm">
              Spend 20 minutes on 6-foot putts. Your short putting accuracy directly 
              correlates with lower scores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceStats;
