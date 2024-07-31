/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronUp, ChevronDown } from "lucide-react";
import React, { useRef, useState } from "react";

// interface Role {
//   role: number | null | undefined;
// }

/**
 * This component represents an avatar with additional functionality, such as showing user details and options when clicked.
 * @param {number} role - The role of the user.
 * @returns {JSX.Element} - The RoleAvatar component.
 */
const RoleAvatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Toggles the visibility of the dropdown menu when the avatar button is clicked.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Uses the colorNav state to dynamically apply CSS classes based on the role prop.
   * Changes the color of certain elements, such as text and borders, based on the user's role.
   */

  const handleClick = () => {
    console.log("session serrada");
  };

  return (
    <div className="relative mt-1" ref={menuRef}>
      <button
        className="flex items-center ml-3 -mt-2 bg-transparent border-none"
        onClick={toggleMenu}
        name="avatarButton"
      >
        <img
          className="h-8 w-8 rounded-full cursor-pointer"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        {isOpen ? (
          <ChevronUp className="w-4 h-4 mt-1 text-white" />
        ) : (
          <ChevronDown className="w-4 h-4 mt-1 cursor-pointer text-white" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-0 right-0 mt-8 w-52 sm:w-80 h-28 sm:h-34 bg-white border border-gray-200 shadow-lg rounded-lg p-2 pr-0 z-500">
          <div className="flex">
            <div className="w-1/3 flex justify-start ml-1">
              <img
                className="h-8 w-8 rounded-full sm:w-14 sm:h-14"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="w-2/3 sm:-ml-7 -ml-8">
              <div
                className="sm:text-xl text-sm font-inter"
                style={{ color: "#088395" }}
              >
                Juan Ramirez
              </div>
              <div className="text-gray-500 font-inter-400 sm:text-sm text-xs">
                juan@gmail.com
              </div>
              <hr className="text-gray-300 w-39 sm:w-55 ml-0" />

              <button
                className={`mt-0 -ml-3 bg-transparent text-black px-4 py-2 rounded border-none  font-inter sm:text-sm text-xs cursor-pointer`}
                style={{ color: "#088395" }}
                name="avatarCard"
                onClick={handleClick}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleAvatar;
