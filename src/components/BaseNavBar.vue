<template>
  <ul class="nav">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link
        class=""
        :to="{ name: 'Category', params: { category: 'headphones' } }"
        >Headphones</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'Category', params: { category: 'speakers' } }"
        >Speakers</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'Category', params: { category: 'earphones' } }"
        >Earphoner</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BaseNavBar',
}
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  column-gap: 36px;

  @include media-query-mobile {
    @include flex-column();
    gap: 16px;
  }

  li {
    @include text(13px, 25px, 2px, regular);
    color: white;

    a {
      color: white;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
