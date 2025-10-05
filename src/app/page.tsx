"use client";

// Página principal de COSMOTEC - AURA
// Next.js (App Router) + TypeScript + TailwindCSS

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AstronautList } from "@/components/AstronautList";
import { AuraInfoCard } from "@/components/AuraInfoCard";
import { AuraTeamCard } from "@/components/AuraTeamCard";
import { AuraKeywordsCard } from "@/components/AuraKeywordsCard";

export default function CosmotecAura() {
  const router = useRouter();
  const [email, setEmail] = useState("cosmotec@gmail.com");
  const [password, setPassword] = useState("12345678");

  return (
    <main className="relative min-h-screen bg-[#0b0f17] text-white overflow-hidden">
      {/* Fondo estrellado */}
      <Image
        src="/space-bg.jpg"
        alt="Star field background"
        fill
        priority
        className="object-cover opacity-30 pointer-events-none select-none"
      />

      {/* Efectos de luz AURA - Colores de Astronautas */}
      <div className="pointer-events-none absolute left-[-10%] top-20 h-[600px] w-[600px] rounded-full blur-[120px] bg-red-900/30" />
      <div className="pointer-events-none absolute right-[-10%] top-40 h-[500px] w-[500px] rounded-full blur-[110px] bg-orange-900/25" />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-20 h-[400px] w-[400px] rounded-full blur-[100px] bg-red-800/20" />

      {/* Barra de navegación */}
      <header className="relative z-10 max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            AURA
          </h1> 
        </div>
        <div className="flex items-center gap-4">
          <Image src="/fotocosmotec.png" alt="NASA" width={44} height={44} className="drop-shadow" />
        </div>
      </header>

      {/* Contenido principal */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section AURA */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              AURA
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Advanced Monitoring and Analysis System for Space Exploration
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Grid principal: AURA Info + Login */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 mb-16">
          {/* Información principal de AURA */}
          <div className="space-y-8">
            {/* Información AURA */}
            <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-8 backdrop-blur-sm">
              <AuraInfoCard />
            </div>

            {/* Equipo AURA */}
            <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-8 backdrop-blur-sm">
              <AuraTeamCard />
            </div>

            {/* Palabras Clave AURA */}
            <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-8 backdrop-blur-sm">
              <AuraKeywordsCard />
            </div>
          </div>

          {/* Panel de Login */}
          <aside className="lg:sticky lg:top-10 self-start">
            <div className="rounded-3xl bg-black/40 ring-1 ring-white/10 p-8 backdrop-blur-sm">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Access
                </h3>
                <p className="text-white/70 text-sm mt-2">Sign in to access the AURA system</p>
              </div>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Verificar credenciales
                  if (email === "cosmotec@gmail.com" && password === "12345678") {
                    // Redirect to astronauts page
                    router.push("/astronautas");
                  } else {
                    alert("Incorrect credentials. Use: cosmotec@gmail.com / 12345678");
                  }
                }}
              >
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-white/60">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition"
                      placeholder="usuario@nasa.gov"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-white/60">Password</span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition"
                      placeholder="••••••••"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold py-3 hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                >
                  Sign In
                </button>

                <p className="text-xs text-white/60 text-center">
                  By signing in you agree to our Terms and Privacy Policy.
                </p>
              </form>

            </div>
          </aside>
        </div>

        {/* Sección de Astronautas */}
        <div className="rounded-3xl bg-black/30 ring-1 ring-white/10 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              System Astronauts
            </span>
          </h3>
          <AstronautList />
        </div>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6">
      <div className="absolute -inset-10 rounded-full blur-3xl bg-red-800/20" />
      <div className="relative">
        <div className="text-4xl font-bold tracking-tight text-red-400">{value}</div>
        <div className="text-white/70 mt-1 text-sm">{label}</div>
      </div>
    </div>
  );
}
