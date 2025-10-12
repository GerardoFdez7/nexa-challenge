"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/templates/page-layout";
import { SearchInput } from "@/components/molecules/search-input";
import { DataTable } from "@/components/organisms/data-table";
import { ErrorMessage } from "@/components/molecules/error-message";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import type { Transaccion } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { Plus } from "lucide-react";

export default function TransaccionesPage() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [filteredTransacciones, setFilteredTransacciones] = useState<
    Transaccion[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFilter, setTipoFilter] = useState<"all" | "Débito" | "Crédito">(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransacciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTransacciones();
      setTransacciones(data);
      setFilteredTransacciones(data);
    } catch (err) {
      console.error("Error fetching transacciones:", err);
      setError(
        "Error al cargar las transacciones. Por favor, verifica que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacciones();
  }, []);

  useEffect(() => {
    let filtered = transacciones.filter(
      (t) =>
        t.numeroCuenta.includes(searchTerm) ||
        t.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.descripcionOperacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (tipoFilter !== "all") {
      filtered = filtered.filter((t) => t.tipoOperacion.toUpperCase() === tipoFilter.toUpperCase());
    }

    setFilteredTransacciones(filtered);
  }, [searchTerm, tipoFilter, transacciones]);

  const columns = [
    {
      header: "Fecha",
      accessor: ((row: Transaccion) =>
        formatDateTime(row.fechaTransaccion)) as any,
    },
    {
      header: "Cliente",
      accessor: "nombreCliente" as keyof Transaccion,
    },
    {
      header: "Cuenta",
      accessor: ((row: Transaccion) => (
        <span className="font-mono">{row.numeroCuenta}</span>
      )) as any,
    },
    {
      header: "Operación",
      accessor: "descripcionOperacion" as keyof Transaccion,
    },
    {
      header: "Tipo",
      accessor: ((row: Transaccion) => (
        <Badge variant="info">
          {row.tipoOperacion}
        </Badge>
      )) as any,
    },
    {
      header: "Monto",
      accessor: ((row: Transaccion) => (
        <span
          className={`font-semibold ${
            row.tipoOperacion.toUpperCase() === "CREDITO" ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.tipoOperacion.toUpperCase() === "CREDITO" ? "+" : "-"}
          {formatCurrency(row.monto)}
        </span>
      )) as any,
      className: "text-right",
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Historial de Transacciones
            </h1>
            <p className="mt-2 text-muted-foreground">
              Consulta todas las operaciones realizadas
            </p>
          </div>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchTransacciones} />}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Buscar por cuenta, cliente u operación..."
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
              <option value="CREDITO">Crédito</option>
              <option value="DEBITO">Débito</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Mostrando {filteredTransacciones.length} de {transacciones.length}{" "}
          transacciones
        </div>

        <DataTable
          data={filteredTransacciones}
          columns={columns}
          loading={loading}
          emptyMessage="No se encontraron transacciones"
        />
      </div>
    </PageLayout>
  );
}
