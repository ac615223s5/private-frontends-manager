// ==UserScript==
// @name    frontends manager
// @version          1.1
// @match            *://*/*
// <<INSTANCES END HERE>>

// ==/UserScript==

const piped_default_channel_group = "main";
const piped_individous_switcheroo=true; //redirects to individous for viewing channels and homepage, and back to piped for videos and subscriptions
const piped_buffer_patience=4; //redirects if number of seconds buffering in the last minute exceeds this
const piped_loading_patience=3; //redirect if the page takes this long to load
let services = {
  "individous":{
    from: [
      //"youtube.com",
    ],
    to: [
      "inv.nadeko.net",
      "vid.puffyan.us",
      "inv.vern.cc",
      "invidious.fdn.fr",
      "invidious.nerdvpn.de",
      "invidious.lunar.icu",
      "inv.tux.pizza",
      "invidious.flokinet.to",
      "iv.ggtyler.dev",
      "invidious.privacydev.net",
      "inv.nadeko.net",
      "iv.nboeck.de",
      "invidious.protokolla.fi",
      "yt.artemislena.eu",
      "invidious.private.coffee",
      "inv.us.projectsegfau.lt",
      "invidious.drgns.space",
      "invidious.einfachzocken.eu",
      "invidious.materialio.us",
      "iv.datura.network",
      "invidious.reallyaweso.me",
      "yt.drgnz.club",
      "yewtu.be",
      "yt.cdaut.de",
      "invidious.incogniweb.net",
      "iv.melmac.space",
      //"invidious.jing",
      "invidious.privacyredirect.com",
      "inv.in.projectsegfau.lt",
      "invidious.perennialte.ch",
      "vid.lilay.dev",
      "farside.link/invidious",
      "redirect.invidious.io"
    ],
  },
  "piped":{ //backend instance be switched in preferences while using any frontend
    from: [
      //"youtube.com",
    ],
    to: [
      "piped.stellar.afs.ovh",
      "piped.video",
    ],
  },
  "piped backend":{
    from:[],
    to:[
        "https://pipedapi.stellar.afs.ovh",
"https://pipedapi.leptons.xyz",
"https://pipedapi.nosebs.ru",
"https://pipedapi-libre.kavin.rocks",
"https://pipedapi.smnz.de",
"https://pipedapi.adminforge.de",
"https://pipedapi.drgns.space",
"https://piped-api.codespace.cz",
"https://pipedapi.reallyaweso.me",
"https://api.piped.private.coffee",
    ]
  },
  "libreddit":{
    from: [
      //"reddit.com",
      //"old.reddit.com",
    ],
    to: [
      //"redlib.stellar.afs.ovh",
      "libreddit.projectsegfau.lt",
      "libreddit.kavin.rocks",
      "safereddit.com",
      //"libreddit.oxymagnesium.com",
      //"reddit.invak.id",
      //"reddit.simo.sh",
      "redlib.northboot.xyz",
      "libreddit.privacydev.net",
      "reddit.utsav2.dev",
      "discuss.whatever.social",
      "reddit.smnz.de",
      "libreddit.bus-hit.me",
      "libreddit.lunar.icu",
      "snoo.habedieeh.re",
      "libreddit.tux.pizza",
      "lr.artemislena.eu",
      "lr.n8pjl.ca",
      "r.darrennathanael.com",
      "red.artemislena.eu",
      "red.ngn.tf",
      "redlib.pussthecat.org",
      "reddit.owo.si",
      "redlib.catsarch.com",
      "redlib.ducks.party",
      "redlib.kittywi.re",
      "redlib.privacyredirect.com",
      "redlib.tux.pizza",
      "redlib.vimmer.dev",
      "rl.bloat.cat",
      "farside.link/libreddit"
    ],
  },
  "nitter":{
    from: [
      "twitter.com",
      "x.com"
    ],
    to: [
      "nitter.esmailelbob.xyz",
      "nitter.poast.org",
      "nitter.privacydev.net",
      "xcancel.com",
      "farside.link/nitter"
    ],
  },
  "proxitok":{
    from: [
      "tiktok.com"
    ],
    to: [
      "proxitok.pabloferreiro.es",
      "proxitok.pussthecat.org",
      "tok.habedieeh.re",
      "proxitok.esmailelbob.xyz",
      "proxitok.privacydev.net",
      "tok.artemislena.eu",
      "tok.adminforge.de",
      "tt.vern.cc",
      "cringe.whatever.social",
      "proxitok.lunar.icu",
      "proxitok.privacy.com.de",
      "cringe.datura.network",
      "tt.opnxng.com",
      "proxitok.belloworld.it",
      "proxitok.kyun.li",
      "tiktok.wpme.pl",
      "proxitok.r4fo.com"
    ],
  },
  "proxigram":{
    from: [
      "instagram.com"
    ],
    to: [
      //"proxigram.stellar.afs.ovh",
      "ig.opnxng.com",
      "proxigram.lunar.icu",
      "gram.whatever.social",
      //"proxigram.ducks.party",
      "proxigram.privacyredirect.com",
      "ig.snine.nl",
      "bibliogram.froth.zone/",
    ],
  },
  "quetre":{
    from: [
      //"quora.com"
    ],
    to: [
      "quetre.iket.me",
      "qr.vern.cc",
      "quetre.pussthecat.org",
      "quetre.tokhmi.xyz",
      "quetre.projectsegfau.lt",
      "quetre.odyssey346.dev",
      "quetre.privacydev.net",
      "ask.habedieeh.re",
      "quetre.blackdrgn.nl",
      "quetre.lunar.icu",
      "que.wilbvr.me",
      "quora.femboy.hu",
      "questions.whateveritworks.org",
      "quetre.frontendfriendly.xyz",
      "q.opnxng.com",
      "quetre.ftw.lol",
      "quetre.catsarch.com",
      "ask.sudovanilla.org",
      "quetre.drgns.space",
      "quetre.r4fo.com",
      "quetre.ducks.party"
    ],
  },
  "rimgo":{
    from: [
      //"imgur.com"
     ],
    to: [
      "rimgo.vern.cc",
      "rimgo.pussthecat.org",
      //"rimgo.totaldarkness.net",
      "rimgo.bus-hit.me",
      "imgur.artemislena.eu",
      "imgur.010032.xyz",
      "i.habedieeh.re",
      "rimgo.hostux.net",
      "ri.nadeko.net",
      "rimgo.lunar.icu",
      "rimgo.kling.gg",
      "rimgo.projectsegfau.lt",
      "rimgo.eu.projectsegfau.lt",
      "rimgo.us.projectsegfau.lt",
      "rimgo.in.projectsegfau.lt",
      "rimgo.whateveritworks.org",
      "rimgo.nohost.network",
      "rimgo.catsarch.com",
      "rimgo.frontendfriendly.xyz",
      "rimgo.drgns.space",
      "rimgo.quantenzitrone.eu",
      "rimgo.frylo.net",
      "rimgo.ducks.party",
      "rmgur.com",
      "rimgo.privacyredirect.com",
      "rimgo.reallyaweso.me",
      "rimgo.bloat.cat",
      "rimgo.fascinated.cc",
      "rimgo.perennialte.ch",
    ],
  },
  "libremdb":{ //this frontend is incomplete
    from: [],
    to: [
      "libremdb.iket.me",
      "libremdb.pussthecat.org",
      "ld.vern.cc",
      "binge.whatever.social",
      "libremdb.lunar.icu",
      "lmdb.hostux.net",
      "libremdb.tux.pizza",
      "libremdb.frontendfriendly.xyz",
      "d.opnxng.com",
      "libremdb.catsarch.com",
      "libremdb.r4fo.com",
      "libremdb.privacydev.net",
      "libremdb.ducks.party",
      "lmdb.ngn.tf",
      "lmdb.bloat.cat",
      "libremdb.jeikobu.net",
      "libremdb.nerdyfam.tech",
      "libremdb.darkness.services",
      "farside.link/libremdb",
    ],
  },
  "searxng":{
    from: [],
    to: [
      "stellar.stellar.afs.ovh",
      "paulgo.io",
      "search.sapti.me",
      "gruble.de",
      "search.unlocked.link",
      "searx.ericaftereric.top"
    ],
  },
  "wolfree":{
    from:[],
    to:[
      "wf.opnxng.com",
    ]
  }
};

