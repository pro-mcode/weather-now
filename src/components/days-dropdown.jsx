// export default function DaysDropdown() {
//   return (
//     <>
//       <div className="absolute top-15 right-0 mt-2 w-48 rounded-md shadow-lg bg-primary-600 ring-opacity-5">
//         <div className="py-2">
//           <div className="flex flex-col justify-start space-y-2">
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Sunday
//               </a>
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Monday
//               </a>
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Tuesday
//               </a>
//               <img src="/assets/images/icon-checkmark.svg" alt="" />
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Wednesday
//               </a>
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Thursday
//               </a>
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Friday
//               </a>
//             </div>
//             <div className="flex justify-between items-center gap-x-4 p-2 mb-1 mx-2 rounded-md hover:bg-[#7B7B95]/30 transition-all duration-300">
//               <a href="#" className="block text-white text-xs font-normal">
//                 Saturday
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";

export default function DaysDropdown({ days, selected, onSelect }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSelect = (day) => {
    onSelect(day);
    setDropdownOpen(false); // close dropdown after selecting
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle dropdown */}
      <div className="border border-transparent rounded-md focus-within:border-primary transition-all duration-300">
        <button
          onClick={toggleDropdown}
          className="flex justify-center items-center gap-x-2 text-sm font-medium bg-primary-600 py-2 px-4 rounded-md text-white shadow-md hover:opacity-70 m-0.5 transition-all duration-300 outline-none cursor-pointer"
        >
          {selected
            ? new Date(selected).toLocaleDateString("en-US", {
                weekday: "long",
              })
            : "Select day"}
          <img
            src="/assets/images/icon-dropdown.svg"
            alt=""
            className={`min-w-3 transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {/* Dropdown menu */}
      {dropdownOpen && (
        <div className="absolute top-12 right-0 mt-2 w-48 rounded-md shadow-lg bg-primary-600 ring-opacity-5 py-2 z-10">
          {days.map((day) => (
            <div
              key={day}
              onClick={() => handleSelect(day)}
              className="flex justify-between items-center w-full px-4 py-2 hover:bg-[#7B7B95]/30"
            >
              <button className="block w-full text-left text-sm font-normal text-primary ">
                {new Date(day).toLocaleDateString("en-US", { weekday: "long" })}
              </button>

              {/* Only show checkmark for the selected day */}
              {selected === day && (
                <img src="/assets/images/icon-checkmark.svg" alt="selected" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
