import React from "react"
import { useApp } from "../context/AppContext"
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Building,
  Calendar,
  Hash,
} from "lucide-react"

export const ExitoPagoView: React.FC = () => {
  const { lastOrder, setCurrentView } = useApp()

  if (!lastOrder) {
    return (
      <div className="py-16 text-center">
        <p className="text-stone-600 mb-4">No hay comprobante activo.</p>
        <button
          onClick={() => setCurrentView("catalogo")}
          className="px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold"
        >
          Ir al Catálogo
        </button>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Success banner */}
      <div className="text-center mb-8 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-md">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
          Transacción Webpay Plus Exitosa
        </span>
        <h1 className="text-3xl font-black text-stone-900 mt-1">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-stone-600 text-sm mt-2 max-w-md mx-auto">
          Hemos recibido tu pago y estamos preparando el envío con el mayor
          cariño para tus patitas regalonas.
        </p>
      </div>

      {/* Official Voucher */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Comprobante de Venta Electrónico
            </span>
            <h2 className="text-xl font-black text-stone-900">
              Mundo Patitas SpA
            </h2>
            <p className="text-xs text-stone-500">
              RUT: 76.890.123-K • Casa Matriz: Santiago, Chile
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs uppercase font-bold text-stone-500 block">
              Nº de Orden
            </span>
            <span className="text-lg font-mono font-black text-amber-800">
              {lastOrder.id}
            </span>
          </div>
        </div>

        {/* Transaction Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-stone-100 text-xs">
          <div>
            <span className="text-stone-500 block font-semibold">
              Fecha y Hora
            </span>
            <span className="font-bold text-stone-900">{lastOrder.fecha}</span>
          </div>
          <div>
            <span className="text-stone-500 block font-semibold">
              Cód. Autorización
            </span>
            <span className="font-mono font-bold text-stone-900">
              {lastOrder.codigoAutorizacion}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block font-semibold">
              Medio de Pago
            </span>
            <span className="font-bold text-stone-900">
              {lastOrder.metodoPago}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block font-semibold">
              Estado Transbank
            </span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Aprobada
            </span>
          </div>
        </div>

        {/* Items breakdown */}
        <div className="py-6 border-b border-stone-100">
          <h3 className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-4">
            Detalle de Productos (
            {lastOrder.items.reduce((s, i) => s + i.cantidad, 0)} unidades)
          </h3>
          <div className="space-y-3">
            {lastOrder.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={item.product.imagen}
                    alt=""
                    className="w-10 h-10 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-stone-900 truncate">
                      {item.product.nombre}
                    </p>
                    <p className="text-xs text-stone-500">
                      {item.cantidad} x $
                      {item.product.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>
                <span className="font-black text-stone-900 pl-4">
                  $
                  {(item.product.precio * item.cantidad).toLocaleString(
                    "es-CL",
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="py-4 space-y-2 text-sm text-stone-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-bold text-stone-900">
              ${lastOrder.subtotal.toLocaleString("es-CL")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Despacho:</span>
            <span className="font-bold text-stone-900">
              {lastOrder.despacho === 0
                ? "Gratis"
                : `$${lastOrder.despacho.toLocaleString("es-CL")}`}
            </span>
          </div>
          <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline text-base font-black text-stone-900">
            <span>Total Pagado:</span>
            <span className="text-2xl text-amber-800">
              ${lastOrder.total.toLocaleString("es-CL")}
            </span>
          </div>
        </div>

        {/* Shipping address info */}
        <div className="mt-4 p-4 bg-stone-50 rounded-2xl text-xs text-stone-700 space-y-1">
          <p>
            <strong>Dirección de entrega:</strong> {lastOrder.direccionEnvio}
          </p>
          <p>
            <strong>RUT Comprador:</strong> {lastOrder.rutComprador}
          </p>
          <p className="text-stone-500 text-[11px] pt-1">
            Se enviará una copia del comprobante y el código de seguimiento de
            Chilexpress / Blue Express a tu correo.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 px-5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-sm transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir comprobante</span>
          </button>

          <button
            onClick={() => setCurrentView("catalogo")}
            className="flex-1 py-3 px-5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Seguir comprando en Catálogo</span>
          </button>
        </div>
      </div>
    </div>
  )
}
