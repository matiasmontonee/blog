<template>
  <div class="container py-4" style="max-width: 400px;">
    <h2 class="mb-4">Iniciar sesión</h2>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary w-100">Entrar</button>

      <p class="mt-3 text-center">
        ¿No tienes cuenta?
        <router-link to="/register">Regístrate</router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import api from '../api';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      async submit() {
        this.error = '';

        try {
          const res = await api.post('/auth/login', {
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.$router.push('/');
        } catch (err) {
          if (err.response && err.response.status === 401) {
            this.error = err.response.data.error || 'Credenciales incorrectas.';
          } else {
            this.error = 'Error al iniciar sesión. Intenta de nuevo.';
          }
        }
      }
    }
  };
</script>