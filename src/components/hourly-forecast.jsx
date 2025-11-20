import DaysDropdown from "./days-dropdown";
export default function HourlyForecast({
  loading,
  days,
  selectedDay,
  setSelectedDay,
  hoursForSelectedDay,
}) {
  return (
    <div className="mt-8 md:absolute md:mt-0 md:top-0 md:right-0 md:w-[32.5%] bg-primary-800 py-6 px-4 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center gap-x-4 mb-4">
        <h3 className="text-primary text-lg font-medium">Hourly forecast</h3>
        <DaysDropdown
          days={days}
          selected={selectedDay}
          onSelect={setSelectedDay}
        />
      </div>

      {/* Hourly list */}
      <div className="flex flex-col space-y-4 max-h-screen overflow-auto py-4">
        {hoursForSelectedDay.map((item) => {
          const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
          });
          return (
            <div
              key={item.dt}
              className="flex justify-between items-center bg-primary-600/80 border border-primary-600 rounded-lg shadow-lg p-4 min-h-16"
            >
              {loading ? (
                <h3 className="text-primary text-2xl font-medium">—</h3>
              ) : (
                <>
                  <div className="flex items-center gap-x-2">
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather?.[0]?.icon}@2x.png`}
                      alt="weather icon"
                      className="w-8"
                    />
                    <h4 className="text-white text-base font-medium">{time}</h4>
                  </div>
                  <h4 className="text-white text-base font-medium">
                    {/* {Math.round(item.main?.temp)} */}
                    {item.main?.temp}
                  </h4>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// export default function HourlyForecast({
//   forecast,
//   //   city,
//   loading,
//   temperatureUnit,
// }) {
//   if (loading) return null;

//   const convertTemp = (tempC) => {
//     const value = parseInt(tempC);
//     return temperatureUnit === "Celsius (°C)"
//       ? `${value}°C`
//       : `${Math.round((value * 9) / 5 + 32)}°F`;
//   };

//   return (
//     <div className="col-span-1 md:col-span-1 bg-primary-700 rounded-2xl p-4 space-y-2 overflow-x-auto">
//       <h3 className="text-white font-semibold mb-2">Hourly Forecast</h3>
//       <div className="flex gap-2">
//         {forecast.map((hour) => (
//           <div
//             key={hour.date}
//             className="flex flex-col items-center justify-center bg-primary-600 rounded-lg p-2 w-16"
//           >
//             <span className="text-white text-xs opacity-70">
//               {new Date(hour.date).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: false,
//               })}
//             </span>
//             <img
//               src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
//               alt="weather icon"
//               className="w-10 h-10"
//             />
//             <span className="text-white text-sm font-medium">
//               {convertTemp(hour.temperature)}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
