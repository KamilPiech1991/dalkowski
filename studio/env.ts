import sanity from "./sanity.project.json";

// Jedno źródło prawdy dla Studio i strony: studio/sanity.project.json (można nadpisać zmiennymi środowiska).
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || sanity.projectId;
export const dataset = process.env.SANITY_STUDIO_DATASET || sanity.dataset;
