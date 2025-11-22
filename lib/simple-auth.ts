// Storage keys
const STORAGE_USER_KEY = 'milaencanto_user'
const STORAGE_ROLE_KEY = 'milaencanto_role'

interface User {
  uid: string
  email: string
  name?: string
  phone?: string
  role: 'admin' | 'client'
  favorites?: number[] // Added favorites array to store product IDs
}

export const simpleAuth = {
  // Mock users for demo
  demoUsers: {
    admin: { email: 'admin@milaencanto.com', password: 'admin123', role: 'admin' as const },
    client: { email: 'cliente@milaencanto.com', password: 'cliente123', role: 'client' as const }
  },

  register: (email: string, password: string, name: string, phone: string, role: 'admin' | 'client' = 'client'): { success: boolean; error?: string } => {
    if (!email || !password || !name || !phone) {
      return { success: false, error: 'Todos los campos son requeridos' }
    }
    // In real app, this would call Firebase
    const user: User = { uid: Date.now().toString(), email, name, phone, role }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
      localStorage.setItem(STORAGE_ROLE_KEY, role)
    }
    return { success: true }
  },

  login: (email: string, password: string): { success: boolean; error?: string } => {
    if (!email || !password) {
      return { success: false, error: 'Email y contraseña son requeridos' }
    }
    // Demo check
    const isAdmin = email === simpleAuth.demoUsers.admin.email && password === simpleAuth.demoUsers.admin.password
    const isClient = email === simpleAuth.demoUsers.client.email && password === simpleAuth.demoUsers.client.password

    if (isAdmin) {
      const user: User = { uid: '1', email, role: 'admin' }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
        localStorage.setItem(STORAGE_ROLE_KEY, 'admin')
      }
      return { success: true }
    } else if (isClient) {
      const user: User = { uid: '2', email, role: 'client' }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
        localStorage.setItem(STORAGE_ROLE_KEY, 'client')
      }
      return { success: true }
    }
    // For other emails, create a client account
    const user: User = { uid: Date.now().toString(), email, role: 'client' }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
      localStorage.setItem(STORAGE_ROLE_KEY, 'client')
    }
    return { success: true }
  },

  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_USER_KEY)
      localStorage.removeItem(STORAGE_ROLE_KEY)
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(STORAGE_USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  getCurrentRole: (): 'admin' | 'client' | null => {
    if (typeof window === 'undefined') return null
    return (localStorage.getItem(STORAGE_ROLE_KEY) as 'admin' | 'client') || null
  },

  toggleFavorite: (productId: number): { success: boolean; favorites?: number[] } => {
    if (typeof window === 'undefined') return { success: false }
    
    const userStr = localStorage.getItem(STORAGE_USER_KEY)
    if (!userStr) return { success: false }
    
    const user: User = JSON.parse(userStr)
    const favorites = user.favorites || []
    const index = favorites.indexOf(productId)
    
    let newFavorites: number[]
    if (index === -1) {
      newFavorites = [...favorites, productId]
    } else {
      newFavorites = favorites.filter(id => id !== productId)
    }
    
    const updatedUser = { ...user, favorites: newFavorites }
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updatedUser))
    
    return { success: true, favorites: newFavorites }
  },

  getFavorites: (): number[] => {
    if (typeof window === 'undefined') return []
    const userStr = localStorage.getItem(STORAGE_USER_KEY)
    if (!userStr) return []
    const user: User = JSON.parse(userStr)
    return user.favorites || []
  }
}
