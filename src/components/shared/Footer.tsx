"use client";

import { FOOTER_LINKS, SOCIAL } from "@/data/footer";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Truck size={20} className="text-primary-400" />,
              title: "Free Shipping",
              desc: "Orders over ৳10,000",
            },
            {
              icon: <ShieldCheck size={20} className="text-primary-400" />,
              title: "Secure Payments",
              desc: "256-bit SSL protected",
            },
            {
              icon: <CreditCard size={20} className="text-primary-400" />,
              title: "Easy Returns",
              desc: "30-day policy",
            },
            {
              icon: <ShieldCheck size={20} className="text-emerald-500" />,
              title: "Authentic Products",
              desc: "Guaranteed quality",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              {icon}
              <div>
                <p className="text-sm font-medium text-slate-200">{title}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* brand */}
        <div className="space-y-4">
          <Image
            src="/logo.png"
            alt="Tizaraa"
            width={160}
            height={44}
            className="h-10 w-auto"
          />
          <p className="text-sm text-slate-500 leading-relaxed">
            <span className="text-slate-300 font-medium">
              Tizaraa – E-Commerce Product Customization
            </span>{" "}
            platform with multi-step variants, real-time 3D previews, dynamic
            pricing, and advanced cart management.
          </p>

          <div className="flex gap-3 pt-2">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* shop */}
        <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />

        {/* platform */}
        <FooterColumn title="Platform" links={FOOTER_LINKS.platform} />

        {/* support */}
        <FooterColumn title="Support" links={FOOTER_LINKS.support} />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-slate-500 hover:text-primary-400 transition"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
