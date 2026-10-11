// Diaporama : défilement des photos + visionneuse plein écran avec zoom
document.querySelectorAll(".diaporama").forEach((d) => {
  const piste = d.querySelector(".diapos"), n = piste.children.length;
  const compteur = d.querySelector(".diapo-compteur span");
  const index = () => Math.round(piste.scrollLeft / piste.clientWidth);
  const aller = (i) => piste.scrollTo({ left: ((i + n) % n) * piste.clientWidth, behavior: "smooth" });
  d.querySelector(".prec").addEventListener("click", () => aller(index() - 1));
  d.querySelector(".suiv").addEventListener("click", () => aller(index() + 1));
  piste.addEventListener("scroll", () => { compteur.textContent = index() + 1; });
  piste.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); aller(index() - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); aller(index() + 1); }
  });
  const images = [...piste.querySelectorAll("img")];
  images.forEach((img, i) => img.addEventListener("click", () => ouvrir(images.map((x) => x.src), i, aller)));
});

let visionneuse;
function ouvrir(sources, depart, synchroniser) {
  if (!visionneuse) {
    visionneuse = document.createElement("dialog");
    visionneuse.className = "visionneuse";
    visionneuse.innerHTML =
      '<div class="vis-cadre"><img alt=""></div>' +
      '<button class="vis-fermer" aria-label="Fermer">×</button>' +
      '<button class="diapo-btn prec" aria-label="Photo précédente">‹</button>' +
      '<button class="diapo-btn suiv" aria-label="Photo suivante">›</button>' +
      '<p class="vis-aide">Cliquer sur la photo pour zoomer</p>';
    document.body.append(visionneuse);
  }
  const v = visionneuse, cadre = v.querySelector(".vis-cadre"), img = v.querySelector("img");
  let i = depart;
  const montrer = (j) => {
    i = (j + sources.length) % sources.length;
    cadre.classList.remove("zoom");
    img.src = sources[i];
    synchroniser(i);
  };
  // Zoom centré sur le point cliqué ; on se déplace ensuite en faisant défiler
  img.onclick = (e) => {
    const r = img.getBoundingClientRect();
    const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    const zoom = cadre.classList.toggle("zoom");
    if (zoom) {
      cadre.scrollLeft = fx * cadre.scrollWidth - cadre.clientWidth / 2;
      cadre.scrollTop = fy * cadre.scrollHeight - cadre.clientHeight / 2;
    }
  };
  v.querySelector(".prec").onclick = () => montrer(i - 1);
  v.querySelector(".suiv").onclick = () => montrer(i + 1);
  v.querySelector(".vis-fermer").onclick = () => v.close();
  v.onkeydown = (e) => {
    if (e.key === "ArrowLeft") montrer(i - 1);
    if (e.key === "ArrowRight") montrer(i + 1);
  };
  cadre.onclick = (e) => { if (e.target === cadre) v.close(); };
  montrer(depart);
  v.showModal();
}

// Grilles de photos (pages d'activité) : un clic ouvre la visionneuse, avec flèches et zoom
document.querySelectorAll(".grille-photos").forEach((grille) => {
  const liens = [...grille.querySelectorAll("a")];
  liens.forEach((lien, i) => lien.addEventListener("click", (e) => {
    e.preventDefault();
    ouvrir(liens.map((l) => l.href), i, () => {});
  }));
});
