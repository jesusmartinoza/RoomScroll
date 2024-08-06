<script>
  import DropZone from "../common/DropZone.svelte";
  import Title from "./Title.svelte";
  import Comment from "./Comment.svelte";
  let feedback;
  let userInput = "";
  let userImage;
  let loading = false;

  // Handle image selected
  function handleImageSelected(event) {
    userImage = event.detail.image;
  }

  // Submit image to AI
  async function submitImage() {
    if (userImage) {
      loading = true;
      const formData = new FormData();
      formData.append("image", userImage);
      formData.append("message", userInput);

      await fetch("/api/v1/feedback", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          feedback = data.data;
          console.log("Feedback received:", data);
        })
        .catch((error) => {
          console.error("Error sending image:", error);
        });

      loading = false;
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-8 md:px-24">
  <!-- Element 1 -->
  <div class="flex flex-col space-y-4">
    <Title number="1" text="Upload photo" />

    <div class="p-3 bg-[#EEEEEE] rounded-3xl flex-grow flex flex-col h-full">
      <div class="flex-grow">
        <DropZone on:imageSelected={handleImageSelected} />
      </div>

      <div class="my-3">
        <label
          for="userInput"
          class="block text-sm font-medium text-gray-700 my-2">Message</label
        >
        <div class="relative">
          <textarea
            bind:value={userInput}
            rows="3"
            class="w-full px-3 py-2 text-gray-700 border rounded-2xl focus:outline-none focus:border-blue-500 resize-none"
            placeholder="What's on your mind about this space? Any design questions?"
          ></textarea>
        </div>
      </div>
      <button
        class="btn btn-sm btn-primary rounded-2xl w-32 mx-auto flex items-center justify-center"
        disabled={!userImage || loading}
        on:click={submitImage}
      >
        {#if loading}
          <div
            class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"
          ></div>
        {/if}
        {loading ? "" : "Submit"}
      </button>

      <!--span class="block font-semibold mt-2">Examples</span>
      <div class="grid grid-cols-4 gap-5 mt-2 h-[60px]">
        <img
          src="https://picsum.photos/60/60"
          alt="Example 1"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/60/60"
          alt="Example 2"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/200/60"
          alt="Example 3"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/60/60"
          alt="Example 4"
          class="w-full h-full rounded-2xl object-cover"
        />
      </div-->
    </div>
  </div>

  <!-- Element 2 -->
  <div class="flex flex-col space-y-4">
    <Title number="2" text="AI feedback" />
    <div
      class="p-3 bg-[#EEEEEE] rounded-3xl space-y-3 flex-grow flex flex-col justify-center"
    >
      {#if feedback}
        {#each Object.entries(feedback) as [persona, data]}
          <Comment
            avatar="https://picsum.photos/120/120"
            name={data.name}
            message={data.advice}
          />
        {/each}
      {:else}
        <div
          class="flex flex-col items-center justify-center h-full text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h6 class="text-lg font-semibold text-gray-700 mb-2">
            No feedback yet
          </h6>
          <p class="text-gray-500">
            Upload an image and ask a question to get AI feedback on your
            interior design!
          </p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Element 3 -->
  <div class="flex flex-col space-y-4 md:col-span-2">
    <Title number="3" text="Chat" />

    <div class="p-3 bg-[#EEEEEE] rounded-3xl justify-center h-[400px]">
      <iframe
        id="iframe"
        src={`https://typebot-viewer.overflow.ai/roomake`}
        class="w-full h-full px-0"
        title="Chatbot view"
      >
      </iframe>
    </div>
  </div>
</div>
