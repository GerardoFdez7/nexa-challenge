"use client";

import { useEffect, useState } from "react";
import { PageLayout } from "@/components/templates/page-layout";
import { SearchInput } from "@/components/molecules/search-input";
import { DataTable } from "@/components/organisms/data-table";
import { ClienteDetailModal } from "@/components/organisms/cliente-detail-modal";
import { ErrorMessage } from "@/components/molecules/error-message";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/badge";
import { apiService } from "@/services/api";
import type { Cliente } from "@/lib/types";
import { formatShortDate } from "@/lib/utils/format";
import { Eye } from "lucide-react";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getClientes();
      setClientes(data);
      setFilteredClientes(data);
    } catch (err) {
      console.error("Error fetching clientes:", err);
      setError(
        "Error al cargar los clientes. Por favor, verifica que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nombreCompleto
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        cliente.dpi.includes(searchTerm)
    );
    setFilteredClientes(filtered);
  }, [searchTerm, clientes]);

  const handleViewDetails = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setModalOpen(true);
  };

  const columns = [
    {
      header: "Nombre Completo",
      accessor: "nombreCompleto" as keyof Cliente,
      className: "font-medium",
    },
    {
      header: "DPI",
      accessor: "dpi" as keyof Cliente,
    },
    {
      header: "Fecha de Nacimiento",
      accessor: ((row: Cliente) => formatShortDate(row.fechaNacimiento)) as any,
    },
    {
      header: "País",
      accessor: "paisNacimiento" as keyof Cliente,
    },
    {
      header: "Sexo",
      accessor: ((row: Cliente) => (
        <Badge variant={row.sexo === "MASCULINO" ? "info" : "warning"}>
          {row.sexo}
        </Badge>
      )) as any,
    },
    {
      header: "Acciones",
      accessor: ((row: Cliente) => (
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(row);
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver Detalles
        </Button>
      )) as any,
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Clientes
          </h1>
          <p className="mt-2 text-muted-foreground">
            Administra y consulta la información de los clientes
          </p>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchClientes} />}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Buscar por nombre o DPI..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="sm:max-w-md"
          />
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredClientes.length} de {clientes.length} clientes
          </div>
        </div>

        <DataTable
          data={filteredClientes}
          columns={columns}
          loading={loading}
          emptyMessage="No se encontraron clientes"
          onRowClick={handleViewDetails}
        />

        <ClienteDetailModal
          cliente={selectedCliente}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </PageLayout>
  );
}
