"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "@/components/templates/page-layout";
import { BreadcrumbNav } from "@/components/organisms/breadcrumb-nav";
import { DateRangePicker } from "@/components/molecules/date-range-picker";
import { DataTable } from "@/components/organisms/data-table";
import { ErrorMessage } from "@/components/molecules/error-message";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";
import type { Transaccion } from "@/lib/types";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import { ArrowLeft } from "lucide-react";
import { format, subDays } from "date-fns";

export default function ClienteTransaccionesPage() {
  const params = useParams();
  const router = useRouter();
  const clienteId = params.id as string;

  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [filteredTransacciones, setFilteredTransacciones] = useState<
    Transaccion[]
  >([]);
  const [startDate, setStartDate] = useState(
    format(subDays(new Date(), 30), "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [tipoFilter, setTipoFilter] = useState<"all" | "Débito" | "Crédito">(
    "all"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clienteNombre, setClienteNombre] = useState("");

  const fetchTransacciones = async () => {
    if (!startDate || !endDate) {
      setError("Por favor selecciona un rango de fechas válido");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getTransaccionesByCliente(
        clienteId,
        startDate,
        endDate
      );
      setTransacciones(data);
      setFilteredTransacciones(data);
      if (data.length > 0) {
        setClienteNombre(data[0].nombreCliente);
      }
    } catch (err) {
      console.error("Error fetching transacciones:", err);
      setError(
        "Error al cargar las transacciones. Verifica las fechas y que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchTransacciones();
    }
  }, [clienteId, startDate, endDate]);

  useEffect(() => {
    if (tipoFilter === "all") {
      setFilteredTransacciones(transacciones);
    } else {
      setFilteredTransacciones(
        transacciones.filter((t) => t.tipoOperacion.toUpperCase() === tipoFilter.toUpperCase())
      );
    }
  }, [tipoFilter, transacciones]);

  const columns = [
    {
      header: "Fecha",
      accessor: ((row: Transaccion) =>
        formatDateTime(row.fechaTransaccion)) as any,
    },
    {
      header: "Cuenta",
      accessor: "numeroCuenta" as keyof Transaccion,
      className: "font-mono",
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
        <BreadcrumbNav
          items={[
            { label: "Clientes", href: "/clientes" },
            {
              label: clienteNombre || "Cliente",
              href: `/clientes/${clienteId}`,
            },
            { label: "Transacciones" },
          ]}
        />

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Transacciones del Cliente
            </h1>
            {clienteNombre && (
              <p className="mt-2 text-muted-foreground">{clienteNombre}</p>
            )}
          </div>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchTransacciones} />}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            className="flex-1"
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
          emptyMessage="No se encontraron transacciones en el rango de fechas seleccionado"
        />
      </div>
    </PageLayout>
  );
}
