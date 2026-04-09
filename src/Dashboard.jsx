import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dataChart, setDataChart] = useState([]);
  const navigate = useNavigate(); // ✅ ini penting

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/1YkaedA0eokdDvTyUoU2kqAry6T2pb_pfxfDyEbkCPYI/export?format=csv",
      {
        download: true,
        header: true,
        complete: (result) => {
          let gelandangan = 0;
          let captain = 0;

          result.data.forEach((row) => {
            const jabatan = row["JABATAN"]?.toUpperCase();

            if (jabatan === "GELANDANGAN") gelandangan++;
            if (jabatan === "CAPTAIN") captain++;
          });

          setDataChart([
            { name: "Gelandangan", value: gelandangan },
            { name: "Captain", value: captain },
          ]);
        },
      }
    );
  }, []);

  const COLORS = ["#ef4444", "#3b82f6"];

  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-900 to-sky-700">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-white/60 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg transition font-semibold"
      >
        Kembali
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-6">
        Diagram Perbandingan Jabatan
      </h2>

      <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-6 md:my-12">
        <PieChart width={400} height={400}>
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
  );
}

export default Dashboard;
