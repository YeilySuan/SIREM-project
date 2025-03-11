<script context="module">
  export async function load({ url }) {
    if (url.pathname === '/') {
      return {
        status: 302,
        redirect: '/login'
      };
    }
  }
</script>