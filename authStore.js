import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null)
  const role = ref(null)

  function setAuth(newToken, userData) {
    token.value = newToken
    user.value = userData
    
    // Determinar el rol basado en la estructura del usuario
    let userRole = null
    if (userData?.role) {
      userRole = userData.role
    } else if (userData?.roles && Array.isArray(userData.roles)) {
      userRole = userData.roles[0]
    }
    
    role.value = userRole
    
    // Guardar en localStorage
    const authData = {
      token: newToken,
      user: userData,
      role: userRole
    }
    
    localStorage.setItem('auth', JSON.stringify(authData))
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userRole', userRole)
    
    console.log('✅ Auth guardado:', { token: !!newToken, user: userData?.name, role: userRole })
  }

  function clearAuth() {
    token.value = null
    user.value = null
    role.value = null
    
    // Limpiar localStorage
    localStorage.removeItem('auth')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    
    console.log('🗑️ Auth limpiado')
  }

  function loadAuth() {
    try {
      const authData = localStorage.getItem('auth')
      const savedToken = localStorage.getItem('authToken')
      const savedRole = localStorage.getItem('userRole')
      
      if (authData && savedToken) {
        const parsed = JSON.parse(authData)
        token.value = savedToken
        user.value = parsed.user
        role.value = savedRole || parsed.role
        
        console.log('✅ Auth cargado:', { token: !!savedToken, role: role.value })
      }
    } catch (error) {
      console.error('❌ Error al cargar auth:', error)
      clearAuth()
    }
  }

  // Cargar al inicializar
  loadAuth()

  return {
    token,
    user,
    role,
    setAuth,
    clearAuth,
    loadAuth
  }
})