<script>
  function myFunction() {
    location.replace("http://localhost:3000/auth/google");
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Karla:400,700&display=swap");

  .font-family-karla {
    font-family: karla;
  }
  .container {
    position: relative;
    text-align: center;
    color: black;
  }
  /* Centered text */
  .centered {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%);
  }
  .line-1 {
    position: absolute;
    top: 50%;
    margin: 0 auto;
    border-right: 2px solid rgba(255, 255, 255, 0.75);
    font-size: 180%;
    white-space: nowrap;
    overflow: hidden;
    transform: translateY(-50%);
  }
  /* Animation */
  .anim-typewriter {
    animation: typewriter 4s steps(40) 1s 1 normal both,
      blinkTextCursor 500ms steps(20) infinite normal;
  }
  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 10em;
    }
  }
  @keyframes blinkTextCursor {
    from {
      border-right-color: rgba(255, 255, 255, 0.75);
    }
    to {
      border-right-color: transparent;
    }
  }
</style>

<link
  href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
  rel="stylesheet" />

<body class="bg-white font-family-karla h-screen">

  <div class="w-full flex flex-wrap">

    <!-- Login Section -->
    <div class="w-full md:w-1/2 flex flex-col">

      <div
        class="flex flex-col justify-center md:justify-start w-full p-8 lg:w-1/2
        m-64 lg:px-32 my-auto pt-8 ">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">
          Hey Admin
        </h2>
        <p class="text-xl text-gray-600 text-center">Welcome back!</p>
        <a
          href="http://localhost:3000/auth/google"
          class="flex items-center justify-center mt-4 text-white rounded-lg
          shadow-md hover:bg-gray-100">
          <div class="px-4 py-3">
            <svg class="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142
                24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775
                9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342
                12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20
                3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335
                29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667
                29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425
                16.7358Z"
                fill="#FFC107" />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008
                9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341
                12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20
                3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00" />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742
                32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30
                11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634
                13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50" />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592
                25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015
                27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667
                28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425
                16.7358Z"
                fill="#1976D2" />
            </svg>
          </div>
          <h1 class="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
            Sign in with Google
          </h1>
        </a>

      </div>

    </div>

    <!-- Image Section -->
    <div class="container w-1/2 shadow-2xl">
      <img
        alt="acchi picture"
        class="object-cover w-full h-screen hidden md:block"
        src="https://source.unsplash.com/IXUM4cJynP0" />
      <div class="centered">
        <p
          class="line-1 anim-typewriter font-semibold text-gray-900"
          style="font-size:70px;">
          Try Out.
        </p>
      </div>
    </div>
  </div>

</body>
