<template>
  <v-list lines="two">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </v-list>
</template>

<script setup lang="ts">
import { Todo } from '../models/todo';
import TodoItem from './TodoItem.vue';

defineProps({
  todos: Array<Todo>,
});
</script>
