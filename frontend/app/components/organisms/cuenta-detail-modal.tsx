"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/badge";
import type { CuentaSaldo } from "@/lib/types";
import {
  formatCurrency,
  formatPercentage,
  formatAccountNumber,
} from "@/lib/utils/format";
import {
  Wallet,
  User,
  TrendingUp,
  Hash,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface CuentaDetailModalProps {
  cuenta: CuentaSaldo | null;
  open: boolean;
  onClose: () => void;
}

export function CuentaDetailModal({
  cuenta,
  open,
  onClose,
}: CuentaDetailModalProps) {
  if (!cuenta) return null;

  const isActiva = cuenta.estatus.toLowerCase() === "activa";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalles de la Cuenta</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  cuenta.tipoProducto === "Ahorro" ? "#9521B6" : "#011843",
                opacity: 0.1,
              }}
            >
              <Wallet
                className="h-8 w-8"
                style={{
                  color:
                    cuenta.tipoProducto === "Ahorro" ? "#9521B6" : "#011843",
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Cuenta {cuenta.tipoProducto}
              </h3>
              <p className="font-mono text-sm text-muted-foreground">
                {formatAccountNumber(cuenta.numeroCuenta)}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-6">
            <p className="text-sm text-muted-foreground">Saldo Disponible</p>
            <p className="mt-2 text-4xl font-bold text-foreground">
              {formatCurrency(cuenta.saldo)}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Titular de la Cuenta</span>
              </div>
              <p className="font-medium">{cuenta.nombreCliente}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4" />
                <span>Tipo de Producto</span>
              </div>
              <Badge variant="info">{cuenta.tipoProducto}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Tasa de Interés</span>
              </div>
              <p className="font-medium text-green-600">
                {formatPercentage(cuenta.tasaInteres)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isActiva ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <span>Estado de la Cuenta</span>
              </div>
              <Badge variant={isActiva ? "success" : "default"}>
                {cuenta.estatus}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
