import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Mic,
  MicOff,
  MapPin,
  Target,
  TrendingUp,
  Settings,
  Menu,
  LogOutIcon,
} from "lucide-react";
import CalibrationCard from "@/components/CalibrationCard";
import ShotDecision from "@/components/ShotDecision";
import PerformanceStats from "@/components/PerformanceStats";
// import PostRoundSummary from "@/components/PostRoundSummary";
// import LiveKitModal from "./LiveKitModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const handleSupportClick = () => {
    navigate("/caddy");
  };
  const { name, logout } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">WYC</h1>
            <span className="text-sm text-green-600 font-medium hidden sm:inline">
              Whose Your Caddie
            </span>
          </div>

          {/* Desktop Settings Button */}
          <div className="flex items-center gap-4">
            <div className="text-green-600 font-medium hidden sm:inline border-r pr-4 border-green-500">
              {name}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-green-700 border-green-300 hidden md:flex"
              onClick={logout}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-green-700 border-green-300 md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                <Button
                  variant="ghost"
                  className="justify-start text-green-700"
                  onClick={logout}
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="play" className="w-full">
          {/* Mobile-friendly tabs */}
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 mb-8 bg-white/50">
            <TabsTrigger
              value="calibration"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <Target className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Calibration</span>
              <span className="sm:hidden">Cal</span>
            </TabsTrigger>
            <TabsTrigger
              value="play"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <Target className="h-4 w-4 mr-1 sm:mr-2" />
              Play
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <TrendingUp className="h-4 w-4 mr-1 sm:mr-2" />
              Stats
            </TabsTrigger>
            {/* <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-xs sm:text-sm"
            >
              <MapPin className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Summary</span>
              <span className="sm:hidden">Sum</span>
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="calibration" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Club Calibration
              </h2>
              <p className="text-green-600">
                Establish your baseline for accurate recommendations
              </p>
            </div>
            <CalibrationCard />
          </TabsContent>

          <TabsContent value="play" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                On Course Assistant
              </h2>
              <p className="text-green-600">Your AI caddie is ready to help</p>
            </div>

            {/* Voice Activation */}
            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Button
                    className="support-button bg-red-500"
                    onClick={handleSupportClick}
                  >
                    Talk to Your AI Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>

            <ShotDecision />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Performance Analytics
              </h2>
              <p className="text-green-600">Track your improvement over time</p>
            </div>
            <PerformanceStats />
          </TabsContent>

          {/* <TabsContent value="summary" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Round Summary
              </h2>
              <p className="text-green-600">
                Review your performance and get practice tips
              </p>
            </div>
            {/* <PostRoundSummary /> */}
          {/* </TabsContent> */} 
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
