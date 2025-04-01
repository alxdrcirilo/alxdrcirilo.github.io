import{_ as f}from"./C1S0wPAS.js";import{A as m,D as p,o as b,c as g,a as n,t as r,b as t,g as h,w as d,e as a,h as v,f as _}from"./BlKfkwo0.js";const k=()=>m("color-mode").value,w={class:"container"},x={class:"row"},C={class:"three columns",align:"center"},N={id:"name"},A={id:"bio"},S={id:"icons"},I={id:"utils"},y={class:"nine columns"},B={name:"App",data(){return{author:"Alexandre Cirilo",bio:"Software engineer based in Amsterdam, the Netherlands."}}},D=Object.assign(B,{setup(H){const o=k(),l=p("fas fa-sun icon util-icon"),u=()=>{o.preference==="dark"?(o.preference="light",l.value="fas fa-moon icon util-icon"):(o.preference="dark",l.value="fas fa-sun icon util-icon")};return(e,i)=>{const c=f,s=_;return b(),g("div",null,[n("title",null,r(e.author),1),n("div",w,[n("div",x,[n("div",C,[n("header",null,[t(c,{id:"avatar",name:"avatar",alt:"Hi, that's me!",src:"/avatar.png",format:"webp"}),n("p",N,r(e.author),1),n("p",A,r(e.bio),1),n("div",S,[i[2]||(i[2]=n("div",{id:"socials"},[n("a",{id:"github-icon",name:"github icon",href:"https://github.com/alxdrcirilo",target:"_blank",rel:"icon","aria-label":"GitHub profile",class:"fab fa-github icon"}),n("a",{id:"instagram-icon",name:"instagram icon",href:"https://www.instagram.com/alxdrcirilo/",target:"_blank",rel:"icon","aria-label":"Instagram profile",class:"fab fa-instagram icon"}),n("a",{id:"linkedin-icon",name:"linked icon",href:"https://www.linkedin.com/in/alxdrcirilo/",target:"_blank",rel:"icon","aria-label":"LinkedIn profile",class:"fab fa-linkedin icon"})],-1)),n("div",I,[n("a",{rel:"icon",class:h(l.value),onClick:u},null,2),i[0]||(i[0]=n("a",{href:"/cv.pdf",name:"cv icon",rel:"icon","aria-label":"Curriculum vitae",class:"fas fa-file icon util-icon"},null,-1)),i[1]||(i[1]=n("a",{href:"/rss.xml",name:"rss icon",rel:"icon","aria-label":"RSS feed",class:"fas fa-rss icon util-icon"},null,-1))])]),i[6]||(i[6]=n("hr",{class:"delimiter"},null,-1)),n("nav",null,[n("ul",null,[n("li",null,[t(s,{id:"nav-button",to:"/"},{default:d(()=>i[3]||(i[3]=[a(" Home ")])),_:1})]),n("li",null,[t(s,{id:"nav-button",to:"/archive"},{default:d(()=>i[4]||(i[4]=[a(" Archive ")])),_:1})]),n("li",null,[t(s,{id:"nav-button",to:"/tags"},{default:d(()=>i[5]||(i[5]=[a(" Tags ")])),_:1})])])]),i[7]||(i[7]=n("hr",{class:"delimiter"},null,-1))])]),n("div",y,[v(e.$slots,"default"),i[8]||(i[8]=n("footer",null,[n("hr",{style:{"margin-bottom":"20px"}}),a(" © 2024 Alexandre Cirilo. Powered by "),n("a",{href:"https://nuxt.com/"},[n("strong",null,"Nuxt")]),a(". ")],-1))])])])])}}});export{D as default};
