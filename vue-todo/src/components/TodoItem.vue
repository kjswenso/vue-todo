<template>
  <v-list-item :title="todo?.title">
    <template v-slot:prepend>
      <v-avatar color="dark-green">
        <v-icon v-if="todo?.completed" color="green"
          >mdi-checkbox-marked-circle</v-icon
        >
      </v-avatar>
    </template>

    <template v-slot:append>
      <v-btn color="dark-blue" icon="md-more-horiz"></v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Todo } from "../models/todo";

defineProps({
  todo: Object as PropType<Todo>
});
</script>
