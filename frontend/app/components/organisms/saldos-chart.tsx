"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import type { CuentaSaldo } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

interface SaldosChartProps {
  cuentas: CuentaSaldo[];
}

export function SaldosChart({ cuentas }: SaldosChartProps) {
  // Agrupar saldos por tipo de producto
  const data = cuentas.reduce((acc, cuenta) => {
    const tipo = cuenta.tipoProducto;
    const existing = acc.find((item) => item.tipo === tipo);
    if (existing) {
      existing.saldo += cuenta.saldo;
      existing.cantidad += 1;
    } else {
      acc.push({ tipo, saldo: cuenta.saldo, cantidad: 1 });
    }
    return acc;
  }, [] as Array<{ tipo: string; saldo: number; cantidad: number }>);

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Saldos por Tipo de Cuenta</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tipo" />
          <YAxis tickFormatter={(value) => `Q${(value / 1000).toFixed(0)}K`} />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="saldo"
            fill="#9521B6"
            name="Saldo Total"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
