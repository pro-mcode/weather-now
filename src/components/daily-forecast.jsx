export default function DailyForecast({ dailyForecast, loading }) {
  return (
    <div className="col-span-1 md:col-span-3 lg:col-span-2">
      <h3 className="text-white text-base font-semibold my-4">
        Daily forecast
      </h3>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-5">
        {dailyForecast.map((day) => (
          <div
            key={day.date}
            className="flex flex-col justify-center items-stretch space-y-3 py-4 px-2 bg-primary-800 border border-primary-600 shadow-md rounded-lg min-h-42"
          >
            {loading ? (
              <h3 className="text-primary text-center text-2xl font-medium">
                —
              </h3>
            ) : (
              <>
                <p className="text-sm text-white font-medium opacity-90 text-center">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt=""
                  className="w-16 mx-auto"
                />

                <div className="flex justify-between items-center">
                  <p className="text-sm text-white font-medium">
                    {day.temperature}
                  </p>
                  <p className="text-sm text-white font-medium opacity-60">
                    {day.feels_like}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function DailyForecast({ forecast, loading, temperatureUnit }) {
//   if (loading) return null;

//   const convertTemp = (tempC) => {
//     const value = parseInt(tempC); // remove °C
//     return temperatureUnit === "Celsius (°C)"
//       ? `${value}°C`
//       : `${Math.round((value * 9) / 5 + 32)}°F`;
//   };

//   return (
//     <div className="col-span-1 md:col-span-1 bg-primary-700 rounded-2xl p-4 space-y-2 overflow-x-auto">
//       <h3 className="text-white font-semibold mb-2">5-Day Forecast</h3>
//       <div className="flex gap-2">
//         {forecast.map((day) => (
//           <div
//             key={day.date}
//             className="flex flex-col items-center justify-center bg-primary-600 rounded-lg p-2 w-20"
//           >
//             <span className="text-white text-xs opacity-70">
//               {new Date(day.date).toLocaleDateString([], { weekday: "short" })}
//             </span>
//             <img
//               src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
//               alt="weather icon"
//               className="w-10 h-10"
//             />
//             <span className="text-white text-sm font-medium">
//               {convertTemp(day.temperature)}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
