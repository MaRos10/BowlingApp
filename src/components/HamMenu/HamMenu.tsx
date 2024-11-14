import "./HamMenu.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import navicon from "../../assets/navicon.svg";

type MenuItem = {
  text: string;
  path: string;
  delay: number;
};

export default function HamMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { text: "BOOKING", path: "/booking", delay: 0.1 },
    { text: "CONFIRMATION", path: "/confirmation", delay: 0.2 },
  ];

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="menu">
      <button className="menuToggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={navicon} alt="Menu Icon" className="menuIcon" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="menuOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.ul
              className="menuList"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {menuItems.map((item, id: number) => (
                <motion.li
                  key={id}
                  className="menuItem"
                  onClick={() => handleNavigate(item.path)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.3 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {item.text}
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>
        )}
      </AnimatePresence>
    </nav>
  );
}
