<template>
  <div>
      <shop-header />
      <shop-body />
  </div>
</template>

<script>
import ShopHeader from '@/components/ShopHeader.vue'
import ShopBody from '@/components/ShopBody.vue'

export default {
    name: 'Home',

    components: {
      ShopHeader,
      ShopBody
    },
}
</script>

<style>

</style>