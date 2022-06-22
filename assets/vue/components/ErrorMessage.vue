<template>
  <div
    class="alert alert-danger w-100"
    role="alert"
  >
    {{ error.response.data.error }}
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    error: {
      type: Error,
      required: true
    }
  }
};
</script>