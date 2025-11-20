import { useState, useEffect } from "react";
export default function Location({
  city,
  country,
  elements,
  temperature,
  icon,
  loading,
  timezone = 0,
}) {
  const [cityTime, setCityTime] = useState("");
  const [cityDate, setCityDate] = useState("");

  // Update the city time every second
  useEffect(() => {
    if (!timezone) return;

    const updateTime = () => {
      const utc = Date.now(); // milliseconds since epoch
      const localTime = new Date(utc + timezone * 1000);
      setCityTime(
        localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          // hour12: false, // 24-hour format
        })
      );

      setCityDate(
        localTime.toLocaleDateString([], {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!elements) return null;

  return (
    <div className="relative col-span-1 md:col-span-2 rounded-2xl min-h-72 flex flex-col justify-center items-center bg-primary-800">
      {loading ? (
        <div className="flex justify-center items-center gap-2">
          <p className="text-primary text-base font-medium">Loading</p>
          <img src="assets/images/icon-loading.svg" alt="" />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-center items-center mx-auto text-center location-bg rounded-2xl shadow-md h-auto px-8 py-12 md:py-24 space-y-4 md:flex-row md:justify-between md:space-y-0 md:text-left  sm:px-4 md:px-8">
          <div className="space-y-1 ">
            <h3 className="text-3xl text-primary-300">{cityTime}</h3>

            <h4 className="text-white text-2xl font-semibold capitalize">
              {city === country
                ? country || ""
                : `${city || "Unknown City"}, ${country || ""}`}
            </h4>

            <p className="text-white opacity-50 text-sm font-light">
              {cityDate}
            </p>
          </div>

          <div className="flex justify-between items-center lg:gap-x-6">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
              className="w-24"
            />
            <h1 className="text-primary text-[3.2rem] font-medium lg:text-6xl">
              {temperature ?? "--"}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from "react";
// export default function Location({
//   city,
//   country,
//   temperature,
//   icon,
//   loading,
//   timezone = 0,
//   temperatureUnit = "Celsius (°C)",
// }) {
//   const [cityTime, setCityTime] = useState("");
//   const [cityDate, setCityDate] = useState("");

//   // Update city local time
//   useEffect(() => {
//     if (!timezone) return;

//     const updateTime = () => {
//       const utc = Date.now();
//       const localTime = new Date(utc + timezone * 1000);

//       setCityTime(
//         localTime.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: false, // 24-hour format
//         })
//       );

//       setCityDate(
//         localTime.toLocaleDateString([], {
//           weekday: "long",
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         })
//       );
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, [timezone]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center gap-2">
//         <p className="text-primary text-base font-medium">Loading</p>
//         <img src="assets/images/icon-loading.svg" alt="" />
//       </div>
//     );

//   // Convert temperature if needed
//   const convertTemp = (tempC) => {
//     const value = parseInt(tempC); // remove °C
//     return temperatureUnit === "Celsius (°C)"
//       ? `${value}°C`
//       : `${Math.round((value * 9) / 5 + 32)}°F`;
//   };

//   return (
//     <div className="relative col-span-1 md:col-span-2 rounded-2xl min-h-72 flex flex-col justify-center items-center bg-primary-800">
//       <div className="absolute inset-0 flex flex-col justify-center items-center mx-auto text-center location-bg rounded-2xl shadow-md h-auto px-4 py-12 md:py-24 space-y-4 md:flex-row md:justify-between md:space-y-0 md:gap-x-4 md:text-left">
//         <div className="space-y-1">
//           <h3 className="text-3xl text-primary-300">{cityTime}</h3>
//           <h4 className="text-white text-lg font-semibold capitalize">
//             {city || "Unknown City"}, {country || ""}
//           </h4>
//           <p className="text-white opacity-50 text-sm font-light">{cityDate}</p>
//         </div>
//         <div className="flex justify-between items-center gap-x-4">
//           <img
//             src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
//             alt="weather icon"
//             className="w-24"
//           />
//           <h1 className="text-primary text-6xl font-medium">
//             {convertTemp(temperature)}
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }
