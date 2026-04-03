var p=Object.defineProperty;var m=(o,i,t)=>i in o?p(o,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[i]=t;var r=(o,i,t)=>m(o,typeof i!="symbol"?i+"":i,t);import{R as u,j as e}from"./index-aFQCefr6.js";class b extends u.Component{constructor(t){super(t);r(this,"mediaPartners",[{id:1,name:"APU Forensics and Cyber Security Research Center - Student Section (FSeC-SS)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/FSEC LOGO - Natasha Najwa.png",description:"FSeC-SS connects students with industry experts to develop essential skills in cybersecurity and digital forensics through collaborative research and networking."},{id:2,name:"Chemical Engineering Undergraduate Club (CEUC)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/CEUC Logo (4) - CEUC Universiti Malaya.png",description:"CEUC is the official Chemical Engineering student club at UM, dedicated to supporting undergraduates through inclusive events, resources, and student-department communication."},{id:3,name:"Robotics Engineering Community (REC)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/REC LOGO - TAN YIN JIE JACQLINE.png",description:"REC is UM’s student-led robotics club, focusing on robot design and programming through competitive projects like Robocon."},{id:4,name:"ASHRAE UM Student Branch",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/ASHRAE - ASHRAE UM.PNG",description:"ASHRAE UM develops engineering talent in sustainable building technologies and HVAC&R through professional talks, competitions, and hands-on industry exposure."},{id:5,name:"Developer Student Clubs UniKL (DSC UNIKL)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC UNIKL LOGO copy - DSC UniKL.png",description:"DSC UniKL empowers students in AI and emerging technologies through hands-on workshops and industry-linked innovation projects."},{id:6,name:"IMechE UM Student Chapter",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/IMechE UMSC Logo - Transparent Bg - Cheah Ui Zhe.png",description:"IMechE UMSC is a large-scale student chapter at UM that prepares future mechanical engineers for global careers through industry networking and high-impact technical events."},{id:7,name:"UMHackathon 2026 (UMH2026)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/UMH2026 LOGO - UMHackathon.png",description:"UMHackathon is a PEKOM-led competition where teams build data science and machine learning MVPs to solve technical challenges."},{id:8,name:"UM Cybersecurity Summit 2026",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/UMCS Logo Dark.png",description:"UMCS 2026 is a joint-effort cybersecurity event on May 16th at UM, featuring technical workshops and CTF competitions."},{id:9,name:"Nuclear Engineering Student Society Universiti Teknologi Malaysia (NESS UTM)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/NESS (Transparent) - syahindah salikin.png",description:"NESS is a student-led nuclear engineering chapter at UTM that advances professional skills through global programs, industry visits, and technical debates."},{id:10,name:"The Institution of Engineers Malaysia Students Section UTHM (IEMSS UTHM)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/SAVE_20260317_240041 - Ting En Koay.jpg",description:"IEM-SS UTHM is a student-led organization dedicated to professional growth and community engagement for future engineers."},{id:11,name:"UM Makersclub",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/Makers Club PNG - See x.png",description:"UM Makers Club is a student-led community that turns ideas into reality through rapid prototyping and digital fabrication workshops."},{id:12,name:"Developer Student Club UTeM",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/DSC UTeM Background Free - Haris Suresh.png",description:"DSC is a university-based community for students interested in developer technologies. It provides a peer-to-peer learning environment where members build real-world solutions for local businesses and the community."},{id:13,name:"Google Developer Group on Campus Universiti Sains Malaysia (GDGoC USM)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/GDG On Campus - Horizontal - Light -Trans - Navitha M.png",description:"GDG on Campus USM advances student development by providing a platform for peer learning, interpersonal growth, and hands-on experience with Google technologies."},{id:14,name:"IT Society MMU Cyberjaya (ITS)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/ITS_logo - LAW CHIN XUAN.png",description:"IT Society MMU is a Cyberjaya-based student community dedicated to fostering passion for computer science through technical events and industry engagement."},{id:15,name:"UNIVERISITI MALAYA STUDENT UNION FACULTY OF ENGINEERING ",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/UMSU Faculty of Engineering - Lee Wen Qua.png",description:"KMUM is the official student voice at UM, dedicated to representing student interests in university governance and supporting student-led initiatives."},{id:16,name:"SYTNECH Organization",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/inbound7210120407090917791 - Th QL.png",description:"SYNTECH is a student-led community that empowers students to innovate and develop real-world skills through workshops, industry connections, and hands-on projects."},{id:17,name:"Universiti Malaya Shell Eco Marathon Team",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/IMG_9671 - umsem.png",description:"UM-SEM is a student-led engineering team that represents Universiti Malaya in the global Shell Eco-marathon competition, focusing on automotive innovation and efficiency."},{id:18,name:"Society of Petroleum Engineer UiTM Students Chapter (SPE-UiTM SC)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/SPE-UiTM SC LOGO NO BG - Zahiruddin Nazri.png",description:"SPE UiTM is an award-winning student chapter that bridges the gap between academia and the energy industry through technical workshops and professional networking."},{id:19,name:"Taylor's ADP Engineering Society",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/TES Logo - Joel John Tan.png",description:"Taylor's ADP Engineering Society fosters a vibrant community for future engineers through practical projects, industry insights, and cross-disciplinary collaboration."},{id:20,name:"Google Developer Student Club Segi University (GDSC Segi)",logo:"/logos/Organisation Logo  (png format & transparent background) (File responses)/GDSC SEGi University Horizontal color - Ng Su Ying.png",description:"GDSC is an inclusive student tech community focused on Google developer tools, hands-on projects, and peer learning."}]);r(this,"goToPrevious",()=>{if(this.state.isAnimating)return;const n=this.state.currentIndex===0?this.mediaPartners.length-1:this.state.currentIndex-1;this.setState({isAnimating:!0,direction:-1,animationKey:this.state.animationKey+1}),setTimeout(()=>{this.setState({currentIndex:n,isAnimating:!1})},700)});r(this,"goToNext",()=>{if(this.state.isAnimating)return;const n=this.state.currentIndex===this.mediaPartners.length-1?0:this.state.currentIndex+1;this.setState({isAnimating:!0,direction:1,animationKey:this.state.animationKey+1}),setTimeout(()=>{this.setState({currentIndex:n,isAnimating:!1})},700)});r(this,"goToSlide",t=>{if(this.state.isAnimating||t===this.state.currentIndex)return;const n=t>this.state.currentIndex?1:-1;this.setState({isAnimating:!0,direction:n,animationKey:this.state.animationKey+1}),setTimeout(()=>{this.setState({currentIndex:t,isAnimating:!1})},700)});this.state={currentIndex:0,direction:0,isAnimating:!1,animationKey:0}}render(){const{currentIndex:t,direction:n,animationKey:d,isAnimating:s}=this.state,c=this.mediaPartners[t],g=n>0?t===this.mediaPartners.length-1?0:t+1:t===0?this.mediaPartners.length-1:t-1,a=s?this.mediaPartners[g]:c;return e.jsxs("div",{children:[e.jsx("style",{jsx:!0,children:`
          @keyframes slideInRight {
            from {
              transform: translate3d(100px, 20px, 0) scale(0.7) rotate(10deg);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          @keyframes slideInLeft {
            from {
              transform: translate3d(-100px, 20px, 0) scale(0.7) rotate(-10deg);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
          }
          
          @keyframes slideOutRight {
            from {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
            to {
              transform: translate3d(100px, 20px, 0) scale(0.7) rotate(10deg);
              opacity: 0;
            }
          }
          
          @keyframes slideOutLeft {
            from {
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
            to {
              transform: translate3d(-100px, 20px, 0) scale(0.7) rotate(-10deg);
              opacity: 0;
            }
          }
          
          @keyframes slideInDownTitle {
            from {
              transform: translate3d(0, -50px, 0) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideInUpTitle {
            from {
              transform: translate3d(0, 50px, 0) scale(0.9);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes slideOutDownTitle {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, 50px, 0) scale(0.9);
              opacity: 0;
            }
          }
          
          @keyframes slideOutUpTitle {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, -50px, 0) scale(0.9);
              opacity: 0;
            }
          }
          
          @keyframes fadeInUp {
            from {
              transform: translate3d(0, 30px, 0) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
          }
          
          @keyframes fadeOutDown {
            from {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate3d(0, 30px, 0) scale(0.95);
              opacity: 0;
            }
          }
          
          .title-animate-in {
            animation: ${n>0?"slideInDownTitle":"slideInUpTitle"} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .logo-animate-in {
            animation: ${n>0?"slideInRight":"slideInLeft"} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards;
          }
          
          .description-animate-in {
            animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
          }
          
          .title-animate-out {
            animation: ${n>0?"slideOutUpTitle":"slideOutDownTitle"} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .logo-animate-out {
            animation: ${n>0?"slideOutLeft":"slideOutRight"} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .description-animate-out {
            animation: fadeOutDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .arrow-button:hover {
            transform: scale(1.1);
          }
          
          .arrow-button.left:hover {
            transform: scale(1.1) translateX(-5px);
          }
          
          .arrow-button.right:hover {
            transform: scale(1.1) translateX(5px);
          }
          
          .arrow-button:active {
            transform: scale(0.9);
          }
          
          .dot-button {
            height: 0.5rem;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            padding: 0;
            transition: width 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
          }
          
          .dot-button:hover {
            transform: scale(1.2);
          }
          
          .dot-active {
            width: 2.5rem;
            background-color: white;
          }
          
          .dot-inactive {
            width: 1.5rem;
            background-color: #4b5563;
          }
          
          .dot-inactive:hover {
            background-color: #9ca3af;
          }
          
          .slider-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .content-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 0 4rem;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .partner-content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          
          .partner-title {
            font-size: 1.75rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2rem;
            opacity: 0;
            width: 100%;
          }
          
          .partner-logo-container {
            background-color: white;
            border-radius: 1.5rem;
            padding: 1.5rem;
            width: 16rem;
            height: 12rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-bottom: 2rem;
            opacity: 0;
          }
          
          .partner-logo {
            width: auto;
            height: 100%;
            max-width: 90%;
            object-fit: contain;
          }
          
          .partner-description {
            text-align: center;
            max-width: 32rem;
            font-size: 1.125rem;
            line-height: 1.6;
            opacity: 0;
            width: 100%;
          }
        `}),e.jsx("div",{style:{backgroundColor:"black",color:"white",padding:"4rem 1rem",width:"100%",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsx("h1",{style:{fontSize:"3rem",fontWeight:"bold",textAlign:"center",marginBottom:"4rem"},children:"MEDIA PARTNERS"}),e.jsxs("div",{className:"slider-container",style:{position:"relative",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",minHeight:"400px"},children:[e.jsx("button",{onClick:this.goToPrevious,className:"arrow-button left",style:{position:"absolute",left:0,zIndex:10,padding:"1rem",color:"white",background:"none",border:"none",cursor:"pointer",transition:"transform 0.3s ease, color 0.3s ease"},"aria-label":"Previous partner",disabled:s,children:e.jsx("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})})}),e.jsx("div",{className:"content-container",children:e.jsxs("div",{className:"partner-content",style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:[e.jsx("h2",{className:"partner-title title-animate-in",children:a.name}),e.jsx("div",{className:"partner-logo-container logo-animate-in",children:e.jsx("img",{src:a.logo||"/placeholder.svg",alt:`${a.name} logo`,className:"partner-logo",loading:"lazy",decoding:"async",style:a.id===10?{width:"150%",height:"150%",objectFit:"contain"}:a.id===15?{width:"200%",height:"200%",objectFit:"contain"}:void 0})}),e.jsx("p",{className:"partner-description description-animate-in",children:a.description})]},`partner-${d}`)}),e.jsx("button",{onClick:this.goToNext,className:"arrow-button right",style:{position:"absolute",right:0,zIndex:10,padding:"1rem",color:"white",background:"none",border:"none",cursor:"pointer",transition:"transform 0.3s ease, color 0.3s ease"},"aria-label":"Next partner",disabled:s,children:e.jsx("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginTop:"4rem",gap:"0.5rem"},children:this.mediaPartners.map((h,l)=>e.jsx("button",{onClick:()=>this.goToSlide(l),className:`dot-button ${l===t?"dot-active":"dot-inactive"}`,"aria-label":`Go to slide ${l+1}`,disabled:s},l))})]})})]})}}export{b as default};
