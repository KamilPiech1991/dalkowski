import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Studio jest dostępne pod https://dalkowski.sanity.studio
  studioHost: "dalkowski",
  deployment: {
    // Identyfikator aplikacji nadany przy pierwszym wdrożeniu — dzięki niemu kolejne
    // wdrożenia z GitHub Actions nie pytają o aplikację.
    appId: "qw4e6z942u41vsvd2agu5y4o",
  },
});
