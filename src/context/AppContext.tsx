import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import {
  Product,
  User,
  CartItem,
  Order,
  CategoryName,
  ViewType,
} from "../types"
import { INITIAL_PRODUCTS, INITIAL_USERS } from "../data/mockData"

interface ToastInfo {
  id: number
  message: string
  type: "error" | "success" | "info" | "warning"
}

interface AppContextType {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  selectedCategory: CategoryName | "Todas"
  setSelectedCategory: (cat: CategoryName | "Todas") => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedPetFilter: "todos" | "perro" | "gato"
  setSelectedPetFilter: (f: "todos" | "perro" | "gato") => void

  // Auth
  users: User[]
  currentUser: User | null
  registerUser: (
    userData: Omit<User, "id" | "isActive" | "createdAt">,
  ) => { success: boolean error?: string }
  loginUser: (
    email: string,
    password: string,
  ) => {
    success: boolean
    errorType?: "incorrect" | "inactive"
    message?: string
  }
  activateUser: (email: string) => boolean
  resendActivation: (email: string) => boolean
  logoutUser: () => void
  lastRegisteredEmail: string
  setLastRegisteredEmail: (email: string) => void

  // Products & Cart
  products: Product[]
  cart: CartItem[]
  addToCart: (
    productId: string,
    quantity?: number,
  ) => { success: boolean message?: string }
  updateCartQuantity: (
    productId: string,
    newQuantity: number,
  ) => { success: boolean message?: string }
  removeFromCart: (productId: string) => void
  clearCart: () => void
  cartCount: number
  cartSubtotal: number
  despachoCost: number
  cartTotal: number

  // Orders & Payment
  lastOrder: Order | null
  completePayment: (metodoPago: string) => Order | null

  // Toast / Accessibility announcement
  toast: ToastInfo | null
  showToast: (
    message: string,
    type?: "error" | "success" | "info" | "warning",
  ) => void
  clearToast: () => void

  // Simulated Activation Inbox Modal
  isActivationModalOpen: boolean
  setIsActivationModalOpen: (open: boolean) => void
  activationTargetEmail: string
  setActivationTargetEmail: (email: string) => void

  // Quick Product View Modal
  selectedProductDetail: Product | null
  setSelectedProductDetail: (prod: Product | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const STORAGE_KEY_USERS = "mundo_patitas_users_v1"
const STORAGE_KEY_CURRENT_USER = "mundo_patitas_current_user_v1"
const STORAGE_KEY_CART = "mundo_patitas_cart_v1"

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ViewType>("inicio")
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | "Todas">("Todas")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPetFilter, setSelectedPetFilter] =
    useState<"todos" | "perro" | "gato">("todos")

