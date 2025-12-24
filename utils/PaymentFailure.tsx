"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { IoClose } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import successAnimation from ".././public/lotties/payment-unsuccess.json";

interface PaymentFailureProps {
  open: boolean;
  amount: string;
  txnid: string;
  timer: number;
  onClose: () => void;
}

const PaymentFailure = ({
  open,
  amount,
  txnid,
  timer,
  onClose,
}: PaymentFailureProps) => {
  const [time, setTime] = useState(timer);


  useEffect(() => {
    if (open) {
      setTime(timer);
    }
  }, [open, timer]);

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);


  useEffect(() => {
    if (open && time === 0) {
      onClose();
    }
  }, [time, open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Auto closing in {time}s
          </span>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full"
          >
            <IoClose size={18} />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <Lottie
            animationData={successAnimation}
            loop
            style={{ height: 100, width: 100 }}
          />
        </div>

        <div className="text-center font-semibold text-xl text-gray-800 flex justify-center items-center mb-2">
          <FaRupeeSign className="mr-1" />
          {amount}/-
        </div>

        <div className="text-center text-gray-700 font-medium text-base mb-2">
          Payment Failure!
        </div>

        <p className="text-center text-sm text-gray-600 px-4">
          Unfortunately, your payment could not be processed. Please try again.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;
