<template>
  <div class="py-4 md:p-8">
          <router-link :to="to">
            <i class="fas fa-long-arrow-alt-left"></i> Back
          </router-link>
        </div>
</template>

<script>
export default {
    name:"BackButton",
    props: {
        to:{
            type:Object,
            required: true
        }
    }
}
</script>