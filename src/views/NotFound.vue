<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header con logo SENA -->
    <q-header elevated class="text-white header-error">
      <div class="header-content">
        <q-avatar class="header-logo">
          <img :src="logoWhite" class="header-logo-img" />
        </q-avatar>
        <span class="header-title">REPFORA EP</span>
      </div>
    </q-header>

    <q-page-container class="page-container">
      <div class="flex flex-center content-center">
        <q-card class="error-card notfound-card">
          <q-card-section class="text-center q-pa-xl">
            <div class="text-h1 text-weight-bold error-code q-mb-md">
              404
            </div>
            <div class="text-h3 text-weight-bold q-mb-md error-title">Página No Encontrada</div>
            <div class="text-h6 text-grey-7 q-mb-lg error-subtitle">
              Lo sentimos, la página que buscas no existe
            </div>
            <div class="text-body1 text-grey-6 q-mb-md error-description">
              Ruta solicitada: <strong>{{ getCurrentPath() }}</strong>
            </div>
            <div class="text-body1 text-grey-6 q-mb-xl error-description">
              Es posible que la URL esté mal escrita o que la página haya sido movida.
            </div>
            <div class="row justify-center q-gutter-md flex-wrap">
              <q-btn
                label="Volver al Inicio"
                color="primary"
                size="lg"
                unelevated
                @click="goHome"
                icon="home"
                class="error-btn"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer reveal class="bg-grey-5 text-black">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div class="footer-text">
            REPFORA - Sena 2025 © Todos los derechos reservados
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import logoWhite from 'src/assets/LogoSENABlanco.png'

const router = useRouter()
const route = useRoute()

const getCurrentPath = () => {
  return route.fullPath || window.location.pathname
}

const goHome = () => {
  const userRole = localStorage.getItem('userRole')
  
  if (userRole === 'ADMINISTRADOR' || userRole === 'administrador') {
    router.push('/app/inicio')
  } else if (userRole === 'INSTRUCTOR' || userRole === 'instructor') {
    router.push('/app/instructor/bitacoras')
  } else if (userRole === 'APRENDIZ' || userRole === 'aprendiz' || userRole === 'apprentice') {
    router.push('/app/aprendiz/inicio')
  } else {
    router.push('/')
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}
</script>

<style scoped>
/* Header Styles */
.header-error {
  background-color: var(--color-primary);
  height: 90px;
  min-height: 70px;
  overflow: hidden;
  position: relative;
}

.header-content {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  gap: 8px;
}

.header-logo {
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  z-index: 5;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  max-width: 80px;
  max-height: 80px;
  min-width: 60px;
  min-height: 60px;
  overflow: hidden;
}

.header-logo-img {
  height: 100%;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--color-primary);
  object-fit: contain;
}

.header-title {
  font-size: 3rem;
  font-weight: bold;
  line-height: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 120px);
  margin-left: 100px;
}

/* Page Container */
.page-container {
  min-height: calc(100vh - 90px - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
  padding: 20px;
}

.content-center {
  width: 100%;
  min-height: 100%;
}

/* Error Card */
.error-card {
  max-width: 700px;
  width: 100%;
  border: 3px solid var(--color-primary);
  border-radius: 24px;
  background: var(--color-bg-primary);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.notfound-card {
  border-color: var(--color-primary);
}

.error-code {
  font-size: 8rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.2;
  text-shadow: none;
}

.error-title {
  color: var(--color-text-primary);
  font-size: 2rem;
}

.error-subtitle {
  color: var(--color-text-secondary);
}

.error-description {
  color: var(--color-text-light);
  line-height: 1.6;
}

.error-btn {
  min-width: 180px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  text-transform: uppercase;
}

.error-btn:first-child {
  background-color: var(--color-primary) !important;
  color: white !important;
}

/* Footer */
.footer-text {
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Media Queries */
@media (max-width: 768px) {
  .header-error {
    height: 80px;
    min-height: 70px;
  }

  .header-logo {
    width: 70px;
    height: 70px;
    max-width: 70px;
    max-height: 70px;
    left: 8px;
  }

  .header-title {
    font-size: 2.2rem;
    line-height: 70px;
    margin-left: 80px;
    max-width: calc(100% - 100px);
  }

  .error-code {
    font-size: 6rem;
  }

  .error-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .header-error {
    height: 70px;
    min-height: 60px;
  }

  .header-content {
    padding: 0 8px;
    justify-content: flex-start;
  }

  .header-logo {
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
    min-width: 45px;
    min-height: 45px;
    left: auto;
    position: relative;
    transform: none;
    margin-right: 0;
    flex-shrink: 0;
    top: auto;
    bottom: auto;
  }

  .header-title {
    font-size: 1.4rem;
    line-height: 70px;
    margin-left: 0;
    max-width: none;
    text-align: left;
    flex: 1;
    white-space: normal;
    overflow: visible;
  }

  .error-card {
    padding: 0.5rem;
  }

  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-btn {
    min-width: 100%;
    margin-bottom: 0.5rem;
  }

  .q-gutter-md {
    gap: 0.5rem !important;
  }
}

@media (max-width: 360px) {
  .header-error {
    height: 65px;
    min-height: 55px;
  }

  .header-logo {
    width: 45px;
    height: 45px;
    max-width: 45px;
    max-height: 45px;
    min-width: 40px;
    min-height: 40px;
  }

  .header-title {
    font-size: 1.2rem;
    line-height: 65px;
    max-width: calc(100% - 60px);
  }

  .error-code {
    font-size: 4rem;
  }
}
</style>
