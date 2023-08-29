<template>
  <v-list lines="two">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @markComplete="markTodoComplete"/>
  </v-list>
</template>

<script setup lang="ts">
import { Todo } from '../models/models';
import TodoItem from './TodoItem.vue';

defineProps({
  todos: Array<Todo>,
});

const emits = defineEmits(['markTodoComplete']);

function markTodoComplete(id: number) {
  emits('markTodoComplete', id);
}
</script>
