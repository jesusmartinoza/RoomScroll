<script>
  export let number;
  export let text;
</script>

<div class="p-3 bg-[#EEEEEE] rounded-full">
  <div class="flex items-center">
    <div
      class="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center text-black font-bold mr-3 text-2xl"
    >
      {number}
    </div>
    <h2 class="text-lg font-semibold">{text}</h2>
  </div>
</div>
