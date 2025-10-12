"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/atoms/spinner";
import { apiService } from "@/services/api";
import { CODIGOS_OPERACION } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils/format";
import { CheckCircle, AlertCircle, Send } from "lucide-react";
import type { NuevaTransaccion, RespuestaTransaccion } from "@/lib/types";

const transaccionSchema = z.object({
  numeroCuenta: z
    .string()
    .min(10, "El número de cuenta debe tener al menos 10 dígitos")
    .max(16, "El número de cuenta no puede tener más de 16 dígitos")
    .regex(/^\d+$/, "El número de cuenta solo debe contener dígitos"),
  codigoOperacion: z.string().min(1, "Selecciona un código de operación"),
  monto: z
    .number({ invalid_type_error: "El monto debe ser un número" })
    .positive("El monto debe ser mayor a 0")
    .min(0.01, "El monto mínimo es Q0.01"),
});

type TransaccionFormData = z.infer<typeof transaccionSchema>;

interface TransactionFormProps {
  onSuccess?: (response: RespuestaTransaccion) => void;
}

export function TransactionForm({ onSuccess }: TransactionFormProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<TransaccionFormData | null>(null);
  const [response, setResponse] = useState<RespuestaTransaccion | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TransaccionFormData>({
    resolver: zodResolver(transaccionSchema),
  });

  const selectedCodigo = watch("codigoOperacion");
  const operacionInfo = CODIGOS_OPERACION.find(
    (op) => op.codigo === selectedCodigo
  );

  const onSubmit = (data: TransaccionFormData) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (!formData) return;

    setLoading(true);
    setResponse(null);
    try {
      const transaccion: NuevaTransaccion = {
        numeroCuenta: formData.numeroCuenta,
        codigoOperacion: formData.codigoOperacion,
        monto: formData.monto,
      };

      const result = await apiService.crearTransaccion(transaccion);
      setResponse(result);

      if (result.codigo_respuesta === 0) {
        reset();
        onSuccess?.(result);
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      setResponse({
        codigo_respuesta: -1,
        descripcion_respuesta:
          "Error de conexión. Verifica que el backend esté funcionando.",
        id_transaccion: null,
      });
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setFormData(null);
  };

  if (showConfirmation && formData) {
    return (
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">Confirmar Transacción</h3>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Por favor, revisa los detalles antes de confirmar la transacción.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Número de Cuenta:</span>
              <span className="font-mono font-semibold">
                {formData.numeroCuenta}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operación:</span>
              <span className="font-semibold">
                {operacionInfo?.descripcion}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo:</span>
              <span
                className={`font-semibold ${
                  operacionInfo?.tipo === "Crédito"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {operacionInfo?.tipo}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground">Monto:</span>
              <span className="text-2xl font-bold">
                {formatCurrency(formData.monto)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading}
              style={{ backgroundColor: "#9521B6" }}
              className="flex-1 text-white hover:opacity-90"
            >
              {loading ? (
                <Spinner size="sm" className="mr-2" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Confirmar
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-xl font-semibold">Nueva Transacción</h3>

      {response && (
        <Alert
          variant={response.codigo_respuesta === 0 ? "default" : "destructive"}
          className="mb-4"
        >
          {response.codigo_respuesta === 0 ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>
            {response.descripcion_respuesta}
            {response.id_transaccion && (
              <span className="ml-2 font-mono text-sm">
                ID: {response.id_transaccion}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="numeroCuenta">Número de Cuenta *</Label>
          <Input
            id="numeroCuenta"
            type="text"
            placeholder="Ej: 1234567890"
            {...register("numeroCuenta")}
            className={errors.numeroCuenta ? "border-red-500" : ""}
          />
          {errors.numeroCuenta && (
            <p className="mt-1 text-sm text-red-500">
              {errors.numeroCuenta.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="codigoOperacion">Código de Operación *</Label>
          <select
            id="codigoOperacion"
            {...register("codigoOperacion")}
            className={`w-full rounded-md border ${
              errors.codigoOperacion ? "border-red-500" : "border-input"
            } bg-background px-3 py-2 text-sm`}
          >
            <option value="">Selecciona una operación</option>
            {CODIGOS_OPERACION.map((op) => (
              <option key={op.codigo} value={op.codigo}>
                {op.codigo} - {op.descripcion} ({op.tipo})
              </option>
            ))}
          </select>
          {errors.codigoOperacion && (
            <p className="mt-1 text-sm text-red-500">
              {errors.codigoOperacion.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="monto">Monto (GTQ) *</Label>
          <Input
            id="monto"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("monto", { valueAsNumber: true })}
            className={errors.monto ? "border-red-500" : ""}
          />
          {errors.monto && (
            <p className="mt-1 text-sm text-red-500">{errors.monto.message}</p>
          )}
        </div>

        <Button
          type="submit"
          style={{ backgroundColor: "#9521B6" }}
          className="w-full text-white hover:opacity-90"
          disabled={loading}
        >
          <Send className="mr-2 h-4 w-4" />
          Continuar
        </Button>
      </form>
    </Card>
  );
}
