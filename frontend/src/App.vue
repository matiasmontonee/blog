<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <header class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">📝 Mi Blog</router-link>

        <!-- Toggler -->
        <button class="navbar-toggler" type="button" @click="toggleNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="navbarNav" ref="navCollapse">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item" v-if="user">
              <router-link to="/" class="nav-link" exact>Listado</router-link>
            </li>
            <li class="nav-item" v-if="user">
              <router-link to="/crear_post" class="nav-link">Nuevo Post</router-link>
            </li>
          </ul>

          <!-- Datos usuario -->
          <ul class="navbar-nav">
            <template v-if="user">
              <li class="nav-item d-flex align-items-center">
                <span class="navbar-text me-2">¡Hola {{ user.full_name }}!</span>
              </li>
              <li class="nav-item d-flex align-items-center">
                <button class="btn btn-outline-danger btn-sm" @click="logout">Salir</button>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Iniciar sesión</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Registrarse</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </header>

    <main class="flex-grow-1 container py-4">
      <router-view />
    </main>

    <footer class="bg-light text-center py-3 mt-auto">
      <div class="container">
        © {{ new Date().getFullYear() }} Mi Blog. Todos los derechos reservados.
      </div>
    </footer>
  </div>
</template>

<script>
  import { Collapse } from 'bootstrap'

  export default {
    name: 'App',
    data() {
      return {
        bsCollapse: null,
        user: null
      }
    },
    mounted() {
      this.bsCollapse = new Collapse(this.$refs.navCollapse, { toggle: false })
      this.loadUser()
    },
    watch: {
      $route() {
        if (this.bsCollapse) this.bsCollapse.hide()
        this.loadUser()
      }
    },
    methods: {
      loadUser() {
        const stored = localStorage.getItem('user')
        this.user = stored ? JSON.parse(stored) : null
      },
      toggleNav() {
        if (this.bsCollapse) this.bsCollapse.toggle()
      },
      logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.user = null
        this.$router.push('/login')
      }
    }
  }
</script>