function newPageLoaded() {
  let url = location.href;
  url = url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  for (const [name,service] of Object.entries(services)) {
    if (service.from.includes(url)) {
      console.log(`redirecting ${url} as`, service);
      redirect(name, url);
      return;
    }
    if (service.to.includes(url)) {
      console.log(`detected ${url} as ${name}`);
      if(service.customScript){
        service.customScript(()=>{redirect(name,url);});
      }
      return;
    }
  }
}
function getRedirect(name, url) {
  if(!services[name]){
    console.log(name+" is not a service");
    return;
  }
  const service=services[name];
  let id = service.to.findIndex(a => a == url) + 1;
  if (id >= service.to.length) {
    console.log("No more instances!");
    return service.to[0];
  }
  return service.to[id];
}
function redirect(name, url) {
  console.log(`${url} is bad, redirecting now`);
  if(name==="piped backend"){
    const instance=localStorage.getItem("instance");
    console.log(instance);
    if(instance==="https://pipedapi.stellar.afs.ovh") return;
    localStorage.setItem("instance", getRedirect("piped backend",instance));
    location.reload();
    return;
  }
  let newUrl = getRedirect(name, url);
  if (newUrl !== null) {
    location.replace("https://" + newUrl + location.pathname + location.search);
  }
}

services.piped.customScript=(doRedirect)=>{
  let prevPath;
  let loadingTime=0;
  let bufferingTimes=[];
  let updateNav=false;
  function updatePage() { //piped routing does not do refreshes so keep checking periodically
    if (piped_individous_switcheroo&& (location.pathname.startsWith("/channel/") || location.pathname.startsWith("/c/")|| location.pathname.startsWith("/user/"))) {
      redirect("individous");
      return;
    }
    if(piped_individous_switcheroo&&updateNav){
      let nav = document.querySelector("nav ul");
      if(nav){
        nav.innerHTML = `<li><a href="https://${getRedirect("individous")}/feed/popular" class="">Home</a></li>` + nav.innerHTML;
        updateNav=false;
      }
    }
    if (prevPath != location.pathname && location.pathname.startsWith("/feed")) {
      if (piped_default_channel_group) {
        const e = document.querySelector("#group-selector");
        if (e) {
          e.value = piped_default_channel_group;
          e.dispatchEvent(new Event('change'));
          prevPath = location.pathname;
        }
      }
    }
    if(location.pathname.startsWith("/watch")){
      console.log(bufferingTimes.length);
      if(bufferingTimes.length>piped_buffer_patience*1000/250){
        redirect("piped backend");
        return;
      }
      let e;
      e = document.querySelector('.w-full p');
      if (e && (e.innerText === `Got error: "Sign in to confirm that you're not a bot"`||e.innerText===`Watch on the latest version of YouTube.`||e.innerText=='IOS player response is not valid'||e.innerText=='This instance does not have a geo restriction checker set in its configuration')) {
        redirect("piped backend");
      }
      e= document.querySelector('.player-container span.absolute.text-lg');
      if(e&&e.innerText.includes("error")){
        redirect("piped backend");
      }
    }

    const spinner=document.querySelector('#spinner');
    if(spinner){
      if(loadingTime==0){
        loadingTime=Date.now();
      }
      else if(Date.now()-loadingTime>piped_loading_patience*1000){
        redirect("piped backend");
      }
    }
    else{
      loadingTime=0;
    }
    setTimeout(updatePage, 1000);
  }
  updatePage();
  function checkBuffer(){
    if(location.pathname==="/watch"){
      const bufferSpinner=document.querySelector(".shaka-spinner-container");
      if(bufferSpinner&&!bufferSpinner.classList.contains("shaka-hidden")){
        const now=Date.now();
        bufferingTimes.push(now);
        while(bufferingTimes.length>0&&bufferingTimes[0]<now-10000){
          bufferingTimes.splice(0,1);
        }
      }
    }
    setTimeout(checkBuffer,250);
  }
  checkBuffer();
};

