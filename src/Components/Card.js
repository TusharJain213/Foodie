import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || ""); // Default to first size option

  const handleAddToCart = async () => {
    const price = options[size] * qty; // Calculate price based on selected size and quantity

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: price,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(Number(e.target.value));
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Food item"
          style={{ height: "120px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <div className="d-flex align-items-center">
              <select
                className="m-2 h-100 bg-success text-white rounded"
                onChange={handleQtyChange}
                value={qty}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="m-2 h-100 bg-success text-white rounded"
                onChange={handleSizeChange}
                value={size}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 fs-5 ms-2">
                ₹{options[size] * qty || 0}/-
              </div>
            </div>
          </div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
