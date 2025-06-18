<template>
  <div class="container py-4" style="max-width: 400px;">
    <h2 class="mb-4">Registrarse</h2>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">Nombre completo</label>
        <input v-model="full_name" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Contraseña</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success w-100">Registrarse</button>

      <p class="mt-3 text-center">
        ¿Ya tienes cuenta? <router-link to="/login">Entrar</router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import api from '../api';

  export default {
    name: 'Register',
    data() {
      return {
        full_name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async submit() {
        try {
          const res = await api.post('/auth/register', {
            full_name: this.full_name,
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.$router.push('/');
        } catch (err) {
          alert(err.response?.data?.error || 'Error al registrarse');
        }
      }
    }
  };
</script>