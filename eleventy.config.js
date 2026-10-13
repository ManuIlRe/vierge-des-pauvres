module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/documents": "documents" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  eleventyConfig.ignores.add("src/admin/**");

  // 2026-11-01 -> « 1 novembre 2026 »
  eleventyConfig.addFilter("dateFr", (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  // Lien YouTube (watch, youtu.be, shorts, embed) -> identifiant de la vidéo
  eleventyConfig.addFilter("youtubeId", (url) => {
    const m = String(url || "").match(
      /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/
    );
    return m ? m[1] : "";
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addCollection("actualites", (api) =>
    api.getFilteredByGlob("src/actualites/*.md").sort((a, b) => b.date - a.date)
  );

  // Vie de la paroisse : ordre choisi dans le panneau (champ « ordre »)
  eleventyConfig.addCollection("vie", (api) =>
    api.getFilteredByGlob("src/vie/*.md").sort((a, b) => (a.data.ordre || 99) - (b.data.ordre || 99))
  );

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
