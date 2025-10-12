"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/atoms/badge";
import type { CuentaSaldo } from "@/lib/types";
import {
  formatCurrency,
  formatPercentage,
  formatAccountNumber,
} from "@/lib/utils/format";
import { Wallet, TrendingUp, User } from "lucide-react";

interface CuentaCardProps {
  cuenta: CuentaSaldo;
  onClick?: () => void;
}

export function CuentaCard({ cuenta, onClick }: CuentaCardProps) {
  const isActiva = cuenta.estatus.toLowerCase() === "activa";

  return (
    <Card
      className={`p-6 transition-all hover:shadow-lg ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      style={{ borderLeft: `4px solid ${isActiva ? "#10B981" : "#6B7280"}` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full p-3"
            style={{
              backgroundColor:
                cuenta.tipoProducto === "Ahorro" ? "#9521B6" : "#011843",
              opacity: 0.1,
            }}
          >
            <Wallet
              className="h-6 w-6"
              style={{
                color: cuenta.tipoProducto === "Ahorro" ? "#9521B6" : "#011843",
              }}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Cuenta {cuenta.tipoProducto}
            </p>
            <p className="font-mono text-lg font-semibold">
              {formatAccountNumber(cuenta.numeroCuenta)}
            </p>
          </div>
        </div>
        <Badge variant={isActiva ? "success" : "default"}>
          {cuenta.estatus}
        </Badge>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Saldo Disponible</p>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency(cuenta.saldo)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{cuenta.nombreCliente}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-600">
              {formatPercentage(cuenta.tasaInteres)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
