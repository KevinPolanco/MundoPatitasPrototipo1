import React, { useState } from "react"
import { useApp } from "../context/AppContext"
import { HERO_IMAGE } from "../data/mockData"
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react"

export const RegistroView: React.FC = () => {
  const {
    registerUser,
    setCurrentView,
    setIsActivationModalOpen,
    setActivationTargetEmail,
  } = useApp()

  // Form fields
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [rut, setRut] = useState("")
  const [email, setEmail] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // UI states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Password validation: min 8 characters, at least 1 letter and 1 number
  const isPasswordValid = (pass: string): boolean => {
    const hasMinLength = pass.length >= 8
    const hasLetter = /[a-zA-Z]/.test(pass)
    const hasNumber = /[0-9]/.test(pass)
    return hasMinLength && hasLetter && hasNumber
  }

  // Quick helper to autofill valid test data for demo
  const handleFillDemoData = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900)
    setNombre("Camila")
    setApellido("Valenzuela")
    setRut("19.876.543-2")
    setEmail(`camila.pet${randomSuffix}@ejemplo.cl`)
    setDireccion("Av. Las Condes 8900, Depto 101, Santiago")
    setTelefono("+56 9 7654 3210")
    setPassword("Patitas2024")
    setConfirmPassword("Patitas2024")
    setErrorMessage(null)
    setFieldErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setFieldErrors({})

    const errors: Record<string, boolean> = {}

    // 1. Check empty fields
    if (!nombre.trim()) errors.nombre = true
    if (!apellido.trim()) errors.apellido = true
    if (!rut.trim()) errors.rut = true
    if (!email.trim()) errors.email = true
    if (!direccion.trim()) errors.direccion = true
    if (!telefono.trim()) errors.telefono = true
    if (!password) errors.password = true
    if (!confirmPassword) errors.confirmPassword = true

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setErrorMessage("Todos los campos marcados son obligatorios.")
      window.scrollTo({ top: 300, behavior: "smooth" })
      return
    }

    // 2. Validate password strength: min 8 chars, including letter and number
    if (!isPasswordValid(password)) {
      setFieldErrors({ password: true })
      setErrorMessage(
        "La contraseña debe tener mínimo 8 caracteres, incluyendo letras y números.",
      )
      return
    }

    // 3. Validate password match
    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: true, password: true })
      setErrorMessage("Las contraseñas no coinciden.")
      return
    }

    // 4. Register user in context (which checks for repeated email)
    const result = registerUser({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      rut: rut.trim(),
      email: email.trim(),
      direccion: direccion.trim(),
      telefono: telefono.trim(),
      password,
    })

    if (!result.success) {
      setFieldErrors({ email: true })
      setErrorMessage(
        result.error ||
          "Este correo ya se encuentra registrado. Intenta iniciar sesión.",
      )
      return
    }

    // 5. Success! Open success modal
    setActivationTargetEmail(email.trim().toLowerCase())
    setIsSuccessModalOpen(true)
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white mb-10 shadow-xl">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src={HERO_IMAGE}
            alt="Perro y gato felices juntos descansando en el pasto"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative p-6 sm:p-10 lg:p-12 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-600/90 text-white mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Únete a la Comunidad Mundo
            Patitas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mb-3">
            Más momentos felices, más patitas contentas.
          </h1>
          <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            Crea tu cuenta gratuita hoy mismo. Accede a descuentos exclusivos,
            acumula puntos en cada compra y mantén el historial de cuidados de
            tus regalones en un solo lugar.
          </p>
        </div>
      </div>

      {/* Registration Form Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-stone-200 p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-3">
          <div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Registro de Usuario
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Los campos marcados con{" "}
              <span className="text-red-700 font-bold">*</span> son
              obligatorios.
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            title="Rellenar campos automáticamente para agilizar pruebas"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Autocompletar datos de prueba</span>
          </button>
        </div>

        {/* Mandatory Error Alert (Icon + Text, not only color) */}
        {errorMessage && (
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
                Atención:
              </strong>
              <p className="text-sm font-semibold text-red-950 mt-0.5">
                {errorMessage}
              </p>
              {errorMessage.includes("ya se encuentra registrado") && (
                <button
                  type="button"
                  onClick={() => setCurrentView("login")}
                  className="mt-2 text-xs font-bold text-amber-900 hover:text-amber-950 underline inline-flex items-center gap-1"
                >
                  <span>Ir a Iniciar sesión ahora</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          {/* Row 1: Nombre & Apellido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reg-nombre"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Nombre <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value)
                    if (fieldErrors.nombre)
                      setFieldErrors((prev) => ({ ...prev, nombre: false }))
                  }}
                  placeholder="Ej. Camila"
                  aria-required="true"
                  aria-invalid={fieldErrors.nombre ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.nombre
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
                <User className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="reg-apellido"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Apellido <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-apellido"
                  name="apellido"
                  type="text"
                  value={apellido}
                  onChange={(e) => {
                    setApellido(e.target.value)
                    if (fieldErrors.apellido)
                      setFieldErrors((prev) => ({ ...prev, apellido: false }))
                  }}
                  placeholder="Ej. Valenzuela"
                  aria-required="true"
                  aria-invalid={fieldErrors.apellido ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.apellido
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
                <User className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: RUT & Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reg-rut"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                RUT <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-rut"
                  name="rut"
                  type="text"
                  value={rut}
                  onChange={(e) => {
                    setRut(e.target.value)
                    if (fieldErrors.rut)
                      setFieldErrors((prev) => ({ ...prev, rut: false }))
                  }}
                  placeholder="12.345.678-9"
                  aria-required="true"
                  aria-invalid={fieldErrors.rut ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.rut
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
                <CreditCard className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <span className="text-[11px] text-stone-600 mt-1 block">
                Formato con puntos y guion
              </span>
            </div>

            <div>
              <label
                htmlFor="reg-telefono"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Teléfono <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-telefono"
                  name="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value)
                    if (fieldErrors.telefono)
                      setFieldErrors((prev) => ({ ...prev, telefono: false }))
                  }}
                  placeholder="+56 9 1234 5678"
                  aria-required="true"
                  aria-invalid={fieldErrors.telefono ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.telefono
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
                <Phone className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <span className="text-[11px] text-stone-600 mt-1 block">
                Para notificaciones de despacho
              </span>
            </div>
          </div>

          {/* Row 3: Correo electrónico */}
          <div>
            <label
              htmlFor="reg-email"
              className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
            >
              Correo electrónico{" "}
              <span className="text-red-700 font-black">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email)
                    setFieldErrors((prev) => ({ ...prev, email: false }))
                }}
                placeholder="tu.correo@ejemplo.cl"
                aria-required="true"
                aria-invalid={fieldErrors.email ? "true" : "false"}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                  fieldErrors.email
                    ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                    : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
              />
              <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Row 4: Dirección */}
          <div>
            <label
              htmlFor="reg-direccion"
              className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
            >
              Dirección <span className="text-red-700 font-black">*</span>
            </label>
            <div className="relative">
              <input
                id="reg-direccion"
                name="direccion"
                type="text"
                value={direccion}
                onChange={(e) => {
                  setDireccion(e.target.value)
                  if (fieldErrors.direccion)
                    setFieldErrors((prev) => ({ ...prev, direccion: false }))
                }}
                placeholder="Calle, número, departamento, comuna"
                aria-required="true"
                aria-invalid={fieldErrors.direccion ? "true" : "false"}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm border font-medium transition-all ${
                  fieldErrors.direccion
                    ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                    : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
              />
              <MapPin className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Row 5: Contraseña & Confirmación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Contraseña <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (fieldErrors.password)
                      setFieldErrors((prev) => ({ ...prev, password: false }))
                  }}
                  placeholder="Mínimo 8 caracteres"
                  aria-required="true"
                  aria-invalid={fieldErrors.password ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.password
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
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
              <span className="text-[11px] text-stone-600 mt-1 block">
                Mínimo 8 caracteres, con letras y números
              </span>
            </div>

            <div>
              <label
                htmlFor="reg-confirm-password"
                className="block text-xs sm:text-sm font-bold text-stone-800 mb-1.5"
              >
                Confirmación de contraseña{" "}
                <span className="text-red-700 font-black">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (fieldErrors.confirmPassword)
                      setFieldErrors((prev) => ({
                        ...prev,
                        confirmPassword: false,
                      }))
                  }}
                  placeholder="Repite tu contraseña"
                  aria-required="true"
                  aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl text-sm border font-medium transition-all ${
                    fieldErrors.confirmPassword
                      ? "border-red-500 bg-red-50/50 text-red-950 focus:ring-red-600"
                      : "border-stone-300 bg-stone-50/50 hover:bg-white text-stone-900 focus:border-amber-700"
                  } focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700 p-0.5"
                  aria-label={
                    showConfirmPassword
                      ? "Ocultar confirmación"
                      : "Ver confirmación"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Button "Confirmar" */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-black text-base shadow-lg hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
            >
              Confirmar
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center text-sm text-stone-700">
          ¿Ya tienes una cuenta en Mundo Patitas?{" "}
          <button
            type="button"
            onClick={() => setCurrentView("login")}
            className="font-bold text-amber-800 hover:text-amber-950 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded"
          >
            Iniciar sesión aquí
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-stone-200 p-6 sm:p-8 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <CheckCircle2
                className="w-10 h-10 stroke-[2.5]"
                aria-hidden="true"
              />
            </div>

            {/* Exact required text: "Tu cuenta ha sido creada. Revisa tu correo para activarla." */}
            <h2
              id="success-modal-title"
              className="text-xl sm:text-2xl font-black text-stone-900 leading-snug"
            >
              Tu cuenta ha sido creada. Revisa tu correo para activarla.
            </h2>

            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              Hemos enviado un enlace de activación a <strong>{email}</strong>.
              Tu cuenta quedará inactiva hasta que hagas clic en el enlace.
            </p>

            <div className="mt-6 space-y-3">
              {/* Option 1: Go to login to test inactive account requirement */}
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  setCurrentView("login")
                }}
                className="w-full py-3 px-5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-amber-700"
              >
                Ir a Iniciar Sesión (Probar cuenta inactiva)
              </button>

              {/* Option 2: Open simulated activation inbox */}
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  setIsActivationModalOpen(true)
                }}
                className="w-full py-2.5 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>Abrir Simulador de Correo de Activación</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
