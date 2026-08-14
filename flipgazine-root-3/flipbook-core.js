/* flipgazine — shared flipbook chrome (stage 1)
   ---------------------------------------------------------------------------
   Behaviour that was duplicated verbatim in all six books:
     1. leave transition when returning to the catalog
     2. the debug panel's "Hide book" toggle
     3. the dev badge check, with the Supabase SDK loaded only on demand
     4. progress-rule helper, so a book only has to call FGCore.progress(i, n)

   Load at the end of <body>, after the book's own script has built its DOM.
   Everything here is defensive: if an element is missing the feature simply
   does not activate, so a book can omit any part of the chrome.
   =========================================================================== */
(function(){
  "use strict";

  /* Every visitor gets the same experience. There is no reduced-motion path
     anywhere in flipgazine, by design -- do not reintroduce one here without
     also changing the books and the catalog. */

  /* Build the interface header before it is needed so opacity has a real zero
     state to animate from. Normal book entry stores the exact rendered header
     and its canonical CSS. A cold deep-link falls back to the shell's rendered
     brand, which the shell saves before writing the book document. */
  function buildReturnHeader(){
    if(document.getElementById("fgReturnHeader")) return;
    var info=null, html="", sharedCSS="", bootBrand="";
    try{
      info=JSON.parse(sessionStorage.getItem("fg:return-interface")||"null");
      html=sessionStorage.getItem("fg:return-header")||"";
      sharedCSS=sessionStorage.getItem("fg:return-header-style")||"";
      bootBrand=sessionStorage.getItem("fg:boot-brand")||"";
    }catch(e){}
    if(info&&info.ground){
      document.documentElement.style.setProperty("--fg-return-ground",info.ground);
    }

    var header=null;
    if(html){
      var box=document.createElement("div");
      box.innerHTML=html;
      header=box.querySelector("header");
      if(header&&sharedCSS){
        var style=document.createElement("style");
        style.id="fgReturnHeaderStyle";
        style.textContent=sharedCSS;
        (document.head||document.documentElement).appendChild(style);
      }
    }
    if(!header){
      header=document.createElement("header");
      header.className="fg-return-fallback";
      header.innerHTML='<div class="fg-return-wrap"><span class="fg-return-brand">'
        +(bootBrand||"flipgazine")+'</span></div>';
    }
    header.id="fgReturnHeader";
    header.setAttribute("aria-hidden","true");
    /* Interface pages inherit Poppins from /fg-head.html; a book inherits its
       editorial face instead. Pin the clone to the interface stack so the
       wordmark width and control geometry do not shift at the document seam. */
    header.style.fontFamily="'Poppins',sans-serif";
    header.querySelectorAll("a,button,input,select,textarea").forEach(function(el){
      el.setAttribute("tabindex","-1");
    });

    try{
      var skin=JSON.parse(sessionStorage.getItem("fg:header-skin")||"null");
      if(skin){
        if(skin.background){ header.style.background=skin.background; header.style.setProperty("--glass",skin.background); }
        if(skin.border){ header.style.borderBottomColor=skin.border; header.style.setProperty("--glass-brd",skin.border); }
        if(skin.text){ header.style.color=skin.text; header.style.setProperty("--ink",skin.text); }
        if(skin.accent){ header.style.setProperty("--accent",skin.accent); }
        var brand=header.querySelector(".brand,.fg-return-brand");
        var mark=header.querySelector("#logoMark,.fmark");
        if(brand&&skin.text) brand.style.color=skin.text;
        if(mark&&skin.accent) mark.style.color=skin.accent;
      }
    }catch(e){}
    document.body.appendChild(header);
  }

  /* ---- 1. fade out before returning to the catalog ----------------------- */
  function wireLeave(){
    document.addEventListener("click", function(e){
      var t = e.target, a = (t && t.closest) ? t.closest("a.fg-home") : null;
      if(!a) return;
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
      var href = a.getAttribute("href") || "/";
      e.preventDefault();
      document.body.classList.add("fg-leaving");
      setTimeout(function(){ location.href = href; }, 660);
    }, true);
  }

  /* ---- 2. hide the book so the background can be judged alone ------------ */
  function wireHideBook(){
    var btn = document.getElementById("dbgHideBook");
    if(!btn) return;
    function sync(){
      btn.textContent = document.body.classList.contains("fg-nobook")
        ? "Show book" : "Hide book (inspect background)";
    }
    btn.addEventListener("click", function(){
      document.body.classList.toggle("fg-nobook");
      sync();
      var p = document.getElementById("debugPanel");
      if(p) p.classList.remove("open");
    });
    sync();
  }

  /* ---- 3. dev badge ------------------------------------------------------ */
  /* The Supabase SDK is ~40KB and no book makes a REST call with it; it exists
     purely to read an auth session for this badge. Skip the download unless a
     token is actually in storage, then fetch it on demand. */
  var SB_URL = "https://sjpvhgxacsiorrtijqua.supabase.co";
  var SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcHZoZ3hhY3Npb3JydGlqcXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NDE5MjcsImV4cCI6MjA5OTMxNzkyN30.9rQa7r9pxoBwh5SrYLlBGzzvbZkkUXKdvahCPugZncY";
  var DEV_NAME = "dechadae";

  function hasAuthToken(){
    try{
      for(var i = 0; i < localStorage.length; i++){
        var k = localStorage.key(i);
        if(k && k.indexOf("sb-") === 0 && k.indexOf("-auth-token") > 0) return true;
      }
    }catch(e){}
    return false;
  }

  function revealDev(){
    var toggle = document.getElementById("debugToggle");
    if(!toggle) return;
    try{
      var client = window.supabase.createClient(SB_URL, SB_KEY);
      client.auth.getSession().then(function(res){
        var session = res && res.data && res.data.session;
        var user = session && session.user;
        if(!user) return;
        var name = ((user.user_metadata || {}).display_name ||
                    (user.email || "").split("@")[0] || "").toLowerCase();
        if(name === DEV_NAME) toggle.style.display = "flex";
      })["catch"](function(){});
    }catch(e){}
  }

  function wireDev(){
    if(!document.getElementById("debugToggle")) return;
    if(!hasAuthToken()) return;
    if(window.supabase) return revealDev();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
    s.onload = revealDev;
    document.head.appendChild(s);
  }

  /* ---- 4. progress rule -------------------------------------------------- */
  function progress(index, total){
    var el = document.getElementById("pageRule");
    if(!el || !el.firstElementChild) return;
    var n = total || 12;
    el.firstElementChild.style.width = (((index + 1) / n) * 100) + "%";
  }

  function start(){
    buildReturnHeader();
    wireLeave();
    wireHideBook();
    wireDev();
  }

  window.FGCore = { progress: progress };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
  }else{
    start();
  }
})();