services.individous.customScript=(doRedirect)=>{
  if(piped_individous_switcheroo){
    if (location.pathname.startsWith("/feed/subscriptions")) {
      location.replace(`https://${getRedirect("piped")}/feed`);
      return;
    }
    if (location.pathname.startsWith("/watch")||location.pathname.startsWith("/playlist")) {
      redirect("piped");
      return;
    }
  }
  if(location.pathname.startsWith('/channel')){
    const links=document.querySelectorAll('#contents .pure-u-1-2')[2];
    let playlist=links.children[0].cloneNode();
    playlist.innerHTML=`<a href=/playlist?list=UU${location.pathname.split('/')[2].substring(2)}>Play all videos</a>`
    links.appendChild(playlist);
  }
  if(location.pathname.startsWith('/channel')||location.pathname.startsWith('/search')||location.pathname==='/feed/popular'){
    const videos=document.querySelectorAll('a[href^="/watch"]');
    for(let video of videos){
      video.href='https://'+getRedirect("piped")+'/'+video.href.split('/')[3];
    }
  }
};

services.libreddit.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector('center h1');
  if (x !== null) {
    if(["403", "504", "429", "410"].reduce((ans, code) => ans | x.innerText.includes(code), false)){
      doRedirect();
    }
  }
  x=document.querySelector(".neterror");
  if(x!==null){
    doRedirect();
  }
  x=document.querySelector(".centered div img[src*='http.cat']");
  if(x!==null){
    doRedirect();
  }
  x = document.querySelector("body>pre");
  if(x !== null && (x.innerText == "Too big request header" || x.innerText == "no available server")){
    doRedirect();
  }
  x = document.querySelector("#error");
  if(x !== null && x.innerText != "Nothing here"){
    doRedirect();
  }
};

