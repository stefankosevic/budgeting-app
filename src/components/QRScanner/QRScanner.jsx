import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { TABS } from "../../lib/constants/tabs";

const QRScanner = () => {
  const [data, setData] = useState("No result");
  const [totalCash, setTotalCash] = useState(0);

  useEffect(() => {
    if (!data.includes("http")) return;

    const getQRAmount = async () => {
      try {
        const { data: total } = await axios.get(
          process.env.REACT_APP_API_URL + "/user/api/scan",
          {
            params: {
              url: data,
            },
          }
        );
        setTotalCash(total);
        const totalRacun = data.data;
        await axios.post(process.env.REACT_APP_API_URL + "/user/api/balance", {
          title: "Racun",
          date: new Date().toLocaleDateString(),
          timestamp: new Date(),
          amount: totalRacun,
          userId: localStorage.getItem("userId"),
          type: TABS.ONE_TIME_EXPENSE,
        });
      } catch (err) {
        setTotalCash(err);
      }
    };

    getQRAmount();
  }, [data]);

  return (
    <>
      <QrScanner
        onDecode={(result) => {
          setData(result);
        }}
        onError={(error) => console.log(error?.message)}
      />
      <p>{data}</p>
      <p>{totalCash}</p>
    </>
  );
};

export default QRScanner;
