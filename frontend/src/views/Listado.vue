<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">📋 Posts</h2>
      <router-link to="/crear_post" class="btn btn-primary">+ Nuevo post</router-link>
    </div>

    <div v-if="posts.length === 0" class="alert alert-info text-center text-black">No hay posts disponibles.</div>

    <div v-else class="row g-4">
      <div v-for="p in posts" :key="p.id" class="col-12">
        <div class="card shadow-sm">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h5 class="card-title">{{ p.title }}</h5>
                <p class="card-text mb-0">{{ p.body }}</p>
              </div>

              <div class="btn-group btn-group-sm">
                <router-link :to="`/editar_post/${p.id}`" class="btn btn-outline-primary">Editar </router-link>
                <button @click="askDelete(p)" class="btn btn-outline-danger">Eliminar </button>
              </div>
            </div>

            <div class="mt-3 d-flex justify-content-between">
              <small class="text-muted">👤 {{ p.author }}</small>
              <small class="text-muted">{{ formatDate(p.created_at) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div class="modal fade" tabindex="-1" ref="confirmModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar eliminación</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="bsModal.hide()"></button>
          </div>

          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar el post <strong>“{{ postToDeleteTitle }}”</strong>?</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="bsModal.hide()">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api';
  import { Modal } from 'bootstrap';

  export default {
    name: 'Listado',
    data() {
      return {
        posts: [],
        postToDeleteId: null,
        postToDeleteTitle: '',
        bsModal: null,
      };
    },
    async mounted() {
      const res = await api.get('/posts');
      this.posts = res.data;
      this.bsModal = new Modal(this.$refs.confirmModal);
    },
    methods: {
      askDelete(post) {
        this.postToDeleteId = post.id;
        this.postToDeleteTitle = post.title;
        this.bsModal.show();
      },
      async confirmDelete() {
        await api.delete(`/posts/${this.postToDeleteId}`);
        this.posts = this.posts.filter(p => p.id !== this.postToDeleteId);
        this.bsModal.hide();
      },
      formatDate(timestamp) {
        return new Date(timestamp).toLocaleString();
      }
    }
  };
</script>