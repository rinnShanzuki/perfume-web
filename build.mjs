import fs from 'node:fs';
import {renderPage} from './src/templates.mjs';
fs.mkdirSync('dist/server',{recursive:true});
fs.mkdirSync('dist/.openai',{recursive:true});
const data=fs.readFileSync('src/data.mjs','utf8').replace(/^export /gm,'');
const templates=fs.readFileSync('src/templates.mjs','utf8').replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
const worker=fs.readFileSync('src/worker.mjs','utf8').replace(/^import .*;\r?\n/gm,'');
fs.writeFileSync('dist/server/index.js',[data,templates,worker].join('\n'));
fs.copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');
fs.cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
for(const path of ['/','/fragrances','/about','/scent-guide','/faq','/contact','/journal','/journal/finding-your-signature-scent']){const file=path==='/'?'dist/client/index.html':'dist/client'+path+'/index.html';fs.mkdirSync(file.slice(0,file.lastIndexOf('/')),{recursive:true});fs.writeFileSync(file,renderPage(path));}
fs.writeFileSync('dist/client/robots.txt','User-agent: *\nDisallow: /\n');
fs.writeFileSync('dist/client/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/','/fragrances','/about','/scent-guide','/faq','/contact','/journal'].map(path=>'<url><loc>https://aurea-parfums-premium.herrishuie.chatgpt.site'+path+'</loc></url>').join('')+'</urlset>');
console.log('Built eight public page layouts, the Journal editor, and database migration metadata.');
