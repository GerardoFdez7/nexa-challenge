"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/templates/page-layout";
import { SearchInput } from "@/components/molecules/search-input";
import { CuentaCard } from "@/components/organisms/cuenta-card";
import { CuentaDetailModal } from "@/components/organisms/cuenta-detail-modal";
import { DataTable } from "@/components/organisms/data-table";
import { ErrorMessage } from "@/components/molecules/error-message";
import { StatCard } from "@/components/atoms/stat-card";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import type { CuentaSaldo } from "@/lib/types";
import {
  formatCurrency,
  formatPercentage,
  formatAccountNumber,
} from "@/lib/utils/format";
import { Wallet, TrendingUp, DollarSign, Grid, List } from "lucide-react";
import { CardSkeleton } from "@/components/molecules/loading-skeleton";

export default function CuentasPage() {
  const [cuentas, setCuentas] = useState<CuentaSaldo[]>([]);
  const [filteredCuentas, setFilteredCuentas] = useState<CuentaSaldo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<"all" | "Monetario" | "Ahorro">(
    "all"
  );
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedCuenta, setSelectedCuenta] = useState<CuentaSaldo | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCuentas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getCuentasSaldos();
      setCuentas(data);
      setFilteredCuentas(data);
    } catch (err) {
      console.error("Error fetching cuentas:", err);
      setError(
        "Error al cargar las cuentas. Por favor, verifica que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuentas();
  }, []);

  useEffect(() => {
    let filtered = cuentas.filter(
      (cuenta) =>
        cuenta.numeroCuenta.includes(searchTerm) ||
        cuenta.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (tipoFilter !== "all") {
      filtered = filtered.filter(
        (cuenta) => cuenta.tipoProducto === tipoFilter
      );
    }

    setFilteredCuentas(filtered);
  }, [searchTerm, tipoFilter, cuentas]);

  const handleViewDetails = (cuenta: CuentaSaldo) => {
    setSelectedCuenta(cuenta);
    setModalOpen(true);
  };

  // Calcular métricas
  const totalCuentas = cuentas.length;
  const saldoTotal = cuentas.reduce((sum, cuenta) => sum + cuenta.saldo, 0);
  const cuentasActivas = cuentas.filter(
    (c) => c.estatus.toLowerCase() === "activa"
  ).length;
  const tasaPromedio =
    cuentas.reduce((sum, cuenta) => sum + cuenta.tasaInteres, 0) /
    (cuentas.length || 1);

  const columns = [
    {
      header: "Número de Cuenta",
      accessor: ((row: CuentaSaldo) => (
        <span className="font-mono">
          {formatAccountNumber(row.numeroCuenta)}
        </span>
      )) as any,
    },
    {
      header: "Cliente",
      accessor: "nombreCliente" as keyof CuentaSaldo,
    },
    {
      header: "Tipo",
      accessor: ((row: CuentaSaldo) => (
        <Badge variant="info">{row.tipoProducto}</Badge>
      )) as any,
    },
    {
      header: "Tasa",
      accessor: ((row: CuentaSaldo) => (
        <span className="text-green-600">
          {formatPercentage(row.tasaInteres)}
        </span>
      )) as any,
    },
    {
      header: "Saldo",
      accessor: ((row: CuentaSaldo) => (
        <span className="font-semibold">{formatCurrency(row.saldo)}</span>
      )) as any,
      className: "text-right",
    },
    {
      header: "Estado",
      accessor: ((row: CuentaSaldo) => (
        <Badge
          variant={
            row.estatus.toLowerCase() === "activa" ? "success" : "default"
          }
        >
          {row.estatus}
        </Badge>
      )) as any,
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Cuentas
          </h1>
          <p className="mt-2 text-muted-foreground">
            Administra y consulta los saldos de las cuentas
          </p>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchCuentas} />}

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Cuentas"
              value={totalCuentas}
              icon={Wallet}
            />
            <StatCard
              title="Cuentas Activas"
              value={cuentasActivas}
              icon={TrendingUp}
            />
            <StatCard
              title="Saldo Total"
              value={formatCurrency(saldoTotal)}
              icon={DollarSign}
            />
            <StatCard
              title="Tasa Promedio"
              value={formatPercentage(tasaPromedio)}
              icon={TrendingUp}
            />
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Buscar por número de cuenta o cliente..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="sm:max-w-md"
          />

          <div className="flex items-center gap-2">
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value as any)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">Todos los tipos</option>
              <option value="Monetario">Monetario</option>
              <option value="Ahorro">Ahorro</option>
            </select>

            <div className="flex rounded-md border">
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Mostrando {filteredCuentas.length} de {cuentas.length} cuentas
        </div>

        {viewMode === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCuentas.map((cuenta) => (
              <CuentaCard
                key={cuenta.numeroCuenta}
                cuenta={cuenta}
                onClick={() => handleViewDetails(cuenta)}
              />
            ))}
          </div>
        ) : (
          <DataTable
            data={filteredCuentas}
            columns={columns}
            loading={loading}
            emptyMessage="No se encontraron cuentas"
            onRowClick={handleViewDetails}
          />
        )}

        <CuentaDetailModal
          cuenta={selectedCuenta}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </PageLayout>
  );
}
