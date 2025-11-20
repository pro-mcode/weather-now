import { useState, useEffect, useCallback } from "react";
import Header from "../components/header";
import SearchBar from "../components/search-bar";
import Location from "../components/location";
import WeatherElements from "../components/weather-element";
import DailyForecast from "../components/daily-forecast";
import HourlyForecast from "../components/hourly-forecast";
import NoResult from "./no-result";
import ApiError from "./api-error";
import { COUNTRY_NAMES } from "../components/country-names";
import Footer from "../components/footer";

export default function Overview() {
  const [city, setCity] = useState("atlanta"); // will be set via geolocation fallback
  const [locationMode, setLocationMode] = useState("geo"); // geo or manual
  const [temp, setTemp] = useState(null);
  const [weather, setWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState({});
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [loading, setLoading] = useState(true);
  const [invalidCity, setInvalidCity] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius (°C)");
  const [windUnit, setWindUnit] = useState("km/h");
  const [precipUnit, setPrecipUnit] = useState("Millimeters (mm)");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  /* ------------------- Detect User Location ------------------- */
  useEffect(() => {
    if (locationMode !== "geo") return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          setCity(data.name); // set city to detected location
        } catch (err) {
          console.warn("Geolocation failed:", err);
        }
      },
      (err) => console.warn("Geolocation permission denied:", err)
    );
  }, [locationMode, API_KEY]);

  /* ------------------- Fetch Current Weather ------------------- */
  const fetchWeather = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setInvalidCity(false);
    setApiError(false);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        if (res.status === 404) setInvalidCity(true);
        else setApiError(true);
        return;
      }

      const data = await res.json();

      const rain1h = data.rain?.["1h"] || 0;
      const snow1h = data.snow?.["1h"] || 0;

      // --- Dew Point Calculation ---
      const t = data.main.temp; // Temperature (°C)
      const rh = data.main.humidity; // Relative Humidity (%)
      const a = 17.27;
      const b = 237.7;
      const alpha = (a * t) / (b + t) + Math.log(rh / 100);
      const dewPoint = (b * alpha) / (a - alpha);

      // --- Heat Index Calculation (feels hotter than actual temp) ---
      function calculateHeatIndex(T, RH) {
        // Only meaningful above 27°C
        if (T < 27) return T;

        return (
          -8.784695 +
          1.61139411 * T +
          2.338549 * RH +
          -0.14611605 * T * RH +
          -0.01230809 * T * T +
          -0.01642482 * RH * RH +
          0.00221173 * T * T * RH +
          0.00072546 * T * RH * RH +
          -0.000003582 * T * T * RH * RH
        );
      }

      const heatIndex = calculateHeatIndex(t, rh);

      // Precipitation handling
      const precipitation = data.rain?.["1h"] || data.snow?.["1h"] || 0;

      const formatPressure = (val) => (val ? `${val} hPa` : "—");

      // Temperature conversion
      const toFahrenheit = (c) => (c * 9) / 5 + 32;

      // Wind speed conversion
      const toMph = (kmh) => kmh / 1.609;

      // Precipitation conversion
      const mmToInches = (mm) => mm / 25.4;

      // Temperature
      const feels =
        temperatureUnit === "Celsius (°C)"
          ? Math.round(data.main.feels_like)
          : Math.round(toFahrenheit(data.main.feels_like));

      const minTemp =
        temperatureUnit === "Celsius (°C)"
          ? Math.round(data.main.temp_min)
          : Math.round(toFahrenheit(data.main.temp_min));

      const maxTemp =
        temperatureUnit === "Celsius (°C)"
          ? Math.round(data.main.temp_max)
          : Math.round(toFahrenheit(data.main.temp_max));

      // Wind
      const windSpeed =
        windUnit === "km/h"
          ? (data.wind.speed * 3.6).toFixed(1)
          : toMph(data.wind.speed * 3.6).toFixed(1);

      const windGust = data.wind.gust
        ? windUnit === "km/h"
          ? (data.wind.gust * 3.6).toFixed(1)
          : toMph(data.wind.gust * 3.6).toFixed(1)
        : "—";

      // Precipitation
      const rain =
        precipUnit === "Millimeters (mm)" ? rain1h : mmToInches(rain1h);
      const snow =
        precipUnit === "Millimeters (mm)" ? snow1h : mmToInches(snow1h);
      const prec =
        precipUnit === "Millimeters (mm)"
          ? precipitation
          : mmToInches(precipitation);

      // Visibility
      const visibility =
        windUnit === "km/h"
          ? data.visibility / 1000
          : data.visibility / 1609.34;

      setWeather({
        // Temperature
        "Feels like": `${feels} ${
          temperatureUnit === "Celsius (°C)" ? "°C" : "°F"
        }`,
        "Min Temp": `${minTemp} ${
          temperatureUnit === "Celsius (°C)" ? "°C" : "°F"
        }`,
        "Max Temp": `${maxTemp} ${
          temperatureUnit === "Celsius (°C)" ? "°C" : "°F"
        }`,
        "Dew Point": `${
          temperatureUnit === "Celsius (°C)"
            ? dewPoint.toFixed(1)
            : toFahrenheit(dewPoint).toFixed(1)
        } ${temperatureUnit === "Celsius (°C)" ? "°C" : "°F"}`,
        "Heat Index": `${
          temperatureUnit === "Celsius (°C)"
            ? heatIndex.toFixed(1)
            : toFahrenheit(heatIndex).toFixed(1)
        } ${temperatureUnit === "Celsius (°C)" ? "°C" : "°F"}`,

        Humidity: `${data.main.humidity}%`,

        // Wind
        "Wind Speed": `${windSpeed} ${windUnit}`,
        "Wind Gust": windGust !== "—" ? `${windGust} ${windUnit}` : "—",

        // Precipitation & Clouds
        Rain: `${rain.toFixed(1)} ${
          precipUnit === "Millimeters (mm)" ? "mm" : "in"
        }`,
        Snow: `${snow.toFixed(1)} ${
          precipUnit === "Millimeters (mm)" ? "mm" : "in"
        }`,
        Precipitation: `${prec.toFixed(1)} ${
          precipUnit === "Millimeters (mm)" ? "mm" : "in"
        }`,
        Cloudiness: `${data.clouds.all}%`,

        // Atmosphere
        Pressure: formatPressure(data.main.pressure),
        "Ground Level": formatPressure(data.main.grnd_level),
        "Sea Level": formatPressure(data.main.sea_level),
        Visibility: `${visibility.toFixed(1)} ${
          windUnit === "km/h" ? "km" : "mi"
        }`,

        // Others
        Description: data.weather[0].description,
        "Weather Icon": data.weather[0].icon,
        Sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        Sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });

      setTemp({
        timezone: data.timezone,
        Icon: data.weather[0].icon,
        Temperature: `${
          temperatureUnit === "Celsius (°C)"
            ? Math.round(data.main.temp)
            : Math.round(toFahrenheit(data.main.temp))
        } ${temperatureUnit === "Celsius (°C)" ? "°C" : "°F"}`,

        cityName: data.name,
        country: COUNTRY_NAMES[data.sys.country] || data.sys.country,
      });
    } catch (err) {
      console.error(err);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, [city, temperatureUnit, windUnit, precipUnit, API_KEY]);

  /* ------------------- Fetch Forecast ------------------- */
  const fetchForecast = useCallback(async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      // if (!res.ok) throw new Error("Forecast API error");

      const data = await res.json();
      if (!data.list) return;

      // Conversion functions
      const toFahrenheit = (c) => (c * 9) / 5 + 32;

      // Daily forecast (take only 12:00 entries)
      const daily = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setDailyForecast(
        daily.map((day) => ({
          date: day.dt_txt,
          temperature: `${
            temperatureUnit === "Celsius (°C)"
              ? Math.round(day.main.temp)
              : Math.round(toFahrenheit(day.main.temp))
          } ${temperatureUnit === "Celsius (°C)" ? "°C" : "°F"}`,
          feels_like: `${
            temperatureUnit === "Celsius (°C)"
              ? Math.round(day.main.feels_like)
              : Math.round(toFahrenheit(day.main.feels_like))
          } ${temperatureUnit === "Celsius (°C)" ? "°C" : "°F"}`,
          icon: day.weather[0].icon,
        }))
      );

      // Hourly forecast grouped by day
      const grouped = data.list.reduce((acc, item) => {
        const day = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
        if (!acc[day]) acc[day] = [];

        acc[day].push({
          ...item,
          main: {
            temp:
              temperatureUnit === "Celsius (°C)"
                ? item.main.temp
                : toFahrenheit(item.main.temp),
            // feels_like:
            //   temperatureUnit === "Celsius (°C)"
            //     ? item.main.feels_like
            //     : toFahrenheit(item.main.feels_like),
          },
        });

        return acc;
      }, {});

      const dayKeys = Object.keys(grouped);
      setHourlyForecast(grouped);
      setDays(dayKeys);
      setSelectedDay(dayKeys[0]); // default first day
    } catch (err) {
      console.error(err);
    }
  }, [city, temperatureUnit, API_KEY]);

  const hoursForSelectedDay = (hourlyForecast[selectedDay] || []).map(
    (item) => ({
      ...item,
      main: {
        temp: `${item.main.temp.toFixed(1)} ${
          temperatureUnit === "Celsius (°C)" ? "°C" : "°F"
        }`,
      },
    })
  );

  /* ------------------- Initial Fetch ------------------- */
  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [fetchWeather, fetchForecast]);

  /* ------------------- Retry Handler ------------------- */
  const handleRetry = () => {
    fetchWeather();
    fetchForecast();
  };

  /* ------------------- Search Handler ------------------- */
  const handleCityChange = (newCity) => {
    setLocationMode("manual"); // switch from geo to manual
    setCity(newCity);
  };

  /* ------------------- Prepare Elements ------------------- */
  const elements = weather
    ? Object.entries(weather).map(([element, value]) => ({ element, value }))
    : [];

  /* ------------------- Render ------------------- */
  return (
    <div className="flex flex-col justify-between min-h-screen w-full max-w-[650px] mx-auto pt-12 pb-8 px-4 md:px-6 md:max-w-[1220px] ">
      <div>
        <Header
          temperatureUnit={temperatureUnit}
          windUnit={windUnit}
          precipUnit={precipUnit}
          setTemperatureUnit={setTemperatureUnit}
          setWindUnit={setWindUnit}
          setPrecipUnit={setPrecipUnit}
        />
        <SearchBar onCityChange={handleCityChange} />
        {invalidCity && <NoResult />}
        {apiError && <ApiError message={apiError} onRetry={handleRetry} />}

        {!invalidCity && !apiError && (
          <div className="relative grid gap-4 grid-cols-1 md:grid-cols-3">
            <Location
              city={temp?.cityName}
              country={temp?.country}
              elements={elements}
              temperature={temp?.Temperature}
              icon={temp?.Icon}
              loading={loading}
              timezone={temp?.timezone}
            />
            {/* Weather details */}
            <WeatherElements elements={elements} loading={loading} />

            {/* Forecasts */}
            <DailyForecast dailyForecast={dailyForecast} loading={loading} />
            <HourlyForecast
              city={city}
              loading={loading}
              days={days}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              hoursForSelectedDay={hoursForSelectedDay}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
