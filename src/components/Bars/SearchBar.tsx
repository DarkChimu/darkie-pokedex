import { SearchIcon } from "@/components/core/Icons";
import { LuRefreshCcw } from "react-icons/lu";

const SearchBar = ({ callback }: { callback: unknown }) => {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="w-full">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-neutral-700 overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <SearchIcon />
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-300 pr-2 bg-neutral-700"
            type="text"
            id="search"
            placeholder="Search something.."
            onChange={(e) =>
              typeof callback === "function" && callback(e.target.value)
            }
          />
        </div>
      </div>
      <button
        type="button"
        className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-2xl font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        onClick={() => typeof callback === "function" && callback("")}
      >
        <LuRefreshCcw />
      </button>
    </div>
  );
};

export default SearchBar;
