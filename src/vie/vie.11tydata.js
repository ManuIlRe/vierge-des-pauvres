module.exports = {
  layout: "fiche.njk",
  rubrique: { nom: "Vie de la paroisse", url: "/vie-de-la-paroisse/", retour: "← Vie de la paroisse", avec_date: false },
  eleventyComputed: {
    permalink: (data) => `/vie-de-la-paroisse/${data.page.fileSlug}/`,
  },
};
