import React from 'react';

interface Props {
  title: string;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  setChecked: (checked: boolean) => void;
}

const CheckBox: React.FC<Props> = ({ title, checked, setChecked }) => {
  return (
    <div className="flex items-center space-x-2 hover:cursor-pointer">
      <input
        type="checkbox"
        id={`check${title}`}
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="w-4 h-4 accent-black-3"
      />
      <label htmlFor={`check${title}`} className="select-none hover:cursor-pointer sm:text-sm md:text-base">
        {title}
      </label>
    </div>
  );
};

export default CheckBox;
