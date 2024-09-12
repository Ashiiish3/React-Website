import React, { useContext, useEffect, useState } from "react";
import { getDataContext } from "../ContextApi/AddToCartContext";
import SingleCart from "../Components/SingleCart";

export default function AddToCart() {
  const { GetAddCartData, addCartData, addCartLength } = useContext(getDataContext);
  const [totalPrice, setTotalPrice] = useState(0)
  useEffect(() => {
    let total = 0;
    const TotalAmount = () => {
      addCartData.forEach((element) => {
        const oneProductPrice = (element.new_price.replace(/,/g, '')*element.quantity)
        total = total + oneProductPrice
        console.log(oneProductPrice)
        console.log(total)
        return total
      });
      setTotalPrice(total)
    }
    TotalAmount()
    GetAddCartData();
  }, [addCartLength]);
  return (
    <div className="w-full max-w-[94rem] m-auto grid lg:grid-flow-col gap-5 px-4 sm:px-6 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 gap-5">
        {addCartData.map((ele, ind) => (
          <SingleCart key={ind} ele={ele} />
        ))}
      </div>
      <div className="w-[300px] h-[195px] mt-5 rounded-lg border-[1px] py-3 bg-gray-50 m-auto">
        <h1 className="text-start px-4 text-gray-500 font-medium uppercase pb-3">
          Price Details
        </h1>
        <hr />
        <div className="px-4">
          <div className="flex justify-between my-3">
            <p>Price ({addCartLength} items)</p>
            <p>₹ {totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p className="text-green-600 font-medium mb-3">Free</p>
          </div>
          <hr />
          <div className="flex justify-between mt-3">
            <p className="font-medium text-lg">Total Amount</p>
            <p className="font-medium text-lg">₹ {totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}