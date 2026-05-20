import Papa from "papaparse";

const processData = (data) => {
  const todayStr = new Date().toLocaleDateString("en-GB");

  let result = {
    total: 0,
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

  const uniqueTotal = new Set();
  const uniqueToday = new Set();
  const uniqueRegistrasi = new Set();

  data.forEach((row) => {
    const program = row["Program Re-integrasi Klien"]?.toLowerCase().trim();
    const keperluan = row["Keperluan Klien"]?.toLowerCase().trim();
    const timestamp = row["Timestamp"];
    const noReg = row["No.Registrasi"]?.trim();

    if (!noReg) return;

    // TOTAL
    if (!uniqueTotal.has(noReg)) {
      uniqueTotal.add(noReg);
      result.total++;

      if (program?.includes("cmb")) result.cmb++;
      else if (program?.includes("pb")) result.pb++;
      else if (program?.includes("cb")) result.cb++;
    }

    // HARI INI
    if (timestamp) {
      const [datePart] = timestamp.split(" ");

      if (datePart === todayStr) {
        if (!uniqueToday.has(noReg)) {
          uniqueToday.add(noReg);
          result.today.total++;

          if (program?.includes("cmb")) result.today.cmb++;
          else if (program?.includes("pb")) result.today.pb++;
          else if (program?.includes("cb")) result.today.cb++;

          result.today.data.push({
            nama: row["Nama"],
            program: row["Program Re-integrasi Klien"],
            keperluan: row["Keperluan Klien"],
            noReg,
          });
        }

        // REGISTRASI
        if (keperluan === "bimbingan awal") {
          if (!uniqueRegistrasi.has(noReg)) {
            uniqueRegistrasi.add(noReg);
            result.registrasi.total++;

            if (program?.includes("cmb")) result.registrasi.cmb++;
            else if (program?.includes("pb")) result.registrasi.pb++;
            else if (program?.includes("cb")) result.registrasi.cb++;

            result.registrasi.data.push({
              nama: row["Nama"],
              program: row["Program Re-integrasi Klien"],
              keperluan: row["Keperluan Klien"],
              noReg,
            });
          }
        }
      }
    }
  });

  return result;
};

export const fetchSpreadsheetData = (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (result) => {
        const filtered = result.data.filter(
          (row) => row["Program Re-integrasi Klien"]
        );

        resolve(processData(filtered));
      },
      error: reject,
    });
  });
};
