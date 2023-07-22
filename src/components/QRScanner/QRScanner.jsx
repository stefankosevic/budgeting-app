import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";
import axios from "axios";

const QRScanner = () => {
  const [data, setData] = useState("No result");
  const [totalCash, setTotalCash] = useState(0);

  useEffect(() => {
    if (!data.includes("http")) return;

    try {
      const { data: total } = axios.get("http://localhost:5001/user/api/scan", {
        params: {
          url: data,
        },
      });
      setTotalCash(total);
    } catch (err) {
      setTotalCash(err);
    }
  }, [data]);

  return (
    <>
      <QrScanner
        onDecode={(result) => {
          setData(result);
          //   window.open(result);
        }}
        onError={(error) => console.log(error?.message)}
      />
      <p>{data}</p>
      <p>{totalCash}</p>
    </>
  );
};

export default QRScanner;
