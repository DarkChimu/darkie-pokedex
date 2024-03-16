import { TbPokeball } from "react-icons/tb";

const GroupButton = ({
  value,
  icon,
}: {
  value: string;
  icon?: JSX.Element;
}) => {
  return (
    <button
      type="button"
      className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-neutral-700 dark:border-neutral-700 dark:text-white dark:hover:text-white dark:hover:bg-neutral-500 dark:focus:ring-neutral-500 dark:focus:text-white"
    >
      {icon ?? <TbPokeball />}
      {value}
    </button>
  );
};

export default GroupButton;
