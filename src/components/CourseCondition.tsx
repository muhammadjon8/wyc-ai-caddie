import { Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "../hooks/use-weather";

function Condition({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-gray-100 rounded-lg p-3 mb-2">{icon}</div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  );
}

export default function CourseConditionsCard() {
  const { data, loading } = useWeather();

  const wind = `${msToKmh(data?.wind?.speed ?? 0)} km/h ${getDir(
    data?.wind?.deg
  )}`;
  const weather = capitalise(data?.weather?.[0]?.description);
  const temp = `${Math.round(data?.main?.temp ?? 0)}°C`;
  const humidity = `${data?.main?.humidity ?? "-"}%`;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-green-200 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Wind className="h-5 w-5" />
          Course Conditions
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p>Loading weather…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Condition
              icon={<Wind className="h-6 w-6 mx-auto text-blue-600" />}
              label="Wind"
              value={wind}
            />
            <Condition
              icon={<span className="text-2xl">🌤️</span>}
              label="Weather"
              value={weather}
            />
            <Condition
              icon={<span className="text-2xl">🌡️</span>}
              label="Temperature"
              value={temp}
            />
            <Condition
              icon={<span className="text-2xl">💧</span>}
              label="Humidity"
              value={humidity}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* helpers */
function msToKmh(ms = 0) {
  return (ms * 3.6).toFixed(1);
}
function getDir(deg = 0) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}
function capitalise(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  