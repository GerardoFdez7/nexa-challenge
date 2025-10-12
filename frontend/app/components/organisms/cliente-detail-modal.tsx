"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/atoms/badge";
import type { Cliente } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";
import { User, Calendar, MapPin, FileText, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClienteDetailModalProps {
  cliente: Cliente | null;
  open: boolean;
  onClose: () => void;
}

export function ClienteDetailModal({
  cliente,
  open,
  onClose,
}: ClienteDetailModalProps) {
  const router = useRouter();

  if (!cliente) return null;

  const handleViewTransactions = () => {
    onClose();
    router.push(`/clientes/${cliente.id}/transacciones`);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalles del Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#9521B6]/10">
              <User className="h-8 w-8 text-[#9521B6]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {cliente.nombreCompleto}
              </h3>
              <p className="text-sm text-muted-foreground">ID: {cliente.id}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>DPI</span>
              </div>
              <p className="font-medium">{cliente.dpi}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Fecha de Nacimiento</span>
              </div>
              <p className="font-medium">
                {formatDate(cliente.fechaNacimiento)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Sexo</span>
              </div>
              <Badge>{cliente.sexo}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>País de Nacimiento</span>
              </div>
              <p className="font-medium">{cliente.paisNacimiento}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Fecha de Creación</span>
              </div>
              <p className="text-sm">{formatDate(cliente.fechaCreacion)}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Última Actualización</span>
              </div>
              <p className="text-sm">
                {formatDate(cliente.fechaActualizacion)}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button
              onClick={handleViewTransactions}
              style={{ backgroundColor: "#9521B6" }}
              className="text-white hover:opacity-90"
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver Transacciones
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
