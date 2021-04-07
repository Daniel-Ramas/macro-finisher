<template>
  <q-layout view="lHh Lpr lFf" class="white-background">
    <q-header elevated bordered></q-header>
    <q-page-container>
      <transition
        name="fade"
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutLeft"
        mode="out-in"
        :duration="500"
      >
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.white-background {
  background-color: #e5dada;
}
</style>
