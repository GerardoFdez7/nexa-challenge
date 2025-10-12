"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/templates/page-layout";
import { StatCard } from "@/components/atoms/stat-card";
import { SaldosChart } from "@/components/organisms/saldos-chart";
import { RecentTransactions } from "@/components/organisms/recent-transactions";
import {
  StatsSkeleton,
  CardSkeleton,
} from "@/components/molecules/loading-skeleton";
import { ErrorMessage } from "@/components/molecules/error-message";
import { Users, Wallet, TrendingUp, DollarSign } from "lucide-react";
import { apiService } from "@/services/api";
import type { CuentaSaldo, Transaccion } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";

export default function DashboardPage() {
  const [cuentas, setCuentas] = useState<CuentaSaldo[]>([]);
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cuentasData, transaccionesData] = await Promise.all([
        apiService.getCuentasSaldos(),
        apiService.getTransacciones(),
      ]);
      setCuentas(cuentasData);
      setTransacciones(transaccionesData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(
        "Error al cargar los datos del dashboard. Por favor, verifica que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calcular métricas
  const totalCuentas = cuentas.length;
  const saldoTotal = cuentas.reduce((sum, cuenta) => sum + cuenta.saldo, 0);
  const clientesUnicos = new Set(cuentas.map((c) => c.nombreCliente)).size;

  // Transacciones del día
  const hoy = new Date().toISOString().split("T")[0];
  const transaccionesHoy = transacciones.filter((t) =>
    t.fechaTransaccion.startsWith(hoy)
  );

  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Bienvenido a Nexa Bank - Vista general del sistema
          </p>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchData} />}

        {loading ? (
          <>
            <StatsSkeleton />
            <div className="grid gap-6 lg:grid-cols-2">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </>
        ) : (
          <>
            {/* Métricas principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Clientes"
                value={clientesUnicos}
                icon={Users}
              />
              <StatCard
                title="Total Cuentas"
                value={totalCuentas}
                icon={Wallet}
              />
              <StatCard
                title="Transacciones Hoy"
                value={transaccionesHoy.length}
                icon={TrendingUp}
              />
              <StatCard
                title="Saldo Total"
                value={formatCurrency(saldoTotal)}
                icon={DollarSign}
              />
            </div>

            {/* Gráficos y transacciones */}
            <div className="grid gap-6 lg:grid-cols-2">
              <SaldosChart cuentas={cuentas} />
              <RecentTransactions transacciones={transacciones} />
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
