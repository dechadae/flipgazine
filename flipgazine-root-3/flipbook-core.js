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

  /* ---- 1. fade out before returning to the catalog ----------------------- */
  function wireLeave(){
    document.addEventListener("click", function(e){
      var t = e.target, a = (t && t.closest) ? t.closest("a.fg-home") : null;
      if(!a) return;
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      var href = a.getAttribute("href") || "/";
      e.preventDefault();
      document.body.classList.add("fg-leaving");
      setTimeout(function(){ location.href = href; }, 280);
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
