import React from "react";
import { motion } from "framer-motion";

// import icon PNG
import dashboardIcon from "./assets/icons/dashboard.png";
import anakIcon from "./assets/icons/anak.png";
import dewasaIcon from "./assets/icons/dewasa.png";
import phoneIcon from "./assets/icons/whatsapp.png";
import instagramIcon from "./assets/icons/instagram.png";
import tiktokIcon from "./assets/icons/tiktok.png";
import logo from "./assets/icons/logo.png";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

const buttons = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: dashboardIcon,
    internal: true,
  },
  {
    label: "SIBIMA Anak",
    link: "https://forms.gle/qXmiY4wskwtbSusNA",
    icon: anakIcon,
  },
  {
    label: "SIBIMA Dewasa",
    link: "https://forms.gle/CFqPgxVSAuj64kbQ8",
    icon: dewasaIcon,
  },
  {
    label: "Instagram",
    link: "https://www.instagram.com/bapaspekalongan/",
    icon: instagramIcon,
  },
  {
    label: "Tiktok",
    link: "https://www.tiktok.com/@bapas.pekalongan",
    icon: tiktokIcon,
  },
  {
    label: "Nomor Layanan",
    link: "https://wa.me/6281234665223",
    icon: phoneIcon,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-sky-700 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl w-full p-4">
        <img src={logo} alt="Logo Lentera" className="mx-auto w-24 md:w-32" />
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 my-6 md:my-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Selamat Datang di Lentera
            </h1>
            <span className="text-md md:text-xl font-normal text-white/80">
              Layanan Elektronik Terpadu Bimbingan dan Data
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/80 text-sm md:text-lg font-thin"
          >
            Silahkan klik layanan yang anda inginkan
          </motion.p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {buttons.map((btn, index) => (
            <motion.a
              key={index}
              onClick={() =>
                btn.internal
                  ? navigate(btn.link)
                  : window.open(btn.link, "_blank")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-2 text-white font-semibold shadow-xl hover:bg-white/20 transition-all duration-300"
            >
              <img
                src={btn.icon}
                alt={btn.label}
                className="w-10 h-10 object-contain"
              />

              <span>{btn.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
