<template>
  <v-navigation-drawer
    :model-value="active"
    location="bottom"
    permanent
    fixed
    height="75vh"
    v-toggle-slide-y-transition
  >
    <v-card class="rounded-t-lg">
      <v-toolbar>
        <template v-slot:prepend>
          <v-btn icon="mdi-arrow-left" @click="closeDrawer()"></v-btn>
        </template>
        <v-toolbar-title class="text-h6"> {{ action }} ToDo </v-toolbar-title>
      </v-toolbar>

      <TodoForm :action="action" :todo="todo" @submitTodo="submit"/>

      <v-btn variant="text" @click="closeDrawer">Quit</v-btn>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { addOrUpdateTodo } from "@/services/api";
import TodoForm from "./TodoForm.vue";
import { Todo, TodoAction } from "@/models/models";

const props = defineProps<{
  active: boolean;
  action: TodoAction;
  todo?: Todo;
}>();

const emits = defineEmits(['closeDrawer']);

function closeDrawer() {
  emits("closeDrawer");
}

function submit(event: {todo: Todo, method: 'POST' | 'PATCH'}) {
  addOrUpdateTodo(event.todo, event.method);
}
</script>

<style>
.v-navigation-drawer--bottom {
  height: 90vh !important;
  position: absolute;
  bottom: 0 !important;
}
</style>
