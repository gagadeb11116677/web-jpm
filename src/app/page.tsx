"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, ArrowUpRight } from "lucide-react";

/* ════════════════════════════════════════════════════
   DATA — angka spesifik, bukan vague claim
   ════════════════════════════════════════════════════ */

const NAV = [
  { label: "Harga", href: "#harga" },
  { label: "Command", href: "#command" },
  { label: "Cara beli", href: "#cara-beli" },
  { label: "Jasa", href: "#jasa" },
  { label: "FAQ", href: "#faq" },
];

const PACKAGES = [
  {
    tier: "tanpa update",
    price: "10K",
    desc: "SC JPM v2.7.5 lengkap. Buat yang mau pakai langsung, ga butuh update versi baru.",
    excluded: ["Update versi baru", "Grup Telegram pembeli"],
    featured: false,
  },
  {
    tier: "dengan update",
    price: "15K",
    desc: "Sama kayak paket 10K, plus update versi selama SC masih dikembangkan dan akses grup Telegram.",
    excluded: [],
    featured: true,
  },
];

const SPECS = [
  ["Versi", "2.7.5"],
  ["Total command", "16 (dulunya 8 di v1.0)"],
  ["Bot paralel", "5 / sesi"],
  ["Runtime", "Node.js 18 ke atas"],
  ["Library", "Baileys @whiskeysockets"],
  ["Storage", "File JSON, ga perlu DB"],
  ["Ukuran SC", "340 KB (zipped)"],
  ["Dependensi", "8 packages"],
  ["Pertama rilis", "awal 2024"],
  ["User aktif", "40-70 an (naik turun)"],
];

const COMMANDS = [
  [".jpm", "Broadcast teks ke semua grup"],
  [".jpmht", "JPM format headline"],
  [".jpm <media>", "Kirim gambar / video / dokumen"],
  [".autojpm", "Auto JPM teks berulang"],
  [".autojpmht", "Auto JPM headline berulang"],
  [".pushkontak", "Kirim ke semua kontak tersimpan"],
  [".joinall", "Join semua grup dari link"],
  [".autojoin", "Auto join dari link yang masuk"],
  [".joinlinkgb", "Join dari bank link"],
  [".swgc", "Forward pesan ke semua grup"],
  [".autoswgc", "Auto forward SWGC"],
  [".outgb", "Keluar grup otomatis"],
  [".addbot", "Tambah nomor bot"],
  [".delbot", "Hapus nomor bot"],
  [".backupcore", "Backup & restore core"],
  [".setdelay", "Atur delay jpm / join / swgc"],
];

const SERVICES = [
  {
    title: "Rename SC",
    desc: "Ubah nama bot, logo, packname, footer, watermark. Struktur nama dirapiin di seluruh codebase, bukan cuma ganti string doang.",
  },
  {
    title: "Fix Bug SC",
    desc: "Error, crash, command ga jalan, fitur behave aneh. Dibedah dari akar masalahnya, bukan tempelan patch yang bikin SC makin rusak.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Chat admin",
    desc: "DM ke @xobedevelopment2, bilang mau beli paket yang mana. Kalau admin online biasanya di bawah 10 menit dibales.",
  },
  {
    n: "2",
    title: "Bayar",
    desc: "Transfer ke rekening BCA atau e-wallet (Dana/OVO/GoPay). Konfirmasi pake screenshot bukti transfer.",
  },
  {
    n: "3",
    title: "Terima file",
    desc: "SC dalam bentuk .zip dikirim langsung di chat Telegram. Kalau paket 15K, otomatis ditambahin ke grup Telegram pembeli.",
  },
];

