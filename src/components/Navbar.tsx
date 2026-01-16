"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import ThemeSwitcher from "./theme/ThemeSwitcher"

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* NAVBAR */}
    <motion.header
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-300
    ${
      scrolled
        ? "backdrop-blur-md bg-white/70 dark:bg-black/60 border-b border-black/5 dark:border-white/10"
        : "bg-transparent"
    }
  `}
>
  <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
    
    {/* LEFT – LOGO */}
    <Link
      href="/"
      className="text-lg font-semibold tracking-wide
                 text-black dark:text-white justify-self-start"
    >
      TRIONN
    </Link>

    {/* CENTER – THEME SWITCHER */}
    <div className="flex justify-center">
      <ThemeSwitcher />
    </div>

    {/* RIGHT – MENU BUTTON */}
    <div className="flex justify-end">
      <button
        onClick={() => setOpen(true)}
        className="
          p-2 rounded-full
          text-black dark:text-white
          hover:bg-black/5 dark:hover:bg-white/10
          transition
        "
      >
        <Menu size={22} />
      </button>
    </div>

  </div>
</motion.header>


      {/* MOBILE MENU OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className={`
          fixed inset-0 z-50
          bg-white dark:bg-black
          transition-opacity
          ${open ? "pointer-events-auto" : "pointer-events-none"}
        `}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6">
          <span className="text-lg font-semibold text-black dark:text-white">
            TRIONN
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full
                       hover:bg-black/5 dark:hover:bg-white/10
                       text-black dark:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ y: 40, opacity: 0 }}
              animate={open ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, ease: "easeOut" }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  text-3xl font-medium
                  text-black dark:text-white
                  hover:opacity-70 transition
                "
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </>
  )
}
