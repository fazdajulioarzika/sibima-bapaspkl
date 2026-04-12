import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dataChart, setDataChart] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [cb, setCb] = useState(0);
  const [pb, setPb] = useState(0);
  const [cmb, setCmb] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [todayCb, setTodayCb] = useState(0);
  const [todayPb, setTodayPb] = useState(0);
  const [todayCmb, setTodayCmb] = useState(0);
  const [dataChartDewasa, setDataChartDewasa] = useState([]);
  const [todayDataDewasa, setTodayDataDewasa] = useState([]);
  const [totalDewasa, setTotalDewasa] = useState(0);
  const [cbDewasa, setCbDewasa] = useState(0);
  const [pbDewasa, setPbDewasa] = useState(0);
  const [cmbDewasa, setCmbDewasa] = useState(0);
  const [todayTotalDewasa, setTodayTotalDewasa] = useState(0);
  const [todayCbDewasa, setTodayCbDewasa] = useState(0);
  const [todayPbDewasa, setTodayPbDewasa] = useState(0);
  const [todayCmbDewasa, setTodayCmbDewasa] = useState(0);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfa6VS0Xa0fxrX5HxHigKmc5_XRn3fAERieEGXOWx245x4k5nKEttBJLwsQNSpelRxEjtQoJ0B8ym6/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (result) => {
          const data = result.data.filter(
            (row) => row["Program Re-integrasi Klien"]
          );

          setTotal(data.length);

          let countCB = 0;
          let countPB = 0;
          let countCMB = 0;

          // 🔥 HITUNG TOTAL
          data.forEach((row) => {
            const program = row["Program Re-integrasi Klien"]
              ?.toLowerCase()
              .trim();

            if (program?.includes("cb")) countCB++;
            else if (program?.includes("pb")) countPB++;
            else if (program?.includes("cmb")) countCMB++;
          });

          setCb(countCB);
          setPb(countPB);
          setCmb(countCMB);

          setDataChart([
            { name: "CB", value: countCB },
            { name: "PB", value: countPB },
            { name: "CMB", value: countCMB },
          ]);

          // 🔥 DATA HARI INI (FIXED)
          const todayStr = new Date().toLocaleDateString("en-GB");

          let dataHariIni = [];
          let countCBToday = 0;
          let countPBToday = 0;
          let countCMBToday = 0;

          data.forEach((row) => {
            const timestamp = row["Timestamp"];

            if (timestamp) {
              const [datePart] = timestamp.split(" "); // 🔥 FIX

              if (datePart === todayStr) {
                const program = row["Program Re-integrasi Klien"]
                  ?.toLowerCase()
                  .trim();

                if (program?.includes("cb")) countCBToday++;
                else if (program?.includes("pb")) countPBToday++;
                else if (program?.includes("cmb")) countCMBToday++;

                dataHariIni.push({
                  nama: row["Nama"],
                  program: row["Program Re-integrasi Klien"],
                });
              }
            }
          });

          // 🔥 SET STATE HARI INI
          setTodayData(dataHariIni);
          setTodayTotal(dataHariIni.length);
          setTodayCb(countCBToday);
          setTodayPb(countPBToday);
          setTodayCmb(countCMBToday);
        },
        error: (err) => {
          console.error("ERROR CSV:", err);
        },
      }
    );
  }, []);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-ft1Wxa4BZimPbmT8BUwRtArj_bjcMGg95w2ow-xQdvKEUfqbZQDp5r-NBkAT2Q16ztqbj2G_7-wO/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (result) => {
          const data = result.data.filter(
            (row) => row["Program Re-integrasi Klien"]
          );

          setTotalDewasa(data.length);

          let countCB = 0;
          let countPB = 0;
          let countCMB = 0;

          data.forEach((row) => {
            const program = row["Program Re-integrasi Klien"]
              ?.toLowerCase()
              .trim();

            if (program?.includes("cb")) countCB++;
            else if (program?.includes("pb")) countPB++;
            else if (program?.includes("cmb")) countCMB++;
          });

          setCbDewasa(countCB);
          setPbDewasa(countPB);
          setCmbDewasa(countCMB);

          setDataChartDewasa([
            { name: "CB", value: countCB },
            { name: "PB", value: countPB },
            { name: "CMB", value: countCMB },
          ]);

          const todayStr = new Date().toLocaleDateString("en-GB");

          let dataHariIni = [];
          let countCBToday = 0;
          let countPBToday = 0;
          let countCMBToday = 0;

          data.forEach((row) => {
            const timestamp = row["Timestamp"];

            if (timestamp) {
              const [datePart] = timestamp.split(" "); // 🔥 ambil tanggal saja

              if (datePart === todayStr) {
                const program = row["Program Re-integrasi Klien"]
                  ?.toLowerCase()
                  .trim();

                if (program?.includes("cb")) countCBToday++;
                else if (program?.includes("pb")) countPBToday++;
                else if (program?.includes("cmb")) countCMBToday++;

                dataHariIni.push({
                  nama: row["Nama"],
                  program: row["Program Re-integrasi Klien"],
                });
              }
            }
          });

          // ✅ set semua state
          setTodayDataDewasa(dataHariIni);
          setTodayTotalDewasa(dataHariIni.length);
          setTodayCbDewasa(countCBToday);
          setTodayPbDewasa(countPBToday);
          setTodayCmbDewasa(countCMBToday);
        },
      }
    );
  }, []);

  const COLORS = ["#ef4444", "#3b82f6", "#22c55e"];
  return (
    <div className="text-white min-h-screen items-center justify-center text-center bg-gradient-to-br from-blue-800 via-indigo-900 to-sky-700 p-8 pb-32">
      <button
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-50 bg-white/60 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg transition font-semibold"
      >
        Kembali
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-6">
        Dashboard Klien Bapas Pekalongan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
        {/* anak */}
        <div className="card-stats">
          <h1>Jumlah Klien Anak</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 flex flex-col justify-center items-center text-black">
            <p>Jumlah Total: {total}</p>
            <p>CB: {cb}</p>
            <p>PB: {pb}</p>
            <p>CMB: {cmb}</p>
            <PieChart width={300} height={300}>
              <Pie
                data={dataChart}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {dataChart.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        <div className="card-stats">
          <h1>Bimbingan Klien Anak Hari Ini</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 text-black">
            <div className="mb-4 border-b pb-2 space-y-1 text-left">
              <p>
                Total: <span className="font-bold">{todayTotal}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                CB: <span className="font-bold">{todayCb}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                PB: <span className="font-bold">{todayPb}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                CMB: <span className="font-bold">{todayCmb}</span>
              </p>
            </div>

            {/* 🔥 LIST */}
            {todayData.length === 0 ? (
              <p>Tidak ada data hari ini</p>
            ) : (
              todayData.map((item, index) => (
                <div key={index} className="mb-2 border-b pb-1">
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-gray-600">{item.program}</p>
                </div>
              ))
            )}
          </div>
        </div>
        {/* dewasa */}
        <div className="card-stats">
          <h1>Jumlah Klien Dewasa</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 flex flex-col justify-center items-center text-black">
            <p>Jumlah Total: {totalDewasa}</p>
            <p>CB: {cbDewasa}</p>
            <p>PB: {pbDewasa}</p>
            <p>CMB: {cmbDewasa}</p>

            <PieChart width={300} height={300}>
              <Pie
                data={dataChartDewasa}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {dataChartDewasa.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        <div className="card-stats">
          <h1>Bimbingan Klien Dewasa Hari Ini</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 text-black">
            <div className="mb-4 border-b pb-2 space-y-1 text-left">
              <p>
                Total: <span className="font-bold">{todayTotalDewasa}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                CB: <span className="font-bold">{todayCbDewasa}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                PB: <span className="font-bold">{todayPbDewasa}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                CMB: <span className="font-bold">{todayCmbDewasa}</span>
              </p>
            </div>

            {todayDataDewasa.length === 0 ? (
              <p>Tidak ada data hari ini</p>
            ) : (
              todayDataDewasa.map((item, index) => (
                <div key={index} className="mb-2 border-b pb-1">
                  <p className="font-semibold">{item.nama}</p>
                  <p className="text-sm text-gray-600">{item.program}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