const FAQS = [
  {
    q: "Aman dipakai di nomor utama?",
    a: "Pakai pairing code resmi WhatsApp Web via Baileys. Ga ada modifikasi APK, ga ada injeksi. Tapi untuk JPM masal ke 40+ grup, disarankan pakai nomor cadangan. Resiko banned ada di cara pakai, bukan di SC-nya.",
  },
  {
    q: "Berapa lama setup?",
    a: "Pairing code, scan QR, jalan. Rata-rata 5 menit. Ada video tutorial di grup Telegram pembeli, step by step dari install Node.js sampai running.",
  },
  {
    q: "Kalau ada bug setelah beli?",
    a: "Paket 15K: fix bug minor gratis, bug major fix tanpa biaya terpisah. Paket 10K: konsultasi tetap bisa, tapi fix major dihitung jasa terpisah (kisaran 5-20K tergantung kompleksitas).",
  },
  {
    q: "Bisa jalan banyak nomor barengan?",
    a: "Bisa. Multi-bot support sampai 5 nomor paralel di satu proses Node. Tiap nomor punya session file terpisah, ga bikin conflict. Lebih dari 5 belum ditest — secara teori bisa, tapi CPU lo yang nentuin.",
  },
  {
    q: "Update versi baru gimana cara dapetnya?",
    a: "Paket 15K dapet notif lewat grup Telegram tiap ada versi baru. Tinggal download file baru, replace folder lama (session tetap aman). Paket 10K stuck di v2.7.5 — ga dapet update.",
  },
  {
    q: "Refund?",
    a: "Produk digital, setelah file dikirim ga bisa refund. Tapi SC dijamin jalan dan support setup sampai connect. Kalau SC-nya beneran rusak dan ga bisa difix dalam 24 jam, baru diskusi refund parsial.",
  },
];

const INCLUDED = [
  "Source code lengkap — 16 file command + core",
  "config.json siap edit (delay, blacklist, bank link)",
  "README.md setup step-by-step (pakai Bahasa Indonesia)",
  "Bank link grup — ratusan link aktif",
  "Blacklist nomor & grup template",
  "Akses update versi baru (paket 15K only)",
];

const CHANGELOG = [
  { v: "2.7.5", d: "Fix bug pushkontak crash di nomor baru", date: "jun 2026" },
  { v: "2.7.0", d: "Tambah multi-bot paralel sampai 5 nomor", date: "mei 2026" },
  { v: "2.6.0", d: "Rewrite menu jadi button interaktif", date: "mar 2026" },
  { v: "2.5.0", d: "Tambah SWGC + autoswgc", date: "feb 2026" },
  { v: "2.0.0", d: "Rewrite total, pindah ke Baileys", date: "des 2025" },
];