services.quetre.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector("#main .error__code");
  if(x !== null && x.innerText){
    doRedirect();
  }
};

services.proxigram.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector("h2.text-center");
  if (x !== null) {
    if(["403", "504", "429", "410"].reduce((ans, code) => ans || x.innerText.includes(code), false)){
      doRedirect();
    }
  }
  x=document.querySelector('pre');
  if(x&&x.innerText=='Internal Server Error'){
    doRedirect();
  }
};

services.nitter.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector('center:nth-of-type(2)');
  if (x !== null&&x.innerText.includes("nginx")) {
    doRedirect();
  }
  x = document.querySelector(".error-panel");
  if(x !== null && x.innerText != "Tweet not found"){
    doRedirect();
  }
};

services.rimgo.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector("main h2");
  if(x !== null && x.innerText == "Rate limited by Imgur") doRedirect();
  x = document.querySelector("img.object-contain");
  if (x !== null) {
    if (!x.complete) {
      setTimeout(services.rimgo.customScript,1000,doRedirect);
      return;
    }
    if(x.naturalWidth === 0) doRedirect();
  }
};

services.libremdb.customScript=(doRedirect)=>{
  let x;
  x = document.querySelector(".error-info_heading___IiEO");
  if(x !== null){
    doRedirect();
  }
};

newPageLoaded();