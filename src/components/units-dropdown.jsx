// import { useState } from "react";

// export default function UnitsDropdown({
//   temperatureUnit,
//   windUnit,
//   precipUnit,
//   setTemperatureUnit,
//   setWindUnit,
//   setPrecipUnit,
// }) {
//   const [open, setOpen] = useState(false);

//   const toggleDropdown = () => setOpen((prev) => !prev);

//   return (
//     <div className="relative flex flex-col justify-end items-end text-left w-48">
//       {/* Dropdown toggle button */}
//       <button
//         onClick={toggleDropdown}
//         className="flex justify-between items-center gap-4 w-fit px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-md shadow-md hover:opacity-70 focus:outline-none focus:ring focus:ring-primary transition-all duration-300"
//       >
//         <img src="/assets/images/icon-units.svg" alt="" />
//         Units
//         <img
//           src="/assets/images/icon-dropdown.svg"
//           alt="dropdown"
//           className={`transition-transform duration-300 ${
//             open ? "rotate-180" : "rotate-0"
//           }`}
//         />
//       </button>

//       {/* Dropdown menu */}
//       {open && (
//         <div className="absolute top-10 right-0 mt-2 w-full rounded-md shadow-lg bg-primary-600 z-20">
//           <div className="py-2">
//             {/* Temperature */}
//             <div className="flex flex-col">
//               <span className="text-white text-xs font-medium px-4 opacity-70 mb-1 mt-2">
//                 Temperature
//               </span>
//               {["Celsius (°C)", "Fahrenheit (°F)"].map((unit) => (
//                 <div
//                   key={unit}
//                   className="flex justify-between items-center gap-x-4 px-4 py-2 hover:bg-[#7B7B95]/30 transition-all duration-300"
//                   onClick={() => setTemperatureUnit(unit)}
//                 >
//                   <span className="text-white text-xs font-normal">{unit}</span>
//                   {temperatureUnit === unit && (
//                     <img
//                       src="/assets/images/icon-checkmark.svg"
//                       alt="selected"
//                     />
//                   )}
//                 </div>
//               ))}
//               <div className="border-t border-[#7B7B95]/30 mx-2 my-2" />
//             </div>

//             {/* Wind Speed */}
//             <div className="flex flex-col">
//               <span className="text-white text-xs font-medium px-4 opacity-70 mb-1 mt-1">
//                 Wind Speed
//               </span>
//               {["km/h", "mph"].map((unit) => (
//                 <div
//                   key={unit}
//                   className="flex justify-between items-center gap-x-4 px-4 py-2 hover:bg-[#7B7B95]/30 transition-all duration-300"
//                   onClick={() => setWindUnit(unit)}
//                 >
//                   <span className="text-white text-xs font-normal">{unit}</span>
//                   {windUnit === unit && (
//                     <img
//                       src="/assets/images/icon-checkmark.svg"
//                       alt="selected"
//                     />
//                   )}
//                 </div>
//               ))}
//               <div className="border-t border-[#7B7B95]/30 mx-2 my-2" />
//             </div>

//             {/* Precipitation */}
//             <div className="flex flex-col">
//               <span className="text-white text-xs font-medium px-4 opacity-70 mb-1 mt-1">
//                 Precipitation
//               </span>
//               {["Millimeters (mm)", "Inches (in)"].map((unit) => (
//                 <div
//                   key={unit}
//                   className="flex justify-between items-center gap-x-4 px-4 py-2 hover:bg-[#7B7B95]/30 transition-all duration-300"
//                   onClick={() => setPrecipUnit(unit)}
//                 >
//                   <span className="text-white text-xs font-normal">{unit}</span>
//                   {precipUnit === unit && (
//                     <img
//                       src="/assets/images/icon-checkmark.svg"
//                       alt="selected"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import iconDropdown from "../assets/images/icon-checkmark.svg";

export default function UnitsDropdown({
  temperatureUnit,
  windUnit,
  precipUnit,
  setTemperatureUnit,
  setWindUnit,
  setPrecipUnit,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const stateMap = {
    windUnit,
    temperatureUnit,
    precipUnit,
  };

  const setterMap = {
    windUnit: setWindUnit,
    temperatureUnit: setTemperatureUnit,
    precipUnit: setPrecipUnit,
  };
  const SECTIONS = [
    {
      title: "Temperature",
      stateKey: "temperatureUnit",
      options: [
        { label: "Celsius (°C)", value: "c", preview: "°C → °F" },
        { label: "Fahrenheit (°F)", value: "f", preview: "°F → °C" },
      ],
    },
    {
      title: "Wind Speed",
      stateKey: "windUnit",
      options: [
        { label: "km/h", value: "kmh", preview: "km/h → mph" },
        { label: "mph", value: "mph", preview: "mph → km/h" },
      ],
    },
    {
      title: "Precipitation",
      stateKey: "precipUnit",
      options: [
        { label: "Millimeters (mm)", value: "mm", preview: "mm → in" },
        { label: "Inches (in)", value: "in", preview: "in → mm" },
      ],
    },
  ];

  const toggleDropdown = () => setOpen((prev) => !prev);

  // CLOSE ON CLICK OUTSIDE
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // KEYBOARD SUPPORT (ESC, ENTER, ARROWS)
  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;

      if (e.key === "Escape") setOpen(true);
      if (e.key === "Enter") setOpen(true);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col justify-end items-end text-left w-48"
    >
      {/* BUTTON */}
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center gap-x-3 px-4 py-2 outline-none focus:outline-none focus:ring focus:ring-primary bg-primary-600 text-white rounded-md hover:opacity-80 shadow-md dark:bg-primary-700 cursor-pointer"
      >
        <img src="/assets/images/icon-units.svg" alt="" />
        Units
        <img
          src="/assets/images/icon-dropdown.svg"
          alt=""
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute right-0 top-12 w-full rounded-md shadow-lg bg-primary-600
          dark:bg-primary-700 z-20 p-2 animate-fade-slide"
        >
          {SECTIONS.map((section) => (
            <div key={section.title} className="mb-2">
              <span className="text-primary text-xs font-medium px-2 opacity-70">
                {section.title}
              </span>

              {section.options.map((opt) => (
                <button
                  key={opt.value}
                  className="w-full flex justify-between items-center px-3 py-2 
                  hover:bg-primary/10 rounded-md text-left transition outline-none"
                  onClick={() => {
                    const setter = setterMap[section.stateKey];
                    if (typeof setter === "function") setter(opt.label);
                    else console.warn("Setter not found for", section.stateKey);
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-primary text-xs">{opt.label}</span>
                    <span className="text-primary/50 text-[10px] cursor-pointer">
                      {opt.preview}
                    </span>
                  </div>

                  {stateMap[section.stateKey] === opt.label && (
                    <img src={iconDropdown} alt="" className="ml-2" />
                  )}
                </button>
              ))}

              <div className="border-t border-white/10 my-2"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
