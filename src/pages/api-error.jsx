import iconRetry from "../assets/images/icon-retry.svg";
import iconError from "../assets/images/icon-error.svg";
export default function ApiError({ onRetry }) {
  return (
    <>
      <title>Weather Now - Error</title>
      <div class="flex flex-col justify-center items-center space-y-4 my-12">
        <img src={iconError} alt="Error" class="w-8 mx-auto" />
        <h2 class="text-primary text-3xl text-center font-semibold max-w-[95%] md:max-w-6xl mx-auto md:text-4xl">
          Something went wrong
        </h2>
        <p class="text-sm text-primary opacity-80 text-center w-full max-w-80 md:max-w-sm mx-auto">
          We couldn't connect to the server (API error). Please try again in a
          few moments.
        </p>
        <div class="flex flex-col justify-center items-center bg-transparent  p-[0.15rem] rounded-lg w-full md:w-fit border border-transparent focus-within:border-primary transition-all duration-300">
          <button
            onClick={onRetry}
            class="flex justify-center items-center gap-x-2 bg-primary-800 py-2 px-4 rounded-md text-primary shadow-md text-sm font-medium hover:opacity-70 transition-150 focus:outline-none cursor-pointer"
          >
            <img src={iconRetry} alt="Retry" class="w-3" />
            Retry
          </button>
        </div>
      </div>
    </>
  );
}
