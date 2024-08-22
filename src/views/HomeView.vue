<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
      <v-btn color="success" to="/shop">go to shop</v-btn>
    </div>
    <hello-world />
  </div>
  
  
</template>

<script>
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    HelloWorld,
    // ShopHeader
  },
}
</script>
