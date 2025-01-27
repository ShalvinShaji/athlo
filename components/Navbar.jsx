"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "New & Featured" },
    { href: "/", label: "Men" },
    { href: "/", label: "Women" },
    { href: "/", label: "Kids" },
    { href: "/", label: "Sale" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl lg:text-2xl font-bold tracking-tighter ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            ATHLO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  isScrolled ? "text-black" : "text-white"
                } ${pathname === link.href ? "opacity-100" : "opacity-80"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              className={`hover:opacity-70 transition-opacity ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <Search size={20} />
            </button>
            <button
              className={`hover:opacity-70 transition-opacity ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <User size={20} />
            </button>
            <button
              className={`relative hover:opacity-70 transition-opacity ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[65px] p-6 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100 visible"
              : "-translate-y-full opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-black text-base font-medium hover:opacity-70 transition-opacity ${
                  pathname === link.href ? "opacity-100" : "opacity-80"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
              <button className="text-black hover:opacity-70 transition-opacity">
                <Search size={20} />
              </button>
              <button className="text-black hover:opacity-70 transition-opacity">
                <User size={20} />
              </button>
              <button className="relative text-black hover:opacity-70 transition-opacity">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
