import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wind, Target, Eye, Lightbulb, CheckCircle2 } from "lucide-react";
import CourseConditionsCard from "./CourseCondition";

const ShotDecision = () => {
  const [shotType, setShotType] = useState("");
  const [distance, setDistance] = useState("");
  const [windDirection, setWindDirection] = useState("");
  const [lie, setLie] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [swingThought, setSwingThought] = useState("");

  const handleGetRecommendation = () => {
    // Mock AI recommendation based on inputs
    const mockRecommendations = [
      "7-iron with a smooth swing. The slight headwind calls for one club up.",
      "9-iron, focus on contact. Downhill lie - ball will run more.",
      "Pitching wedge, aim slightly left. Side hill lie will kick the ball right.",
    ];

    const mockSwingThoughts = [
      "Focus on the dimple on the back of the ball",
      "Smooth tempo, let the club do the work",
      "Commit to your line and trust your swing",
    ];

    setRecommendation(
      mockRecommendations[
        Math.floor(Math.random() * mockRecommendations.length)
      ]
    );
    setSwingThought(
      mockSwingThoughts[Math.floor(Math.random() * mockSwingThoughts.length)]
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Shot Setup */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Target className="h-5 w-5" />
            Shot Setup
          </CardTitle>
          <CardDescription>
            Tell WYC about your current situation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Shot Type</Label>
              <Select value={shotType} onValueChange={setShotType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tee">Tee Shot</SelectItem>
                  <SelectItem value="fairway">Fairway</SelectItem>
                  <SelectItem value="approach">Approach</SelectItem>
                  <SelectItem value="chip">Chip Shot</SelectItem>
                  <SelectItem value="putt">Putting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Distance to Pin</Label>
              <Input
                type="number"
                placeholder="Yards"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Wind</Label>
              <Select value={windDirection} onValueChange={setWindDirection}>
                <SelectTrigger>
                  <SelectValue placeholder="Wind direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="headwind">Into (Headwind)</SelectItem>
                  <SelectItem value="tailwind">Helping (Tailwind)</SelectItem>
                  <SelectItem value="crosswind-left">Left to Right</SelectItem>
                  <SelectItem value="crosswind-right">Right to Left</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Lie Quality</Label>
              <Select value={lie} onValueChange={setLie}>
                <SelectTrigger>
                  <SelectValue placeholder="Ball lie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perfect">Perfect</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fairway-rough">Light Rough</SelectItem>
                  <SelectItem value="heavy-rough">Heavy Rough</SelectItem>
                  <SelectItem value="uphill">Uphill Lie</SelectItem>
                  <SelectItem value="downhill">Downhill Lie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGetRecommendation}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={!shotType || !distance}
          >
            <Eye className="h-4 w-4 mr-2" />
            Get WYC Recommendation
          </Button>
        </CardContent>
      </Card>

      {/* WYC Recommendation */}
      <Card className="bg-white/70 backdrop-blur-sm border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Lightbulb className="h-5 w-5" />
            WYC Analysis
          </CardTitle>
          <CardDescription>Your AI caddie's recommendation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendation ? (
            <>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">
                  Club & Strategy
                </h4>
                <p className="text-green-700">{recommendation}</p>
              </div>

              {swingThought && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Swing Thought
                  </h4>
                  <p className="text-blue-700 italic">"{swingThought}"</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Let's Go!
                </Button>
                <Button variant="outline" className="flex-1">
                  Different Club
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full text-green-600"
              >
                💾 Tag This Tip
              </Button>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                Fill in the shot details to get your personalized recommendation
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Environmental Factors */}
      <CourseConditionsCard />
    </div>
  );
};

export default ShotDecision;
