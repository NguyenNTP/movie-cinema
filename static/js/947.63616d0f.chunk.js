"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[947],{3947:function(e,n,s){s.r(n),s.d(n,{default:function(){return x}});var t=s(9439),i=s(2791),c=s(9607),a=s(9603),r=s(8210),u=s(1717),l=s(7892),d=s.n(l),o=s(6442),f=s(9434),h=s(4069),m=s(7689),p=s(184);var x=function(){var e=(0,i.useState)(null),n=(0,t.Z)(e,2),s=n[0],l=n[1],x=(0,i.useState)([]),v=(0,t.Z)(x,2),j=v[0],Z=v[1],N=(0,f.v9)(h.oN),b=(0,i.useState)(null),g=(0,t.Z)(b,2),S=g[0],w=g[1],y=(0,o.ZP)(),I=(0,i.useState)(y),k=(0,t.Z)(I,2),C=k[0],D=k[1],T=(0,i.useState)(null),U=(0,t.Z)(T,2),V=U[0],E=U[1],H="DD/MM/YYYY",Y=(0,i.useState)([]),z=(0,t.Z)(Y,2),B=z[0],q=z[1],A=(0,i.useState)([]),F=(0,t.Z)(A,2),G=F[0],K=F[1],M=[],P=[],R=[],X=(0,m.s0)();return(0,i.useEffect)((function(){K(j),null!==S&&null!==j&&(M=j.filter((function(e){return e.cityId===S}))),null!==S&&null!==j&&K(M)}),[S]),(0,i.useEffect)((function(){j.map((function(e){return R.push(e.cityId)})),s&&(P=s.filter((function(e){return R.includes(e.id)}))),P!==[]&&l(P)}),[j]),(0,i.useEffect)((function(){var e=[],n=[];N&&N.filter((function(e){return!S||e.cityId===S})).filter((function(e){return!V||e.id===V})).map((function(n){return e.push(n.dates.filter((function(e){if(C)return e.showDate===C})),n.id)}));for(var s=0;s<e.length;s+=2)e[s].length>0&&n.push(e[s+1]);q(n)}),[N,C]),(0,i.useEffect)((function(){fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/city").then((function(e){return e.json()})).then((function(e){l(e),fetch("https://vietcpq.name.vn/U2FsdGVkX19udsrsAUnUBsRg8K4HmweHVb4TTgSilDI=/cinema/cinemas").then((function(e){return e.json()})).then((function(e){Z(e),K(e)}))}))}),[N]),N&&(0,p.jsxs)("div",{className:"Schedule",children:[(0,p.jsxs)(c.Z,{className:"Schedule-search fl fl-spw",children:[(0,p.jsx)(a.Z,{className:"search-box",xs:24,sm:12,xl:8,children:(0,p.jsx)(r.Z,{defaultValue:"C\u1ea3 n\u01b0\u1edbc",id:"find-citys",style:{width:200},size:"large",onChange:function(e){w(e),E(null)},children:s&&s.map((function(e){return(0,p.jsx)("option",{value:e.id,children:e.name},e.id)}))})}),(0,p.jsx)(a.Z,{className:"search-box",xs:24,sm:12,xl:8,id:"find-dates",children:(0,p.jsx)(u.Z,{allowClear:!1,onChange:function(e,n){D(n)},format:H,size:"large",defaultValue:d()(y,H)})}),(0,p.jsx)(a.Z,{className:"search-box",xs:24,sm:24,xl:8,id:"find-cinema",children:(0,p.jsx)(r.Z,{placeholder:"T\u1ea5t c\u1ea3 r\u1ea1p",value:V,size:"large",style:{width:200},onChange:function(e){E(e)},children:G.map((function(e){return(0,p.jsx)("option",{value:e.id,children:e.name},e.id)}))})})]}),(0,p.jsx)("div",{className:"Schedule-content",children:N.filter((function(e){return!S||e.cityId===S})).filter((function(e){return!V||e.id===V})).filter((function(e){if(B!==[])return B.includes(e.id)})).map((function(e){return(0,p.jsxs)("div",{className:"mb-60",children:[(0,p.jsx)("div",{className:" fs-13 title-cinema",children:(0,p.jsx)("h3",{children:e.name})}),e.dates.filter((function(e){if(C)return e.showDate===C})).map((function(n){return(0,p.jsx)("div",{className:"CardDay",children:(0,p.jsx)("div",{className:"boxDate",children:n.bundles.map((function(n){return(0,p.jsxs)(c.Z,{className:"",children:[(0,p.jsx)(a.Z,{span:5,children:(0,p.jsxs)("h5",{className:"sub",children:[(0,p.jsx)("span",{className:"sub t-upper",children:n.version})," - ",(s=n.caption,"sub"===s?"Ph\u1ee5 \u0111\u1ec1":"Thuy\u1ebft minh")]})}),(0,p.jsx)(a.Z,{span:19,className:"movie-time",children:n.sessions.map((function(n){return(0,p.jsx)("span",{onClick:function(){return s=n.sessionId,t=e.code,X("/Book-Ticket?cinemaId="+t+"&sessionId="+s),void localStorage.removeItem("seat");var s,t},children:n.showTime},n.sessionId)}))})]},n.version);var s}))})},n.showDate)}))]},e.name)}))})]})}}}]);
//# sourceMappingURL=947.63616d0f.chunk.js.map