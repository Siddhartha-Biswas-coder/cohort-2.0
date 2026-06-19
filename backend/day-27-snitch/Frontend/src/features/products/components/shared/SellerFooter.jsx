import React from "react";

/**
 * SellerFooter — page footer with copyright and navigation links
 * Props:
 *   links: Array<{ label: string, href: string }> – footer link items
 */

const DEFAULT_LINKS = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Seller Guidelines", href: "#" },
];

const SellerFooter = ({ links = DEFAULT_LINKS }) => {
  return (
    <footer className="w-full py-8 border-t border-charcoal-900 bg-charcoal-950 flex flex-col md:flex-row justify-between items-center px-8 md:px-16 gap-4 mt-auto">
      <span className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest uppercase">
        © 2026 LUMIÈRE MAISON. ALL RIGHTS RESERVED.
      </span>
      <div className="flex gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-display text-[9px] font-semibold text-charcoal-600 tracking-widest hover:text-gold-400 transition-colors uppercase cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default SellerFooter;
