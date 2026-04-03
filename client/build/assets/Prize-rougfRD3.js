import{c as y,r as s,j as e}from"./index-aFQCefr6.js";/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],c=y("star",C);/**
 * @license lucide-react v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]],p=y("trophy",Y),W=()=>{const[i,w]=s.useState(!1),[v,f]=s.useState(!1),j=s.useRef(null),d=s.useRef(null),N=50,u=s.useRef(!1),[X,_]=s.useState({x:15,y:-15}),o=s.useRef([]),l=(()=>{const[t,a]=s.useState(!1);return s.useEffect(()=>{const r=()=>{a(window.innerWidth<640)};return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[]),t})(),[A,z]=s.useState(typeof window<"u"?window.innerWidth:0);s.useEffect(()=>{const t=()=>{z(window.innerWidth)};return window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[]);const x=(t,a)=>{if(!o.current[a]||l)return;const r=o.current[a],n=r.getBoundingClientRect(),m=t.clientX-n.left,S=t.clientY-n.top,b=n.width/2,g=n.height/2,R=(m-b)/b*15,L=(S-g)/g*-15;r.style.transform=`
      perspective(1000px) 
      rotateX(${L}deg) 
      rotateY(${R}deg)
    `},h=t=>{o.current[t]&&(o.current[t].style.transform=`
      perspective(1000px) 
      rotateX(15deg) 
      rotateY(-15deg)
    `)};s.useEffect(()=>{const t=a=>{o.current[a]&&(o.current[a].style.transform=`
        perspective(1000px) 
        rotateX(20deg) 
        rotateY(-5deg)
        scale(1.05)
      `,setTimeout(()=>{o.current[a]&&(o.current[a].style.transform=`
            perspective(1000px) 
            rotateX(15deg) 
            rotateY(-15deg)
          `)},500))};return o.current.forEach((a,r)=>{a&&a.addEventListener("touchstart",()=>t(r))}),()=>{o.current.forEach(a=>{a&&a.removeEventListener("touchstart",t)})}},[i]),s.useEffect(()=>{const t=new IntersectionObserver(a=>{const[r]=a;if(r.isIntersecting&&!u.current){u.current=!0,w(!0),f(!0);const n=setTimeout(()=>{f(!1)},7e3);return()=>clearTimeout(n)}},{root:null,threshold:.3,rootMargin:"0px"});return d.current&&t.observe(d.current),()=>{d.current&&t.unobserve(d.current)}},[]);const M=()=>Array.from({length:N}).map((t,a)=>{const r=Math.random()*10+5,n=Math.floor(Math.random()*5),m=["bg-yellow-400","bg-gray-300","bg-amber-700","bg-blue-400","bg-white"];return{id:a,left:`${Math.random()*100}%`,width:`${r}px`,height:`${r*(Math.random()*.8+.2)}px`,color:m[n],delay:`${Math.random()*5}s`,duration:`${Math.random()*3+5}s`,rotation:`${Math.random()*360}deg`,rotationSpeed:`${Math.random()*10+5}s`,rotationDirection:Math.random()>.5?"normal":"reverse",shape:Math.random()>.7?"rounded-full":Math.random()>.5?"rounded":""}}),k=t=>Array.from({length:t}).map((a,r)=>({id:r,size:Math.random()*6+2,left:Math.random()*100,top:Math.random()*100,animationDelay:`${Math.random()*3}s`,animationDuration:`${1+Math.random()*3}s`})),$=t=>Array.from({length:t}).map((a,r)=>{const n=Math.random()*30+20,m=Math.random()>.7?"trophy":Math.random()>.5?"coin":"star";return{id:r,type:m,size:n,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*5}s`,animationDuration:`${15+Math.random()*20}s`,opacity:Math.random()*.2+.05,rotation:Math.random()*360}}),Z=s.useMemo(()=>M(),[]),E=s.useMemo(()=>k(12),[]),D=s.useMemo(()=>$(6),[]);return e.jsxs("div",{className:"relative bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] p-8 pt-12 pb-20 text-center flex flex-col items-center overflow-hidden min-h-screen",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-radial-gradient opacity-70"}),e.jsxs("div",{className:"absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full",children:[e.jsx("div",{className:"light-beam light-beam-1"}),e.jsx("div",{className:"light-beam light-beam-2"}),e.jsx("div",{className:"light-beam light-beam-3"})]}),D.map(t=>e.jsx("div",{className:"absolute floating-element",style:{left:t.left,top:t.top,opacity:t.opacity,animationDelay:t.animationDelay,animationDuration:t.animationDuration},children:t.type==="trophy"?e.jsx(p,{style:{width:`${t.size}px`,height:`${t.size}px`,transform:`rotate(${t.rotation}deg)`},className:"text-yellow-300"}):t.type==="coin"?e.jsx("div",{className:"rounded-full bg-yellow-400",style:{width:`${t.size}px`,height:`${t.size}px`,boxShadow:"inset 0 0 10px rgba(0,0,0,0.3)"}}):e.jsx(c,{style:{width:`${t.size}px`,height:`${t.size}px`,transform:`rotate(${t.rotation}deg)`},className:"text-yellow-200"})},t.id)),E.map(t=>e.jsx("div",{className:"absolute sparkle",style:{width:`${t.size}px`,height:`${t.size}px`,left:`${t.left}%`,top:`${t.top}%`,animationDelay:t.animationDelay,animationDuration:t.animationDuration}},t.id)),e.jsx("div",{className:"absolute inset-0 particle-grid"})]}),v&&e.jsx("div",{ref:j,className:"fixed inset-0 pointer-events-none z-50 overflow-hidden",children:Z.map(t=>e.jsx("div",{className:`absolute top-0 ${t.color} ${t.shape} confetti-item`,style:{left:t.left,width:t.width,height:t.height,animationDelay:t.delay,animationDuration:t.duration,transform:`rotate(${t.rotation})`,opacity:0}},t.id))}),e.jsxs("div",{ref:d,className:"mb-8 md:mb-14 relative z-10",children:[e.jsxs("div",{className:"relative inline-block",children:[e.jsxs("h1",{className:"text-4xl md:text-6xl font-extrabold tracking-wider mb-3 text-white relative z-10",children:["PRIZE POOL",e.jsx("span",{className:"absolute -inset-1 bg-white-500 bg-opacity-30 blur-lg -z-10 rounded-lg"})]}),e.jsx("div",{className:"absolute -inset-4 bg-blue-400 bg-opacity-20 blur-xl -z-20 rounded-full pulse-slow"})]}),e.jsxs("div",{className:"text-lg md:text-2xl font-medium mb-2 text-white relative",children:["Total prize pool:",e.jsxs("span",{className:"relative inline-block ml-2",children:[e.jsx("span",{className:"text-yellow-400 font-extrabold text-3xl md:text-5xl tracking-wide relative z-10",children:"RM ?"}),e.jsx("span",{className:"absolute -inset-2 bg-yellow-400 bg-opacity-10 blur-md -z-10 rounded-lg pulse-glow"})]})]})]}),e.jsxs("div",{className:"w-full max-w-6xl mx-auto relative z-10 mb-8 md:mb-16",children:[e.jsx("div",{className:`w-full flex justify-center mb-4 md:mb-10 -mt-6 md:-mt-10 transition-all duration-1000 ${i?"opacity-100 transform-none":"opacity-0 -translate-y-10"}`,children:e.jsx("div",{className:"relative trophy-wrapper-3d",onMouseMove:t=>x(t,0),onMouseLeave:()=>h(0),children:e.jsxs("div",{ref:t=>o.current[0]=t,className:"trophy-container-3d relative",style:{transform:"perspective(1000px) rotateX(15deg) rotateY(-15deg)",transformStyle:"preserve-3d",transition:"transform 0.3s ease"},children:[e.jsx("div",{className:"absolute w-36 sm:w-48 h-8 sm:h-12 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"}),e.jsx("div",{className:"absolute -inset-6 bg-yellow-400/30 blur-3xl rounded-full z-0"}),e.jsx("div",{className:"absolute -inset-3 bg-yellow-300/40 blur-xl rounded-full z-0"}),e.jsxs("div",{className:"absolute inset-0 w-full h-full",style:{transform:"translateZ(5px)"},children:[e.jsx("div",{className:"laurel-left absolute left-0 w-12 sm:w-16 h-24 sm:h-32 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-90"}),e.jsx("div",{className:"laurel-right absolute right-0 w-12 sm:w-16 h-24 sm:h-32 bg-gradient-to-l from-yellow-300 to-yellow-500 opacity-90"})]}),e.jsx("div",{className:"absolute stars-container",style:{transform:"translateZ(15px)"},children:[...Array(5)].map((t,a)=>e.jsx(c,{className:"text-yellow-300 mx-1 star-3d",size:a%2===0?l?12:16:l?8:12},a))}),e.jsx("div",{className:"w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center relative z-10 mx-auto",style:{transform:"translateZ(20px)"},children:e.jsx("div",{className:"trophy-3d-gold",children:e.jsx(p,{className:"text-yellow-400 w-24 h-24 sm:w-32 sm:h-32 trophy-icon-3d"})})}),e.jsx("div",{className:"absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-600 flex items-center justify-center z-20 badge-3d",style:{transform:"translateZ(25px)"},children:e.jsx("span",{className:"text-white font-bold text-lg sm:text-xl",children:"#1"})}),e.jsx("div",{className:"absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12",style:{transform:"translateZ(10px)"},children:e.jsx("div",{className:"ribbon-blue-3d w-full h-full flex items-center justify-center",children:e.jsx("span",{className:"text-white font-bold text-xl sm:text-2xl",children:"RM?"})})})]})})}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-12 sm:gap-16 md:gap-32",children:[e.jsx("div",{className:`transition-all duration-1000 ${i?"opacity-100 transform-none":"opacity-0 -translate-x-10"}`,style:{transitionDelay:"200ms"},children:e.jsx("div",{className:"relative trophy-wrapper-3d",onMouseMove:t=>x(t,1),onMouseLeave:()=>h(1),children:e.jsxs("div",{ref:t=>o.current[1]=t,className:"trophy-container-3d relative",style:{transform:"perspective(1000px) rotateX(15deg) rotateY(-15deg)",transformStyle:"preserve-3d",transition:"transform 0.3s ease"},children:[e.jsx("div",{className:"absolute w-32 sm:w-44 h-8 sm:h-10 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"}),e.jsx("div",{className:"absolute -inset-4 bg-gray-300 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"}),e.jsxs("div",{className:"absolute inset-0 w-full h-full",style:{transform:"translateZ(5px)"},children:[e.jsx("div",{className:"laurel-left absolute left-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-r from-gray-200 to-gray-400 opacity-90"}),e.jsx("div",{className:"laurel-right absolute right-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-l from-gray-200 to-gray-400 opacity-90"})]}),e.jsx("div",{className:"absolute stars-container",style:{transform:"translateZ(15px)"},children:[...Array(5)].map((t,a)=>e.jsx(c,{className:"text-gray-300 mx-1 star-3d",size:a%2===0?l?10:14:l?6:10},a))}),e.jsx("div",{className:"w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center relative z-10 mx-auto",style:{transform:"translateZ(20px)"},children:e.jsx("div",{className:"trophy-3d-silver",children:e.jsx(p,{className:"text-gray-300 w-20 h-20 sm:w-28 sm:h-28 trophy-icon-3d"})})}),e.jsx("div",{className:"absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-gray-500 flex items-center justify-center z-20 badge-3d",style:{transform:"translateZ(25px)"},children:e.jsx("span",{className:"text-white font-bold text-lg sm:text-xl",children:"#2"})}),e.jsx("div",{className:"absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12",style:{transform:"translateZ(10px)"},children:e.jsx("div",{className:"ribbon-blue-3d w-full h-full flex items-center justify-center",children:e.jsx("span",{className:"text-white font-bold text-xl sm:text-2xl",children:"RM?"})})})]})})}),e.jsx("div",{className:`transition-all duration-1000 ${i?"opacity-100 transform-none":"opacity-0 translate-x-10"}`,style:{transitionDelay:"400ms"},children:e.jsx("div",{className:"relative trophy-wrapper-3d",onMouseMove:t=>x(t,2),onMouseLeave:()=>h(2),children:e.jsxs("div",{ref:t=>o.current[2]=t,className:"trophy-container-3d relative",style:{transform:"perspective(1000px) rotateX(15deg) rotateY(-15deg)",transformStyle:"preserve-3d",transition:"transform 0.3s ease"},children:[e.jsx("div",{className:"absolute w-32 sm:w-44 h-8 sm:h-10 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"}),e.jsx("div",{className:"absolute -inset-4 bg-amber-700 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"}),e.jsxs("div",{className:"absolute inset-0 w-full h-full",style:{transform:"translateZ(5px)"},children:[e.jsx("div",{className:"laurel-left absolute left-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-r from-amber-600 to-amber-800 opacity-90"}),e.jsx("div",{className:"laurel-right absolute right-0 w-10 sm:w-14 h-20 sm:h-28 bg-gradient-to-l from-amber-600 to-amber-800 opacity-90"})]}),e.jsx("div",{className:"absolute stars-container",style:{transform:"translateZ(15px)"},children:[...Array(5)].map((t,a)=>e.jsx(c,{className:"text-red-400 mx-1 star-3d",size:a%2===0?l?10:14:l?6:10},a))}),e.jsx("div",{className:"w-24 h-24 sm:w-36 sm:h-36 flex items-center justify-center relative z-10 mx-auto",style:{transform:"translateZ(20px)"},children:e.jsx("div",{className:"trophy-3d-bronze",children:e.jsx(p,{className:"text-amber-700 w-20 h-20 sm:w-28 sm:h-28 trophy-icon-3d"})})}),e.jsx("div",{className:"absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-4 border-amber-700 flex items-center justify-center z-20 badge-3d",style:{transform:"translateZ(25px)"},children:e.jsx("span",{className:"text-white font-bold text-lg sm:text-xl",children:"#3"})}),e.jsx("div",{className:"absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-10 sm:h-12",style:{transform:"translateZ(10px)"},children:e.jsx("div",{className:"ribbon-blue-3d w-full h-full flex items-center justify-center",children:e.jsx("span",{className:"text-white font-bold text-xl sm:text-2xl",children:"RM?"})})})]})})})]})]}),e.jsx("div",{className:"flex justify-center mt-6 sm:mt-10",children:e.jsx("div",{className:`transition-all duration-1000 ${i?"opacity-100 transform-none":"opacity-0 -translate-y-10"}`,style:{transitionDelay:"600ms"},children:e.jsx("div",{className:"relative trophy-wrapper-3d",onMouseMove:t=>x(t,3),onMouseLeave:()=>h(3),children:e.jsxs("div",{ref:t=>o.current[3]=t,className:"trophy-container-3d relative",style:{transform:"perspective(1000px) rotateX(15deg) rotateY(-15deg)",transformStyle:"preserve-3d",transition:"transform 0.3s ease"},children:[e.jsx("div",{className:"absolute w-28 sm:w-40 h-6 sm:h-8 rounded-full bg-black/20 blur-md -bottom-6 left-1/2 transform -translate-x-1/2 -z-10"}),e.jsx("div",{className:"absolute -inset-4 bg-blue-200 bg-opacity-30 blur-xl rounded-full z-0 trophy-glow"}),e.jsxs("div",{className:"absolute inset-0 w-full h-full",style:{transform:"translateZ(5px)"},children:[e.jsx("div",{className:"laurel-left absolute left-0 w-8 sm:w-12 h-16 sm:h-24 bg-gradient-to-r from-blue-100 to-blue-300 opacity-70"}),e.jsx("div",{className:"laurel-right absolute right-0 w-8 sm:w-12 h-16 sm:h-24 bg-gradient-to-l from-blue-100 to-blue-300 opacity-70"})]}),e.jsx("div",{className:"absolute stars-container",style:{transform:"translateZ(15px)"},children:[...Array(5)].map((t,a)=>e.jsx(c,{className:"text-blue-200 mx-1 star-3d",size:a%2===0?l?8:12:l?4:8},a))}),e.jsx("div",{className:"w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center relative z-10 mx-auto",style:{transform:"translateZ(20px)"},children:e.jsx("div",{className:"trophy-3d-honorable",children:e.jsx(p,{className:"text-blue-200 w-16 h-16 sm:w-24 sm:h-24 trophy-icon-3d"})})}),e.jsx("div",{className:"absolute -left-2 sm:-left-4 -bottom-2 sm:-bottom-4 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 border-4 border-orange-500 flex items-center justify-center z-20 badge-3d",style:{transform:"translateZ(25px)"},children:e.jsx("span",{className:"text-white font-bold text-base sm:text-lg",children:"#4"})}),e.jsx("div",{className:"absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-8 sm:h-10",style:{transform:"translateZ(10px)"},children:e.jsx("div",{className:"ribbon-blue-3d w-full h-full flex items-center justify-center",children:e.jsx("span",{className:"text-white font-bold text-lg sm:text-xl",children:"RM?"})})})]})})})}),e.jsx("div",{className:"max-w-2xl mx-auto bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg mt-20 relative z-10",children:e.jsx("p",{className:"text-lg font-medium text-white",children:"Join our competition for a chance to win these amazing prizes!"})}),e.jsx("style",{jsx:!0,children:`
        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 0%, rgba(79, 70, 229, 0.25) 0%, rgba(17, 24, 39, 0.2) 50%, rgba(15, 23, 42, 0) 100%);
        }
        
        .light-beam {
          position: absolute;
          width: 120px;
          height: 100%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.0));
          transform-origin: top center;
          animation: rotate-beam 20s infinite linear;
          opacity: 0.5;
        }
        
        .light-beam-1 {
          animation-duration: 30s;
          transform: rotate(30deg);
        }
        
        .light-beam-2 {
          animation-duration: 25s;
          animation-delay: -5s;
          transform: rotate(-20deg);
        }
        
        .light-beam-3 {
          animation-duration: 35s;
          animation-delay: -10s;
          transform: rotate(10deg);
        }
        
        @keyframes rotate-beam {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .floating-element {
          animation: float-around infinite ease-in-out;
          will-change: transform;
        }
        
        @keyframes float-around {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(0, -30px) rotate(0deg);
          }
          75% {
            transform: translate(-20px, -15px) rotate(-5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        
        .sparkle {
          background-color: white;
          border-radius: 50%;
          animation: twinkle-sparkle infinite ease-in-out alternate;
        }
        
        @keyframes twinkle-sparkle {
          0% {
            opacity: 0.1;
            transform: scale(0.8);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }
        
        .particle-grid {
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent255,255,0.15) 1px, transparent 1px),
            radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px, 25px 25px;
          background-position: 0 0, 12.5px 12.5px;
          animation: move-grid 60s linear infinite;
        }
        
        @keyframes move-grid {
          0% {
            background-position: 0 0, 12.5px 12.5px;
          }
          100% {
            background-position: 50px 50px, 62.5px 62.5px;
          }
        }
        
        .pulse-slow {
          animation: pulse-animation 4s infinite alternate;
        }
        
        .pulse-glow {
          animation: pulse-animation 2s infinite alternate;
        }
        
        @keyframes pulse-animation {
          0% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .trophy-glow {
          animation: glow-pulse 3s infinite alternate;
        }
        
        @keyframes glow-pulse {
          0% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        .glass-card {
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .laurel-left, .laurel-right {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 200'%3E%3Cpath d='M50,0 C20,40 20,160 50,200' stroke='black' strokeWidth='8' fill='none'/%3E%3C/svg%3E");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
        }

        .laurel-right {
          transform: scaleX(-1);
        }

        /* 3D Trophy Styles */
        .trophy-wrapper-3d {
          cursor: pointer;
          transition: all 0.3s ease;
          perspective: 1000px;
        }

        .trophy-container-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        /* Stars container for perfect alignment */
        .stars-container {
          top: -8px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .trophy-3d-gold {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(255, 215, 0, 0.3));
        }

        .trophy-3d-gold::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #ffd700, #ffcc00, #ffd700);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-silver {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(192, 192, 192, 0.3));
        }

        .trophy-3d-silver::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #e0e0e0, #c0c0c0, #e0e0e0);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-bronze {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(205, 127, 50, 0.3));
        }

        .trophy-3d-bronze::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #cd7f32, #b87333, #cd7f32);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-3d-honorable {
          position: relative;
          filter: drop-shadow(0 10px 15px rgba(173, 216, 230, 0.3));
        }

        .trophy-3d-honorable::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: linear-gradient(135deg, #add8e6, #87ceeb, #add8e6);
          border-radius: 50%;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .trophy-icon-3d {
          filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .trophy-icon-3d {
          filter: drop-shadow(0 0 12px currentColor);
          transform: translateY(-5px) scale(1.05);
        }

        .star-3d {
          filter: drop-shadow(0 0 5px currentColor);
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .star-3d {
          animation: twinkle-3d 1.5s infinite alternate;
          filter: drop-shadow(0 0 8px currentColor);
        }

        @keyframes twinkle-3d {
          0% {
            opacity: 0.7;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1.3) rotate(15deg);
          }
        }

        .badge-3d {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }

        .trophy-wrapper-3d:hover .badge-3d {
          transform: translateZ(25px) rotate(15deg) scale(1.1);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .ribbon-blue-3d {
          position: relative;
          background: linear-gradient(to right, #2563eb, #3b82f6, #60a5fa);
          clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          transform-style: preserve-3d;
        }

        .ribbon-blue-3d::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 30%;
          background: rgba(147, 197, 253, 0.3);
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Confetti Animation */
        .confetti-item {
          position: absolute;
          animation: confetti-fall linear forwards;
          will-change: transform, opacity;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh + 20px)) rotate(360deg);
            opacity: 0;
          }
        }

        /* Improved alignment for trophy elements */
        .trophy-wrapper-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ribbon-blue-3d {
          text-align: center;
        }

        @media (max-width: 640px) {
          .trophy-wrapper-3d {
            transform: scale(0.9);
          }
          
          .trophy-container-3d {
            margin-bottom: 1.5rem;
          }
          
          .stars-container {
            top: -6px;
          }
          
          .badge-3d {
            border-width: 3px;
          }
          
          .ribbon-blue-3d {
            font-size: 0.9rem;
          }
          
          /* Simplify animations on mobile for better performance */
          .light-beam {
            display: none;
          }
          
          .floating-element {
            opacity: 0.05 !important;
          }
          
          .particle-grid {
            background-size: 30px 30px, 15px 15px;
          }
        }
      `})]})};export{W as default};
