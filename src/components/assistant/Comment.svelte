<script>
  export let avatar = "https://placehold.co/40x40";
  export let name = "";
  export let message = "";
</script>

<div class="bg-white rounded-2xl p-4">
  <div class="flex items-start space-x-4">
    <div class="flex-shrink-0">
      <img class="h-10 w-10 rounded-full" src={avatar} alt="{name} Avatar" />
    </div>
    <div class="flex-grow">
      <p class="text-sm font-medium text-gray-900">{name}</p>
      <p class="mt-1 text-sm text-gray-500">
        {message}
      </p>
    </div>
  </div>
</div>
