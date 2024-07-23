<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let selectedImage;
  let dragOver = false;
  let file;

  function handleFileInput(event) {
    file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      selectedImage = URL.createObjectURL(file);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function handleDrop(event) {
    event.preventDefault();
    dragOver = false;
    file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      selectedImage = URL.createObjectURL(file);
    }
  }

  onMount(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  });

  $: if (selectedImage) {
    dispatch("imageSelected", {
      image: file,
    });
  }
</script>

{#if selectedImage}
  <div class="relative">
    <img
      class="rounded-2xl w-full h-auto object-cover max-h-[320px]"
      src={selectedImage}
      alt=""
    />
    <button
      class="btn btn-circle absolute top-2 right-2"
      on:click={() => (selectedImage = null)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
{:else}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 transition-all h-full duration-300 ease-in-out"
    class:bg-blue-100={dragOver}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    on:drop={handleDrop}
  >
    <div class="text-center mb-4">
      <p class="text-lg font-semibold mb-2">Drop your image here</p>
      <p class="text-sm text-gray-500">or</p>
    </div>

    <button
      class="btn btn-sm btn-neutral rounded-2xl"
      on:click={() => document.getElementById("fileInput").click()}
    >
      Choose File
    </button>
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      on:change={handleFileInput}
      class="hidden"
    />
  </div>
{/if}
