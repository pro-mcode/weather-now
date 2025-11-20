import UnitsDropdown from "./units-dropdown";

export default function Header({
  temperatureUnit,
  windUnit,
  precipUnit,
  setTemperatureUnit,
  setWindUnit,
  setPrecipUnit,
}) {
  return (
    <div className="flex justify-between items-center gap-x-5">
      <img
        src="/assets/images/logo.svg"
        alt="Weather Now Logo"
        className="w-40 cursor-pointer"
      />
      <UnitsDropdown
        temperatureUnit={temperatureUnit}
        windUnit={windUnit}
        precipUnit={precipUnit}
        setTemperatureUnit={setTemperatureUnit}
        setWindUnit={setWindUnit}
        setPrecipUnit={setPrecipUnit}
      />
    </div>
  );
}
