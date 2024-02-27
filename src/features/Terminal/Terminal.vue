<script setup lang="ts">
import 'xterm/css/xterm.css'
import type { ITheme } from 'xterm'
import { Terminal } from 'xterm'
import TerminalWrapper from "@/components/TerminalWrapper.vue"
import { FitAddon } from 'xterm-addon-fit'
import themeLight from 'theme-vitesse/extra/xterm-vitesse-light.json'
import themeDark from 'theme-vitesse/extra/xterm-vitesse-dark.json'
import { useColorMode, useDebounceFn } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { io } from 'socket.io-client'

const socket = io.connect("ws://localhost:5000");

const colorMode = useColorMode()
const theme = computed<ITheme>(() => {
  return colorMode.value === 'dark'
    ? {
        ...themeDark,
        background: '#00000000',
      }
    : {
        ...themeLight,
        background: '#00000000',
      }
})

const root = ref<HTMLDivElement>()
const terminal = new Terminal({
  customGlyphs: true,
  allowTransparency: true,
  theme: theme.value,
  fontFamily: 'DM Mono, monospace',
})

watch(
  () => theme.value,
  (t) => {
    terminal.options.theme = t
  },
)

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

onMounted(() => {
      socket.on("connect", () => {
        terminal.onData((data) => {
          socket.emit("data", data);
        });

        socket.on("data", (data: any) => {
          terminal.write(data);
        });

        socket.on("disconnect", () => {
          terminal.write("\x1b[31m");
          terminal.write("\r\n*** Disconnected from backend***\r\n");
          terminal.write("\x1b[0m");
        });
      });
    });

useResizeObserver(root, useDebounceFn(() => fitAddon.fit(), 200))

const stop = watch(
  () => root.value,
  (el) => {
    if (!el)
      return
    terminal.open(el)
    terminal.write('\n')
    fitAddon.fit()
    stop()
  },
)
</script>

<template>
    <TerminalWrapper>
        <div ref="root" class="w-full of-hidden pl3 pb-0 bg-black" style="height: calc(100% - 37px);"/>
    </TerminalWrapper>
</template>