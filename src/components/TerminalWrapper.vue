<template>
  <div class=" h-100dvh w-full  bg-base">
    <div class="flex gap-2 items-center border-b border-base border-dashed bg-faded p2 pl4">
      <div class="i-ic-twotone-terminal text-xl" />
      <span class="text-sm flex flex-row gap-1"> Joash's Mikrotik <p class="font-bold">(Lab-JoashA)</p> {{ (new Date().toDateString()) }}</span>
      <div class="flex-auto" />
      <button>
        <div i-ph-arrow-clockwise-duotone />
      </button>
    </div>
    <slot />
  </div>
</template>