/* ════════════════════════════════════════════════════
   HOOK
   ════════════════════════════════════════════════════ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function R({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`r ${className}`}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 20), []);
  useEffect(() => {
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4EF] text-[#161513]">
      {/* ═══════ HEADER ═══════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-[#F5F4EF]/95 backdrop-blur-sm border-b border-[#161513]/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-[860px] flex h-12 items-center justify-between px-5 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="serif text-[17px] tracking-tight">xobe</span>
            <span className="text-[10.5px] text-[#6B6862] ml-1">v2.7.5</span>
          </a>

          <div className="hidden md:flex items-center gap-0">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 text-[13px] text-[#6B6862] hover:text-[#161513] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://t.me/xobedevelopment2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[12.5px] text-[#6B6862] hover:text-[#161513] transition-colors"
            >
              <span>@xobedevelopment2</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden h-9 w-9 flex items-center justify-center hover:bg-[#161513]/5 transition-colors">
                  <Menu className="h-4 w-4 text-[#6B6862]" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#F5F4EF] border-l border-[#161513]/10 w-[260px] p-0"
              >
                <SheetHeader className="p-5 pb-3">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <span className="serif text-[15px]">xobe</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col px-3 pb-4">
                  {NAV.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2.5 text-[14px] text-[#6B6862] hover:text-[#161513] hover:bg-[#161513]/5 transition-colors"
                    >
                      {n.label}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* ═══════ HERO ═══════ */}
        <section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <div className="flex items-center justify-between text-[11.5px] text-[#6B6862] mb-10 sm:mb-14">
                <span>edisi v2.7.5 · juni 2026</span>
                <span className="hidden sm:block">xobe development</span>
              </div>
            </R>

            <R>
              <h1 className="serif text-[clamp(2.8rem,8vw,5.6rem)] leading-[0.98] tracking-[-0.025em] max-w-[16ch]">
                Bot WhatsApp buat JPM, push kontak, dan SWGC.
              </h1>
            </R>

            {/* 2 col below headline */}
            <div className="mt-12 sm:mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
              <R>
                <p className="text-[15px] text-[#3F3D38] leading-[1.75]">
                  SC JPM v2.7.5. 16 command, multi-bot sampai 5 nomor,
                  anti-limit delay otomatis. Clean code Baileys, bukan recode.
                </p>
              </R>

              <R>
                <div className="lg:pl-8 lg:border-l border-[#161513]/12">
                  <p className="text-[11.5px] text-[#6B6862] uppercase tracking-wider mb-4">
                    di dalam zip
                  </p>
                  <ul className="space-y-2.5">
                    {INCLUDED.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2.5 text-[13.5px] text-[#3F3D38]"
                      >
                        <span className="text-[#6B6862]">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </R>
            </div>

            <R>
              <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#harga"
                  className="inline-flex items-center gap-2 bg-[#161513] text-[#F5F4EF] px-5 py-2.5 text-[13px] font-medium hover:bg-[#2A2824] transition-colors"
                >
                  Lihat harga <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#command"
                  className="inline-flex items-center gap-1.5 text-[13px] text-[#6B6862] hover:text-[#161513] transition-colors"
                >
                  atau lihat 16 command dulu
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </R>
          </div>
        </section>

        {/* ═══════ PRICING ═══════ */}
        <section
          id="harga"
          className="scroll-mt-12 border-t border-[#161513]/12 py-14 sm:py-16"
        >
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight">
                  Harga
                </h2>
                <span className="text-[11.5px] text-[#6B6862]">2 paket</span>
              </div>
            </R>

            <div className="grid sm:grid-cols-2 gap-4">
              {PACKAGES.map((p) => (
                <R key={p.tier}>
                  <div
                    className={`relative p-6 sm:p-7 h-full flex flex-col ${
                      p.featured
                        ? "border-2 border-[#161513] bg-white"
                        : "border border-[#161513]/15 bg-[#FAF9F5]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between mb-5">
                      <span className="text-[12px] text-[#6B6862]">{p.tier}</span>
                      {p.featured && (
                        <span className="text-[10.5px] text-[#161513]">
                          recommended
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="serif text-[44px] leading-none">
                        {p.price}
                      </span>
                      <span className="text-[12px] text-[#6B6862]">/ sekali bayar</span>
                    </div>
                    <p className="text-[13px] text-[#3F3D38] leading-[1.65] mb-5">
                      {p.desc}
                    </p>

                    <div className="border-t border-[#161513]/10 pt-4 mb-5">
                      <p className="text-[10.5px] text-[#6B6862] mb-2.5">
                        termasuk
                      </p>
                      <ul className="space-y-1.5 text-[12.5px] text-[#3F3D38]">
                        <li>— semua 16 command</li>
                        <li>— multi-bot paralel (5 nomor)</li>
                        <li>— SWGC + auto SWGC</li>
                        <li>— push kontak</li>
                        {p.featured && (
                          <>
                            <li>— update versi baru selama aktif</li>
                            <li>— grup telegram pembeli</li>
                          </>
                        )}
                      </ul>
                      {p.excluded.length > 0 && (
                        <>
                          <p className="text-[10.5px] text-[#6B6862]/60 mt-3 mb-2">
                            ga termasuk
                          </p>
                          <ul className="space-y-1.5 text-[12.5px] text-[#6B6862]/60">
                            {p.excluded.map((e) => (
                              <li key={e} className="line-through">
                                — {e}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <a
                      href="https://t.me/xobedevelopment2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-[12.5px] font-medium transition-colors ${
                        p.featured
                          ? "bg-[#161513] text-[#F5F4EF] hover:bg-[#2A2824]"
                          : "border border-[#161513]/25 text-[#3F3D38] hover:text-[#161513] hover:border-[#161513]/50"
                      }`}
                    >
                      Pesan <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </R>
              ))}
            </div>

            <R>
              <p className="mt-5 text-[11.5px] text-[#6B6862]">
                Belum termasuk jasa setup di server lo. Butuh bantuan install?
                Bilang &quot;jasa setup&quot; ke admin, 5K sekali install.
              </p>
            </R>
          </div>
        </section>

        {/* ═══════ COMMANDS ═══════ */}
        <section
          id="command"
          className="scroll-mt-12 border-t border-[#161513]/12 bg-[#EFEDE6] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
              <div className="lg:sticky lg:top-20 lg:self-start">
                <R>
                  <p className="text-[11.5px] text-[#6B6862] mb-3">command</p>
                  <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight leading-[1]">
                    16 command,
                    <br />
                    <span className="italic text-[#6B6862]">ga ada yang
                    <br />
                    placeholder.</span>
                  </h2>
                  <p className="mt-5 text-[13.5px] text-[#3F3D38] leading-[1.65]">
                    Ketik <span className="text-[#161513]">.menu</span> di grup,
                    semua muncul. Dikategorikan rapi di folder{" "}
                    <span className="text-[#161513]">commands/</span>.
                  </p>
                </R>
              </div>

              <R>
                <div className="border border-[#161513]/12 bg-[#FAF9F5]">
                  <div className="px-4 py-2.5 border-b border-[#161513]/10 flex items-center justify-between">
                    <span className="text-[11.5px] text-[#6B6862]">
                      command list
                    </span>
                    <span className="text-[10.5px] text-[#6B6862]/60">
                      16 entries
                    </span>
                  </div>
                  <div className="divide-y divide-[#161513]/6">
                    {COMMANDS.map(([cmd, desc]) => (
                      <div
                        key={cmd}
                        className="grid grid-cols-[150px_1fr] gap-4 px-4 py-2.5 hover:bg-[#161513]/[0.025] transition-colors"
                      >
                        <code className="text-[12.5px] text-[#161513]">{cmd}</code>
                        <span className="text-[12.5px] text-[#6B6862]">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </R>
            </div>
          </div>
        </section>

        {/* ═══════ SPEC ═══════ */}
        <section className="border-t border-[#161513]/12 py-14 sm:py-16">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight">
                  Spec
                </h2>
                <span className="text-[11.5px] text-[#6B6862]">teknis</span>
              </div>
            </R>
            <R>
              <dl className="divide-y divide-[#161513]/10 border-y border-[#161513]/10">
                {SPECS.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[160px_1fr] gap-4 py-3"
                  >
                    <dt className="text-[12px] text-[#6B6862] uppercase tracking-wide">
                      {k}
                    </dt>
                    <dd className="text-[14px] text-[#161513]">{v}</dd>
                  </div>
                ))}
              </dl>
            </R>
          </div>
        </section>

        {/* ═══════ CARA BELI ═══════ */}
        <section
          id="cara-beli"
          className="scroll-mt-12 border-t border-[#161513]/12 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight mb-12">
                Cara beli
              </h2>
            </R>

            <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-10">
              {STEPS.map((s) => (
                <R key={s.n}>
                  <div className="border-t border-[#161513] pt-4">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="serif text-[28px] leading-none text-[#6B6862]">
                        {s.n}
                      </span>
                      <span className="text-[15px] font-medium tracking-tight">
                        {s.title}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#3F3D38] leading-[1.65]">
                      {s.desc}
                    </p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ JASA ═══════ */}
        <section
          id="jasa"
          className="scroll-mt-12 border-t border-[#161513]/12 bg-[#EFEDE6] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight mb-3 max-w-[14ch]">
                Selain jual script, terima jasa custom.
              </h2>
            </R>
            <R>
              <p className="text-[14px] text-[#3F3D38] leading-[1.65] max-w-[480px] mb-10">
                Butuh SC dengan fitur yang beda, atau ada bug yang stuck di SC lain? Kebuka kok.
              </p>
            </R>

            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <R key={s.title}>
                  <div className="border border-[#161513]/12 bg-[#FAF9F5] p-6 sm:p-7 h-full flex flex-col hover:border-[#161513]/30 transition-colors">
                    <h3 className="serif text-[22px] tracking-tight mb-3">
                      {s.title}
                    </h3>
                    <p className="text-[13.5px] text-[#3F3D38] leading-[1.65] flex-1">
                      {s.desc}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[#161513]/10 flex items-center justify-between">
                      <span className="text-[11.5px] text-[#6B6862]">harga</span>
                      <span className="text-[13.5px] text-[#161513]">nego</span>
                    </div>
                    <a
                      href="https://t.me/xobedevelopment2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-1.5 border border-[#161513]/25 px-4 py-2 text-[12.5px] font-medium text-[#3F3D38] hover:text-[#161513] hover:border-[#161513]/50 transition-colors"
                    >
                      Tanya via Telegram <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section
          id="faq"
          className="scroll-mt-12 border-t border-[#161513]/12 py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
              <div>
                <R>
                  <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight">
                    Pertanyaan
                  </h2>
                  <p className="mt-4 text-[13.5px] text-[#3F3D38] leading-[1.65]">
                    Ga nemu jawaban? Chat aja langsung.
                  </p>
                </R>
              </div>

              <R>
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((f, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="border-b border-[#161513]/12"
                    >
                      <AccordionTrigger className="text-left text-[15px] font-normal text-[#161513] hover:no-underline py-4 hover:text-[#6B6862] transition-colors">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[13.5px] text-[#3F3D38] leading-[1.7] pb-5">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </R>
            </div>
          </div>
        </section>

        {/* ═══════ CHANGELOG — small editorial ═══════ */}
        <section className="border-t border-[#161513]/12 bg-[#EFEDE6] py-14 sm:py-16">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="serif text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight">
                  Changelog
                </h2>
                <span className="text-[11.5px] text-[#6B6862]">5 versi terakhir</span>
              </div>
            </R>
            <R>
              <ul className="divide-y divide-[#161513]/10 border-y border-[#161513]/10">
                {CHANGELOG.map((c) => (
                  <li
                    key={c.v}
                    className="grid grid-cols-[70px_80px_1fr] gap-4 py-3 items-baseline"
                  >
                    <span className="serif text-[16px] text-[#161513]">
                      v{c.v}
                    </span>
                    <span className="text-[12px] text-[#6B6862]">{c.date}</span>
                    <span className="text-[13.5px] text-[#3F3D38]">{c.d}</span>
                  </li>
                ))}
              </ul>
            </R>
          </div>
        </section>

        {/* ═══════ CTA ═══════ */}
        <section className="border-t border-[#161513]/12 py-20 sm:py-28">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6">
            <R>
              <p className="text-[11.5px] text-[#6B6862] mb-4">pesan</p>
              <h2 className="serif text-[clamp(2rem,5vw,3.2rem)] tracking-tight leading-[1.05] max-w-[14ch] mb-6">
                Chat admin.
              </h2>
              <p className="text-[14px] text-[#3F3D38] leading-[1.65] max-w-[440px] mb-8">
                Jam aktif 09:00–23:00 WIB.
              </p>
            </R>

            <R>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href="https://t.me/xobedevelopment2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-4 bg-[#161513] text-[#F5F4EF] px-5 py-3.5 text-[14px] font-medium hover:bg-[#2A2824] transition-colors"
                >
                  <span>@xobedevelopment2</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="https://t.me/xobedevelopment3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-4 border border-[#161513]/25 px-5 py-3.5 text-[14px] text-[#3F3D38] hover:text-[#161513] hover:border-[#161513]/50 transition-colors"
                >
                  <span>@xobedevelopment3</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </R>

          </div>
        </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-[#161513]/12 mt-auto">
        <div className="mx-auto max-w-[860px] px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="serif text-[15px]">xobe</span>
            <span className="text-[10.5px] text-[#6B6862]/60 ml-1">
              v2.7.5 · juni 2026
            </span>
          </div>
          <p className="text-[11px] text-[#6B6862]/70">
            script digital · no refund after delivery
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/xobedevelopment2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] text-[#6B6862]/70 hover:text-[#161513] transition-colors"
            >
              @xobedevelopment2
            </a>
            <a
              href="https://t.me/xobedevelopment3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11.5px] text-[#6B6862]/70 hover:text-[#161513] transition-colors"
            >
              @xobedevelopment3
            </a>
          </div>
        </div>
      </footer>

      {/* Floating TG pill */}
      <a
        href="https://t.me/xobedevelopment2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Telegram"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-[#161513] text-[#F5F4EF] px-3.5 py-2 text-[12px] font-medium hover:bg-[#2A2824] transition-colors"
      >
        <span>chat admin</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
