(function(){
var page=document.body.dataset.page;
var prefix=page==='index'?'':'index.html';
var links=[["#plakat","01. Proglas"],["#eu","02. EU & Sustav"],["#seljaci","03. Seljaci"],["#voda","04. Komunalni red"],["#moci","05. Zona Moći"]];
function el(tag,cls,txt,href){var e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;if(href)e.href=href;return e;}
var nav=document.getElementById('side-nav');
var box=el('div','nav-links');
links.forEach(function(l,i){var a=el('a',i===0&&page==='index'?'active':'',l[1],prefix+l[0]);box.appendChild(a);});
nav.appendChild(box);
var term=el('div','city-terminal');
term.appendChild(el('div','term-header','// LOKALNI FRONTOVI'));
nav.appendChild(term);
fetch('data/gradovi.json').then(function(r){return r.json();}).then(function(list){
list.forEach(function(g){
if(g.status==='soon'){term.appendChild(el('span','city-pending','- '+g.ime+' (USKORO)'));return;}
var a=el('a','city-active',(g.status==='hq'?'_':'> ')+g.ime.toUpperCase()+' '+(g.oznaka||''),g.url);
if(g.status==='hq'){a.textContent='';a.appendChild(el('span','blink','_'));a.appendChild(document.createTextNode(g.ime.toUpperCase()+' '+g.oznaka));}
term.appendChild(a);});
}).catch(function(){});
var nl=document.getElementById('news-list');
if(nl)fetch('data/vijesti.json').then(function(r){return r.json();}).then(function(list){
list.forEach(function(v){
var d=el('div','news-item');
d.appendChild(el('time','',v.datum));
d.appendChild(el('strong','',v.naslov));
d.appendChild(el('p','',v.tekst));
nl.appendChild(d);});
}).catch(function(){});
})();
