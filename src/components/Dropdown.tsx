import React, { ChangeEvent } from 'react';

interface IDropdownProps {
  label: string;
  options: string[];
  onSelectOption: (selectedOption: string) => void;
}

const Dropdown: React.FC<IDropdownProps> = ({ label, options, onSelectOption }) => {
  /**
   * The handleSelect function is a TypeScript function in a React component that handles the selection
   * of an option from a dropdown menu.
   * @param e - The parameter `e` is of type `ChangeEvent<HTMLSelectElement>`. This means it is an event
   * object that is triggered when the value of a `<select>` element changes.
   */
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSelectOption(selectedOption);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <label className="block">{label}</label>
      <select className="border border-gray-300 p-2 rounded-md" onChange={handleSelect}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
