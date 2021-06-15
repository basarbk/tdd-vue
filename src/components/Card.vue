<template>
  <div class="card">
    <div class="card-header text-center">
      <slot name="header"></slot>
    </div>
    <div class="card-body" v-if="$slots.body">
      <slot name="body"></slot>
    </div>
    <slot></slot>
    <div class="card-footer text-center" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>