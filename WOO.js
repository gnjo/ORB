var WOO_CASH
var WOO_CTX
var WOO_FLG

async function WOO(obj){
 var is={}
 is.nan=d=>d!==d
 is.color=d=>/^#/.test(d)
 var o={}
 o.str=[obj].flat().pop()
 o.ary=o.str.split('\n').filter(d=>!/^[;；]|^\/\//.test(d)).filter(d=>d)
 //console.log(o.ary)
 o.i=0
 o.arrowUp=38
 o.arrowDown=40
 o.VKEY=void 0 //A^v
 o.img=''
 o.bg=''
 ;
 if(!WOO_CASH)WOO_CASH={}
 if(!WOO_CTX)WOO_CTX=makectx(640,360)
 if(!WOO_FLG)WOO_FLG={}
 WOO_CTX=superctx(WOO_CTX)
 WOO_CTX.drawSave()
 ;
 while(o.i<o.ary.length)
  await call(o.ary[o.i]),o.i++
 ;
 WOO_CTX.drawBack();
 console.log('endline')
 return WOO_FLG
 ;
 //local 
 function call(line){
  //console.log('call>',line)
  let ret=''
  let ch=line.charAt(0)

  if(ch==='＠')ret=img(line)
  else if(ch==='＊')ret=wait(line)
  else if(ch==='＃')ret=mark(line)
  else if(ch==='＞')ret=jump(line)
  else if(ch==='＄')ret=flag(line)
  else ret=mes(line)

  return Promise.resolve(ret)
 }
 ///
 async function flag(line){
  var flg=WOO_FLG
  //＄問１＝何が本当のところか？｜犬｜猫｜＊兎 
  if(!/｜/.test(line)&&!/＝/.test(line)){
   return WOO_FLG[line]
  }else if(!/｜/.test(line)&&/＝/.test(line)){
   let a=line.split('＝')
   return WOO_FLG[ a[0] ] =a[1]
  }
  //console.log(line)
  redraw();
  //＄問１＝何が本当のところか？｜犬｜猫｜＊兎
  let ctx=WOO_CTX
  let w=ctx.canvas.width,h=ctx.canvas.height
  let a=line.split('＝')
  let name=a[0],str=a[1]
  let ask=str.split('｜').slice(0,1)
  let ary=str.split('｜').slice(1)
  let ansnum=ary.findIndex(d=>/^＊/.test(d))
  if(ansnum===-1)ansnum=0
  ary=ary.map(d=>d.replace('＊',''))
  let ans=ary[ansnum]
//  let strmax=ary.reduce((a,b)=>Math.max(a.length||0,b.length||0))
//  ary=ary.map(d=>d.padEnd(strmax))
  ;
  let fsize=parseFloat(ctx.font)
  let ox1=w/2 - ctx.measureText(ask).width/2
//  let ox2=w/2 - ctx.measureText(ary[0]).width/2
  let oy=h/2 - fsize*(ary.length+1)/2
  let pad=fsize*0.2
//  console.log(strmax,ox2,ary[0])  
  //
  let wk=ctx.fillStyle
  ctx.fillStyle='#000a'
  ctx.fillRect(0,oy-pad, w, fsize*(ary.length+1)+pad*2)
  ctx.fillStyle=wk

  //
  let back=copyImage(ctx.canvas) 
  let n=0,k
  while(k!='A'){
   ctx.drawImage(back,0,0)
   ctx.fillText(ask,ox1,oy)
   ary.map((d,i)=>{
    let ox2=ox1+fsize*2
    ctx.fillText(d,ox2,oy+fsize*i + fsize)
    if(n===i){
     let wk=ctx.fillStyle
     ctx.fillStyle='#f26'
     ctx.fillText(d,ox2,oy+fsize*i +fsize)
     ctx.fillStyle=wk
    } 
   })

   k=await key()
   if(k==='^') n+=ary.length-1
   else if(k==='v') n++
   n=n%ary.length
  }
  if(n===ansnum) WOO_FLG[name]= ans
  //console.log(WOO_FLG[name])
  return WOO_FLG[name]
 }

 function wait(line){
  let a=toSmall(line.slice(1))
  let n=parseInt(a)
  if(is.nan(n))return key()
  else return new Promise(sol=>setTimeout(sol,n))
  ;
 }
 function key(){
  return new Promise(sol=>{
   let dde=document.documentElement
   let del=()=>dde.onkeydown=void 0;
   dde.onkeydown=(ev)=>{
    //    console.log(ev.which)
    //    console.log(ev.which===o.arrowUp)
    if(ev.which===o.arrowUp) del(),sol(o.VKEY='^')
    else if(ev.which===o.arrowDown) del(),sol(o.VKEY='v')
    else del(),sol(o.VKEY='A')
   }
  })
 }
 function mark(line){
  //console.log(line)
  return
 }
 function jump(line){
  let str=line.replace(/＞/g,'') //＞はいくつでもよい
  if(/｜/.test(line)){
   let a=line.split('｜')
   //   console.log(a[1],WOO_FLG[ a[1] ])
   if(!WOO_FLG[ a[1] ])return
   str=a[0]
  }
  //  console.log(str)
  let j=o.ary.findIndex((d)=>d===str)
  if(j===-1)return
  o.i= j-1
  //  console.log(o.i)
 }
 ////////
 async function img(line){
  if(/＝/.test(line)){
   let a=line.slice(1).split('＝')
   a[0]=a[0].replace('＠','')
   if(WOO_CASH[a[1]]){
    WOO_CASH[ a[0] ] =WOO_CASH[ a[1] ]
    return  
   }else if(is.color(a[1])){
    WOO_CASH[ a[0] ] =colorBack(a[1])
   }else{
    await CAS(a[1])
    WOO_CASH[ a[0] ] =WOO_CASH[ a[1] ]    
   }
  }
  ;
  if(/＠＠/.test(line))o.img=line.slice(2)
  else o.bg=line.slice(1)
  //console.log(line,o.bg)
  redraw()
 }
 async function mes(line){
  //  console.log(line)
  redraw()
  ;
  let ctx=WOO_CTX
  let w=ctx.canvas.width,h=ctx.canvas.height
  let str=line.replace(/^　/,'')
  let time=20
  let max=20
  let fsize=parseFloat(ctx.font)
  let ox=ctx.measureText('漢漢漢漢漢').width
  let oy=h - fsize*3.1
  let i=0,x=0,y=0
  ;
  let wk=ctx.fillStyle
  let pad=fsize*0.2
  ctx.fillStyle='#000a'
  ctx.fillRect(0,oy-pad,w,h-oy+pad)
  ctx.fillStyle=wk
  //  let ca=dotback(w+1,h-oy+pad,0,50,50)
  //  ctx.drawImage(ca,-1,oy-pad)
  ;
  if(/「/.test(str)){
   ctx.fillText('「',ox-fsize,oy)
   str=str.slice(1)   
  }
  for(let ch of str){
   x=(i%max)*fsize,y=~~(i/max)*fsize
   await new Promise(sol=>setTimeout(sol,time))
   ctx.fillText(ch,ox+x,oy+y)
   i++;
  }
  await key()
 } 
 function redraw(){
  let img=(o.img)?WOO_CASH[o.img]:void 0
  ,bg=(o.bg)?WOO_CASH[o.bg]:void 0
  ,bgc=(o.bg&&is.color(o.bg))?o.bg:void 0
  ,ctx=WOO_CTX
  ,w=ctx.canvas.width,h=ctx.canvas.height
  ,iw=(img)?img.width:0,ih=(img)?img.height:0
  ;
  ctx.clearRect(0,0,w,h)
  if(bg)ctx.drawImage(bg,0,0,w,h)
  if(bgc){
   let wk=ctx.fillStyle
   ctx.fillStyle=bgc
   ctx.fillRect(0,0,w,h)
   ctx.fillStyle=wk
  }
  if(bg||bgc){
   let ca=dotback(w,h)
   ctx.drawImage(ca,0,0)
  }
  if(img)ctx.drawImage(img,w/2-iw/2,h/2-ih/2,iw,ih)

 }
 ////////
 function toSmall(str){
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
   return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  }) 
 }  
 function makectx(w,h){
  let canvas=document.createElement('canvas')
  canvas.width=640,canvas.height=360
  let ctx=canvas.getContext('2d')
  document.body.appendChild(canvas)
  return ctx
 }
 function superctx(ctx){
  if(ctx.drawSave)return ctx
  let fsize=ctx.canvas.width/30
  ctx.font=`${fsize}px exp,woo,Woo`
  ctx.fillStyle='#abc'
  ctx.textBaseline='top'
  ctx.drawSave=(function(){
   var ctx=this
   if(!ctx.__savecanvas__){
    let c=document.createElement('canvas')
    c.width=ctx.canvas.width,c.height=ctx.canvas.height
    ctx.__savecanvas__=c
   }
   copyImage()
   return ctx.save()
   ;
   function copyImage(){
    ctx.__savecanvas__.width=ctx.canvas.width
    ctx.__savecanvas__.height=ctx.canvas.height
    let sctx=ctx.__savecanvas__.getContext('2d')  
    sctx.drawImage(ctx.canvas,0,0)
   }
  }).bind(ctx)
  ctx.drawDot=(function dotback(r,g,b,a){
   //console.log('in')
   r=r||0,g=g||0,b=b||0,a=a||255
   let ctx=this
   let w=ctx.canvas.width,h=ctx.canvas.height

   let dat=ctx.getImageData(0,0,w,h)
   for(let y=1;y<h;y+=2)
    for(let x=1;x<w;x+=2)
     drawPixel(x,y,r,g,b,a)
   ctx.putImageData(dat,0,0)
   return
   ;
   //local
   function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * w) * 4;
    dat.data[index + 0] = r;
    dat.data[index + 1] = g;
    dat.data[index + 2] = b;
    dat.data[index + 3] = a;
   }
   //
  }).bind(ctx)
  ctx.drawBack=(function(){
   var ctx=this
   var w=ctx.canvas.width,h=ctx.canvas.height
   var sctx=ctx.__savecanvas__.getContext('2d')
   if(isClearback(sctx)) ctx.clearRect(0,0,w,h)
   else ctx.drawImage(ctx.__savecanvas__,0,0)
   return ctx.restore(),ctx.save()
   ;
   function isClearback(ctx){
    let w=ctx.canvas.width,h=ctx.canvas.height
    //ctx.drawImage(cash['city1.jpg'],0,0)
    let dat=ctx.getImageData(0,0,w,h)
    let min=Math.min(w,h)
    //w*h*4
    let a=Array.from({length:min/50})
    .map((d,i)=>getAlpha(i*50,i*50))
    .reduce((a,b)=>a+b)
    if(a===0)return true
    else return false
    ;
    function getAlpha(x,y) {
     var index = (x + y * w) * 4;
     return dat.data[index + 3]
    }
   }
  }).bind(ctx)
  ;
  return ctx
 }

 function CAS(str){
  //ZAP_CASH={}
  //var o=EXP(),cash=o.cash,
  var cash=WOO_CASH
  var time=performance.now()
  let ma_v =/\.amr$|\.awb$|\.m4a$|\.mp4$|\.mp3$|\.wma$|\.aac$|\.mid$|\.midi$|\.ogg$|\.oga$|\.wav$|\.flac$/i
  let ma_i =/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/i
  let ma_f =/\.woff$|\.otf$|\.ttf$|\.eot$/i //fontload
  return Promise.all(str.split('\n').map(d=>get(d) ))
   .then(d=>{ /*o.debug('cash time:'+(performance.now()-time) ) ;*/ cashloading=0   ;return d})
  ;
  function get(url){return new Promise((sol)=>{
   //fontload
   if(ma_f.test(url))return sol(fontload(url))
   //fontload
   let obj,f=()=>{cash[url]=cash[url.split('/').pop()]=obj,sol(url)}
   if(ma_v.test(url)){
    obj=document.createElement('video')
    obj.onloadedmetadata=f/////////
   }else{
    obj=new Image()
    obj.onload =f
   }
   if(!obj)return /*o.debug('NG> '+url),*/sol(url)
   obj.onerror=()=>{/*o.debug('NG> '+url);*/sol(url) }
   obj.crossOrigin='anonymous'////
   obj.src=url ////
  })}
  ;
  function fontload(url){return new Promise(sol=>{
   let head=document.querySelector('head')
   let linktype=url.split('.').pop().toLowerCase() //
   let map={
    'otf':'opentype'
    ,'ttf':'truetype'
    ,'woff':'woff'
    ,'eot':'eot'  
   }
   let type=map[linktype]||'truetype'

   let fn={}
   fn.i3=(d)=>{
    if(typeof d !=='string') return d
    var el=document.createElement('table'); el.innerHTML=d.trim();
    var me=el.childNodes[0]
    el=void 0;
    return me
   }

   let link=`<link rel="preload" href="${url}" as="font" type="font/${linktype}" crossorigin="anonymous">`
   let style=`<style>@font-face {font-family:exp; src: url('${url}') format('${type}');}</style>`
   let ell=fn.i3(link)
   let els=fn.i3(style)
   ell.onload=()=>{ 
    return sol(url)
   }
   ell.onerror=()=>{sol(url) }
   document.head.appendChild(ell) //
   document.head.appendChild(els)

  })} 

 }
 function colorBack(color){
  let w=WOO_CTX.canvas.width,h=WOO_CTX.canvas.height
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  canvas.width = w
  canvas.height = h
  ctx.fillStyle = color //makecolor(color,ctx);///r030
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas
 }
 function copyImage(img,color,operation,alpha) {
  let is={}
  is.string = function(obj){return toString.call(obj) === '[object String]'}

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d');
  canvas.width = img.width
  canvas.height = img.height;
  if(color){
   alpha=alpha||1
   operation=operation||'saturation'
   ctx.globalAlpha=alpha
   if(is.string(color)){
    //color
    ctx.fillStyle = color //makecolor(color,ctx);///r030
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = operation
   }else{
    //image
    ctx.drawImage(color,0,0,canvas.width,canvas.height)
    ctx.globalCompositeOperation = operation
   }
   ctx.globalAlpha=1
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
 } 
 function dotback(w,h,r,g,b,a){
  r=r||0,g=g||0,b=b||0,a=a||255
  let canvas=document.createElement('canvas')
  canvas.width=w,canvas.height=h
  let ctx=canvas.getContext('2d')
  let dat=ctx.getImageData(0,0,w,h)
  for(let y=1;y<h;y+=2)
   for(let x=1;x<w;x+=2)
    drawPixel(x,y,r,g,b,a)
  ctx.putImageData(dat,0,0)
  return canvas
  ;
  //local
  function drawPixel (x, y, r, g, b, a) {
   var index = (x + y * w) * 4;
   dat.data[index + 0] = r;
   dat.data[index + 1] = g;
   dat.data[index + 2] = b;
   dat.data[index + 3] = a;
  }
  //
 }

}
