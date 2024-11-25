import React, { useEffect } from "react";

const vehicleTypeMap = {
  118351: "Car",
  118352: "SUV",
  118353: "Escalade",
  "Motor Coach": "Motor Coach",
};

// Define rates for each vehicle type
const ratesByVehicleType = {
  Car: [
    { miles: 10, price: 52.0 },
    { miles: 14, price: 58.0 },
    { miles: 17, price: 63.0 },
    { miles: 24, price: 72.0 },
    { miles: 28, price: 84.0 },
    { miles: 37, price: 110.0 },
    { miles: 41, price: 123.0 },
    { miles: 54, price: 162.0 },
    { miles: 58, price: 208.0 },
    { miles: 77, price: 227.0 },
  ],
  SUV: [
    { miles: 13, price: 62.0 },
    { miles: 17, price: 71.0 },
    { miles: 24, price: 78.0 },
    { miles: 28, price: 97.0 },
    { miles: 37, price: 127.0 },
    { miles: 41, price: 133.0 },
    { miles: 54, price: 195.0 },
    { miles: 58, price: 234.0 },
    { miles: 77, price: 260.0 },
  ],
  Escalade: [
    { miles: 13, price: 82.0 },
    { miles: 17, price: 91.0 },
    { miles: 24, price: 98.0 },
    { miles: 28, price: 104.0 },
    { miles: 37, price: 147.0 },
    { miles: 41, price: 153.0 },
    { miles: 54, price: 205.0 },
    { miles: 58, price: 254.0 },
    { miles: 77, price: 280.0 },
  ],
  "Motor Coach": [], // Add rates as needed
};

// Function to calculate the price based on distance and vehicle type
const calculatePrice = (distance, vehicleTypeId) => {
  const vehicleType = vehicleTypeMap[vehicleTypeId];
  const rates = ratesByVehicleType[vehicleType] || [];

  if (!rates.length) {
    console.warn(`No rates available for vehicle type: ${vehicleType}`);
    return null;
  }

  if (distance?.value > 77) {
    const priceAbove77 = distance.value * 3;
    console.log(
      `Distance above 77 miles. Calculated price: $${priceAbove77.toFixed(2)}`
    );
    return priceAbove77.toFixed(2);
  }

  for (let i = 0; i < rates.length; i++) {
    if (distance?.value <= rates[i].miles) {
      console.log("Matched rate:", rates[i].price.toFixed(2));
      return rates[i].price.toFixed(2);
    }
  }
  return null;
};

// Component to calculate and display the price
const CalculatePrice = ({
  arg: { distance, form, setForm },
  onPriceUpdate,
}) => {
  const vehicleTypeId = form?.vehicleType;
  const price = calculatePrice(distance, vehicleTypeId);
  const vehicleType = vehicleTypeMap[vehicleTypeId] || "Unknown";
  console.log("vehicleTypeId==>>", vehicleTypeId, price, vehicleType);

  useEffect(() => {
    const price = calculatePrice(distance, vehicleTypeId);
    if (price !== null) {
      onPriceUpdate(price);
      setForm((prev) => ({ ...prev, total_fare: price }));
    }
  }, [distance, vehicleTypeId]);

  return null;
  // return (
  //   <div>
  //     {vehicleTypeId
  //       ? `The price for ${distance?.value} miles with a ${vehicleType} is: $${
  //           price || "not available"
  //         }`
  //       : "Please select a vehicle type"}
  //   </div>
  // );
};

export default CalculatePrice;
