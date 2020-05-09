<script>
</script>

<style global>
  /* eslint-disable */
  @tailwind base;

  .rock-bg {
    background-image: url("/rockywall.png");
    background-repeat: repeat;
  }
  .concrete-bg {
    background-image: url("/concrete.png");
    background-repeat: repeat;
  }

  body {
    font-family: 'News Cycle', 'Times New Roman';
    font-weight: normal;
    font-size: 16px;
    @apply concrete-bg;
  }

  h1,h2,h3,h4,h5 {
    font-family: 'Cinzel', 'Times New Roman';
  }

  h1 {
    @apply text-6xl;
  }
  h2 {
    @apply text-4xl;
  }
  h3 {
    @apply text-2xl;
  }
  h4 {
    @apply text-xl;
  }


  button {
    @apply font-bold py-3 px-4 rounded text-gray-700 shadow-lg transition ease-in duration-100 bg-white;
  }
  button:hover {
    transform: scale(1.1);
  }
  button[disabled] {
    @apply text-gray-500 shadow-sm;
  }
  button[disabled]:hover {
    cursor: unset;
  }

  span.link {
    @apply text-blue-700;
  }
  span.link:hover {
    cursor: pointer;
    @apply underline;
  }

  input {
    @apply mb-3 p-3 rounded;
    @apply border-gray-200 border-2 border-solid;
  }

  input.success {
    @apply border-green-400 border-2 border-solid;
  }
  input.error {
    @apply border-red-400 border-2 border-solid;
  }

  input::placeholder {
    @apply text-gray-800;
  }


  @tailwind components;
  @tailwind utilities;
</style>