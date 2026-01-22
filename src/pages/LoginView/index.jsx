import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaChartLine,
  FaDatabase,
  FaCalculator,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";

/* ================== REUSABLE COMPONENT ================== */

function InputField({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  rightIcon,
  onRightClick,
  accent = "blue",
}) {
  return (
    <div>
      <label className="text-sm text-gray-300 flex items-center gap-2 mb-2">
        <Icon className={`text-${accent}-400`} />
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3.5 bg-gray-900/80 border rounded-xl text-white placeholder-gray-500
            ${error ? "border-red-500/50" : "border-gray-700"}
            focus:ring-2 focus:ring-${accent}-500/50 focus:border-${accent}-500`}
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-2">⚠ {error}</p>}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
      <div className="flex gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="text-xl" />
        </div>
        <div>
          <h4 className="text-white font-semibold">{title}</h4>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ================== MAIN VIEW ================== */

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const error = {
    email: "",
    password: "",
    general: "Contoh error: Kredensial tidak valid",
  };

  const features = [
    {
      icon: FaChartLine,
      title: "Analisis Transaksi AI",
      desc: "Input bahasa natural, jurnal otomatis",
      color: "bg-blue-900/50 text-blue-400",
    },
    {
      icon: FaDatabase,
      title: "Pencatatan Otomatis",
      desc: "Debit & kredit terisi akurat",
      color: "bg-emerald-900/50 text-emerald-400",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">
        {/* LEFT INFO */}
        <div className="hidden md:flex flex-col justify-center space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FaCalculator className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                AI<span className="text-blue-400">shan</span>{" "}
                <span className="text-emerald-400">AI</span>
              </h1>
              <p className="text-gray-400">AI Asisten Akuntansi</p>
            </div>
          </div>

          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}

          <div className="bg-gradient-to-r from-blue-900/30 to-emerald-900/30 border border-gray-700/50 rounded-xl p-5">
            <p className="text-gray-300 italic text-sm mb-3">
              "Menyetor uang sebagai modal sebesar 3 juta"
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-900/80 p-3 rounded-lg">
                <p className="text-blue-400">Debit</p>
                <p className="text-white font-semibold">Kas: Rp 3.000.000</p>
              </div>
              <div className="bg-gray-900/80 p-3 rounded-lg">
                <p className="text-emerald-400">Kredit</p>
                <p className="text-white font-semibold">Modal: Rp 3.000.000</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl items-center justify-center mb-4">
              <FaLock className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Masuk ke Dashboard
            </h2>
            <p className="text-gray-400 text-sm">
              Akses AI asisten akuntansi Anda
            </p>
          </div>

          {error.general && (
            <div className="mb-6 bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-200 text-sm">
              ⚠ {error.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              icon={HiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              error={error.email}
            />

            <InputField
              label="Password"
              icon={FaLock}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              error={error.password}
              accent="emerald"
              rightIcon={showPassword ? <FaEyeSlash /> : <FaEye />}
              onRightClick={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-gray-900 border-gray-600"
                />
                Ingat saya
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Demo: <span className="text-blue-400">demo@aishan.ai</span> /{" "}
            <span className="text-emerald-400">password1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
