"use client";

import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/templates/page-layout";
import { BreadcrumbNav } from "@/components/organisms/breadcrumb-nav";
import { TransactionForm } from "@/components/organisms/transaction-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { RespuestaTransaccion } from "@/lib/types";

export default function NuevaTransaccionPage() {
  const router = useRouter();

  const handleSuccess = (response: RespuestaTransaccion) => {
    setTimeout(() => {
      router.push("/transacciones");
    }, 2000);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <BreadcrumbNav
          items={[
            { label: "Transacciones", href: "/transacciones" },
            { label: "Nueva Transacción" },
          ]}
        />

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Nueva Transacción
            </h1>
            <p className="mt-2 text-muted-foreground">
              Registra una nueva operación bancaria
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <TransactionForm onSuccess={handleSuccess} />
        </div>
      </div>
    </PageLayout>
  );
}
