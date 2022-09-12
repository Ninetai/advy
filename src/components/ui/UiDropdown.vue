<template>
  <div data-app class="ui-dropdown">
    <v-menu left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="ui-dropdown__button"></v-btn>
      </template>
      <v-list>
        <slot />
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'UiDropdown',
  provide() {
    return {
      sharedState: this.sharedState
    }
  },
  data() {
    return {
      sharedState: {
        active: false
      },
    }
  },
  methods: {
    // toggle() {
    //   this.sharedState.active = !this.sharedState.active;
    // },
    // close() {
    //   this.sharedState.active = false;
    // }
  }
}
</script>

<style scoped lang="scss">
.ui-dropdown {
  .ui-dropdown__button {
    display: block;
    width: 45px;
    min-width: auto;
    height: 22px;
    background-color: transparent;
    background-image: url('@/assets/icons/more-horizontal.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px;
    box-shadow: none;

    &:focus,
    &:hover {
      &:before {
        content: none;
      }
    }
  }
}
</style>
