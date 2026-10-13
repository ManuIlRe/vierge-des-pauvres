# Sito Vierge des Pauvres — Nancy

Sito statico (Eleventy) con pannello di amministrazione (Decap CMS). Gratuito da ospitare.

## Provarlo sul proprio computer

Serve [Node.js](https://nodejs.org) (versione 18 o più recente).

```bash
npm install
npm run dev
```

Il sito è su http://localhost:8080.

Per usare anche il pannello di amministrazione in locale, in un secondo terminale:

```bash
npm run cms
```

poi aprire http://localhost:8080/admin/. Le modifiche vengono scritte direttamente nei file.

## Dove si trova ogni cosa

| Cosa | File | Nel pannello |
|---|---|---|
| Nome, citazione, indirizzo, contatti, orari | `src/_data/site.json` | Informations et réglages → Paroisse, horaires, contact |
| Cronologia "Notre histoire" | `src/_data/histoire.json` | Informations et réglages → Notre histoire |
| Galleria foto e video | `src/_data/galerie.json` | Informations et réglages → Photos et vidéos |
| Pagina "Le Chemin" | `src/le-chemin.md` | Pages |
| Eventi con data (uno per file) | `src/actualites/*.md` | Actualités |
| Proposte permanenti (una per file) | `src/vie/*.md` | Vie de la paroisse |
| Pagina iniziale | `src/_data/accueil.json` | Informations et réglages → Page d'accueil |
| Statuto (PDF) | `src/documents/statut-chemin-neocatechumenal.pdf` | sostituire il file |
| Icona della pagina iniziale | `src/assets/images/icone-vierge.jpg` | sostituire il file |
| Colori e stile | `src/assets/css/style.css` (variabili in alto) | — |
| Menu, intestazione, piè di pagina | `src/_includes/base.njk` | — |

Tutto ciò che contiene "Exemple" o "à modifier" è un segnaposto: orari, e-mail, telefono, attività e foto `exemple-*.svg`.

I video non si caricano sul sito: si caricano su YouTube e si incolla il link.

## Metterlo online (gratis)

1. Creare un repository su GitHub e caricarvi questa cartella.
2. Su Netlify: "Add new site → Import an existing project", scegliere il repository. Il file `netlify.toml` contiene già i comandi di build.
3. In `src/admin/config.yml` sostituire `ManuIlRe/vierge-des-pauvres` con il nome del repository.
4. Per l'accesso al pannello `/admin/`: creare una "OAuth App" su GitHub (Settings → Developer settings) con callback `https://api.netlify.com/auth/done`, poi inserire Client ID e Secret in Netlify (Site configuration → Access & security → OAuth).
5. Chi deve modificare il sito ha bisogno di un account GitHub con accesso in scrittura al repository.

Ogni salvataggio nel pannello ripubblica il sito automaticamente in circa un minuto.

Il sito usa indirizzi che iniziano con `/`, quindi va pubblicato alla radice di un dominio (Netlify, Cloudflare Pages), non in una sottocartella.
