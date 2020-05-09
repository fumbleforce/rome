<script>
  import { onMount } from "svelte";
  import { session } from "../../stores";
  import { login, register, resume } from "../../user";
  import ListErrors from "../ListErrors.svelte";

  let email = "";
  let emailConfirm = "";
  let password = "";
  let passwordConfirm = "";
  let errors = null;
  let loggingIn = !!$session;
  let type = "login";

  $: valid = type === "login"
    ? email && password
    : email && email === emailConfirm && password && password === passwordConfirm;

  async function submit() {
    if (!valid) return;

    loggingIn = true;

    try {
      const response = type === "login"
        ? await login({ email, password })
        : await register({ email, password });

      errors = response.errors;

      if (response.user) {
        $session = response.sessionId;
      }

      loggingIn = false;
    } catch (e) {
      loggingIn = false;
      errors = [e];
      console.error(e);
    }
  }

  function handleRegister () {
    type = "register";
  }

  function handleLogin () {
    type = "login";
  }

  onMount(async () => {
    const sessionId = $session;

    if (!sessionId) return;

    try {
      const response = await resume(sessionId);

      $session = response.sessionId;
    } catch (e) {
      loggingIn = false;
      errors = [e];
    }
  });
</script>

<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        {#if loggingIn}
          <h2>Loggin in..</h2>
        {:else}
          <ListErrors {errors}/>

          <form on:submit|preventDefault={submit}>
            <fieldset>
              <input
                type="email"
                placeholder="Email"
                bind:value={email}>
            </fieldset>
            {#if type === "register"}
              <fieldset>
                <input
                  type="email"
                  placeholder="Confirm email"
                  class="{email && emailConfirm && email !== emailConfirm && 'error'}"
                  bind:value={emailConfirm}>
              </fieldset>
            {/if}
            <fieldset>
              <input
                type="password"
                placeholder="Password"
                class="{password && password.length > 7 && 'success'}"
                bind:value={password}>
            </fieldset>
            {#if type === "register"}
              <fieldset>
                <input
                  type="password"
                  placeholder="Confirm password"
                  class="{password && passwordConfirm && password !== passwordConfirm && 'error'}"
                  bind:value={passwordConfirm}>
              </fieldset>
            {/if}
            <button
              type="submit"
              class="mr-4"
              disabled="{!valid}">
              {#if type === "login"}
                Log in
              {:else}
                Register
              {/if}
            </button>
            {#if type === "login"}
              <span class="link" on:click={handleRegister}>
                Register
              </span>
            {:else}
              <span class="link" on:click={handleLogin}>
                Log in
              </span>
            {/if}
          </form>
        {/if}
      </div>
    </div>
  </div>
</div>