<template>
  <v-toolbar fixed class="purple" dark>
    <v-btn flat icon class="cyan" @click='goTo(-1)'>
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-btn flat icon class="cyan" @click='goTo(1)'>
      <v-icon>arrow_forward</v-icon>
    </v-btn>
    <v-toolbar-title class="mr-4">
      <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'search',
        }">
        AnimApp
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'search'
        }">
        Search
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'animes'
        }">
        Animes
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'personas',
          query: {
            name: ''
          }
        }">
        Characters
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn 
        flat 
        dark
        :to="{
          name: 'crews',
          query: {
            name: ''
          }
        }">
        Crew
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>
      
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'register'
        }">
        Sign Up
      </v-btn>
      
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    goTo (val) {
      this.$router.go(val)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'search',
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #E9E;
}
</style>
