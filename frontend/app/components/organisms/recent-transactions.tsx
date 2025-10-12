"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/atoms/badge";
import type { Transaccion } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { EmptyState } from "@/components/molecules/empty-state";
import { Receipt } from "lucide-react";

interface RecentTransactionsProps {
  transacciones: Transaccion[];
}

export function RecentTransactions({ transacciones }: RecentTransactionsProps) {
  if (transacciones.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Transacciones Recientes</h3>
        <EmptyState
          icon={Receipt}
          title="Sin transacciones"
          description="No hay transacciones recientes para mostrar"
        />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Transacciones Recientes</h3>
      <div className="space-y-4">
        {transacciones.slice(0, 5).map((transaccion) => (
          <div
            key={transaccion.transaccionId}
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div className="flex items-center gap-3">
              {transaccion.tipoOperacion.toUpperCase() === "CREDITO" ? (
                <div className="rounded-full bg-green-100 p-2">
                  <ArrowUpCircle className="h-5 w-5 text-green-600" />
                </div>
              ) : (
                <div className="rounded-full bg-red-100 p-2">
                  <ArrowDownCircle className="h-5 w-5 text-red-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
                  {transaccion.descripcionOperacion}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaccion.nombreCliente}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(transaccion.fechaTransaccion)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  transaccion.tipoOperacion.toUpperCase() === "CREDITO"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaccion.tipoOperacion.toUpperCase() === "CREDITO"
                  ? "+"
                  : "-"}
                {formatCurrency(transaccion.monto)}
              </p>
              <Badge
                variant="info"
                className="mt-1"
              >
                {transaccion.tipoOperacion}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
