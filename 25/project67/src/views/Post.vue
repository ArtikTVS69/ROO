<template>
  <div class="post">
    <h1>Príspevky</h1>
    
    <!-- formulár na pridanie príspevku -->
    <div class="add-post">
      <input 
        v-model="newPost.title" 
        type="text" 
        placeholder="Názov príspevku"
        @keypress.enter="addPost"
      >
      <textarea 
        v-model="newPost.content" 
        placeholder="Obsah príspevku"
        rows="4"
      ></textarea>
      <input 
        v-model="newPost.image" 
        type="text" 
        placeholder="URL obrázku (voliteľné)"
      >
      <button @click="addPost">Pridať príspevok</button>
      <div v-if="error" class="error">{{ error }}</div>
    </div>

    <!-- zoznam príspevkov -->
    <div class="posts-list">
      <p v-if="posts.length === 0" class="no-posts">Zatiaľ žiadne príspevky</p>
      
      <div v-for="post in posts" :key="post.id" class="post-item">
        <div v-if="editingId !== post.id">
          <h3>{{ post.title }}</h3>
          <img v-if="post.image" :src="post.image" :alt="post.title" class="post-image">
          <p>{{ post.content }}</p>
          <small>{{ post.date }}</small>
          <div class="buttons">
            <button @click="startEdit(post)" class="edit-btn">Upraviť</button>
            <button @click="deletePost(post.id)" class="delete-btn">Zmazať</button>
          </div>
        </div>
        
        <!-- edit mód -->
        <div v-else class="edit-mode">
          <input v-model="editedPost.title" type="text">
          <textarea v-model="editedPost.content" rows="4"></textarea>
          <input v-model="editedPost.image" type="text" placeholder="URL obrázku">
          <div class="buttons">
            <button @click="saveEdit" class="save-btn">Uložiť</button>
            <button @click="cancelEdit" class="cancel-btn">Zrušiť</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        content: '',
        image: ''
      },
      error: '',
      editingId: null,
      editedPost: {
        title: '',
        content: '',
        image: ''
      }
    }
  },
  methods: {
    // pridá nový príspevok
    addPost() {
      if (!this.newPost.title.trim()) {
        this.showError('Názov nemôže byť prázdny!');
        return;
      }
      if (!this.newPost.content.trim()) {
        this.showError('Obsah nemôže byť prázdny!');
        return;
      }

      const post = {
        id: Date.now(),
        title: this.newPost.title.trim(),
        content: this.newPost.content.trim(),
        image: this.newPost.image.trim(),
        date: new Date().toLocaleString('sk-SK')
      };

      this.posts.unshift(post);
      this.saveToLocalStorage();
      
      this.newPost.title = '';
      this.newPost.content = '';
      this.newPost.image = '';
      this.error = '';
    },

    // začne úpravu
    startEdit(post) {
      this.editingId = post.id;
      this.editedPost = {
        title: post.title,
        content: post.content,
        image: post.image || ''
      };
    },

    // uloží úpravy
    saveEdit() {
      const post = this.posts.find(p => p.id === this.editingId);
      if (post) {
        post.title = this.editedPost.title.trim();
        post.content = this.editedPost.content.trim();
        post.image = this.editedPost.image.trim();
        this.saveToLocalStorage();
      }
      this.editingId = null;
    },

    // zruší úpravu
    cancelEdit() {
      this.editingId = null;
    },

    // zmaže príspevok
    deletePost(id) {
      if (confirm('Naozaj chceš zmazať tento príspevok?')) {
        this.posts = this.posts.filter(p => p.id !== id);
        this.saveToLocalStorage();
      }
    },

    // zobrazí chybu
    showError(message) {
      this.error = message;
      setTimeout(() => {
        this.error = '';
      }, 3000);
    },

    // uloží do localStorage
    saveToLocalStorage() {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    },

    // načíta z localStorage
    loadFromLocalStorage() {
      const data = localStorage.getItem('posts');
      if (data) {
        this.posts = JSON.parse(data);
      }
    }
  },
  mounted() {
    this.loadFromLocalStorage();
  }
}
</script>

<style scoped>
.post {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #ff6b6b;
  font-size: 48px;
  margin-bottom: 30px;
  text-align: center;
}

.add-post {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.add-post input,
.add-post textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.add-post button {
  background-color: #ff6b6b;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.add-post button:hover {
  background-color: #ff5252;
}

.error {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.no-posts {
  text-align: center;
  color: #999;
  font-size: 18px;
  padding: 40px;
}

.post-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.post-item h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
}

.post-item p {
  margin: 0 0 10px 0;
  color: #666;
  line-height: 1.6;
  white-space: pre-wrap;
}

.post-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  margin: 15px 0;
  display: block;
}

.post-item small {
  color: #999;
  font-size: 12px;
}

.buttons {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background-color: #ffa726;
  color: white;
}

.edit-btn:hover {
  background-color: #ff9800;
}

.delete-btn {
  background-color: #ef5350;
  color: white;
}

.delete-btn:hover {
  background-color: #f44336;
}

.save-btn {
  background-color: #66bb6a;
  color: white;
}

.save-btn:hover {
  background-color: #4caf50;
}

.cancel-btn {
  background-color: #999;
  color: white;
}

.cancel-btn:hover {
  background-color: #777;
}

.edit-mode {
  padding: 10px;
  background-color: #fff3cd;
  border-radius: 5px;
}

.edit-mode input,
.edit-mode textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ffa726;
  border-radius: 5px;
  font-size: 16px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}
</style>
