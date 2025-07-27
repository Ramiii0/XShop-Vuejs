<script lang="ts" setup>
</script>

<template>
  <v-container class="pa-4" fluid>
    <v-row class="align-center pb-4">
      <v-col>
        <slot name="ActionButtons"></slot>
      </v-col>
      <v-col>
        <slot name="SearchInput"></slot>
      </v-col>
    </v-row>
    <slot name="Table"></slot>
    <slot name="Pagination"></slot>
  </v-container>
</template>