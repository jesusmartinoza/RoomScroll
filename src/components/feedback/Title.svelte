<script>
  export let number;
  export let text;
</script>

<div class="p-3 bg-[#EEEEEE] rounded-full">
  <div class="flex items-center">
    <div
      class="w-8 h-8 bg-[#FFD5C2] rounded-full flex items-center justify-center text-[#F18F3A] font-bold mr-3 text-2xl"
    >
      {number}
    </div>
    <h2 class="text-lg font-semibold">{text}</h2>
  </div>
</div>
