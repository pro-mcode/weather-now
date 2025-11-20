import { useState } from "react";

export default function WeatherElements({ elements, loading }) {
  const [showAll, setShowAll] = useState(false);

  // Determine which elements to show
  const visibleElements = showAll ? elements : elements.slice(0, 8);

  return (
    <div className="col-span-1 md:col-span-2">
      {/* Show More / Show Less Button */}
      {elements.length > 8 && (
        <div className="my-4 w-full flex justify-between items-center">
          <h3 className="text-primary text-lg font-medium">
            Weather Statistics
          </h3>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-white flex items-center gap-x-2 px-4 py-3 text-sm font-medium bg-primary-600 rounded-md shadow-md hover:opacity-70 focus:outline-none focus:ring focus:ring-primary transition-all duration-300 cursor-pointer"
          >
            {showAll ? "View less" : "View more"}
            <img
              src="/assets/images/icon-dropdown.svg"
              alt="dropdown"
              className={`transition-transform duration-300 ${
                showAll ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibleElements.map((elem) => (
          <div
            key={elem.element}
            className="bg-primary-800 p-4 border border-primary-800 shadow-md rounded-lg"
          >
            <p className="text-primary text-sm font-medium opacity-60 mb-4">
              {elem.element}
            </p>
            <p className="text-primary text-2xl font-normal opacity-80">
              {loading ? (
                <h3 className="text-primary text-2xl font-medium">—</h3>
              ) : (
                elem.value
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default function WeatherElements({
//   elements,
//   loading,
//   windUnit,
//   precipUnit,
// }) {
//   if (loading) return null;

//   const convertValue = (element, value) => {
//     if (element === "Wind") {
//       const speed = parseFloat(value); // m/s from API
//       return windUnit === "km/h"
//         ? `${(speed * 3.6).toFixed(1)} km/h`
//         : `${(speed * 2.237).toFixed(1)} mph`;
//     }
//     if (element === "Precipitation") {
//       const mm = parseFloat(value);
//       return precipUnit === "Millimeters (mm)"
//         ? `${mm} mm`
//         : `${(mm / 25.4).toFixed(1)} in`;
//     }
//     return value;
//   };

//   return (
//     <div className="col-span-1 md:col-span-1 bg-primary-700 rounded-2xl p-4 space-y-2">
//       {elements.map(({ element, value }) => (
//         <div key={element} className="flex justify-between text-white text-sm">
//           <span className="opacity-70">{element}</span>
//           <span>{convertValue(element, value)}</span>
//         </div>
//       ))}
//     </div>
//   );
// }
