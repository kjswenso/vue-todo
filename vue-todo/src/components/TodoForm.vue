<template>
  <v-form @submit.prevent="submit" validate-on="blur">
    <v-text-field v-model="title" :rules="rules" label="Title"> </v-text-field>
    <v-select
      label="User"
      v-model="user"
      :items="userIds"
      :item-title="getUserSelectText"
      :rules="rules"
      variant="solo"
    >
    </v-select>

    <v-select
      label="Status"
      v-model="status"
      :items="completed"
      :rules="rules"
      variant="solo"
    >
    </v-select>
    <v-btn type="submit" color="secondary">Finish</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { Todo, TodoAction, UpdateTodoEvent } from "../models/models";
import { getAllUsers } from "@/services/api";

const props = defineProps<{
  action: TodoAction;
  todo?: Todo;
}>();

const emits = defineEmits(['submitTodo']);

const userIds: Ref<Array<number>> = ref([]);
const title = ref(props.todo?.title);
const user = ref(props.todo?.userId);
const status = ref(props.todo?.completed);
const completed = [
  { title: "Completed", value: true },
  { title: "Open", value: false },
];

getAllUsers().then((res) => (userIds.value = res));

function getUserSelectText(userId: number) {
  return `User ${userId}`;
}

function submit() {
  const todo: Partial<Todo> = {
      title: title.value,
      userId: user.value,
      completed: status.value,
    };

  const submitAction: UpdateTodoEvent = {
    todo,
    method: 'POST'
  }
  
  if (props.action === 'Edit') {
    todo.id = props.todo?.id;
    submitAction.method = 'PATCH'
  }

  emits('submitTodo', submitAction);
  title.value = '';
}

const rules = [(value: String) => (value ? true : "Field is required")];
</script>