const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const page=document.body.dataset.page;
const links=[['index.html','Accueil','home'],['guides.html','Guides','guides'],['about.html','À propos','about'],['contact.html','Contact','contact']];

function chrome(s){
  const h=document.getElementById('site-header');
  if(h)h.innerHTML=`<header class="top"><div class="wrap"><a class="brand" href="index.html">${esc(s.nom)}</a><nav aria-label="Navigation principale">${
    links.map(([u,t,k])=>`<a href="${u}"${(k===page||(k==='guides'&&page==='guide'))?' aria-current="page"':''}>${t}</a>`).join('')}</nav></div></header>`;
  const f=document.getElementById('site-footer');
  if(f)f.innerHTML=`<footer><div class="wrap"><div>© ${new Date().getFullYear()} ${esc(s.nom)}</div><div><a href="legal.html">Mentions légales</a> · <a href="legal.html#confidentialite">Confidentialité</a> · <a href="${esc(s.youtube)}" rel="noopener">YouTube</a></div></div></footer>`;
  document.querySelectorAll('[data-youtube]').forEach(a=>a.href=s.youtube);
  document.querySelectorAll('[data-email]').forEach(a=>{a.href='mailto:'+s.email;a.textContent=s.email});
  document.querySelectorAll('[data-nom]').forEach(e=>e.textContent=s.nom);
}
function button(g){
  return g.disponible===false
    ?'<span class="btn off">Bientôt disponible</span>'
    :`<a class="btn" href="guides/${encodeURI(g.pdf)}" download>Télécharger le guide PDF</a>`;
}
function cover(g){return `<div class="cover"><img src="images/${encodeURI(g.couverture||'')}" alt="Couverture du guide ${esc(g.destination)}" loading="lazy" onerror="this.remove()"></div>`}
function card(g){
  const m=[g.pages?g.pages+' pages':'',g.prix?'Prix : '+g.prix:''].filter(Boolean).join(' · ');
  return `<article class="card"><a href="guide.html?id=${encodeURIComponent(g.id)}" aria-label="${esc(g.titre)}">${cover(g)}</a><div class="body"><h3>${esc(g.destination)}</h3><p>${esc(g.description)}</p>${m?`<p class="meta">${esc(m)}</p>`:''}${button(g)}</div></article>`;
}
function detail(g){
  const m=[g.pages?g.pages+' pages':'',g.prix?'Prix : '+g.prix:'Gratuit'].join(' · ');
  document.title=g.titre;
  return `<div class="detail">${cover(g)}<div class="text"><h1>${esc(g.titre)}</h1><p class="meta">${esc(m)}</p><p>${esc(g.description)}</p>${button(g)}${g.disponible===false?'<p class="note">Ce guide n’est pas encore en ligne. Revenez bientôt.</p>':''}</div></div>`;
}
(async()=>{
  try{
    const r=await fetch('guides.json');if(!r.ok)throw 0;
    const d=await r.json();chrome(d.site);
    const gs=d.guides||[];
    const L=document.getElementById('latest'),B=document.getElementById('library'),D=document.getElementById('detail');
    const none='<p>Aucun guide pour le moment.</p>';
    if(L)L.innerHTML=gs.length?gs.slice(0,3).map(card).join(''):none;
    if(B)B.innerHTML=gs.length?gs.map(card).join(''):none;
    if(D){const g=gs.find(x=>x.id===new URLSearchParams(location.search).get('id'));
      D.innerHTML=g?detail(g):'<p>Guide introuvable. <a href="guides.html">Voir tous les guides</a></p>';}
  }catch(e){
    chrome({nom:'Ma Chaîne Voyage',youtube:'#',email:''});
    const t=document.querySelector('#latest,#library,#detail');
    if(t)t.innerHTML='<p class="note">Impossible de charger la liste des guides. Utilisez le site publié (l’ouverture directe du fichier sur un ordinateur ne fonctionne pas).</p>';
  }
})();
