import { useState } from "react";
import { buyRequestAPI } from "../utils/api";

function BuyRequestForm({ onAddRequest }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productName || !quantity || !deliveryDate) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await buyRequestAPI.create({
        item: productName,
        quantity,
        deliveryDate,
      });

      if (response.success && onAddRequest) {
        const newRequest = response.data;
        const dateObj = new Date(newRequest.deliveryDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        onAddRequest({
          _id: newRequest._id,
          id: newRequest._id,
          item: newRequest.item,
          quantity: newRequest.quantity,
          delivery: days[dateObj.getDay()],
          status: newRequest.status === 'open' ? 'Open' : newRequest.status,
        });
      }
      
      setProductName("");
      setQuantity("");
      setDeliveryDate("");
    } catch (error) {
      alert(error.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Buy Request</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input 
            type="text" 
            placeholder="Organic Tomatoes"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input 
            type="text" 
            placeholder="10 kg"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label>Delivery Date</label>
          <input 
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Request"}
        </button>
      </form>
    </div>
  );
}

export default BuyRequestForm;
