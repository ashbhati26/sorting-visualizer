import { SelectOptionsType } from "@/lib/types";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDropDownLine } from "react-icons/ri";

export const Select = ({
  options,
  defaultValue,
  onChange,
  isDisabled = false,
}: {
  options: SelectOptionsType[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inline-block relative w-48 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDisabled}
        className="flex items-center justify-between w-full bg-[#1c1c1c] px-4 py-1 rounded-lg shadow text-gray-300"
      >
        {options.find((option) => option.value === defaultValue)?.label ||
          "Select an option"}
        {/* Animated Arrow */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <RiArrowDropDownLine size={28} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-[#262626] px-2 py-1 rounded-lg shadow-lg text-gray-300"
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange({
                    target: { value: option.value },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setIsOpen(false);
                }}
                className="px-4 py-2 cursor-pointer rounded-lg hover:bg-[#1c1c1c]"
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
