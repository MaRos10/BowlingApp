import "./Loading.css";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Loading() {
  const navigate = useNavigate();

  const handleClick = (): void => {
    setTimeout(() => {
      navigate("/booking");
    }, 300);
  };

  return (
    <main className="loading" onClick={handleClick}>
      <motion.img
        whileTap={{ scale: 0.9 }}
        src={logo}
        alt="Logo"
        className="logoImg"
      />
      <motion.h1
        className="loadingHeader"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        STRAJK
      </motion.h1>
      <motion.h3
        className="loadingSubHeader"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        BOWLING
      </motion.h3>
    </main>
  );
}
