<template>
  <q-layout view="hHh lpR lFf">
    <!-- Header -->
    <q-header elevated class="bg-header text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-icon name="savings" class="q-mr-sm" />
          The Budget
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer v-model="leftDrawerOpen" class="bg-header text-white" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-white">Navigation</q-item-label>

        <q-item clickable v-ripple v-for="link in navLinks" :key="link.label" :to="link.to"
          active-class="bg-grey-9 text-white">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Navigation links
const navLinks = [
  { label: 'Entries', icon: 'list', to: '/entries' },
  { label: 'Table', icon: 'table_chart', to: '/table' },
  { label: 'Charts', icon: 'bar_chart', to: '/charts' },
  { label: 'Overview', icon: 'bar_chart', to: '/overview' },
  { label: 'Settings', icon: 'settings', to: '/settings' }
]

</script>

<style>
.bg-header {
  background-color: #010038;
}

.text-white {
  color: white;
}
</style>