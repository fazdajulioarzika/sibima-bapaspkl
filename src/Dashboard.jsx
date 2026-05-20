import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSpreadsheetData } from "./services/clientService";
import CardClient from "./components/CardClient";

function Dashboard() {
  const navigate = useNavigate();
  const [anak, setAnak] = useState(null);
  const [dewasa, setDewasa] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const anakData = await fetchSpreadsheetData(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfa6VS0Xa0fxrX5HxHigKmc5_XRn3fAERieEGXOWx245x4k5nKEttBJLwsQNSpelRxEjtQoJ0B8ym6/pub?output=csv"
        );

        const dewasaData = await fetchSpreadsheetData(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-ft1Wxa4BZimPbmT8BUwRtArj_bjcMGg95w2ow-xQdvKEUfqbZQDp5r-NBkAT2Q16ztqbj2G_7-wO/pub?output=csv"
        );

        setAnak(anakData);
        setDewasa(dewasaData);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="text-white text-center p-8 pb-32">
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 bg-white/60 px-4 py-2 rounded-lg"
      >
        Kembali
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-6">
        Dashboard Klien Bapas Pekalongan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CardClient
          title="Anak"
          data={anak}
          colors={["#ef4444", "#3b82f6", "#22c55e"]}
        />

        <CardClient
          title="Dewasa"
          data={dewasa}
          colors={["#ff812d", "#ba28fd", "#53e5ff"]}
        />
      </div>
    </div>
  );
}

export default Dashboard;
