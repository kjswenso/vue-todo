<template>
  <v-app>
    <v-main>
      <h1>ToDo's</h1>
      <v-tabs v-model="tab" fixed-tabs align-tabs="center" class="ma-4">
        <v-tab value="open">Open</v-tab>
        <v-tab value="closed">Closed</v-tab>
      </v-tabs>
      <v-text-field
        label="Search ToDo's"
        v-model="state.search"
        append-inner-icon="mdi-magnify"
        variant="solo-inverted"
        class="ma-2 rounded-lg"
      ></v-text-field>
      <v-divider ></v-divider>
      <TodoList :todos="tab === 'open' ? open : closed" @markTodoComplete="markTodoComplete" />
      <VLayoutItem model-value position="bottom" class="text-end" size="88">
      <div class="ma-4">
        <VBtn icon="mdi-plus" size="large" color="primary" elevation="8" @click="openTodoFormDrawer"/>
      </div>
    </VLayoutItem>
    </v-main>
    <TodoDrawer v-if="drawer" :active="drawer" action="Add" @closeDrawer="drawer = false"/>
  </v-app>
</template>

<script setup lang="ts">
import { Ref, reactive, ref } from "vue";
import { Todo } from "./models/models";
import { getAllTodos } from "./services/api";
import TodoList from './components/TodoList.vue';
import TodoDrawer from './components/TodoDrawer.vue'
import { computed } from "vue";

const todos: Ref<Array<Todo>> = ref([]);
const tab: Ref<'open' | 'completed'> = ref('open'); 
const drawer: Ref<boolean> = ref(false);

const state = reactive({
  search: '',
  todos: todos.value
});

const open = computed(() => filtered.value.filter(todo => !todo.completed))
const closed = computed(() => filtered.value.filter(todo => todo.completed));

getAllTodos().then((res) => (todos.value = res));

function openTodoFormDrawer() {
  drawer.value = true;
}

//For this example, I'm updating the todos ref. Ideally, this would be handled on the server.
//We'd fetch the todos again, because it's possible that other todos have completed.
//Arguably, we could do the same and then revert to false if the server returned a bad request.
//That said, I would be calling patch on this todo using the api service method,
//but since the response doesn't persist, I'm not doing that.
function markTodoComplete(id: number) {
  const index = todos.value.findIndex(todo => todo.id === id)
  if (index !== -1) {
    todos.value[index].completed = true;
  }
}

const filtered = computed(() => {
  if (!!state.search) {
    return todos.value.filter(todo => todo.title.toLowerCase().includes(state.search.toLowerCase()));
  } else {
    return todos.value;
  }
})

</script>