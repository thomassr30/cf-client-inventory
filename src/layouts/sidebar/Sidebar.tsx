import React, { createElement } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { menuItems } from "./menuItems";
import { useAuthStore } from "@/store/auth.store";
import { IMenuItem } from "interfaces/menuItem.interface";
import zapadores from "@/assets/zapadores.webp";

interface Props {
  setopenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  isTab?: boolean;
}

export const Sidebar = ({ setIsOpen, isOpen }: Props) => {
  const userRole = useAuthStore((state) => state.role);

  const menus = menuItems.filter((item: IMenuItem) =>
    item.roles.some((role) => role === userRole)
  );

  const variants = {
    open: { x: 0, width: "16rem", transition: { duration: 0.3 } },
    closed: { x: -250, width: 0, transition: { duration: 0.2 } },
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 transition-opacity duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>
      <motion.div
        variants={variants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="bg-white text-gray z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed"
      >
        <div className="flex justify-center items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3">
          <img className="w-20 h-auto" src={zapadores} />
        </div>

        {/* MENU */}
        <div className="flex flex-col h-full">
          <ul
            className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex 
          flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin
          scrollbar-track-white scrollbar-thumb-green-200 mb-14
          "
          >
            {menus.map((item: IMenuItem, index: number) => (
              <li key={index} className="cursor-pointer">
                <NavLink to={item.path} className="link">
                  {createElement(item.icon, {
                    size: 23,
                    className: "min-w-max",
                  })}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
