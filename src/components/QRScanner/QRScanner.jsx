import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { TABS } from "../../lib/constants/tabs";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [data, setData] = useState("No result");
  const [totalCash, setTotalCash] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.includes("http")) return;

    const getQRAmount = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
        navigate("/dashboard");
      } catch (err) {
        setTotalCash(err);
      }
    };

    getQRAmount();
  }, [data, navigate]);

  return (
    <>
      {!loading ? (
        <QrScanner
          onDecode={(result) => {
            setData(result);
          }}
          onError={(error) => console.log(error?.message)}
        />
      ) : null}
      <p>{data}</p>
      <p>{totalCash}</p>
    </>
  );
};

export default QRScanner;
