// hooks/useWeather.ts
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const CITY = "Tashkent";

export function useWeather() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=41.2995&lon=69.2401` + // Tashkent coords
          `&appid=${API_KEY}` +
          `&units=metric` // 👈 metric = °C + m/s
      )

      .then((res) => {
        setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
