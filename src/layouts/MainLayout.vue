<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <div class="absolute-center">
            <q-item clickable v-for="link in linksList" :key="link.title" :to="link.path">
              <q-icon name="savings" />
              The Budget
            </q-item>
          </div>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-header" :width="250" show-if-above bordered>
      <q-list separator>
        <q-item-section>
          <q-item-label class="text-white" header> Navigation </q-item-label>
        </q-item-section>

        <!-- Entries Section -->
        <q-item-section>
          <q-item-label class="text-white" header> Relinked: </q-item-label>
        </q-item-section>

        <!-- Clickable Buttons -->
        <q-item>
          <q-btn to="/entries" color="primary" class="menu-btn full-width" unelevated>
            Entries
          </q-btn>
        </q-item>

        <q-item>
          <q-btn to="/settings" color="primary" class="menu-btn full-width" unelevated>
            Settings
          </q-btn>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.header-large {
  background-color: #010038;
  /* Your custom color */
  color: white;
  /* Text color */
}

.header-small {
  background-color: var(--q-primary);
  /* Using Quasar's primary color */
  color: white;
  /* Text color */
}

.bg-header {
  background-color: #010038;
}

.text-white {
  color: white;
}

.menu-btn {
  background-color: #444;
  /* Default background */
  color: white;
  /* Default text color */
  transition: background-color 0.3s;
}

.menu-btn:hover {
  background-color: #666;
  /* Darker background on hover */
}
</style>
<script setup>
import { ref } from 'vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
    path: 'settings'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>