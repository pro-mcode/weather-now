import { useState } from "react";

export default function SearchBar({ onCityChange }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onCityChange(inputValue.trim()); // Pass the city to parent
      setInputValue(""); // optional: clear input
    }
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-6 my-12 md:space-y-12">
      <h2 className="text-white text-3xl text-center font-semibold max-w-[70%] md:max-w-6xl mx-auto md:text-4xl">
        How's the sky looking today?
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center space-y-4 w-full mx-auto md:flex-row md:space-y-0 md:gap-x-2 md:max-w-lg"
      >
        <div className="flex-1 w-full p-[0.10rem] rounded-lg border border-transparent focus-within:border-primary transition-all duration-300">
          <div className="flex-1 input-wrapper flex justify-start items-center bg-primary-600 px-4 py-2 rounded-md gap-x-2 w-full shadow-md hover:opacity-70 transition-all duration-300">
            <img
              src="/assets/images/icon-search.svg"
              alt="search icon"
              className="w-5"
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter city, zip code or state"
              className="flex-1 bg-transparent text-white text-sm outline-none"
            />
          </div>
        </div>
        <div className="bg-transparent p-[0.15rem] rounded-lg w-full md:w-fit border border-transparent focus-within:border-main-700 transition-all duration-300">
          <button
            type="submit"
            className="bg-main-500 py-2 px-4 rounded-md text-center text-white text-sm shadow-md outline-none w-full md:w-fit hover:bg-main-700 transition-all duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
