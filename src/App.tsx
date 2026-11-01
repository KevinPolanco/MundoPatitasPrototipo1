import React, { useEffect } from "react"
import { AppProvider, useApp } from "./context/AppContext"
import { Header } from "./components/Header"
import { InicioView } from "./components/InicioView"
import { RegistroView } from "./components/RegistroView"
import { LoginView } from "./components/LoginView"
import { CatalogoView } from "./components/CatalogoView"
import { CarritoView } from "./components/CarritoView"
import { PagoView } from "./components/PagoView"
import { ExitoPagoView } from "./components/ExitoPagoView"
import { Footer } from "./components/Footer"
import { Toast } from "./components/Toast"
import { ActivationModal } from "./components/ActivationModal"

function MainApp() {
  const { currentView } = useApp()

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentView])

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans antialiased">
      {/* Accessible skip link for keyboard navigation (WCAG 2.0) */}
      <a
        href="#main-content"
        className="skip-to-content sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-800 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-bold focus:outline-none"
      >
        Saltar al contenido principal
      </a>

      {/* Header on all views */}
      <Header />

      {/* Main View Container */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {currentView === "inicio" && <InicioView />}
        {currentView === "registro" && <RegistroView />}
        {currentView === "login" && <LoginView />}
        {currentView === "catalogo" && <CatalogoView />}
        {currentView === "carrito" && <CarritoView />}
        {currentView === "pago" && <PagoView />}
        {currentView === "exito-pago" && <ExitoPagoView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Accessible Toast Notifications */}
      <Toast />

      {/* Simulated Email Activation Modal */}
      <ActivationModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}
