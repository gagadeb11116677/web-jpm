"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  ArrowRight, MessageCircle, Check, X, ChevronRight, Menu,
  Send, Users, Globe, Link2, Bot, Timer, ImageIcon, Crown,
  Code2, Bug, Terminal, Layers, Zap, Shield, Star, Sparkles,
} from "lucide-react";

/* ── data ── */
const NAV = [
  { l: "Harga", h: "#harga" },
  { l: "Command", h: "#command" },
  { l: "Jasa", h: "#jasa" },
];

const PKG = [
  { tier: "No Update", price: "10K", sub: "Full fitur, tanpa update", desc: "SC JPM v2.7.5 lengkap. JPM teks & media, push kontak, join all, multi-bot, menu advance, SWGC, bank link — semua ada. Cuma ga dapet update versi baru.", no: ["Free update", "Grup Telegram"], rec: false },
  { tier: "Free Update", price: "15K", sub: "Full fitur + update + grup", desc: "Semua fitur paket 10K ditambah free update ke versi terbaru dan akses grup Telegram khusus pembeli XOBE.", no: [], rec: true },
];

const FIT = [
  { i: Send, n: "JPM Teks & HT" }, { i: ImageIcon, n: "JPM Media" },
  { i: Sparkles, n: "Auto JPM" }, { i: Users, n: "Push Kontak" },
  { i: Globe, n: "Join All" }, { i: Star, n: "Auto Join" },
  { i: Link2, n: "Bank Link GB" }, { i: Bot, n: "Multi-Bot" },
  { i: Terminal, n: "Menu Advance" }, { i: Timer, n: "Custom Delay" },
  { i: Shield, n: "Join Limit" }, { i: Layers, n: "SWGC" },
  { i: Zap, n: "Blacklist" }, { i: Crown, n: "Backup Core" },
];

const CMD = [
  [".jpm", "Broadcast teks ke semua grup"],
  [".jpmht", "JPM format headline"],
  [".jpm <media>", "Kirim gambar/video/dokumen"],
  [".autojpm", "Auto JPM teks berulang"],
  [".autojpmht", "Auto JPM headline berulang"],
  [".swgc / .autoswgc", "Forward ke semua grup"],
  [".pushkontak", "Kirim ke semua kontak"],
  [".joinall", "Join semua grup dari link"],
  [".autojoin", "Auto join dari link masuk"],
  [".joinlinkgb", "Join dari bank link"],
  [".setjpmlimit", "Atur limit random JPM"],
  [".setdelay", "Atur delay jpm/join/swgc"],
  [".outgb", "Keluar grup otomatis"],
  [".addbot / .delbot", "Kelola multi-bot"],
  [".backupcore", "Backup & restore core"],
  [".menu", "Interactive button menu"],
];

const JASA = [
  { i: Code2, t: "Rename SC", d: "Ubah nama, logo, packname, footer — semua custom biar SC keliatan milik lo sendiri." },
  { i: Bug, t: "Fix Bug SC", d: "Error, crash, atau fitur ga jalan? Diperbaiki dari akar masalah, bukan patch tempelan." },
];

/* ── animation system ── */
const fi = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function R({ children, delay = 0, cls = "" }: { children: React.ReactNode; delay?: number; cls?: string }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: "-50px" });
  return (
    <motion.div ref={r} initial="hidden" animate={v ? "show" : "hidden"} variants={fi} transition={{ delay }} className={cls}>
      {children}
    </motion.div>
  );
}

function SR({ children, cls = "" }: { children: React.ReactNode; cls?: string }) {
  const r = useRef(null);
  const v = useInView(r, { once: true, margin: "-30px" });
  return (
    <motion.div ref={r} initial="hidden" animate={v ? "show" : "hidden"} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }} className={cls}>
      {children}
    </motion.div>
  );
}

