<template>
  <div class="container py-4">
    <div class="card mx-auto" style="max-width: 800px;">
      <div class="card-body">
        <h2 class="card-title mb-4">{{ id ? '✏️ Editar' : '🆕 Crear' }} Post</h2>

        <form @submit.prevent="enviar">
          <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input id="title" v-model="title" type="text" class="form-control" placeholder="Escribe el título" required />
          </div>

          <div class="mb-3">
            <label for="body" class="form-label">Contenido</label>
            <textarea id="body" v-model="body" class="form-control" rows="5" placeholder="Escribe el contenido" required></textarea>
          </div>

          <div class="d-flex justify-content-end">
            <router-link to="/" class="btn btn-secondary me-2">Cancelar</router-link>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api';

  export default {
    name: 'FormPost',
    props: ['id'],
    data: () => ({ title: '', body: '' }),
    async created() {
      if (this.id) {
        const res = await api.get('/posts');
        const p = res.data.find(x => x.id == this.id);
        this.title = p.title;
        this.body = p.body;
      }
    },
    methods: {
      async enviar() {
        if (this.id) {
          await api.put(`/posts/${this.id}`, { title: this.title, body: this.body });
        } else {
          await api.post('/posts', { title: this.title, body: this.body });
        }
        this.$router.push('/');
      }
    }
  };
</script>