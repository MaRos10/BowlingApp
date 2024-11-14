import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Booking.css";
import logo from "../../assets/logo.svg";
import HamMenu from "../../components/HamMenu/HamMenu";
import AlertOverlay from "../../components/AlertOverlay/AlertOverlay";
import { Bookings, BookingResponse } from "../../types/types";
import { formatDate, formatTime } from "../../utils/dateTimeFormatter";

export default function Booking() {
  const [numberOfPersons, setNumberOfPersons] = useState<number>(0);
  const [shoeSizes, setShoeSizes] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [lanes, setLanes] = useState<number | "">(0);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const navigate = useNavigate();

  const showAlert = (message: string) => setAlertMessage(message);

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(formatTime(e.target.value));

  const handleLanesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLanes(value ? parseInt(value, 10) : "");
  };

  const handleShoeSizeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSizes = [...shoeSizes];
    newSizes[index] = e.target.value;
    setShoeSizes(newSizes);
  };

  // Hantera ändringar i antal personer & skapa inputfält för skostorlekar
  const handlePersonsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNumberOfPersons(value);
    setShoeSizes(Array(value).fill(""));
  };

  // API-anrop
  const handleBooking = async (): Promise<void> => {
    if (!date || !time || numberOfPersons <= 0 || !lanes || lanes <= 0) {
      return showAlert("Please fill in all fields");
    }

    if (numberOfPersons > 0 && shoeSizes.includes(""))
      return showAlert("Please fill in all shoe sizes");

    if (lanes > 0 && numberOfPersons > lanes * 4) {
      return showAlert("You can´t have more than 4 players per lane");
    }

    const bookingData: Bookings = {
      when: `${formatTime(time)}, ${formatDate(date)}`,
      lanes: lanes ? lanes : 1,
      people: numberOfPersons,
      shoes: shoeSizes.map((size) => parseInt(size, 10)),
    };

    try {
      const response = await fetch(
        "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const bookingResponse: BookingResponse = await response.json();
      //console.log(bookingResponse);

      navigate("/confirmation", { state: bookingResponse });
    } catch (error) {
      //console.error("Booking failed", error);
      showAlert("An error occurred while making the booking");
    }
  };

  return (
    <>
      <HamMenu />
      <main className="booking">
        <img src={logo} alt="Logo" className="bookingLogo" />
        <motion.h1
          className="bookingHeader"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          BOOKING
        </motion.h1>
        <section className="form">
          <section className="bookingDetails">
            <h3 className="formSubHeader">
              <span className="line"></span> WHEN, WHAT & WHO
              <span className="line"></span>
            </h3>
            <div className="timeDetails">
              <div className="inputContainer">
                <input
                  type="date"
                  id="dateInput"
                  className="date "
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="dateInput" className="inputLabel">
                  DATE
                </label>
              </div>
              <div className="inputContainer">
                <input
                  type="text"
                  id="timeInput"
                  className="time "
                  placeholder="HH.MM"
                  value={time}
                  onChange={handleTimeInputChange}
                />
                <label htmlFor="timeInput" className="inputLabel">
                  TIME
                </label>
              </div>
            </div>
            <div className="orderDetails">
              <div className="inputContainer">
                <input
                  type="number"
                  id="personsInput"
                  className="persons"
                  value={numberOfPersons || ""}
                  onChange={handlePersonsInputChange}
                />
                <label htmlFor="personsInput" className="inputLabel">
                  NUMBER OF AWESOME BOWLERS
                </label>
              </div>
              <div className="inputContainer">
                <input
                  type="number"
                  id="lanesInput"
                  className="lanes"
                  value={lanes}
                  onChange={handleLanesInputChange}
                />
                <label htmlFor="lanesInput" className="inputLabel">
                  NUMBER OF LANES
                </label>
              </div>
            </div>
          </section>

          {/* Section 'shoeDetails' visas bara när antalet personer är större än 0 */}
          {typeof numberOfPersons === "number" && numberOfPersons > 0 && (
            <motion.section
              className="shoeDetails"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="formSubHeader">
                <span className="line"></span> SHOES
                <span className="line"></span>
              </h3>
              <div className="shoeInputs">
                {shoeSizes.map((size, index) => (
                  <div className="inputContainer" key={index}>
                    <input
                      type="text"
                      id={`shoeSizeInput-${index}`}
                      className="shoeInfo"
                      value={size || ""}
                      onChange={(e) => handleShoeSizeChange(index, e)}
                      maxLength={2}
                      placeholder="Enter size"
                    />
                    <label
                      htmlFor={`shoeSizeInput-${index}`}
                      className="inputLabel"
                    >
                      SHOE SIZE / PERSON {index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {alertMessage && (
            <AlertOverlay
              message={alertMessage}
              onClose={() => setAlertMessage("")}
            />
          )}

          <button className="btn" onClick={handleBooking}>
            STRIIIIIIKE!
          </button>
        </section>
      </main>
    </>
  );
}