const si = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ════════════════════════════════════════════════════ */
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onScroll = useCallback(() => setScrolled(window.scrollY > 40), []);
  useEffect(() => { addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, [onScroll]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen flex flex-col bg-[#08080A] text-[#E8E8EC] overflow-x-hidden">

      {/* ═══════ NAV ═══════ */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#08080A]/60 backdrop-blur-2xl border-b border-white/[0.03]" : ""}`}>
        <nav className="mx-auto max-w-[1120px] flex h-16 items-center justify-between px-6">
          <a href="#" className="relative z-10 flex items-center gap-2.5 group">
            <div className="relative">
              <Image src="/logo.jpg" alt="XOBE" width={32} height={32} className="rounded-full ring-1 ring-white/[0.06] group-hover:ring-[#CDFF00]/30 transition-all duration-300" />
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#CDFF00] ring-2 ring-[#08080A]" />
            </div>
            <span className="text-[15px] font-bold tracking-[-0.02em]">xobe</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5">
            {NAV.map(n => (
              <a key={n.h} href={n.h} className="relative px-4 py-2 text-[13px] text-[#5A5A68] hover:text-[#E8E8EC] rounded-lg hover:bg-white/[0.02] transition-all duration-200 group">
                {n.l}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-[#CDFF00] group-hover:w-4 transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#CDFF00] text-[#08080A] px-4 py-[7px] text-[12.5px] font-bold hover:bg-[#B8E600] hover:shadow-lg hover:shadow-[#CDFF00]/10 transition-all duration-300">
              <MessageCircle className="h-3.5 w-3.5" /> Chat
            </a>
            <Sheet open={menu} onOpenChange={setMenu}>
              <SheetTrigger asChild>
                <button className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/[0.03] transition-colors">
                  <Menu className="h-[18px] w-[18px] text-[#5A5A68]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0C0C0F] border-l border-white/[0.04] w-[280px] p-0">
                <SheetHeader className="p-6 pb-4">
                  <SheetTitle className="text-left flex items-center gap-2.5">
                    <Image src="/logo.jpg" alt="XOBE" width={24} height={24} className="rounded-full ring-1 ring-white/[0.06]" />
                    <span className="text-sm font-bold tracking-[-0.02em]">xobe</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col px-4 pb-5">
                  {NAV.map(n => (
                    <a key={n.h} href={n.h} onClick={() => setMenu(false)} className="flex items-center justify-between px-4 py-3 text-[14px] text-[#5A5A68] hover:text-[#E8E8EC] hover:bg-white/[0.03] rounded-xl transition-colors">
                      {n.l} <ChevronRight className="h-3.5 w-3.5 text-[#2A2A34]" />
                    </a>
                  ))}
                  <div className="my-3 mx-4 border-t border-white/[0.04]" />
                  <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-[13px] text-[#E8E8EC]">
                    <MessageCircle className="h-4 w-4 text-[#CDFF00]" /> @xobedevelopment2
                  </a>
                  <a href="https://t.me/xobedevelopment3" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-[13px] text-[#5A5A68]">
                    <MessageCircle className="h-4 w-4" /> @xobedevelopment3
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">

        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
          {/* background image — very subtle */}
          <div className="absolute inset-0 z-0">
            <Image src="/hero.jpg" alt="" fill className="object-cover object-center opacity-[0.05] scale-105" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#08080A] via-[#08080A]/92 to-[#08080A]" />
          </div>

          {/* ambient lime glow — right side */}
          <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] bg-[#CDFF00]/[0.03] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[10%] left-[-15%] w-[400px] h-[400px] bg-[#CDFF00]/[0.015] rounded-full blur-[120px] pointer-events-none" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 mx-auto max-w-[1120px] px-6 py-32 sm:py-36 w-full">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">

              {/* Left — text */}
              <div>
                <R>
                  <span className="inline-flex items-center gap-2.5 rounded-full bg-[#CDFF00]/[0.07] border border-[#CDFF00]/[0.12] px-4 py-1.5 text-[11px] font-bold text-[#CDFF00] tracking-wider uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CDFF00] opacity-50" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CDFF00]" />
                    </span>
                    SC JPM v2.7.5
                  </span>
                </R>

                <R delay={0.1}>
                  <h1 className="mt-8 text-[clamp(2.6rem,7vw,4.8rem)] font-black tracking-[-0.04em] leading-[0.95]">
                    Script JPM
                    <br />
                    yang{" "}
                    <span className="grad">Beneran</span>
                    <br />
                    <span className="grad">Works</span>
                  </h1>
                </R>

                <R delay={0.18}>
                  <p className="mt-6 text-[15px] text-[#5A5A68] leading-[1.7] max-w-[400px]">
                    20+ command, clean code, menu advance, ringan — bukan recode random. Satu SC buat semua kebutuhan JPM lo.
                  </p>
                </R>

                <R delay={0.26}>
                  <div className="mt-9 flex flex-wrap gap-3.5">
                    <a href="#harga"
                      className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#CDFF00] text-[#08080A] px-8 py-[14px] text-[14px] font-extrabold tracking-[-0.01em] hover:bg-[#B8E600] transition-all duration-300 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Lihat Harga</span>
                      <ArrowRight className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                    <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.015] px-8 py-[14px] text-[14px] font-medium text-[#6B6B78] hover:text-[#E8E8EC] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
                      <MessageCircle className="h-4 w-4" /> Chat Langsung
                    </a>
                  </div>
                </R>

                {/* quick stats */}
                <R delay={0.34}>
                  <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2">
                    {["20+ Command", "Multi-Bot", "SWGC", "Menu Advance"].map(s => (
                      <span key={s} className="flex items-center gap-1.5 text-[11.5px] text-[#3A3A44]">
                        <span className="h-1 w-1 rounded-full bg-[#CDFF00]/40" />{s}
                      </span>
                    ))}
                  </div>
                </R>
              </div>

              {/* Right — SC Preview (desktop only) */}
              <R delay={0.35} cls="hidden lg:block">
                <div className="relative hero-float">
                  <div className="absolute -inset-10 bg-[#CDFF00]/[0.04] blur-[100px] rounded-[52px] pointer-events-none" />
                  <div className="relative rounded-[20px] overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/70">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#CDFF00]/[0.03] to-transparent pointer-events-none z-10" />
                    <Image src="/sc-preview.jpg" alt="Tampilan Menu SC JPM XOBE v2.7.5" width={800} height={800} className="w-full h-auto" priority />
                  </div>
                  {/* floating version badge */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0F0F12] border border-white/[0.08] rounded-full px-4 py-1.5 flex items-center gap-2 shadow-xl shadow-black/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#CDFF00]" />
                    <span className="text-[11px] font-bold text-[#9A9AA8] tracking-wide">v2.7.5</span>
                  </div>
                </div>
              </R>
            </div>

            {/* SC Preview — mobile/tablet */}
            <R delay={0.3} cls="lg:hidden mt-16">
              <div className="relative max-w-[320px] mx-auto">
                <div className="absolute -inset-8 bg-[#CDFF00]/[0.04] blur-[70px] rounded-[40px] pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl shadow-black/70">
                  <Image src="/sc-preview.jpg" alt="Tampilan Menu SC JPM XOBE v2.7.5" width={800} height={800} className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0F0F12] border border-white/[0.08] rounded-full px-3.5 py-1 flex items-center gap-1.5 shadow-xl shadow-black/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#CDFF00]" />
                  <span className="text-[10.5px] font-bold text-[#9A9AA8]">v2.7.5</span>
                </div>
              </div>
            </R>
          </motion.div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section id="harga" className="scroll-mt-16">
          <div className="mx-auto max-w-[1120px] px-6 py-28 sm:py-36">
            <R>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#CDFF00]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#CDFF00]">Harga</span>
              </div>
            </R>
            <R delay={0.06}>
              <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.03em]">Pilih Paket</h2>
            </R>
            <R delay={0.1}>
              <p className="mt-2.5 text-[14px] text-[#5A5A68] max-w-[380px]">Fitur SC-nya sama persis. Bedanya cuma update & akses grup Telegram.</p>
            </R>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[820px]">
              {PKG.map((p, idx) => (
                <R key={p.tier} delay={0.15 + idx * 0.1}>
                  <div className={`relative rounded-2xl h-full flex flex-col transition-all duration-500 ${p.rec ? "bg-[#0F0F12] border-2 border-[#CDFF00]/25 lime-glow" : "bg-[#0F0F12] border border-white/[0.05] hover:border-white/[0.1]"}`}>
                    {p.rec && (
                      <div className="absolute -top-3.5 left-6 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CDFF00] text-[#08080A] text-[9.5px] font-black uppercase tracking-[0.18em] px-4 py-1 shadow-lg shadow-[#CDFF00]/15">
                          <Star className="h-2.5 w-2.5" />Recommended
                        </span>
                      </div>
                    )}
                    <div className="p-7 sm:p-8 flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="text-[12px] text-[#4A4A56]">SC JPM v2.7.5</span>
                          <span className={`text-[10px] font-bold px-2.5 py-[3px] rounded-full ${p.rec ? "bg-[#CDFF00]/[0.1] text-[#CDFF00]" : "bg-white/[0.04] text-[#4A4A56]"}`}>{p.tier}</span>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[42px] font-black tracking-[-0.04em] leading-none">{p.price}</span>
                        </div>
                        <p className="text-[11.5px] text-[#3A3A44] mt-2">{p.sub}</p>
                      </div>
                      <p className="text-[13px] text-[#6B6B78] leading-[1.7] mb-7">{p.desc}</p>
                      <div className="border-t border-white/[0.04] pt-6 flex-1">
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                          {FIT.map(f => (
                            <span key={f.n} className="flex items-center gap-2 text-[11.5px] text-[#8A8A98]">
                              <Check className="h-3 w-3 text-[#CDFF00] shrink-0 opacity-70" />{f.n}
                            </span>
                          ))}
                          {p.rec && (
                            <>
                              <span className="flex items-center gap-2 text-[11.5px] font-bold text-[#CDFF00]"><Crown className="h-3 w-3 shrink-0" />Free Update</span>
                              <span className="flex items-center gap-2 text-[11.5px] font-bold text-[#CDFF00]"><Users className="h-3 w-3 shrink-0" />Grup Tele</span>
                            </>
                          )}
                          {p.no.map(m => (
                            <span key={m} className="flex items-center gap-2 text-[11.5px] text-[#2A2A34] line-through"><X className="h-3 w-3 shrink-0" />{m}</span>
                          ))}
                        </div>
                      </div>
                      <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer"
                        className={`mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[13px] font-bold transition-all duration-300 ${p.rec ? "bg-[#CDFF00] text-[#08080A] hover:bg-[#B8E600] shadow-lg shadow-[#CDFF00]/10 hover:shadow-[#CDFF00]/20" : "bg-white/[0.03] border border-white/[0.06] text-[#6B6B78] hover:text-[#E8E8EC] hover:bg-white/[0.06] hover:border-white/[0.1]"}`}>
                        Pesan Sekarang <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ COMMANDS ═══════ */}
        <section id="command" className="scroll-mt-16">
          <div className="mx-auto max-w-[1120px] px-6 py-28 sm:py-36">
            <R>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#CDFF00]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#CDFF00]">Command</span>
              </div>
            </R>
            <R delay={0.06}>
              <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.03em]">20+ Command</h2>
            </R>
            <R delay={0.1}>
              <p className="mt-2.5 text-[14px] text-[#5A5A68] max-w-[380px]">Semua command yang lo butuh buat JPM, join grup, dan kelola bot.</p>
            </R>

            <SR className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CMD.map(([c, d]) => (
                <motion.div key={c} variants={si}
                  className="group flex items-center gap-4 rounded-xl bg-white/[0.015] border border-white/[0.035] px-5 py-3.5 hover:bg-white/[0.035] hover:border-[#CDFF00]/[0.12] transition-all duration-300 cursor-default">
                  <code className="cm text-[#CDFF00] bg-[#CDFF00]/[0.07] rounded-lg px-2.5 py-1 shrink-0 group-hover:bg-[#CDFF00]/[0.12] transition-colors duration-300">{c}</code>
                  <span className="text-[12.5px] text-[#4A4A56] group-hover:text-[#6B6B78] transition-colors duration-300">{d}</span>
                </motion.div>
              ))}
            </SR>
          </div>
        </section>

        {/* ═══════ JASA ═══════ */}
        <section id="jasa" className="scroll-mt-16">
          <div className="mx-auto max-w-[1120px] px-6 py-28 sm:py-36">
            <R>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[5px] w-[5px] rounded-full bg-[#CDFF00]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#CDFF00]">Jasa</span>
              </div>
            </R>
            <R delay={0.06}>
              <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-black tracking-[-0.03em]">Bukan Cuma Jual Script</h2>
            </R>
            <R delay={0.1}>
              <p className="mt-2.5 text-[14px] text-[#5A5A68] max-w-[380px]">Butuh custom SC atau ada bug? Kami bisa bantu.</p>
            </R>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[820px]">
              {JASA.map((s, i) => (
                <R key={s.t} delay={0.15 + i * 0.1}>
                  <div className="group rounded-2xl bg-[#0F0F12] border border-white/[0.05] p-7 sm:p-8 h-full flex flex-col hover:border-[#CDFF00]/[0.15] transition-all duration-500">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CDFF00]/[0.07] text-[#CDFF00] shrink-0 group-hover:bg-[#CDFF00]/[0.12] transition-colors duration-300">
                        <s.i className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold tracking-[-0.01em]">{s.t}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3A3A44] mt-0.5 block">Jasa</span>
                      </div>
                    </div>
                    <p className="text-[13.5px] text-[#5A5A68] leading-[1.7] flex-1">{s.d}</p>
                    <div className="mt-7 pt-6 border-t border-white/[0.04]">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[13px] text-[#4A4A56]">Harga</span>
                        <span className="text-[15px] font-black text-[#CDFF00] tracking-[-0.02em]">Nego</span>
                      </div>
                      <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-[13px] font-semibold text-[#6B6B78] hover:text-[#E8E8EC] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300">
                        Tanya via Telegram <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section>
          <div className="mx-auto max-w-[1120px] px-6 pb-28 sm:pb-36">
            <R>
              <div className="relative rounded-[28px] overflow-hidden border border-white/[0.04]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#CDFF00]/[0.025] via-transparent to-[#CDFF00]/[0.01] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px bg-gradient-to-r from-transparent via-[#CDFF00]/20 to-transparent" />
                <div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center">
                  <R delay={0.05}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#CDFF00]/[0.07] border border-[#CDFF00]/[0.1] px-3.5 py-1 text-[10.5px] font-bold text-[#CDFF00] tracking-wider uppercase mb-5">Ready to Order</span>
                  </R>
                  <R delay={0.1}>
                    <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-[-0.03em]">Mau Pakai SC JPM XOBE?</h2>
                  </R>
                  <R delay={0.15}>
                    <p className="mt-3 text-[14px] text-[#5A5A68] max-w-sm mx-auto">Chat langsung — fast respon, tinggal deal.</p>
                  </R>
                  <R delay={0.2}>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                      <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-[#CDFF00] text-[#08080A] px-8 py-[14px] text-[14px] font-extrabold shadow-lg shadow-[#CDFF00]/10 hover:shadow-[#CDFF00]/20 hover:bg-[#B8E600] transition-all duration-300">
                        <MessageCircle className="h-4 w-4" />@xobedevelopment2
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                      <a href="https://t.me/xobedevelopment3" target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.015] px-8 py-[14px] text-[14px] font-medium text-[#6B6B78] hover:text-[#E8E8EC] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
                        <MessageCircle className="h-4 w-4" />@xobedevelopment3
                      </a>
                    </div>
                  </R>
                </div>
              </div>
            </R>
          </div>
        </section>
      </main>

      {/* ═══════ FLOATING TG ═══════ */}
      <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer" aria-label="Chat Telegram"
        className="fixed bottom-6 right-6 z-40 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#CDFF00] text-[#08080A] shadow-xl shadow-[#CDFF00]/15 hover:shadow-[#CDFF00]/30 hover:scale-110 active:scale-95 transition-all duration-300 drift">
        <MessageCircle className="h-[22px] w-[22px]" strokeWidth={2.2} />
      </a>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-white/[0.03] mt-auto">
        <div className="mx-auto max-w-[1120px] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <Image src="/logo.jpg" alt="XOBE" width={18} height={18} className="rounded-full ring-1 ring-white/[0.06] group-hover:ring-[#CDFF00]/20 transition-all" />
            <span className="text-[12px] font-bold text-[#4A4A56] tracking-[-0.01em]">xobe</span>
          </a>
          <p className="text-[11px] text-[#2A2A34]">&copy; {new Date().getFullYear()} xobe development</p>
          <div className="flex items-center gap-5">
            <a href="https://t.me/xobedevelopment2" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#3A3A44] hover:text-[#CDFF00] transition-colors duration-200">@xobedevelopment2</a>
            <a href="https://t.me/xobedevelopment3" target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#3A3A44] hover:text-[#CDFF00] transition-colors duration-200">@xobedevelopment3</a>
          </div>
        </div>
      </footer>
    </div>
  );
}