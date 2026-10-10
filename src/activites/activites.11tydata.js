module.exports = {
  layout: "activite.njk",
  eleventyComputed: {
    permalink: (data) => `/activites/${data.page.fileSlug}/`,
  },
};
