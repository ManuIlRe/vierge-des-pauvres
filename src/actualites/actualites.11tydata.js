module.exports = {
  layout: "fiche.njk",
  rubrique: { nom: "Actualités", url: "/actualites/", retour: "← Toutes les actualités", avec_date: true },
  eleventyComputed: {
    permalink: (data) => `/actualites/${data.page.fileSlug}/`,
  },
};
