import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#ef4444", "#3b82f6", "#22c55e"];

function Dashboard() {
  const navigate = useNavigate();

  const [anak, setAnak] = useState(null);
  const [dewasa, setDewasa] = useState(null);

  // 🔥 FUNCTION PROCESSING (REUSABLE)
  const processData = (data) => {
    const todayStr = new Date().toLocaleDateString("en-GB");

    let result = {
      total: data.length,
      cb: 0,
      pb: 0,
      cmb: 0,
      today: {
        total: 0,
        cb: 0,
        pb: 0,
        cmb: 0,
        data: [],
      },
      registrasi: {
        total: 0,
        cb: 0,
        pb: 0,
        cmb: 0,
        data: [],
      },
    };

    data.forEach((row) => {
      const program = row["Program Re-integrasi Klien"]?.toLowerCase().trim();
      const keperluan = row["Keperluan Klien"]?.toLowerCase().trim();
      const timestamp = row["Timestamp"];

      // 🔥 TOTAL
      if (program?.includes("cb")) result.cb++;
      else if (program?.includes("pb")) result.pb++;
      else if (program?.includes("cmb")) result.cmb++;

      // 🔥 HARI INI
      if (timestamp) {
        const [datePart] = timestamp.split(" ");

        if (datePart === todayStr) {
          result.today.total++;

          if (program?.includes("cb")) result.today.cb++;
          else if (program?.includes("pb")) result.today.pb++;
          else if (program?.includes("cmb")) result.today.cmb++;

          const item = {
            nama: row["Nama"],
            program: row["Program Re-integrasi Klien"],
            keperluan: row["Keperluan Klien"],
          };

          result.today.data.push(item);

          // 🔥 REGISTRASI
          if (keperluan?.includes("registrasi")) {
            result.registrasi.total++;

            if (program?.includes("cb")) result.registrasi.cb++;
            else if (program?.includes("pb")) result.registrasi.pb++;
            else if (program?.includes("cmb")) result.registrasi.cmb++;

            result.registrasi.data.push(item);
          }
        }
      }
    });

    return result;
  };

  // 🔥 FETCH DATA (ANAK & DEWASA)
  useEffect(() => {
    const fetchData = (url, setter) => {
      Papa.parse(url, {
        download: true,
        header: true,
        complete: (result) => {
          const filtered = result.data.filter(
            (row) => row["Program Re-integrasi Klien"]
          );

          setter(processData(filtered));
        },
        error: (err) => console.error(err),
      });
    };

    fetchData(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQfa6VS0Xa0fxrX5HxHigKmc5_XRn3fAERieEGXOWx245x4k5nKEttBJLwsQNSpelRxEjtQoJ0B8ym6/pub?output=csv",
      setAnak
    );

    fetchData(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-ft1Wxa4BZimPbmT8BUwRtArj_bjcMGg95w2ow-xQdvKEUfqbZQDp5r-NBkAT2Q16ztqbj2G_7-wO/pub?output=csv",
      setDewasa
    );
  }, []);

  const getChart = (data) => [
    { name: "CB", value: data.cb },
    { name: "PB", value: data.pb },
    { name: "CMB", value: data.cmb },
  ];

  // 🔥 COMPONENT CARD (BIAR GAK DUPLIKAT)
  const CardKlien = ({ title, data }) => {
    if (!data) return null;

    return (
      <>
        {/* TOTAL */}
        <div className="card-stats">
          <h1>Jumlah Klien {title}</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 flex flex-col justify-center items-center text-black">
            <p>
              Total Klien {title}: {data.total}
            </p>
            <p>CB: {data.cb}</p>
            <p>PB: {data.pb}</p>
            <p>CMB: {data.cmb}</p>

            <PieChart width={300} height={300}>
              <Pie data={getChart(data)} dataKey="value" label>
                {getChart(data).map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* HARI INI */}
        <div className="card-stats">
          <h1>Bimbingan Klien {title} Hari Ini</h1>

          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-2 md:my-6 text-black">
            <div className="mb-4 border-b pb-2 space-y-1 text-left">
              <p className="font-bold">
                Total Klien Hari ini: {data.today.total}
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                CB: {data.today.cb}
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-sm"></span>
                PB: {data.today.pb}
              </p>

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                CMB: {data.today.cmb}
              </p>
            </div>

            {/* 🔥 REGISTRASI */}
            <div className="text-left">
              <p className="font-semibold">
                Registrasi Hari Ini: {data.registrasi.total}
              </p>

              <p className="text-sm mb-2">
                CB: {data.registrasi.cb} | PB: {data.registrasi.pb} | CMB:{" "}
                {data.registrasi.cmb}
              </p>

              {data.registrasi.data.length === 0 ? (
                <p className="text-sm text-gray-600">
                  Tidak ada registrasi hari ini
                </p>
              ) : (
                <ul className="space-y-1 text-sm">
                  {data.registrasi.data.map((item, i) => (
                    <li key={i} className="flex justify-between border-b pb-1">
                      <span>{item.nama}</span>
                      <span className="font-semibold">{item.program}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="text-white min-h-screen text-center bg-gradient-to-br from-blue-800 via-indigo-900 to-sky-700 p-8 pb-32">
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
        <CardKlien title="Anak" data={anak} />
        <CardKlien title="Dewasa" data={dewasa} />
      </div>
    </div>
  );
}

export default Dashboard;
