<template>
  <v-list-item :title="todo?.title" class="ma-4 rounded-lg">
    <template v-slot:prepend>
      <v-avatar :color="todo?.completed ? 'secondary' : 'primary'">
        <v-icon v-if="todo?.completed" color="white">mdi-check</v-icon>
      </v-avatar>
    </template>

    <v-list-item-subtitle>
      <v-btn variant="text" disabled>User: {{ todo.userId }}</v-btn>
    </v-list-item-subtitle>

    <template v-if="!todo.completed" v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-dots-horizontal"
            variant="text"
            v-bind="props"
          ></v-btn>
        </template>

        <v-list>
          <v-list-item @click="openDrawer">
            <v-list-item-title>Edit ToDo</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="markComplete"
              >Mark Completed</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>

  <TodoDrawer
    :active="drawer"
    action="Edit"
    :todo="todo"
    @closeDrawer="drawer = false"
  />
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Todo } from "../models/models";
import TodoDrawer from "./TodoDrawer.vue";

const props = defineProps<{ todo: Todo }>();
const emits = defineEmits(["openDrawer", "markComplete"]);

const drawer: Ref<boolean> = ref(false);

function openDrawer() {
  console.log("open drawer edit");
  drawer.value = true;
}

function markComplete() {
  emits("markComplete", props.todo.id);
}
</script>

<style>
i.v-icon {
  cursor: pointer;
}
</style>
