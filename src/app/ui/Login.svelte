<script>
  import { session } from "../stores";
  import { login } from "../login";
  import ListErrors from "./ListErrors.svelte";

  let email = "";
  let password = "";
  let errors = null;

  async function submit() {
    console.log("Submit", email, password);

    try {
      const response = await login({ email, password });

      errors = response.errors;
      console.log("response", response);
      if (response.user) {
        $session.user = response.user;
      }
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <ListErrors {errors}/>

        <form on:submit|preventDefault={submit}>
          <fieldset>
            <input
              type="email"
              placeholder="Email"
              bind:value={email}>
          </fieldset>
          <fieldset>
            <input
              type="password"
              placeholder="Password"
              bind:value={password}>
          </fieldset>
          <button
            type="submit"
            disabled="{!email || !password}">
            Sign in
          </button>
          <button
            type="submit"
            disabled="{!email || !password}">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</div>