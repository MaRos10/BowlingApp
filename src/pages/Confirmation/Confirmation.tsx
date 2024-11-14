import "./Confirmation.css";
import logo from "../../assets/logo.svg";
import HamMenu from "../../components/HamMenu/HamMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingResponse } from "../../types/types";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state as BookingResponse | null;

  // Om ingen bokningsdata finns
  useEffect(() => {
    if (!bookingData) {
      const timer = setTimeout(() => navigate("/booking"), 3000);
      return () => clearTimeout(timer);
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return (
      <main className="confirmation">
        <img src={logo} alt="Logo" className="noBookingLogo" />
        <h2 className="noBookingText">No booking data found. Redirecting...</h2>
      </main>
    );
  }

  return (
    <>
      <HamMenu />
      <main className="confirmation">
        <img src={logo} alt="Logo" className="confirmationLogo" />
        <motion.h1
          className="confirmationHeader"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          SEE YOU SOON!
        </motion.h1>
        <section className="form">
          <h3 className="formSubHeader">
            <span className="line"></span> BOOKING DETAILS
            <span className="line"></span>
          </h3>
          <section className="confirmationDetails">
            <div className="inputContainer">
              <label htmlFor="confirmTime" className="inputLabel">
                WHEN
              </label>
              <input
                type="text"
                id="confirmTime"
                className="confirmTime"
                value={bookingData.when || ""}
                readOnly
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="confirmWho" className="inputLabel">
                WHO
              </label>
              <input
                type="text"
                id="confirmWho"
                className="confirmWho"
                value={`${bookingData.people || ""} pers`}
                readOnly
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="confirmLane" className="inputLabel">
                LANES
              </label>
              <input
                type="text"
                id="confirmLane"
                className="confirmLane"
                value={`${bookingData.lanes || ""} lane`}
                readOnly
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="bookingNumber" className="inputLabel">
                BOOKING NUMBER
              </label>
              <input
                type="text"
                id="bookingNumber"
                className="bookingNumber"
                value={bookingData.id || ""}
                readOnly
              />
            </div>
          </section>
          <div className="totalPrice">
            <p className="totalText">total</p>
            <p className="totalSum"> {bookingData.price}sek</p>
          </div>

          <button className="btn">SWEET, LETS GO!</button>
        </section>
      </main>
    </>
  );
}
