/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
}) */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TrackWell/",
  server: {
    host: "0.0.0.0", // Damit der Server auf allen Netzwerk-Schnittstellen hört
    port: 5173, // Der Standard-Port für Vite
  },
  preview: {
    port: 5173, // Port für den Preview-Server ändern
  },
});
