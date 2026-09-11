from pathlib import Path
p=Path('archexiom-dist/index.html')
s=p.read_text()

def rep(a,b):
    global s
    if a not in s:
        raise SystemExit('patch anchor missing: '+a[:80])
    s=s.replace(a,b,1)

rep('#game{position:absolute;inset:0;width:100%;height:100%;display:block;outline:0}',
    '#game{position:absolute;inset:0;width:100%;height:100%;display:block;outline:0;touch-action:none;cursor:grab}body.campaignView #game:active{cursor:grabbing}')
rep('/* v5 ceremonial atlas campaign */','/* v6 ceremonial atlas campaign · movable theorem map */')
rep("// v5 preserves campaign progress","// v6 preserves campaign progress")
rep(" const label=labelSprite(n.name,n.p===null?'MODEL UNSTABLE':`${Math.round(n.p*100)}% · +${n.yield} PROOFS`);label.position.set(0,2.15,0);g.add(label);\n g.userData.ring=ring;g.userData.rim=rim;g.userData.spike=spike;g.userData.halo=halo;g.userData.probArc=probArc;g.userData.forecast=forecast;g.userData.label=label;",
    " const label=labelSprite(n.name,n.p===null?'MODEL UNSTABLE':`${Math.round(n.p*100)}% · +${n.yield} PROOFS`);label.position.set(0,2.15,0);g.add(label);\n const hitPlate=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.45,.42,24),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,colorWrite:false}));hitPlate.position.y=.18;hitPlate.userData.nodeHit=true;g.add(hitPlate);\n g.userData.ring=ring;g.userData.rim=rim;g.userData.spike=spike;g.userData.halo=halo;g.userData.probArc=probArc;g.userData.forecast=forecast;g.userData.label=label;g.userData.hitPlate=hitPlate;")
rep("const campaignFocusLook=new THREE.Vector3(1,0,1),campaignFocusPos=new THREE.Vector3(17,47,32);",
    "const campaignFocusLook=new THREE.Vector3(1,0,1),campaignFocusPos=new THREE.Vector3(17,47,32);\nconst campaignViewOffset=new THREE.Vector3(16,47,31);let campaignZoom=1;\nfunction clampCampaignLook(){campaignFocusLook.x=THREE.MathUtils.clamp(campaignFocusLook.x,-31,31);campaignFocusLook.z=THREE.MathUtils.clamp(campaignFocusLook.z,-21,21);campaignFocusLook.y=0}\nfunction syncCampaignCameraTarget(){clampCampaignLook();campaignFocusPos.copy(campaignFocusLook).addScaledVector(campaignViewOffset,campaignZoom)}")
rep("function focusCampaignNode(n,immediate=false){\n const blend=.27;campaignFocusLook.set(n.x*blend,0,n.z*blend);\n campaignFocusPos.set(17+n.x*.17,47,32+n.z*.15);\n if(immediate&&state.mode==='campaign'&&transT>=1){camera.position.copy(campaignFocusPos);currentLook.copy(campaignFocusLook)}\n}",
    "function focusCampaignNode(n,immediate=false){\n campaignFocusLook.set(n.x,0,n.z);syncCampaignCameraTarget();\n if(immediate&&state.mode==='campaign'&&transT>=1){camera.position.copy(campaignFocusPos);currentLook.copy(campaignFocusLook);camera.lookAt(currentLook)}\n}")
rep("{title:'Read the field',text:'Select BLACK REFINERY. The Axiom predicts outcomes, but you still choose where to risk people.',target:null,event:'select_refinery'},",
    "{title:'Read the field',text:'Drag the atlas to survey it, then tap BLACK REFINERY. The Axiom predicts outcomes, but you still choose where to risk people.',target:null,event:'select_refinery'},")

