import React, { useState } from "react"
import { useApp } from "../context/AppContext"
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Building,
  FileText,
} from "lucide-react"

export const PagoView: React.FC = () => {
  const {
    cartTotal,
    cartSubtotal,
    despachoCost,
    cart,
    completePayment,
    setCurrentView,
    currentUser,
  } = useApp()

  const [paymentMethod, setPaymentMethod] =
    useState<"debito" | "credito" | "prepago">("debito")
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardNumber, setCardNumber] = useState("4512 8900 1234 5678")
  const [cardExpiry, setCardExpiry] = useState("08/28")
  const [cardCvv, setCardCvv] = useState("889")

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      const methodLabel =
        paymentMethod === "debito"
          ? "Webpay Plus - Redcompra Débito"
          : paymentMethod === "credito"
            ? "Webpay Plus - Tarjeta de Crédito (Visa)"
            : "Webpay Plus - Prepago Digital"
      completePayment(methodLabel)
    }, 1200)
  }

  if (cart.length === 0) {
    return (
      <div className="py-16 px-4 text-center">
        <p className="text-stone-600 mb-4">No tienes productos por pagar.</p>
        <button
          onClick={() => setCurrentView("catalogo")}
          className="px-5 py-2.5 rounded-xl bg-amber-700 text-white font-bold"
        >
          Ir al Catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => setCurrentView("carrito")}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded p-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Carrito</span>
      </button>

      {/* Webpay Portal Frame */}
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Transbank Webpay Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-red-600 font-black flex items-center justify-center text-lg shadow-sm">
              W
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-red-100 block">
                Portal de Pago Seguro
              </span>
              <span className="text-xl font-black text-white">
                Webpay Plus • Transbank
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-red-800/80 px-3 py-1.5 rounded-xl text-xs font-bold text-red-100">
            <Lock className="w-3.5 h-3.5" />
            <span>Ambiente Seguro 256-bit</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Transaction Summary (5 cols) */}
          <div className="md:col-span-5 bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-stone-200">
                <span className="text-xs uppercase font-bold text-stone-500 block">
                  Comercio
                </span>
                <p className="text-base font-black text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-4 h-4 text-stone-500" />
                  <span>Mundo Patitas SpA</span>
                </p>
                <span className="text-xs text-stone-500">
                  RUT: 76.890.123-K
                </span>
              </div>

              <div className="pb-3 border-b border-stone-200">
                <span className="text-xs uppercase font-bold text-stone-500 block">
                  Cliente
                </span>
                <p className="text-sm font-bold text-stone-900 mt-0.5">
                  {currentUser
                    ? `${currentUser.nombre} ${currentUser.apellido}`
                    : "Cliente Invitado"}
                </p>
                <p className="text-xs text-stone-600">
                  {currentUser ? currentUser.email : "cliente@ejemplo.cl"}
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal productos:</span>
                  <span className="font-bold text-stone-800">
                    ${cartSubtotal.toLocaleString("es-CL")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío:</span>
                  <span className="font-bold text-stone-800">
                    {despachoCost === 0
                      ? "Gratis ($0)"
                      : `$${despachoCost.toLocaleString("es-CL")}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 bg-white p-4 rounded-xl border">
              <span className="text-xs font-bold text-stone-500 uppercase block">
                Total a Pagar
              </span>
              <span className="text-3xl font-black text-amber-800 block mt-0.5">
                ${cartTotal.toLocaleString("es-CL")}
              </span>
              <span className="text-[11px] text-stone-500">
                Moneda: CLP (Pesos Chilenos)
              </span>
            </div>
          </div>

          {/* Payment Form (7 cols) */}
          <div className="md:col-span-7">
            <h2 className="text-lg font-black text-stone-900 mb-4">
              Selecciona tu medio de pago
            </h2>

            {/* Method tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("debito")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === "debito"
                    ? "border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-red-600" />
                <span className="text-xs block">Débito / Redcompra</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("credito")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === "credito"
                    ? "border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                <span className="text-xs block">Tarjeta Crédito</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("prepago")}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === "prepago"
                    ? "border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                <span className="text-xs block">Prepago</span>
              </button>
            </div>

            {/* Simulated Card Inputs */}
            <form onSubmit={handlePay} className="space-y-4">
              <div>
                <label
                  htmlFor="card-number"
                  className="block text-xs font-bold text-stone-800 mb-1"
                >
                  Número de Tarjeta (Simulado)
                </label>
                <input
                  id="card-number"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-mono text-stone-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="card-expiry"
                    className="block text-xs font-bold text-stone-800 mb-1"
                  >
                    Vencimiento (MM/AA)
                  </label>
                  <input
                    id="card-expiry"
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-mono text-stone-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="card-cvv"
                    className="block text-xs font-bold text-stone-800 mb-1"
                  >
                    CVV / CVC
                  </label>
                  <input
                    id="card-cvv"
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-mono text-stone-900 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-black text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-red-600 disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Conectando con Transbank...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Pagar ${cartTotal.toLocaleString("es-CL")}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
