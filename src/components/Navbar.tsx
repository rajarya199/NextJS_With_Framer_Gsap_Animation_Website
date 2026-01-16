"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled ? "backdrop-blur-md bg-black/60" : "bg-transparent"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-white text-xl font-semibold">
            TRIONN
          </Link>

          {/* Desktop Nav */}
          {/* <nav className="hidden md:flex gap-10">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={item.href}
                  className="text-sm uppercase tracking-wider text-white/90"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav> */}

          {/* Mobile Menu Button */}
          <button
            className="flex text-white"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        className={`fixed inset-0 bg-black z-50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex justify-between p-6">
          <span className="text-white text-lg">TRIONN</span>
          <button onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ y: 40, opacity: 0 }}
              animate={open ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-3xl text-white font-medium"
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
