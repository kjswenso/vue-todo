<template>
  <v-app>
    <v-main>
      <h1>ToDo's</h1>
      <v-tabs v-model="tab">
        <v-tab value="open">Open</v-tab>
        <v-tab value="closed">Closed</v-tab>
      </v-tabs>
      <v-text-field
        label="Search"
        append-inner-icon="mdi-magnify"
      ></v-text-field>
      <TodoList :todos="tab === 'open' ? todos.filter(todo => !todo.completed) : todos.filter(todo => todo.completed)" />
      <!-- <v-btn
        fab
        color="cyan"
        bottom
        right
        absolute
        @click="console.log('button!')"
      ></v-btn> -->
      <VLayoutItem model-value position="bottom" class="text-end" size="88">
      <div class="ma-4">
        <VBtn icon="mdi-plus" size="large" color="primary" elevation="8" @click="console.log('button!')"/>
      </div>
    </VLayoutItem>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Todo, TodoStatus } from "./models/todo";
import { getAllTodos } from "./services/api";
import TodoList from './components/TodoList.vue';
import { computed } from "vue";

const todos: Ref<Array<Todo>> = ref([]);
const open = computed(() => todos.value.filter(todo => !todo.completed))
const closed = computed(() => todos.value.filter(todo => todo.completed));
const tab: Ref<'open' | 'completed'> = ref('open'); 

getAllTodos().then((res) => (todos.value = res));

</script>