  // Users
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS)
      return saved ? JSON.parse(saved) : INITIAL_USERS
    } catch {
      return INITIAL_USERS
    }
  })

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CURRENT_USER)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [lastRegisteredEmail, setLastRegisteredEmail] = useState<string>("")

  // Products & Cart
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [lastOrder, setLastOrder] = useState<Order | null>(null)
  const [toast, setToast] = useState<ToastInfo | null>(null)
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false)
  const [activationTargetEmail, setActivationTargetEmail] = useState("")
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<Product | null>(null)

  // Save users & cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))
    } catch (e) {
      console.error(e)
    }
  }, [users])

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(
          STORAGE_KEY_CURRENT_USER,
          JSON.stringify(currentUser),
        )
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_USER)
      }
    } catch (e) {
      console.error(e)
    }
  }, [currentUser])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  // Show Toast
  const showToast = (
    message: string,
    type: "error" | "success" | "info" | "warning" = "info",
  ) => {
    const id = Date.now()
    setToast({ id, message, type })
  }

  const clearToast = () => setToast(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Register user
  const registerUser = (
    userData: Omit<User, "id" | "isActive" | "createdAt">,
  ) => {
    const normalizedEmail = userData.email.trim().toLowerCase()
    const existing = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail,
    )
    if (existing) {
      return {
        success: false,
        error:
          "Este correo ya se encuentra registrado. Intenta iniciar sesión.",
      }
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      email: normalizedEmail,
      isActive: false, // Required by brief: "(cuenta queda inactiva)"
      createdAt: new Date().toISOString(),
    }

    setUsers((prev) => [...prev, newUser])
    setLastRegisteredEmail(normalizedEmail)
    setActivationTargetEmail(normalizedEmail)
    return { success: true }
  }

  // Login user
  const loginUser = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail,
    )

    if (!foundUser || foundUser.password !== password) {
      return {
        success: false,
        errorType: "incorrect" as const,
        message: "Correo o contraseña incorrectos.",
      }
    }

    if (!foundUser.isActive) {
      setActivationTargetEmail(normalizedEmail)
      return {
        success: false,
        errorType: "inactive" as const,
        message:
          "Tu cuenta no está activada. Revisa tu correo o solicita un reenvío.",
      }
    }

    setCurrentUser(foundUser)
    showToast(`¡Bienvenida/o de vuelta, ${foundUser.nombre}!`, "success")
    return { success: true }
  }

  // Activate user
  const activateUser = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    let found = false
    setUsers((prev) =>
      prev.map((u) => {
        if (u.email.toLowerCase() === normalizedEmail) {
          found = true
          return { ...u, isActive: true }
        }
        return u
      }),
    )
    if (found) {
      showToast(
        "¡Cuenta activada con éxito! Ahora puedes iniciar sesión.",
        "success",
      )
    }
    return found
  }

  // Resend activation email
  const resendActivation = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail)
    if (exists) {
      setActivationTargetEmail(normalizedEmail)
      setIsActivationModalOpen(true)
      showToast(`Correo de activación reenviado a ${normalizedEmail}`, "info")
      return true
    }
    return false
  }

  const logoutUser = () => {
    setCurrentUser(null)
    showToast("Has cerrado sesión correctamente.", "info")
  }

  // Cart operations
  const addToCart = (productId: string, quantity = 1): {
    success: boolean
    message?: string
  } => {
    const product = products.find((p) => p.id === productId)
    if (!product) return { success: false, message: "Producto no encontrado." }

    if (product.stock <= 0) {
      return { success: false, message: "Producto agotado." }
    }

    const currentInCart =
      cart.find((item) => item.product.id === productId)?.cantidad || 0
    const requestedTotal = currentInCart + quantity

    if (requestedTotal > product.stock) {
      const errorMsg = "Stock insuficiente para la cantidad solicitada."
      showToast(errorMsg, "error")
      return { success: false, message: errorMsg }
    }

    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) => item.product.id === productId,
      )
      if (itemIndex > -1) {
        const updated = [...prevCart]
        updated[itemIndex] = {
          ...updated[itemIndex],
          cantidad: requestedTotal,
        }
        return updated
      } else {
        return [...prevCart, { product, cantidad: quantity }]
      }
    })

    showToast(`Se agregó "${product.nombre}" al carro.`, "success")
    return { success: true }
  }

  const updateCartQuantity = (productId: string, newQuantity: number): {
    success: boolean
    message?: string
  } => {
    const product = products.find((p) => p.id === productId)
    if (!product) return { success: false }

    if (newQuantity <= 0) {
      removeFromCart(productId)
      return { success: true }
    }

    if (newQuantity > product.stock) {
      const errorMsg = "Stock insuficiente para la cantidad solicitada."
      showToast(errorMsg, "error")
      return { success: false, message: errorMsg }
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, cantidad: newQuantity }
          : item,
      ),
    )
    return { success: true }
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
    showToast("Producto eliminado del carro.", "info")
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0)
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.precio * item.cantidad,
    0,
  )
  const despachoCost = cartSubtotal > 30000 || cartSubtotal === 0 ? 0 : 3990
  const cartTotal = cartSubtotal + despachoCost

  // Complete payment
  const completePayment = (metodoPago: string): Order | null => {
    if (cart.length === 0) return null

    const newOrder: Order = {
      id: `MP-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      despacho: despachoCost,
      total: cartTotal,
      fecha: new Date().toLocaleString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      codigoAutorizacion: `${Math.floor(100000 + Math.random() * 900000)}`,
      metodoPago,
      rutComprador: currentUser ? currentUser.rut : "18.452.123-4",
      direccionEnvio: currentUser
        ? currentUser.direccion
        : "Av. Providencia 1240, Depto 402, Santiago",
    }

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((p) => {
        const purchased = cart.find((item) => item.product.id === p.id)
        if (purchased) {
          return { ...p, stock: Math.max(0, p.stock - purchased.cantidad) }
        }
        return p
      }),
    )

    setLastOrder(newOrder)
    clearCart()
    setCurrentView("exito-pago")
    return newOrder
  }

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedPetFilter,
        setSelectedPetFilter,
        users,
        currentUser,
        registerUser,
        loginUser,
        activateUser,
        resendActivation,
        logoutUser,
        lastRegisteredEmail,
        setLastRegisteredEmail,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        despachoCost,
        cartTotal,
        lastOrder,
        completePayment,
        toast,
        showToast,
        clearToast,
        isActivationModalOpen,
        setIsActivationModalOpen,
        activationTargetEmail,
        setActivationTargetEmail,
        selectedProductDetail,
        setSelectedProductDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
