import React from "react"
import { useApp } from "../context/AppContext"
import { Mail, CheckCircle, ExternalLink, X, ShieldCheck } from "lucide-react"

export const ActivationModal: React.FC = () => {
  const {
    isActivationModalOpen,
    setIsActivationModalOpen,
    activationTargetEmail,
    activateUser,
    setCurrentView,
  } = useApp()

  if (!isActivationModalOpen) return null

  const handleActivateClick = () => {
    if (activationTargetEmail) {
      activateUser(activationTargetEmail)
      setIsActivationModalOpen(false)
      setCurrentView("login")
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="activation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-stone-200 overflow-hidden animate-in zoom-in-95">
        {/* Email client header simulation */}
        <div className="bg-stone-900 text-stone-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                Simulador de Correo Electrónico
              </span>
              <span className="text-sm font-semibold text-white">
                Bandeja de entrada:{" "}
                {activationTargetEmail || "tu-correo@ejemplo.cl"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsActivationModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Cerrar simulador de correo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email body preview */}
        <div className="p-6 space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <p className="text-xs text-stone-500">
              De:{" "}
              <strong className="text-stone-800">
                no-responder@mundopatitas.cl
              </strong>
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              Para:{" "}
              <strong className="text-stone-800">
                {activationTargetEmail}
              </strong>
            </p>
            <h2
              id="activation-modal-title"
              className="text-lg font-black text-stone-900 mt-2"
            >
              ¡Bienvenido a Mundo Patitas! Activa tu cuenta 🐾
            </h2>
          </div>

          <div className="space-y-3 text-stone-700 text-sm leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-100">
            <p>Hola,</p>
            <p>
              Gracias por registrarte en <strong>Mundo Patitas</strong>. Para
              comenzar a disfrutar de los mejores productos para tus regalones,
              por favor confirma tu dirección de correo electrónico haciendo
              clic en el siguiente botón:
            </p>

            <div className="py-2 text-center">
              <button
                onClick={handleActivateClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-600"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Activar mi cuenta ahora</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>

            <p className="text-xs text-stone-500 text-center">
              Este enlace es válido por 24 horas. Si no solicitaste este
              registro, puedes ignorar este mensaje.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verificación
              de seguridad
            </span>
            <button
              onClick={() => setIsActivationModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              Cerrar y probar login inactivo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
