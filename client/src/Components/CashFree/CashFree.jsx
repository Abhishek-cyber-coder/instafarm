import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCashfree } from "./utils";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import cashFreeImg from "../../../public/Images/cashFreeImg.webp";
import { getLocalStorageData } from "@/utils/helper";

function CashFree() {
  const [loading, setLoading] = useState("");
  const [cashfree, setCashfree] = useState(null);
  const [orderAmount, setOrderAmount] = useState(0);
  //   const [version, setVersion] = useState(null);
  let version = cashfree?.version();
  let token = getLocalStorageData("token");

  useEffect(() => {
    async function initializeCashfree() {
      try {
        const cf = await getCashfree(); // Load Cashfree asynchronously
        setCashfree(cf); // Set the Cashfree object in state
      } catch (error) {
        console.error("Error initializing Cashfree:", error);
      }
    }

    // Call the initialization function when the component mounts
    initializeCashfree();
  }, []);

  const handlePayment = async (sessionId) => {
    debugger;
    let checkoutOptions = {
      paymentSessionId: sessionId,
      returnUrl: "http://localhost:3000/",
    };
    debugger;
    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
        debugger;
      }
      if (result.redirect) {
        console.log("Redirection");
        debugger;
      }
    });
  };

  const getSessionId = () => {
    setLoading(true);
    debugger;
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .post("http://localhost:3010/api/v1/cashfree/payment", {
        version,
        orderAmount,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        handlePayment(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 border-2 h-1/2 w-1/2">
      <div>
        <Image
          height={100}
          width={200}
          src={cashFreeImg}
          alt="Cashfree Image"
        />
      </div>
      <div className="flex flex-col gap-5">
        <form onSubmit={getSessionId}>
          <h1 className="font-bold text-xl">Amount </h1>
          <input
            className="border-2"
            placeholder="Enter amount"
            type="number"
            value={orderAmount}
            onChange={(e) => {
              setOrderAmount(e.target.value);
            }}
          />
          {loading && (
            <div>
              <button type="submit">
                <div>wait...</div>
              </button>
            </div>
          )}
        </form>
        <div>
          <button
            className="border-2 w-full py-2 font-semibold text-lg bg-purple-600 text-white"
            type="submit"
            onClick={getSessionId}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CashFree;
