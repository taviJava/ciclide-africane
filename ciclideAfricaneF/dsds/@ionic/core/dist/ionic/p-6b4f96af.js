import{h as t}from"./p-a48a5ea6.js";import"./p-0d9cab2d.js";import{createGesture as o}from"./p-a013b234.js";const r=(r,a,e,s,n)=>{const p=r.ownerDocument.defaultView;return o({el:r,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>t.startX<=50&&a(),onStart:e,onMove:t=>{s(t.deltaX/p.innerWidth)},onEnd:o=>{const r=p.innerWidth,a=o.deltaX/r,e=o.velocityX,s=e>=0&&(e>.2||o.deltaX>r/2),c=(s?1-a:a)*r;let i=0;if(c>5){const t=c/Math.abs(e);i=Math.min(t,540)}n(s,a<=0?.01:t(0,a,.9999),i)}})};export{r as createSwipeBackGesture}