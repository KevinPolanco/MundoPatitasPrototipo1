import React from "react"
import { useApp } from "../context/AppContext"
import { CATEGORIES } from "../data/mockData"
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Accessibility,
} from "lucide-react"

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useApp()

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md">
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4.5 3C6.67 5 6 5.67 6 6.5S6.67 8 7.5 8 9 7.33 9 6.5 8.33 5 7.5 5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-11 5C4.12 10 3.5 10.62 3.5 11.38s.62 1.38 1.5 1.38 1.5-.62 1.5-1.38-.62-1.38-1.5-1.38zm13 0c-.88 0-1.5.62-1.5 1.38s.62 1.38 1.5 1.38 1.5-.62 1.5-1.38-.62-1.38-1.5-1.38zM12 8.5c-3.04 0-5.5 2.24-5.5 5 0 2.21 1.6 3.99 3.82 4.49L9 21h6l-1.32-3.01C15.9 17.49 17.5 15.71 17.5 13.5c0-2.76-2.46-5-5.5-5z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Mundo<span className="text-amber-500">Patitas</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Tu tienda online de confianza para consentir a perros y gatos en
              todo Chile. Productos seleccionados con amor, ingredientes
              certificados y stock real en cada compra.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <Accessibility className="w-4 h-4 text-amber-400" />
              <span>
                Diseñado con accesibilidad WCAG 2.0 (Contraste 4.5:1+)
              </span>
            </div>
          </div>

          {/* Categories links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Catálogo
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat)
                      setCurrentView("catalogo")
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    className="text-stone-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => setCurrentView("inicio")}
                  className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("registro")}
                  className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  Registro
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("login")}
                  className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  Iniciar sesión
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("catalogo")}
                  className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  Catálogo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView("carrito")}
                  className="hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
                >
                  Carro y Webpay
                </button>
              </li>
            </ul>
          </div>

          {/* Contact details */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
              Contacto & Soporte
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Av. Providencia 1240, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>+56 9 8765 4321</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>contacto@mundopatitas.cl</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Lun - Sáb: 09:00 a 19:00 hrs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Mundo Patitas SpA. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="font-bold text-amber-400">
              Transbank Webpay Plus
            </span>
            <span>•</span>
            <span>Redcompra</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
