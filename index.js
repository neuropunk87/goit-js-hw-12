import{a as M,S as P,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const B="45141549-5d04e9bb650dc04154699f876",R="https://pixabay.com/api/";async function g(e,r=1){try{const{data:o}=await M.get(R,{params:{key:B,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});return o}catch(o){throw new Error(`Error fetching images: ${o.message}`)}}let u=null;const h=document.querySelector(".gallery");function m(e){const r=e.map(({largeImageURL:o,webformatURL:n,tags:t,likes:s,views:l,comments:b,downloads:q})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img class="gallery-image" src="${n}" alt="${t}" loading="lazy" />
        </a>
        <div class="info">
          <div>
            <p class="info-title">Likes</p>
            <span class="info-stats">${s}</span>
          </div>
          <div>
            <p class="info-title">Views</p>
            <span class="info-stats">${l}</span>
          </div>
          <div>
            <p class="info-title">Comments</p>
            <span class="info-stats">${b}</span>
          </div>
          <div>
            <p class="info-title">Downloads</p>
            <span class="info-stats">${q}</span>
          </div>
        </div>
      </li>  `).join("");h.insertAdjacentHTML("beforeend",r),u?u.refresh():u=new P(".gallery a",{captionsData:"alt",captionDelay:250})}function $(){h.innerHTML=""}function v(){const e=document.querySelector(".loader-wrapper");e.innerHTML='<span class="loader"></span>',e.style.display="block"}function y(){const e=document.querySelector(".loader-wrapper");e.innerHTML="",e.style.display="none"}function w(){const e=document.querySelector(".load-more");e&&(e.classList.remove("hidden"),e.style.display="flex")}function i(){const e=document.querySelector(".load-more");e&&(e.classList.add("hidden"),e.style.display="none")}const L=document.querySelector(".form"),E=L.querySelector('input[name="search-text"]'),H=document.querySelector(".load-more");let f="",c=1,d=0;const S=15;let p=!1;y();i();L.addEventListener("submit",async function(e){e.preventDefault();const r=E.value.trim();if(!r){a.warning({message:"Please enter a search query!",position:"topRight"});return}f=r,c=1,d=0,$(),v(),i();try{const o=await g(f,c);if(d=o.totalHits||0,!o.hits.length){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}m(o.hits),d>S?w():(i(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y()}});H.addEventListener("click",async function(){if(!p){p=!0,c+=1,v(),i();try{const e=await g(f,c);if(!e.hits.length){i(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}m(e.hits);const r=document.querySelectorAll(".gallery-item");if(r.length>0){const{height:n}=r[0].getBoundingClientRect();window.scrollBy({top:n*2,behavior:"smooth"})}(c-1)*S+e.hits.length>=d?(i(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{y(),p=!1}}});
//# sourceMappingURL=index.js.map
