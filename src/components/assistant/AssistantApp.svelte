<script>
  import { onMount } from "svelte";
  import DropZone from "../common/DropZone.svelte";
  import Title from "./Title.svelte";
  import Comment from "./Comment.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 px-8 md:px-24">
  <!-- Element 1 -->
  <div class="flex flex-col space-y-4">
    <Title number="1" text="Upload photo" />

    <div class="p-3 bg-[#EEEEEE] rounded-3xl flex-grow flex flex-col h-full">
      <div class="flex-grow">
        <DropZone />
      </div>

      <span class="block font-semibold mt-2">Examples</span>
      <div class="grid grid-cols-4 gap-4 mt-2 min-h-[100px]">
        <img
          src="https://picsum.photos/100/100"
          alt="Example 1"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/100/100"
          alt="Example 2"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/200/100"
          alt="Example 3"
          class="w-full h-full rounded-2xl object-cover"
        />
        <img
          src="https://picsum.photos/100/100"
          alt="Example 4"
          class="w-full h-full rounded-2xl object-cover"
        />
      </div>
    </div>
  </div>

  <!-- Element 2 -->
  <div class="flex flex-col space-y-4">
    <Title number="2" text="AI feedback" />
    <div
      class="p-3 bg-[#EEEEEE] rounded-3xl space-y-3 flex-grow flex flex-col justify-center"
    >
      <Comment
        avatar="https://picsum.photos/120/120"
        name="AI Assistant"
        message="I've analyzed your room design. Would you like suggestions for improvements?"
      />
      <Comment
        avatar="https://picsum.photos/130/130"
        name="User"
        message="Yes, please! Especially for color scheme and furniture arrangement."
      />
      <Comment
        avatar="https://picsum.photos/110/110"
        name="AI Assistant"
        message="Sure! For colors, add warm tones like terracotta or sage green for coziness. For furniture, angle the sofa towards the fireplace as a focal point and add a large rug to define the seating area."
      />
      <Comment
        avatar="https://picsum.photos/130/130"
        name="User"
        message="Yes, please! Especially for color scheme and furniture arrangement."
      />
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
