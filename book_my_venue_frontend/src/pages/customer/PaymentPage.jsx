import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { db } from "../../data/mockData";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booking = db.getBooking(1);
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [error, setError] = useState("");

  // if (!booking) {
  //   return (
  //     <div className="empty-state">
  //       <h3>Booking not found</h3>
  //     </div>
  //   );
  // }
  const venue = db.getVenue(3);

  const handlePay = (e) => {
    e.preventDefault();
    setError("");
    if (method === "card" && (cardNumber.length < 12 || expiry.length < 4 || cvv.length < 3)) {
      setError("Please enter valid card details.");
      return;
    }
    if (method === "upi" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      // db.updateBooking(booking.booking_id, { status: "CONFIRMED" });
      navigate(`/booking-confirmation/${11}`, { replace: true });
    }, 1400);
  };

  return (
    <div className="container payment-page">
      <h1>Complete Payment</h1>

      <div className="payment-layout">
        <form className="payment-form" onSubmit={handlePay}>
          {error && <div className="form-error">{error}</div>}
          <div className="payment-methods">
            {["card", "upi", "netbanking"].map((m) => (
              <button
                type="button"
                key={m}
                className={`payment-method-btn ${method === m ? "active" : ""}`}
                onClick={() => setMethod(m)}
              >
                {m === "card" ? "Credit / Debit Card" : m === "upi" ? "UPI" : "Net Banking"}
              </button>
            ))}
          </div>

          {method === "card" && (
            <>
              <label>Card number</label>
              <input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <div className="payment-row">
                <div>
                  <label>Expiry</label>
                  <input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                </div>
                <div>
                  <label>CVV</label>
                  <input placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
              </div>
            </>
          )}

          {method === "upi" && (
            <>
              <label>UPI ID</label>
              <input placeholder="yourname@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            </>
          )}

          {method === "netbanking" && (
            <>
              <label>Select bank</label>
              <select>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
              </select>
            </>
          )}

          <button type="submit" className="btn-primary payment-submit" disabled={processing}>
            {processing ? "Processing..." : `Pay ₹${"110001"}`}
          </button>
          <p className="payment-secure">🔒 This is a simulated, secure payment for demo purposes.</p>
        </form>

        <aside className="payment-summary">
          <h3>Order Summary</h3>
          <p className="summary-venue">{venue?.venue_name}</p>
          <div className="summary-row"><span>Event</span><span>{"Wedding"}</span></div>
          <div className="summary-row"><span>Dates</span><span>{"22/02/2026"} → {"29/02/2026"}</span></div>
          <div className="summary-row"><span>Guests</span><span>{101}</span></div>
          <div className="summary-row total"><span>Amount Payable</span><span>₹{ "200000 en-IN"}</span></div>
        </aside>
      </div>
    </div>
  );
}
