import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const getChart = (data) => [
  { name: "CB", value: data.cb },
  { name: "PB", value: data.pb },
  { name: "CMB", value: data.cmb },
];

function CardClient({ title, data, colors }) {
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
                <Cell key={i} fill={colors[i]} />
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
              Total Klien Hari Ini: {data.today.total}
            </p>

            <p className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colors[0] }}
              ></span>
              CB: {data.today.cb}
            </p>

            <p className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colors[1] }}
              ></span>
              PB: {data.today.pb}
            </p>

            <p className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colors[2] }}
              ></span>
              CMB: {data.today.cmb}
            </p>
          </div>

          {/* REGISTRASI */}
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
}

export default CardClient;
