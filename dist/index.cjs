"use strict";var w=Object.create;var l=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var C=(t,n,s,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of b(n))!j.call(t,e)&&e!==s&&l(t,e,{get:()=>n[e],enumerable:!(r=x(n,e))||r.enumerable});return t};var a=(t,n,s)=>(s=t!=null?w(S(t)):{},C(n||!t||!t.__esModule?l(s,"default",{value:t,enumerable:!0}):s,t));var c=a(require("fs"),1),f=a(require("crypto"),1);var y=a(require("fs"),1),g=a(require("axios"),1),L=async t=>{let n={object_key:t,file_type:"jpg",is_avatar:!0,content_type:"image/png"};try{return(await g.default.post(process.env.API,n)).data}catch{throw new Error("\u83B7\u53D6CDN\u63A5\u53E3\u4FE1\u606F\u5931\u8D25")}},d=async(t,n)=>{let s=await L(t),r=Object.keys(s)[0],e=s[r],o=y.default.createReadStream(n);return await g.default.put(r,o,{headers:{"Content-Type":e["Content-Type"],"x-obs-acl":e["x-obs-acl"],Host:e.Host},maxBodyLength:1/0,maxContentLength:1/0}),e["cdn-img-addr"]};var m=a(require("axios"),1),u=t=>{let n=f.default.createHash("md5"),s=c.default.readFileSync(t,"utf-8");return n.update(s),n.digest("hex")},H=()=>JSON.parse(c.default.readFileSync("./list.json","utf-8")),k=async()=>{let t={},{data:n}=await m.default.get("https://raw.githubusercontent.com/KarinJS/files/refs/heads/main/result.json"),s=H(),r=u(s[0].path),e=await d(r,s[0].path);t[r]={...s[0],url:e,time:Date.now()},s.shift(),await Promise.all(s.map(async o=>{let i=u(o.path),p=n[i];if(p&&(await m.default.head(p.url)).status===200){t[i]=p;return}let h=await d(i,o.path);t[i]={...o,url:h,time:Date.now()}})),c.default.writeFileSync("./result.json",JSON.stringify(t,null,2)),console.log(`\u{1F389} \u4E0A\u4F20\u6210\u529F \u5171 ${Object.keys(t).length} \u4E2A\u6587\u4EF6`)};k();
