<template>
  <h1>Redirigiendo</h1>
</template>

<script>
export default {
    name: 'Redirect',
    mounted() {
        let texto = this.$route.params.searchString;
        this.$router.push('/buscador/' + texto);
    },
}
</script>

<style>

</style>