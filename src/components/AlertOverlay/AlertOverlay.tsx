import { useEffect } from "react";
import "./AlertOverlay.css";

type AlertOverlayProps = {
  message: string;
  onClose: () => void;
};

export default function AlertOverlay({ message, onClose }: AlertOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <main className="alertOverlay">
      <section className="alertBox">
        <p>{message}</p>
      </section>
    </main>
  );
}
