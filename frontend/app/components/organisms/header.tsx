"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/atoms/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Clientes", href: "/clientes" },
  { name: "Cuentas", href: "/cuentas" },
  { name: "Transacciones", href: "/transacciones" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Logo />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-[#9521B6]",
                pathname === item.href ? "text-[#9521B6]" : "text-gray-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/transacciones/nueva">
            <Button
              style={{ backgroundColor: "#9521B6" }}
              className="text-white hover:opacity-90"
            >
              Nueva Transacción
            </Button>
          </Link>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 border-t px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[#9521B6]/10 text-[#9521B6]"
                    : "text-gray-900 hover:bg-gray-50 hover:text-[#9521B6]"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/transacciones/nueva"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button
                style={{ backgroundColor: "#9521B6" }}
                className="mt-2 w-full text-white hover:opacity-90"
              >
                Nueva Transacción
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