start=s.index('// raycast interactions')
end=s.index('// PWA install',start)
interaction=r'''// campaign + battle pointer interactions
const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let hover=null;
function canvasPointerXY(x,y){const r=canvas.getBoundingClientRect();pointer.x=((x-r.left)/r.width)*2-1;pointer.y=-((y-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera)}
function canvasPointer(e){canvasPointerXY(e.clientX,e.clientY)}
function nodeFromScreen(x,y){canvasPointerXY(x,y);const hits=raycaster.intersectObjects(nodeMeshes,true);let g=hits.length?hits[0].object:null;while(g&&!g.userData.node)g=g.parent;return g&&g.userData.node?g:null}
const campaignPointers=new Map();let campaignGesture={moved:false,lastX:0,lastY:0,pinchDist:0};
function pointerDistance(){const a=[...campaignPointers.values()];return a.length<2?0:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}
function panCampaignByPixels(dx,dy){const distance=camera.position.distanceTo(currentLook),scale=.00185*distance*campaignZoom;const right=new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld,0);right.y=0;right.normalize();const forward=new THREE.Vector3().subVectors(currentLook,camera.position);forward.y=0;forward.normalize();campaignFocusLook.addScaledVector(right,-dx*scale).addScaledVector(forward,dy*scale);syncCampaignCameraTarget()}
function setCampaignZoom(z){campaignZoom=THREE.MathUtils.clamp(z,.62,1.55);syncCampaignCameraTarget()}
canvas.addEventListener('pointerdown',e=>{if(state.busy)return;if(state.mode==='campaign'){e.preventDefault();try{canvas.setPointerCapture(e.pointerId)}catch{}campaignPointers.set(e.pointerId,{x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY});if(campaignPointers.size===1){campaignGesture.moved=false;campaignGesture.lastX=e.clientX;campaignGesture.lastY=e.clientY;campaignGesture.pinchDist=0}else if(campaignPointers.size===2){campaignGesture.moved=true;campaignGesture.pinchDist=pointerDistance()}$('tip').style.display='none';canvas.style.cursor='grabbing';return}canvasPointer(e);if(state.mode==='battle'&&!state.combatBusy){const hits=raycaster.intersectObjects(battleHitMeshes,true);if(!hits.length)return;let g=hits[0].object.userData.formation;if(!g){let x=hits[0].object;while(x&&!x.userData.side)x=x.parent;g=x}if(g?.userData.side==='player'&&battleData.player[g.userData.index]?.hp>0)state.selectedPlayer=g.userData.index;if(g?.userData.side==='enemy'&&battleData.enemy[g.userData.index]?.hp>0)state.selectedEnemy=g.userData.index;updateBattleSelection()}});
canvas.addEventListener('pointermove',e=>{if(state.busy)return;if(state.mode==='campaign'){if(campaignPointers.has(e.pointerId)){const p=campaignPointers.get(e.pointerId);p.x=e.clientX;p.y=e.clientY;if(campaignPointers.size>=2){const d=pointerDistance();if(campaignGesture.pinchDist&&d){setCampaignZoom(campaignZoom*(campaignGesture.pinchDist/d));campaignGesture.pinchDist=d}campaignGesture.moved=true;return}const dx=e.clientX-campaignGesture.lastX,dy=e.clientY-campaignGesture.lastY;if(Math.hypot(e.clientX-p.startX,e.clientY-p.startY)>5)campaignGesture.moved=true;if(campaignGesture.moved)panCampaignByPixels(dx,dy);campaignGesture.lastX=e.clientX;campaignGesture.lastY=e.clientY;return}const g=nodeFromScreen(e.clientX,e.clientY);hover=g;$('tip').style.display=hover?'block':'none';if(hover){$('tip').textContent=hover.userData.node.name;$('tip').style.left=e.clientX+'px';$('tip').style.top=e.clientY+'px';canvas.style.cursor='pointer'}else canvas.style.cursor='grab'}else{$('tip').style.display='none';canvas.style.cursor='default'}});
function endCampaignPointer(e,cancelled=false){if(!campaignPointers.has(e.pointerId))return;const wasSingle=campaignPointers.size===1,p=campaignPointers.get(e.pointerId);campaignPointers.delete(e.pointerId);try{canvas.releasePointerCapture(e.pointerId)}catch{}if(campaignPointers.size===1){const r=[...campaignPointers.values()][0];campaignGesture.lastX=r.x;campaignGesture.lastY=r.y;campaignGesture.pinchDist=0}if(campaignPointers.size===0){canvas.style.cursor='grab';if(!cancelled&&wasSingle&&!campaignGesture.moved&&Math.hypot(e.clientX-p.startX,e.clientY-p.startY)<7){const g=nodeFromScreen(e.clientX,e.clientY);if(g)selectNode(g.userData.node.id)}campaignGesture.moved=false;campaignGesture.pinchDist=0}}
canvas.addEventListener('pointerup',e=>{if(state.mode==='campaign')endCampaignPointer(e,false)});canvas.addEventListener('pointercancel',e=>{if(state.mode==='campaign')endCampaignPointer(e,true)});canvas.addEventListener('lostpointercapture',e=>{if(state.mode==='campaign'&&campaignPointers.has(e.pointerId))endCampaignPointer(e,true)});canvas.addEventListener('wheel',e=>{if(state.mode!=='campaign'||state.busy)return;e.preventDefault();setCampaignZoom(campaignZoom*Math.exp(e.deltaY*.0012))},{passive:false});
'''
s=s[:start]+interaction+s[end:]
rep("if(state.mode==='campaign'&&transT>=1){const k=Math.min(1,realDt*2.2);camera.position.lerp(campaignFocusPos,k);currentLook.lerp(campaignFocusLook,k)}",
    "if(state.mode==='campaign'&&transT>=1){const k=Math.min(1,realDt*5.0);camera.position.lerp(campaignFocusPos,k);currentLook.lerp(campaignFocusLook,k)}")
p.write_text(s)
