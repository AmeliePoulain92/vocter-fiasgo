<template>
  <section class="container">
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
  </section>
</template>
<script>
export default {
  head () {
    return {
      title: 'Fiasgo | 404'
    }
  },
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 45px;
  font-size: 5em;
  text-align: center;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  font-family: 'DubaiFont', sans-serif;
  text-align: center;
}
.button
{
  margin-top: 50px;
}
</style>
