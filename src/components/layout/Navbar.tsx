"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { products } from "@/content/products";
import { industries } from "@/content/industries";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productsWrapRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMobileOpen(false);
        setMobileProductsOpen(false);
        document.body.style.overflow = "";
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (productsOpen) {
        setProductsOpen(false);
        menuButtonRef.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [productsOpen, mobileOpen]);

  useEffect(() => {
    if (!productsOpen) return;
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!productsWrapRef.current?.contains(target)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [productsOpen]);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const scheduleCloseProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-white/12 bg-navy-950 py-2.5 shadow-[0_8px_32px_rgba(7,17,31,0.35)] backdrop-blur-xl"
            : "border-white/[0.07] bg-navy-950 py-3 backdrop-blur-md",
        )}
      >
        <Container wide className="flex items-center justify-between gap-4">
          <Logo tone="light" priority height={25} />

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            <div
              ref={productsWrapRef}
              className="relative"
              onMouseEnter={openProducts}
              onMouseLeave={scheduleCloseProducts}
            >
              <button
                ref={menuButtonRef}
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] hover:text-white focus-visible:text-white",
                  productsOpen && "bg-white/[0.08] text-white",
                )}
                aria-expanded={productsOpen}
                aria-haspopup="menu"
                aria-controls={menuId}
                onClick={() => setProductsOpen((v) => !v)}
              >
                Products
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    productsOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {productsOpen ? (
                  <motion.div
                    id={menuId}
                    role="menu"
                    aria-label="Products"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,42rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-navy-900/96 p-3 shadow-kx-lg backdrop-blur-xl before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']"
                    onMouseEnter={openProducts}
                    onMouseLeave={scheduleCloseProducts}
                  >
                    <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Products
                    </p>
                    <div className="grid gap-1 sm:grid-cols-2">
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          href={product.href}
                          role="menuitem"
                          className="rounded-xl px-3 py-3 transition hover:bg-white/5 focus-visible:bg-white/5"
                          onClick={() => setProductsOpen(false)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-white">
                              {product.name}
                            </span>
                            {product.status !== "available" ? (
                              <span className="rounded-full bg-amber/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber">
                                {product.statusLabel}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-white/55">
                            {product.tagline}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] hover:text-white focus-visible:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              href="/book-demo"
              size="sm"
              withArrow
              onClick={() =>
                track({ name: "cta_book_demo", props: { location: "navbar" } })
              }
            >
              Book a Demo
            </Button>
          </div>

          <button
            ref={mobileToggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[3.9rem] bottom-0 z-40 overflow-y-auto bg-navy-950/98 px-4 pb-10 pt-4 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-lg flex-col gap-2">
              <button
                type="button"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white"
                aria-expanded={mobileProductsOpen}
                onClick={() => setMobileProductsOpen((v) => !v)}
              >
                <span className="font-semibold">Products</span>
                <ChevronDown
                  className={cn(
                    "size-4 transition",
                    mobileProductsOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileProductsOpen ? (
                <div className="space-y-1 rounded-2xl border border-white/10 bg-navy-900/70 p-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      className="block rounded-xl px-3 py-3 text-white/90 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{product.shortName}</span>
                        {product.status !== "available" ? (
                          <span className="text-[10px] uppercase tracking-wide text-amber">
                            {product.statusLabel}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-white/50">
                        {product.tagline}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 grid gap-2">
                <Button
                  href="/book-demo"
                  withArrow
                  onClick={() => {
                    track({
                      name: "cta_book_demo",
                      props: { location: "mobile-nav" },
                    });
                    setMobileOpen(false);
                  }}
                >
                  Book a Demo
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                  Industries
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {industries.slice(0, 6).map((industry) => (
                    <Link
                      key={industry.id}
                      href={industry.href}
                      className="rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80"
                      onClick={() => setMobileOpen(false)}
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
