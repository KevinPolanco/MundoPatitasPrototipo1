import React, { useState, useEffect } from "react"
import { useApp } from "../context/AppContext"
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Send,
  Sparkles,
  UserCheck,
  ShieldAlert,
  HelpCircle,
} from "lucide-react"

export const LoginView: React.FC = () => {
  const {
    loginUser,
    setCurrentView,
    resendActivation,
    lastRegisteredEmail,
    showToast,
  } = useApp()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Error states
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errorType, setErrorType] =
    useState<"incorrect" | "inactive" | "empty" | null>(null)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)

  // Auto-fill recently registered email if available
  useEffect(() => {
    if (lastRegisteredEmail && !email) {
      setEmail(lastRegisteredEmail)
      setPassword("Patitas2024")
    }
  }, [lastRegisteredEmail])

  // Demo account quick switchers
  const fillActiveAccount = () => {
    setEmail("maria.patitas@ejemplo.cl")
    setPassword("Patitas2024")
    setErrorMessage(null)
    setErrorType(null)
    setResendSuccess(false)
  }

  const fillInactiveAccount = () => {
    setEmail("juan.inactivo@ejemplo.cl")
    setPassword("Patitas2024")
    setErrorMessage(null)
    setErrorType(null)
    setResendSuccess(false)
  }

  const fillWrongPassword = () => {
    setEmail("maria.patitas@ejemplo.cl")
    setPassword("ClaveErronea999")
    setErrorMessage(null)
    setErrorType(null)
    setResendSuccess(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setErrorType(null)
    setResendSuccess(false)

    if (!email.trim() || !password) {
      setErrorType("incorrect")
      setErrorMessage("Correo o contraseña incorrectos.")
      return
    }

    const res = loginUser(email, password)
    if (!res.success) {
      setErrorType(res.errorType || "incorrect")
      setErrorMessage(res.message || "Correo o contraseña incorrectos.")
    } else {
      // Login successful! Navigate to catalog
      setCurrentView("catalogo")
    }
  }

  const handleResend = () => {
    if (!email) return
    const resent = resendActivation(email)
    if (resent) {
      setResendSuccess(true)
    } else {
      showToast("No se encontró una cuenta con ese correo.", "error")
    }
  }

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-md mx-auto">
        {/* Quick access accounts */}
        <div className="mb-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Accesos de
              demostración
            </span>
          </div>
          <p className="text-xs text-stone-600 mb-3">
            Selecciona una cuenta para completar automáticamente los datos:
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={fillActiveAccount}
              className="flex items-center justify-between px-3 py-2 bg-white hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-left text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-stone-900 block">
                    1. Cuenta Activa (María)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    maria.patitas@ejemplo.cl
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                Login exitoso
              </span>
            </button>
            <button
              type="button"
              onClick={fillInactiveAccount}
              className="flex items-center justify-between px-3 py-2 bg-white hover:bg-amber-100/60 border border-stone-200 hover:border-amber-400 rounded-xl text-left text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <div>
                  <span className="font-bold text-stone-900 block">
                    2. Cuenta Inactiva (Juan)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    juan.inactivo@ejemplo.cl
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                Probar reenvío
              </span>
            </button>
            <button
              type="button"
              onClick={fillWrongPassword}
              className="flex items-center justify-between px-3 py-1.5 bg-white hover:bg-red-50 border border-stone-200 rounded-xl text-left text-xs transition-colors"
            >
              <span className="text-stone-700 font-medium">
                3. Probar contraseña incorrecta
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                Error 4.1
              </span>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Iniciar sesión
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>

          {/* Exact error alert: Inactive account or Incorrect credentials */}
          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className={`mb-6 p-4 rounded-2xl border-2 flex items-start gap-3 shadow-xs animate-in fade-in ${
                errorType === "inactive"
                  ? "bg-amber-50 border-amber-400 text-amber-950"
                  : "bg-red-50 border-red-400 text-red-950"
              }`}
            >
              <div
                className={`p-1 rounded-full flex-shrink-0 mt-0.5 ${
                  errorType === "inactive"
                    ? "bg-amber-200 text-amber-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                <AlertCircle
                  className="w-5 h-5 stroke-[2.5]"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <strong className="block text-sm font-bold">
                  {errorType === "inactive"
                    ? "Cuenta no activada:"
                    : "Error de acceso:"}
                </strong>
                <p className="text-sm font-semibold mt-0.5">{errorMessage}</p>

                {/* Option to resend activation email when account is inactive */}
                {errorType === "inactive" && (
                  <div className="mt-3 pt-3 border-t border-amber-200/80">
                    <button
                      type="button"
                      onClick={handleResend}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reenviar correo de activación</span>
                    </button>
                    {resendSuccess && (
                      <p className="text-xs font-bold text-emerald-800 mt-2 flex items-center gap-1 animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ¡Correo de activación reenviado! Revisa tu bandeja de
                        entrada o usa el simulador.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Correo */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Correo electrónico{" "}
                <span className="text-red-700 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.cl"
                  required
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs sm:text-sm font-bold text-stone-800"
                >
                  Contraseña <span className="text-red-700 font-bold">*</span>
                </label>
                {/* Link "¿Olvidaste tu contraseña?" */}
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="w-full px-3.5 py-2.5 pl-10 pr-10 rounded-xl text-sm border border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Ver contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Required exact button: "Iniciar sesión >" */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
              >
                <span>Iniciar sesión &gt;</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center text-sm text-stone-700">
            ¿No tienes cuenta aún?{" "}
            <button
              type="button"
              onClick={() => setCurrentView("registro")}
              className="font-bold text-amber-800 hover:text-amber-950 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded"
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-stone-200 p-6 text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2
              id="forgot-modal-title"
              className="text-xl font-black text-stone-900"
            >
              Recuperar contraseña
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Ingresa tu correo para recibir un enlace de restablecimiento
              seguro.
            </p>
            <input
              type="email"
              defaultValue={email}
              placeholder="tu.correo@ejemplo.cl"
              className="w-full mt-4 px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
            />
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 font-bold text-xs text-stone-700 hover:bg-stone-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false)
                  showToast(
                    "Se ha enviado el enlace de recuperación a tu correo.",
                    "info",
                  )
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-700 font-bold text-xs text-white hover:bg-amber-800"
              >
                Enviar enlace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
