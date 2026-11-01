import React, { useState } from "react"
import { useApp } from "../context/AppContext"
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
  AlertCircle,
  ShieldCheck,
  Truck,
  Lock,
  Sparkles,
  ShoppingBag,
} from "lucide-react"

export const CarritoView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    despachoCost,
    cartTotal,
    setCurrentView,
    showToast,
  } = useApp()

  const [stockError, setStockError] = useState<string | null>(null)

  const handleQuantityIncrease = (
    productId: string,
    currentQty: number,
    maxStock: number,
  ) => {
    setStockError(null)
    if (currentQty >= maxStock) {
      const errorMsg = "Stock insuficiente para la cantidad solicitada."
      setStockError(errorMsg)
      showToast(errorMsg, "error")
      return
    }
    const res = updateCartQuantity(productId, currentQty + 1)
    if (!res.success && res.message) {
      setStockError(res.message)
    }
  }

  const handleQuantityDecrease = (productId: string, currentQty: number) => {
    setStockError(null)
    updateCartQuantity(productId, currentQty - 1)
  }

  // Free shipping threshold progress ($30.000)
  const freeShippingThreshold = 30000
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - cartSubtotal,
  )
  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100),
  )

  if (cart.length === 0) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm animate-in fade-in">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-5">
            <ShoppingCart className="w-10 h-10 stroke-[1.75]" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-2">
            Tu carro está vacío
          </h1>
          <p className="text-stone-600 text-sm mb-6 leading-relaxed">
            ¡Tus regalones están esperando! Explora nuestro catálogo de
            alimentos, juguetes y accesorios de alta calidad.
          </p>
          <button
            onClick={() => setCurrentView("catalogo")}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
          >
            <span>Explorar Catálogo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 block mb-1">
            Revisa y confirma tu pedido
          </span>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Carro de Compras
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-stone-500 hover:text-red-700 underline self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
        >
          Vaciar carro
        </button>
      </div>

      {/* Stock Error Alert with Icon and Text */}
      {stockError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 p-4 rounded-2xl bg-red-50 border-2 border-red-400 text-red-950 flex items-start gap-3 shadow-xs animate-in fade-in"
        >
          <div className="p-1 rounded-full bg-red-200 text-red-800 flex-shrink-0 mt-0.5">
            <AlertCircle
              className="w-5 h-5 text-red-700 stroke-[2.5]"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <strong className="block text-sm font-bold text-red-900">
              Límite de Stock Superado:
            </strong>
            {/* Exact required text: "Stock insuficiente para la cantidad solicitada." */}
            <p className="text-sm font-semibold text-red-950 mt-0.5">
              {stockError}
            </p>
          </div>
        </div>
      )}

      {/* Free Shipping Progress Indicator */}
      <div className="mt-6 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="flex items-center gap-1.5 text-stone-800">
            <Truck className="w-4 h-4 text-amber-700" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-700">
                ¡Felicidades! Tienes Despacho GRATIS a todo Chile
              </span>
            ) : (
              <span>
                Agrega{" "}
                <strong>
                  ${remainingForFreeShipping.toLocaleString("es-CL")}
                </strong>{" "}
                más para Despacho Gratis
              </span>
            )}
          </span>
          <span className="text-stone-500">{progressPercent}%</span>
        </div>
        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              remainingForFreeShipping === 0 ? "bg-emerald-600" : "bg-amber-600"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Grid: Item List & Order Summary */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          {cart.map((item) => {
            const itemSubtotal = item.product.precio * item.cantidad
            const isAtMaxStock = item.cantidad >= item.product.stock

            return (
              <div
                key={item.product.id}
                className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs hover:border-amber-200 transition-colors"
              >
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
                  <img
                    src={item.product.imagen}
                    alt={`Fotografía de ${item.product.nombre}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-stone-100 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                      {item.product.categoria} • SKU: {item.product.sku}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug truncate mt-0.5">
                      {item.product.nombre}
                    </h3>
                    <div className="text-xs text-stone-500 mt-1">
                      Precio unitario:{" "}
                      <strong className="text-stone-800">
                        ${item.product.precio.toLocaleString("es-CL")}
                      </strong>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      Stock disponible:{" "}
                      <span className="font-bold text-stone-700">
                        {item.product.stock} unidades
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity (+ / -) */}
                  <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityDecrease(item.product.id, item.cantidad)
                      }
                      className="w-8 h-8 rounded-lg bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-sm shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                      aria-label={`Disminuir cantidad de ${item.product.nombre}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span
                      className="w-9 text-center font-black text-sm text-stone-900"
                      aria-label={`Cantidad actual: ${item.cantidad}`}
                    >
                      {item.cantidad}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityIncrease(
                          item.product.id,
                          item.cantidad,
                          item.product.stock,
                        )
                      }
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${
                        isAtMaxStock
                          ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                          : "bg-white hover:bg-stone-100 text-stone-700"
                      }`}
                      aria-label={`Aumentar cantidad de ${item.product.nombre}`}
                      title={
                        isAtMaxStock
                          ? "No hay más unidades en stock"
                          : "Agregar 1 más"
                      }
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal & Delete button */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 block uppercase">
                        Subtotal
                      </span>
                      <span className="text-base font-black text-stone-900">
                        ${itemSubtotal.toLocaleString("es-CL")}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                      aria-label={`Eliminar ${item.product.nombre} del carro`}
                      title="Eliminar del carro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Card (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-lg sticky top-28 space-y-5">
            <h2 className="text-xl font-black text-stone-900 pb-3 border-b border-stone-100">
              Resumen del Pedido
            </h2>

            {/* Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-700">
                <span>
                  Subtotal ({cart.reduce((s, i) => s + i.cantidad, 0)}{" "}
                  productos)
                </span>
                <strong className="text-stone-900">
                  ${cartSubtotal.toLocaleString("es-CL")}
                </strong>
              </div>

              <div className="flex justify-between text-stone-700">
                <span className="flex items-center gap-1.5">
                  <span>Costo de Despacho</span>
                  {despachoCost === 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                      Gratis
                    </span>
                  )}
                </span>
                <strong
                  className={
                    despachoCost === 0 ? "text-emerald-700" : "text-stone-900"
                  }
                >
                  {despachoCost === 0
                    ? "$0"
                    : `$${despachoCost.toLocaleString("es-CL")}`}
                </strong>
              </div>

              <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-black text-stone-900 block leading-tight">
                    Total Final
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    IVA incluido
                  </span>
                </div>
                <span className="text-2xl font-black text-amber-800">
                  ${cartTotal.toLocaleString("es-CL")}
                </span>
              </div>
            </div>

            {/* Required Prominent Button: "Pagar" (Webpay) */}
            <button
              onClick={() => setCurrentView("pago")}
              className="w-full py-4 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
            >
              <Lock className="w-5 h-5 text-amber-200" />
              <span>Pagar con Webpay Plus</span>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </button>

            {/* Webpay Security Badges */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <div className="flex items-center justify-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Transbank Webpay Plus • Certificado 256-bit SSL</span>
              </div>
              <p className="text-[11px] text-stone-500 text-center leading-tight">
                Aceptamos Débito (Redcompra), Tarjetas de Crédito Visa,
                Mastercard, Magna, American Express y Diners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
