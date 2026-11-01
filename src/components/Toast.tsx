import React from "react"
import { useApp } from "../context/AppContext"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react"

export const Toast: React.FC = () => {
  const { toast, clearToast } = useApp()

  if (!toast) return null

  const config = {
    error: {
      bg: "bg-red-50 border-red-300 text-red-950",
      icon: (
        <AlertCircle
          className="w-5 h-5 text-red-700 flex-shrink-0"
          aria-hidden="true"
        />
      ),
      title: "Atención",
      role: "alert",
    },
    warning: {
      bg: "bg-amber-50 border-amber-300 text-amber-950",
      icon: (
        <AlertTriangle
          className="w-5 h-5 text-amber-700 flex-shrink-0"
          aria-hidden="true"
        />
      ),
      title: "Aviso de Stock",
      role: "alert",
    },
    success: {
      bg: "bg-emerald-50 border-emerald-300 text-emerald-950",
      icon: (
        <CheckCircle2
          className="w-5 h-5 text-emerald-700 flex-shrink-0"
          aria-hidden="true"
        />
      ),
      title: "Éxito",
      role: "status",
    },
    info: {
      bg: "bg-blue-50 border-blue-300 text-blue-950",
      icon: (
        <Info
          className="w-5 h-5 text-blue-700 flex-shrink-0"
          aria-hidden="true"
        />
      ),
      title: "Información",
      role: "status",
    },
  }[toast.type]

  return (
    <div
      role={config.role}
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl ${config.bg}`}
      >
        {config.icon}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider opacity-80">
            {config.title}
          </p>
          <p className="text-sm font-semibold mt-0.5 leading-snug">
            {toast.message}
          </p>
        </div>
        <button
          onClick={clearToast}
          className="p-1 rounded-md text-stone-500 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
