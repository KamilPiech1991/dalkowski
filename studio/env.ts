import { SANITY_DATASET, SANITY_PROJECT_ID } from "../src/data/sanity";

// Jedno źródło prawdy dla strony i Studio: src/data/sanity.ts (można nadpisać zmiennymi środowiska).
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || SANITY_PROJECT_ID;
export const dataset = process.env.SANITY_STUDIO_DATASET || SANITY_DATASET;
