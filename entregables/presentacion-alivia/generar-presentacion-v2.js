/* PptxGenJS 4.0.1 y sharp 0.35.5, declarados en package.json.
 * Desde la carpeta de entrega: node generar-presentacion-v2.js [salida].
 * ALIVIA_ROOT permite reconstruir desde otra ubicación. PNG originales de prototipos/.
 * Los recursos recortados se crean en el temporal del sistema y se incrustan en el PPTX.
 */
'use strict';
const pptxgen=require('pptxgenjs'),sharp=require('sharp'),fs=require('fs'),path=require('path'),os=require('os'),assert=require('assert/strict');
const ROOT=process.env.ALIVIA_ROOT||path.resolve(__dirname,'../..'),OUT=path.resolve(process.argv[2]||__dirname);
const W=16,H=9,C={navy:'123D4B',cyan:'007F99',pale:'E4F5FA',ink:'183B4A',muted:'4B6673',line:'D6E3E9',white:'FFFFFF',green:'126C4E',greenBg:'E9F7F0',amber:'8B590B',amberBg:'FFF5DC',red:'B83E48',redBg:'FFF0F1'};
const pptx=new pptxgen();pptx.defineLayout({name:'ALIVIA',width:W,height:H});pptx.layout='ALIVIA';
pptx.author='Equipo Alivía · Universidad Nacional de Piura';pptx.company='Universidad Nacional de Piura (UNP)';pptx.title='Alivía — Análisis y diseño del sistema · Revisión v2';pptx.subject='Ingeniería de Software';pptx.lang='es-PE';pptx.theme={headFontFace:'Segoe UI',bodyFontFace:'Segoe UI',lang:'es-PE'};
const S=pptx.ShapeType,meta=[],entities=[],relations=[];
function boxCheck(x,y,w,h){assert(x>=0&&y>=0&&w>0&&h>0&&x+w<=W+.001&&y+h<=H+.001,`Geometría inválida ${[x,y,w,h]}`);}
function t(s,str,x,y,w,h,size=20,extra={}){boxCheck(x,y,w,h);s.addText(str,{x,y,w,h,fontFace:'Segoe UI',fontSize:size,color:C.ink,margin:0,paraSpaceAfter:0,paraSpaceBefore:0,valign:'top',lang:'es-PE',...extra});}
function r(s,x,y,w,h,fill=C.white,border=C.line){boxCheck(x,y,w,h);s.addShape(S.rect,{x,y,w,h,fill:{color:fill},line:{color:border,width:.8}});}
function l(s,x1,y1,x2,y2,opt={}){assert([x1,x2].every(v=>v>=0&&v<=W)&&[y1,y2].every(v=>v>=0&&v<=H));s.addShape(S.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),flipH:x2<x1,flipV:y2<y1,line:{color:C.cyan,width:1.4,...opt}});}
function a(s,x1,y1,x2,y2,opt={}){l(s,x1,y1,x2,y2,{endArrowType:'triangle',...opt});}
function label(s,str,x,y,w,size=20,color=C.navy){t(s,str,x,y,w,.45,size,{bold:true,color});}
function footer(s,str){t(s,str,.6,8.4,14.8,.42,16,{color:C.muted});}
function para(s,title,body,x,y,w,h=1.6,size=20){label(s,title,x,y,w,22);t(s,body,x,y+.57,w,h-.57,size);}
function base(n,title,lead,sources,extra=''){
 const s=pptx.addSlide();s.background={color:C.white};t(s,title,.6,.35,14.35,.65,32,{bold:true,color:C.navy});t(s,String(n).padStart(2,'0'),15.03,.45,.37,.3,15,{color:C.cyan,align:'right'});if(lead)t(s,lead,.62,1.13,14.75,.52,20,{color:C.muted});
 meta.push({n,title,sources});s.addNotes(`Fuentes locales: ${sources}\n${extra}\nVersión revisada T05. Diseño de referencia; prototipos locales con datos ficticios. Fecha académica: 13 de octubre de 2026. Los cortes de demostración son del 18 y 20 de octubre.`);return s;
}
function node(s,title,body,x,y,w,h=1.35,fill=C.pale){r(s,x,y,w,h,fill);t(s,title,x+.15,y+.1,w-.3,.44,20,{bold:true,color:C.navy});t(s,body,x+.15,y+.59,w-.3,h-.65,18);}
function mark(s,n,x,y){s.addShape(S.ellipse,{x,y,w:.32,h:.32,fill:{color:C.white},line:{color:C.cyan,width:1.4}});t(s,String(n),x,y+.015,.32,.26,14,{bold:true,color:C.cyan,align:'center'});}
// Los bloques de entidades tienen texto nativo. Los campos FK y R mantienen la semántica documentada.
function entity(s,key,fields,x,y,w=3.9,h=1.65){r(s,x,y,w,h);r(s,x,y,w,.42,C.pale);t(s,key,x+.12,y+.035,w-.24,.34,17,{bold:true,color:C.navy});t(s,fields.join('\n'),x+.12,y+.55,w-.24,h-.59,14);const e={key,x,y,w,h};entities.push({slide:meta.length,...e,fields});return e;}
function edge(s,from,to,points,ends,dashed=false){for(let i=1;i<points.length;i++)l(s,...points[i-1],...points[i],{dashType:dashed?'dash':'solid',width:1.3});const p=points[0],pn=points[1],q=points.at(-1),qn=points.at(-2);if(points.length===2&&p[1]===q[1]&&q[0]-p[0]<1.1){t(s,ends.join(' : '),p[0]+.02,p[1]-.32,q[0]-p[0]-.04,.28,14);}else{const firstV=p[0]===pn[0],lastV=q[0]===qn[0];const sx=firstV?p[0]-.72:pn[0]>p[0]?p[0]+.04:p[0]-.7,sy=firstV&&pn[1]>p[1]?p[1]+.03:p[1]-.32;const ex=lastV?q[0]+.08:q[0]>qn[0]?q[0]-.7:q[0]+.06,ey=lastV&&q[1]<qn[1]?q[1]+.03:q[1]-.32;t(s,ends[0],sx,sy,.48,.28,14);t(s,ends[1],ex,ey,.48,.28,14);}relations.push({slide:meta.length,from:from.key,to:to.key,cardinalities:ends,logical:dashed});}
function erLegend(s,y=1.75){t(s,'PK: clave primaria UUID     FK: clave foránea interna     R: referencia lógica UUID     U: unicidad',.6,y,14.8,.29,15,{color:C.muted});t(s,'Línea continua: FK interna     Línea discontinua: referencia lógica',.6,y+.3,14.8,.27,14,{color:C.muted});}
async function cut(s,tmp,file,crop,x,y,w){const h=w*crop.height/crop.width,dest=path.join(tmp,`crop-${fs.readdirSync(tmp).length}.png`);await sharp(path.join(ROOT,'prototipos',file)).extract(crop).toFile(dest);boxCheck(x,y,w,h);s.addImage({path:dest,x,y,w,h,altText:`Recorte fiel de ${file}`});return {x,y,w,h,crop};}

async function main(){fs.mkdirSync(OUT,{recursive:true});const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'alivia-v2-'));try{
 // 01. Se conserva toda la información académica y se mejora su jerarquía.
 {
  const s=base(1,'','','T05, información académica; prototipos/00-sistema-diseno/identidad-visual.md');
  label(s,'Universidad Nacional de Piura (UNP)',.6,.6,14.7,26);t(s,'Curso: Ingeniería de Software',.6,1.2,14.7,.45,22,{color:C.muted});
  const logo='<svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 40 44"><path d="M20 3 35 9v12c0 9-15 18-15 18S5 30 5 21V9Z" fill="#e2f5fa" stroke="#007f99" stroke-width="2"/><path d="m11 23 6 5 12-14" fill="none" stroke="#007f99" stroke-width="3" stroke-linecap="round"/></svg>';
  s.addImage({data:'image/svg+xml;base64,'+Buffer.from(logo).toString('base64'),x:.65,y:2.05,w:.75,h:.825,altText:'Escudo de Alivía'});t(s,'Alivía',1.68,2,12,.9,48,{bold:true,color:C.navy});
  t(s,'Análisis y diseño de un sistema de coordinación\ny trazabilidad de ayuda humanitaria',.6,3.3,14.7,1.22,32,{color:C.navy});l(s,.6,5.03,15.4,5.03,{color:C.line,width:1});
  label(s,'Tarea grupal — Análisis y diseño del sistema',.6,5.37,14.7,23,C.cyan);label(s,'Integrantes',.6,6.15,2.6,20,C.muted);
  t(s,'Paucar Campoverder Kenyi Yair\nVillegas Saavedra Axel Alberto\nPanta Sanchez Eder Daniel\nInoñan González Justin Hafid',3.4,6.05,11.9,1.8,22,{lineSpacingMultiple:1.1});t(s,'13 de octubre de 2026',.6,8.42,12,.4,20,{color:C.muted});
 }
 // 02. Causas y efectos, sin tecnologías prematuras.
 {
  const s=base(2,'La fragmentación impide saber qué ayuda llegó','Lluvias intensas asociadas a El Niño en Piura','docs/00-definicion/01-problema-objetivos.md; docs/00-definicion/02-alcance-supuestos.md');
  label(s,'Registros dispersos',.6,2.05,4.1,24);t(s,'Las comunidades registran necesidades por separado. Cada ONG conoce su inventario, pero no el conjunto de la demanda.',.6,2.8,4.25,2.3,22);
  label(s,'Decisiones inciertas',5.8,2.05,4.1,24);t(s,'La coordinación pierde la relación entre lo solicitado, lo comprometido y lo recibido. Las restricciones de acceso cambian durante la atención.',5.8,2.8,4.1,2.45,22);
  label(s,'Consecuencias operativas',11.0,2.05,4.4,24);t(s,'Se dificulta evitar sobreasignaciones, identificar brechas y reconstruir responsables. Una entrega anunciada o un arribo puede confundirse con ayuda recibida conforme.',11.0,2.8,4.4,2.75,22);
  a(s,4.9,4.05,5.55,4.05);a(s,10.1,4.05,10.75,4.05);
  r(s,.6,6.62,14.8,.95,C.pale);t(s,'Coordinar decisiones y evidencias permite reconstruir la historia de cada recurso.',.85,6.84,14.3,.55,24,{bold:true,color:C.navy});
  footer(s,'Escenario académico ficticio: no se presentan cifras de daños ni boletines oficiales de un evento real.');
 }
 // 03. Define el sistema mediante la información y las decisiones que articula.
 {
  const s=base(3,'Alivía vincula necesidades, aportes y evidencias','Plataforma web de coordinación y trazabilidad de ayuda humanitaria','docs/00-definicion/01-problema-objetivos.md; docs/02-procesos/00-flujo-general.md');
  t(s,'Cada necesidad conserva su vínculo con las propuestas de las ONG, las salidas autorizadas y la verificación comunitaria. Esto permite consultar el estado de atención sin equiparar una intención de aporte con una entrega conforme.',.6,1.95,14.9,1.3,24);
  const rows=[['Necesidad','Comunidad, productos, unidades y cantidades requeridas.'],['Decisión de aporte','Origen, cantidades confirmadas, autorización y responsable.'],['Ejecución y resultado','Retiro, llegada, recepción física, conformidad y discrepancias.']];
  rows.forEach((v,i)=>{const y=3.65+i*1.1;l(s,.6,y-.15,15.4,y-.15,{color:C.line,width:.8});label(s,v[0],.6,y,4.0,24,C.cyan);t(s,v[1],5.0,y,10.4,.7,22);});
  footer(s,'Alcance del trabajo: análisis, diseño y prototipos locales. La plataforma no declara oficialmente emergencias.');
 }
 // 04. Fusión de alcance y actores, con límites operativos explícitos.
 {
  const s=base(4,'Cuatro roles comparten el proceso, con permisos distintos','Cada responsable opera sobre su entidad; la supervisión territorial mantiene acceso de lectura','docs/01-negocio/02-actores-responsabilidades.md; docs/03-requisitos/01-requisitos-funcionales.md');
  const xs=[.6,3.65,8.35,12.1],ws=[2.8,4.4,3.45,3.35];['Actor','Operación a su cargo','Información visible','Límite operativo'].forEach((v,i)=>label(s,v,xs[i],1.95,ws[i],19,C.cyan));
  const rows=[['Jefe de Comuna','Registra necesidades y confirma recepción.','Solicitudes y entregas propias.','No consulta stock privado.'],['Jefe de ONG','Gestiona inventario, decide aportes y autoriza.','Lotes y propuestas de su ONG.','No verifica recepción.'],['Jefe de Brigada','Verifica ruta, retira la carga y registra llegada.','Despachos asignados.','No cambia cantidades.'],['Jefe de Defensa Civil','Consulta riesgo, cobertura e informe final.','Visión territorial autorizada.','No modifica operaciones.']];
  rows.forEach((row,i)=>{const y=2.7+i*1.15;l(s,.6,y-.16,15.4,y-.16,{color:C.line,width:.8});row.forEach((v,j)=>t(s,v,xs[j],y,ws[j],.86,20,{bold:j===0,color:j===0?C.navy:C.ink}));});
  footer(s,'El backend debe aplicar rol y titularidad en cada operación; ocultar un menú no constituye autorización.');
 }
 // 05. Flujo por carriles; generación automática y acciones humanas diferenciadas.
 {
  const s=base(5,'De la solicitud a la recepción, cada hecho tiene un responsable','Seis macroprocesos; la supervisión acompaña toda la operación','docs/02-procesos/00-flujo-general.md; diagramas/02-casos-uso-procesos/; diagramas/04-secuencias-automaticas/');
  const xx=[3.2,5.68,8.16,10.64,13.12],ww=2.28;
  ['1. Solicitud','2. Matching','3. Confirmación\ny autorización','4. Traslado','5. Recepción'].forEach((v,i)=>t(s,v,xx[i],1.87,ww,.77,19,{bold:true,color:C.navy}));
  const ys=[2.85,3.95,5.05,6.15];['Comuna','Sistema','ONG','Brigada'].forEach((v,i)=>{label(s,v,.6,ys[i]+.12,2.1,20,C.muted);l(s,2.9,ys[i]+.9,15.4,ys[i]+.9,{color:C.line,width:.6});});
  const nodes=[[0,0,'Registra necesidades'],[1,1,'Genera propuestas'],[2,2,'Confirma y autoriza'],[3,3,'Retira y registra llegada'],[4,0,'Verifica recepción']];nodes.forEach(([col,row,tx])=>{r(s,xx[col],ys[row],ww,.83,row===1?C.pale:C.white);t(s,tx,xx[col]+.12,ys[row]+.13,ww-.24,.63,18,{bold:true,color:C.navy});});
  a(s,5.49,3.28,5.62,4.37);a(s,7.99,4.37,8.1,5.47);a(s,10.47,5.47,10.58,6.57);a(s,12.98,6.57,13.04,3.28);
  r(s,.6,7.47,10.6,.63,C.pale);t(s,'6. Supervisión: Defensa Civil consulta avance, riesgos y resultados.',.8,7.6,10.2,.36,19,{bold:true,color:C.navy});
  t(s,'Ingesta de observaciones\nComplemento informativo',11.8,7.43,3.6,.73,17,{color:C.muted});a(s,11.6,7.8,11.25,7.8,{dashType:'dash'});
  footer(s,'Una solicitud no necesita esperar una alerta externa. Las propuestas automáticas siempre requieren decisión de la ONG.');
 }
 // 06. Dos máquinas de estados y las guardas de transición.
 {
  const s=base(6,'Confirmar, autorizar, retirar y recibir son hechos distintos','Las transiciones tienen precondiciones y efectos sobre cantidades diferentes','docs/05-analisis/02-estados-transiciones.md; docs/01-negocio/03-reglas-negocio.md');
  label(s,'Decisión de aporte',.6,1.95,3.4,23);const px=[3.45,7.7,11.95];
  [['PROPOSED','Propuesta sin compromiso'],['CONFIRMED','Aporte aceptado sin compromiso'],['AUTHORIZED','Stock comprometido']].forEach((v,i)=>{node(s,v[0],v[1],px[i],2.05,3.45,1.25);if(i<2)a(s,px[i]+3.52,2.67,px[i+1]-.08,2.67);});
  a(s,5.15,3.35,5.15,3.76,{dashType:'dash',color:C.red});t(s,'REJECTED: rechazo motivado',3.45,3.88,5.3,.46,18,{color:C.red,bold:true});t(s,'Antes de autorizar se revalidan lotes y demanda pendiente.',9.0,3.82,6.4,.7,19);
  l(s,.6,4.78,15.4,4.78,{color:C.line,width:1});label(s,'Ejecución logística',.6,5.07,6.5,23);
  const dx=[.6,4.45,8.3,12.15];const ds=[['AUTHORIZED','Habilita el despacho.'],['WITHDRAWN','Retiro total con ruta vigente.'],['ARRIVED','Registra el arribo.'],['FINALIZED','Recepción comunitaria validada.']];
  ds.forEach((v,i)=>{node(s,v[0],v[1],dx[i],5.85,3.25,1.45);if(i<3)a(s,dx[i]+3.32,6.54,dx[i+1]-.08,6.54);});
  footer(s,'La recepción finaliza conforme o con observaciones. Un ciclo cerrado puede conservar necesidades no satisfechas.');
 }
 // 07. La información externa se separa de evaluación y atención.
 {
  const s=base(7,'Una observación aporta contexto; la atención se mide aparte','Las lluvias de El Niño requieren conservar procedencia, fecha e incertidumbre','docs/07-datos/05-territory.md; docs/08-comunicaciones/04-integraciones-externas.md; docs/09-interfaz/03-visualizacion-cartografica.md');
  para(s,'Incorporación controlada','SENAMHI es una fuente considerada para datos meteorológicos e hidrológicos. La ingesta valida procedencia, fecha, fenómeno y duplicados, respetando las condiciones de acceso.',.6,1.98,6.7,2.1,21);
  node(s,'Observación','Fuente, fecha\ny certeza.',8.15,2.0,3.2,1.65);a(s,11.43,2.85,12.0,2.85,{dashType:'dash'});node(s,'Evaluación de riesgo','Comunidad, fenómeno, nivel y fecha.',12.15,2.0,3.25,1.65);
  t(s,'Solo una evaluación respaldada y validada puede sustentar un nivel de riesgo.',8.15,4.05,7.25,.85,21);
  l(s,.6,5.27,15.4,5.27,{color:C.line,width:1});
  para(s,'Riesgo territorial','Describe un fenómeno y su severidad. Una entrega humanitaria no modifica automáticamente ese riesgo.',.6,5.72,6.7,1.75,22);
  para(s,'Atención humanitaria','Registra cantidades autorizadas, enviadas y conformes. Recibir ayuda no elimina un riesgo alto.',8.15,5.72,7.25,1.75,22);
  footer(s,'Los prototipos usan observaciones internas ficticias. La importación no declara emergencias ni autoriza recursos.');
 }
 // 08. Modelo conceptual: conceptos y verbos de dominio antes de tablas y claves.
 {
  const s=base(8,'El dominio distingue necesidad, compromiso, traslado y verificación','Modelo conceptual: entidades y responsabilidades, sin columnas ni decisiones de almacenamiento','docs/05-analisis/01-modelo-dominio.md; diagramas/05-estructura/EST-01-clases-dominio.puml');
  const positions=[['Comunidad','Es destinataria y origina necesidades.',.6,2.05],['Solicitud','Agrupa líneas de productos y cantidades.',5.7,2.05],['Propuesta','Relaciona una necesidad con lotes aptos.',10.8,2.05],['Lote de stock','Producto disponible en un almacén de ONG.',.6,4.65],['Autorización','Compromete el aporte aceptado.',10.8,4.65],['Despacho','Representa la salida de un almacén.',5.7,6.65],['Recepción','Verifica cantidad y condición recibidas.',.6,6.65]];
  positions.forEach(([nm,tx,x,y])=>node(s,nm,tx,x,y,4.6,1.35));
  a(s,5.26,2.7,5.63,2.7);a(s,10.36,2.7,10.73,2.7);a(s,13.1,3.47,13.1,4.58);a(s,10.73,5.7,10.37,7.3);a(s,5.63,7.3,5.26,7.3);
  l(s,2.9,4.58,2.9,3.92,{dashType:'dash'});l(s,2.9,3.92,12.1,3.92,{dashType:'dash'});a(s,12.1,3.92,12.1,3.47,{dashType:'dash'});t(s,'Los lotes respaldan las líneas propuestas',4.0,4.05,7.1,.35,17,{color:C.muted});
  t(s,'La emergencia contextualiza solicitudes.\nEl usuario mantiene rol y pertenencia.\nLa evaluación describe el riesgo,\nindependiente de la atención.',5.7,4.7,4.75,1.78,19);
  footer(s,'Una solicitud admite aportes de distintas ONG; cada autorización origina despachos y cada despacho tiene su verificación.');
 }
 // 09. Primera vista relacional: cabeceras, detalles y referencias de producto/lote.
 {
  const s=base(9,'Modelo ER: de la necesidad al lote propuesto','Vista 1: una línea de matching conecta una línea solicitada con un lote concreto','docs/07-datos/00-diagrama-er-global.md; 02-shelter.md; 03-inventory.md');erLegend(s);
  const com=entity(s,'shelter.community',['PK id','FK district_id'],.6,2.35),req=entity(s,'shelter.request',['PK id','FK community_id · emergency_id','R created_by_user_id'],6.05,2.35),mat=entity(s,'inventory.matching',['PK id','R request_id · ong_id','status'],11.5,2.35);
  const wh=entity(s,'inventory.warehouse',['PK id','R ong_id'],.6,4.55),ri=entity(s,'shelter.request_item',['PK id','FK request_id','R product_id','requested_quantity'],6.05,4.55),mi=entity(s,'inventory.matching_item',['PK id','FK matching_id · stock_id','R request_item_id','proposed_quantity · confirmed_quantity'],11.5,4.55);
  const pro=entity(s,'inventory.product',['PK id','FK category_id · unit_of_measure_id','delivery_multiple'],.6,6.75),stock=entity(s,'inventory.stock',['PK id','FK warehouse_id · product_id','physical_quantity · expires_on · status'],6.05,6.75),movement=entity(s,'inventory.movement',['PK id · U operation_key','FK stock_id · R dispatch_id','R actor_user_id','type · quantity_delta · created_at'],11.5,6.75);
  edge(s,com,req,[[4.5,3.15],[6.05,3.15]],['1','0..*']);edge(s,req,mat,[[9.95,3.15],[11.5,3.15]],['1','0..*'],true);edge(s,req,ri,[[8.0,4.0],[8.0,4.55]],['1','1..*']);edge(s,mat,mi,[[13.45,4.0],[13.45,4.55]],['1','1..*']);edge(s,ri,mi,[[9.95,5.35],[11.5,5.35]],['1','0..*'],true);edge(s,pro,stock,[[4.5,7.55],[6.05,7.55]],['1','0..*']);
  edge(s,pro,ri,[[4.5,7.12],[5.2,7.12],[5.2,5.72],[6.05,5.72]],['1','0..*'],true);edge(s,wh,stock,[[2.55,6.2],[2.55,6.48],[8.0,6.48],[8.0,6.75]],['1','0..*']);edge(s,stock,mi,[[9.6,6.75],[9.6,6.45],[13.45,6.45],[13.45,6.2]],['1','0..*']);edge(s,stock,movement,[[9.95,7.55],[11.5,7.55]],['1','0..*']);
  t(s,'UNIQUE(request_id, product_id); cantidades numeric(18,3); solicitado > 0; lotes USABLE.',.6,8.57,14.8,.3,14,{color:C.muted});
 }
 // 10. Continuidad entre autorización, líneas de envío y recepción final.
 {
  const s=base(10,'Modelo ER: cada salida y cada recepción conservan su detalle','Vista 2: las referencias enlazan los módulos sin convertirlas en FK físicas entre schemas','docs/07-datos/00-diagrama-er-global.md; 02-shelter.md; 03-inventory.md; 04-logistics.md');erLegend(s);
  const au=entity(s,'inventory.authorization',['PK id','FK matching_id [U]','U operation_key'],.6,2.35),d=entity(s,'logistics.dispatch',['PK id','R authorization_id · warehouse_id','R community_id · brigade_user_id','status · withdrawn_at · arrived_at'],6.05,2.35),rec=entity(s,'shelter.receipt',['PK id','FK request_id','R dispatch_id [U]','result · confirmed_at'],11.5,2.35);
  const mi=entity(s,'inventory.matching_item',['PK id','confirmed_quantity'],.6,4.58),di=entity(s,'logistics.dispatch_item',['PK id','FK dispatch_id','R matching_item_id [U]','authorized_quantity · withdrawn_quantity'],6.05,4.58),rei=entity(s,'shelter.receipt_item',['PK id','FK receipt_id · request_item_id','R dispatch_item_id [U]','received_quantity · conforming_quantity','missing_quantity'],11.5,4.58,3.9,1.8);
  const route=entity(s,'logistics.route',['PK id','FK dispatch_id','status · verified_at'],.6,6.78),doc=entity(s,'logistics.document',['PK id · FK dispatch_id','R receipt_id','U (dispatch_id, type)','file_location · checksum'],6.05,6.78),dis=entity(s,'shelter.discrepancy_report',['PK id','FK receipt_id [U]','description'],11.5,6.78);
  edge(s,au,d,[[4.5,3.15],[6.05,3.15]],['1','1..*'],true);edge(s,d,rec,[[9.95,3.15],[11.5,3.15]],['1','0..1'],true);edge(s,mi,di,[[4.5,5.38],[6.05,5.38]],['1','0..1'],true);edge(s,di,rei,[[9.95,5.38],[11.5,5.38]],['1','0..1'],true);edge(s,d,di,[[8,4],[8,4.58]],['1','1..*']);edge(s,rec,rei,[[13.45,4],[13.45,4.58]],['1','1..*']);
  // Interrupción intencional de la referencia discontinua: el cruce con la FK de ruta no es una unión.
  r(s,5.01,5.32,.18,.12,C.white,C.white);edge(s,d,route,[[6.05,3.68],[5.1,3.68],[5.1,7.58],[4.5,7.58]],['1','0..*']);
  edge(s,rec,dis,[[15.4,3.7],[15.7,3.7],[15.7,7.58],[15.4,7.58]],['1','0..1']);
  // La tabla document explicita sus FK/R; se omiten sus conectores para no cruzar las líneas de recepción.
  t(s,'Ruta: route_segment vincula route y road mediante FK; UNIQUE(route_id, sequence) conserva el orden.',.6,8.56,14.8,.3,14,{color:C.muted});
 }
 // 11. Propiedad, auditoría y evidencia territorial sin comprimirlos en el ER operativo.
 {
  const s=base(11,'Modelo ER: identidad y evidencia territorial tienen reglas propias','Vista 3: titularidad, auditoría e historial de riesgo; PK UUID y las mismas convenciones de las vistas previas','docs/07-datos/01-identity.md; docs/07-datos/02-shelter.md; docs/07-datos/05-territory.md');
  const user=entity(s,'identity.user',['PK id · U email','role','FK ong_id [U] · brigade_id [U]','R community_id [U]'],.6,2.2,3.4,1.9),audit=entity(s,'identity.audit_event',['PK id · U operation_key','FK actor_user_id','object_id · action · occurred_at'],4.75,2.2,3.1,1.9);
  const ong=entity(s,'identity.ong',['PK id · name'],.6,5.12,3.4,1.2),bri=entity(s,'identity.brigade',['PK id · name'],4.75,5.12,3.1,1.2);
  edge(s,user,audit,[[4,3.08],[4.75,3.08]],['1','0..*']);edge(s,ong,user,[[2.3,5.12],[2.3,4.1]],['1','0..1']);edge(s,bri,user,[[6.3,5.12],[6.3,4.64],[3.5,4.64],[3.5,4.1]],['1','0..1']);
  const com=entity(s,'shelter.community',['PK id'],8.5,2.2,2.8,1.2),risk=entity(s,'territory.risk',['PK id','R community_id','FK catastrophe_id · catastrophe_level_id','FK observation_id (opcional)','source · assessed_at'],12,2.2,3.4,2.12);
  const obs=entity(s,'territory.observation',['PK id','source · external_id · certainty','observed_at · ingested_at'],8.5,5.12,3.1,1.65),cat=entity(s,'territory.catastrophe',['PK id · U code','name'],12.3,5.12,3.1,1.65);
  edge(s,com,risk,[[11.3,2.8],[12,2.8]],['1','0..*'],true);edge(s,cat,risk,[[13.85,5.12],[13.85,4.32]],['1','0..*']);
  l(s,10.05,5.12,10.05,4.65);l(s,10.05,4.65,12.5,4.65);l(s,12.5,4.65,12.5,4.32);t(s,'FK opcional de sustento',8.5,4.35,3.2,.3,14,{color:C.muted});
  para(s,'Permisos verificables','CHECK según rol y pertenencias únicas. La auditoría agrega eventos; una corrección no borra la historia.',.6,7.02,7.2,1.2,18);
  para(s,'Evidencia fechada','UNIQUE(source, external_id) evita duplicados cuando hay ID de origen. El nivel se toma del catálogo catastrophe_level.',8.5,7.02,6.9,1.2,18);
  footer(s,'El informe final se conserva en shelter.final_report: emergency_id y operation_key únicos, snapshot inmutable al cierre.');
 }
 // 12. Conceptos primero: límites atómicos, concurrencia e idempotencia. El ejemplo queda como apoyo.
 {
  const s=base(12,'Control transaccional del inventario','Disponibilidad = stock físico utilizable − compromisos autorizados pendientes de retiro','docs/07-datos/06-integridad-transaccional.md; docs/07-datos/03-inventory.md; docs/07-datos/02-shelter.md');
  const xx=[.6,3.25,7.3],ww=[2.4,3.8,3.0];['Operación','Escrituras atómicas','Invariante'].forEach((v,i)=>label(s,v,xx[i],2.0,ww[i],19,C.cyan));
  const rows=[['Autorizar','Revalidar lotes y demanda; registrar autorización y compromiso.','Comprometido ≤ físico utilizable.'],['Retirar','Registrar movimiento WITHDRAWAL y transición WITHDRAWN.','Un descuento físico por operación.'],['Recepcionar','Registrar cabecera, líneas y discrepancias conjuntamente.','0 ≤ conforme\n≤ recibida ≤ enviada.']];
  rows.forEach((row,i)=>{const y=2.72+i*1.38;l(s,.6,y-.13,10.35,y-.13,{color:C.line,width:.8});row.forEach((v,j)=>t(s,v,xx[j],y,ww[j],1.1,20,{bold:j===0,color:j===0?C.navy:C.ink}));});
  l(s,10.8,1.95,10.8,7.75,{color:C.line,width:1});
  para(s,'Concurrencia','Bloqueo de filas o SERIALIZABLE\ncon reintentos impide exceder\nel stock utilizable.',11.25,2.0,4.15,1.55,19);
  para(s,'Idempotencia','Misma clave y contenido: resultado previo. Misma clave y datos distintos: conflicto 409.',11.25,4.05,4.15,1.55,19);
  para(s,'Trazabilidad','Actor, fecha y cambios se auditan\nen la transacción. Se conserva\nel historial de discrepancias.',11.25,6.1,4.15,1.65,19);
  t(s,'Ejemplo secundario: 80 físicos y 70 comprometidos dejan 10 disponibles; al retirar 70 quedan 10 físicos y cero comprometidos.',.6,7.24,9.75,.78,18,{color:C.muted});
  footer(s,'Los documentos se generan fuera de la transacción principal; un fallo permite reintentar sin revertir la recepción.');
 }
 // 13. Capas y contratos, con dominio independiente de infraestructura.
 {
  const s=base(13,'Una aplicación modular separa reglas y tecnología','Monolito modular NestJS en capas: simplifica desarrollo y despliegue, manteniendo límites funcionales','docs/06-arquitectura/01-arquitectura-logica.md; docs/06-arquitectura/02-decisiones-arquitectonicas.md; diagramas/05-estructura/EST-03-componentes.puml');
  node(s,'Frontend Next.js / React','Navegación por rol, formularios, mapas y estados visibles.',.6,2.0,4.0,1.8);t(s,'La interfaz no determina permisos ni saldos definitivos.',.6,4.35,4.0,1.13,21);
  r(s,5.35,1.89,10.05,5.86);label(s,'Backend NestJS · Una aplicación',5.57,2.07,9.6,23);
  node(s,'Presentación / API','Valida DTO, sesión, rol y titularidad; traduce resultados a HTTP.',5.6,2.85,9.55,1.12,C.white);
  node(s,'Aplicación','Orquesta casos de uso, contratos modulares, transacciones y eventos.',5.6,4.28,9.55,1.12,C.pale);
  node(s,'Dominio','Matching, disponibilidad, transiciones y conformidad sin depender de HTTP ni ORM.',5.6,5.71,5.38,1.65,C.white);
  node(s,'Infraestructura','Repositorios Prisma, PostgreSQL, archivos y adaptadores externos.',11.35,5.71,3.8,1.65,C.white);
  a(s,4.67,2.9,5.27,2.9);t(s,'HTTPS',4.64,2.45,.67,.3,14,{color:C.muted});a(s,10.2,4.02,10.2,4.21);a(s,8.2,5.45,8.2,5.64);a(s,13.2,5.45,13.2,5.64);
  a(s,13.2,7.42,13.2,7.9);t(s,'PostgreSQL · archivos · fuentes externas',9.4,7.98,6.0,.32,16,{color:C.muted});
  footer(s,'La capa de aplicación usa contratos; la infraestructura implementa el acceso. El dominio conserva las reglas al cambiar proveedores.');
 }
 // 14. Colaboraciones de negocio, no un grafo de dependencias privadas o microservicios.
 {
  const s=base(14,'Los módulos colaboran mediante contratos públicos','Las flechas representan coordinación de casos de uso, no dependencias circulares entre implementaciones','docs/06-arquitectura/01-arquitectura-logica.md; diagramas/05-estructura/EST-02-paquetes.puml; EST-03-componentes.puml');
  node(s,'Identity','Sesión, rol, pertenencia y auditoría transversal.',.6,1.94,4.2,1.5);t(s,'Los casos de uso coordinan los módulos; cada módulo conserva reglas y datos propios en su schema.',5.45,2.05,9.95,1.0,23,{bold:true,color:C.navy});
  const xx=[.6,6.05,11.5];[['Shelter','Comunidades, solicitudes, recepción e informe final.'],['Inventory','Productos, lotes, movimientos, matching y autorización.'],['Logistics','Despachos, rutas y retiros.\nLlegada y documentos.']].forEach((v,i)=>node(s,v[0],v[1],xx[i],3.89,3.9,1.65));
  a(s,4.56,4.5,5.98,4.5);t(s,'Necesidades',4.58,4.03,1.38,.33,14,{color:C.muted});a(s,10.01,4.5,11.43,4.5);t(s,'Autorización',10.01,4.03,1.42,.33,14,{color:C.muted});
  l(s,13.45,5.6,13.45,5.97);a(s,13.45,5.97,8,5.97);t(s,'Retiro: Logistics solicita descuento a Inventory',7.0,6.07,7.7,.38,17,{color:C.cyan});
  l(s,15.4,5.3,15.65,5.3);l(s,15.65,5.3,15.65,6.67);l(s,15.65,6.67,2.55,6.67);a(s,2.55,6.67,2.55,5.6);t(s,'Arribo: habilita recepción',3.0,6.3,3.6,.32,17,{color:C.cyan});
  node(s,'Territory','Observaciones y riesgo con fuente y fecha.',.6,6.91,4.2,1.35);node(s,'Consulta de supervisión','Combina Territory, Shelter y Logistics; excluye stock privado de ONG.',6.05,6.91,9.35,1.35);a(s,4.87,7.48,5.98,7.48);
  footer(s,'Al llegar, Logistics habilita la recepción en Shelter. Los contratos evitan acceder a repositorios privados de otros módulos.');
 }
 // 15. Topología cloud con límites de proveedores, dos aplicaciones y servicios de soporte.
 {
  const s=base(15,'La topología cloud separa aplicaciones y servicios de datos','Referencia propuesta: Vercel para Next.js, Render para NestJS y Supabase para PostgreSQL','docs/12-infraestructura/01-topologia-cloud.md; docs/12-infraestructura/03-servidor-web-cloud.md; diagramas/05-estructura/EST-04-despliegue.puml');
  node(s,'Navegador','Interfaz por rol.',.6,2.25,2.25,1.35);r(s,3.7,1.97,4.5,2.6);label(s,'Vercel',3.9,2.13,4.05,23);node(s,'Next.js','Web y proxy de servidor.',3.95,2.94,4.0,1.2,C.white);
  r(s,9.1,1.97,6.3,2.6);label(s,'Render',9.3,2.13,5.85,23);node(s,'NestJS','API REST y tareas internas idempotentes.',9.35,2.94,5.8,1.2,C.white);
  a(s,2.92,3.28,3.62,3.28);a(s,8.27,3.28,9.02,3.28);t(s,'HTTPS',2.91,2.78,.76,.31,14,{color:C.muted});t(s,'HTTPS',8.27,2.78,.76,.31,14,{color:C.muted});
  r(s,9.1,5.69,6.3,2.22);label(s,'Supabase',9.3,5.87,5.8,23);node(s,'PostgreSQL','Datos operativos.',9.35,6.53,2.65,1.12,C.white);node(s,'Storage candidato','XLSX y PDF.',12.3,6.53,2.85,1.12,C.white);a(s,10.7,4.64,10.7,5.62);a(s,13.7,4.64,13.7,5.62);t(s,'SQL / TLS',10.82,5.03,1.5,.32,15,{color:C.muted});t(s,'Acceso autorizado',13.82,5.03,1.55,.57,15,{color:C.muted});
  para(s,'Publicación y operación','Repositorios Git separados y CI/CD permiten publicar frontend y API por separado. La operación requiere monitoreo, límites de conexión y capacidad medida.',.6,5.22,7.6,2.05,21);
  footer(s,'Solo el backend guarda credenciales de datos e integraciones. La referencia no acredita un despliegue real ni una red privada contratada.');
 }
 // 16. Controles alrededor de la persistencia y un procedimiento de restauración verificable.
 {
  const s=base(16,'Persistir también exige proteger y poder restaurar','PostgreSQL administrado, acceso exclusivo del backend y continuidad planificada','docs/12-infraestructura/02-base-datos-cloud.md; docs/07-datos/06-integridad-transaccional.md');
  para(s,'Acceso y credenciales','Prisma es el ORM del backend. La conexión usa TLS, un pool dimensionado y privilegios mínimos; las cuentas de ejecución y migración son distintas.',.6,2.03,4.5,2.5,21);
  s.addShape(S.can,{x:5.65,y:2.08,w:4.7,h:3.3,fill:{color:C.pale},line:{color:C.cyan,width:1}});t(s,'PostgreSQL\nSupabase',6,2.65,4.0,.95,25,{bold:true,color:C.navy,align:'center'});t(s,'identity · shelter · inventory\nlogistics · territory',6,4.05,4.0,.8,18,{align:'center'});
  para(s,'Restricciones y evolución','FK, UNIQUE y CHECK se aplican\nen PostgreSQL. Las migraciones\nPrisma se complementan con SQL\npara restricciones e índices\nparciales.',11.0,2.03,4.5,2.5,21);
  t(s,'El navegador no recibe credenciales SQL. Los documentos binarios quedan fuera de la base; se registran ubicación y checksum.',.6,5.62,7.1,1.1,20);
  t(s,'Respaldo diario, retención de 30 días,\nensayo mensual. Pérdida máxima prevista:\n24 h de datos; recuperación del servicio: 8 h.',8.3,5.62,7.1,1.1,20);
  const xx=[.6,4.45,8.3,12.15];['Copia cifrada','Restaurar aislado','Conciliar registros y saldos','Probar acceso y recepción'].forEach((v,i)=>{r(s,xx[i],7.16,3.25,.7);t(s,v,xx[i]+.12,7.28,3.01,.45,17,{bold:true,color:C.navy});if(i<3)a(s,xx[i]+3.31,7.51,xx[i+1]-.07,7.51);});
  footer(s,'Son objetivos de diseño sujetos al plan y a pruebas. Iniciar el motor no basta para acreditar una recuperación correcta.');
 }
 // 17. Secuencia real de petición y retorno, con contrato y autenticación separados del transporte.
 {
  const s=base(17,'Del formulario a una operación confirmada','HTTPS protege el transporte; la API verifica identidad, permisos y datos antes de persistir','docs/08-comunicaciones/01-navegador-servidor.md; docs/08-comunicaciones/02-contratos-api.md; docs/08-comunicaciones/03-seguridad-comunicaciones.md');
  const cx=[2.25,6.08,9.91,13.74];['Navegador de Comuna','Next.js / proxy','API NestJS','PostgreSQL'].forEach((v,i)=>{r(s,cx[i]-1.65,1.97,3.3,.6,C.pale);t(s,v,cx[i]-1.53,2.08,3.06,.38,18,{bold:true,color:C.navy});l(s,cx[i],2.65,cx[i],6.26,{color:C.line,dashType:'dash',width:1});});
  a(s,cx[0],2.98,cx[1],2.98);t(s,'1  HTTPS · cookie protegida',2.4,2.65,3.5,.3,15);a(s,cx[1],3.63,cx[2],3.63);t(s,'2  POST /v1/requests · JSON',6.2,3.3,3.5,.3,15);
  r(s,8.5,3.92,2.85,.73);t(s,'Sesión, rol, comunidad,\nproductos y cantidades',8.62,4.05,2.61,.56,16,{bold:true,color:C.navy});a(s,cx[2],4.98,cx[3],4.98);t(s,'3  Transacción validada',10.05,4.65,3.5,.3,15);
  a(s,cx[3],5.51,cx[2],5.51,{dashType:'dash'});a(s,cx[2],5.84,cx[1],5.84,{dashType:'dash'});a(s,cx[1],6.17,cx[0],6.17,{dashType:'dash'});t(s,'4  Resultado persistido; retorno hasta la interfaz',4.0,6.3,10.8,.4,18,{bold:true,color:C.cyan});
  para(s,'Contrato REST','UUID, fechas UTC y cantidades decimales exactas. La comunidad se toma de la sesión, no del formulario.',.6,7.0,4.45,1.8,18);
  para(s,'Sesión y permisos','JWT validado por API; cookie HttpOnly, Secure y SameSite=Lax; protección CSRF. El permiso exige rol y titularidad.',5.7,7.0,4.45,1.8,18);
  para(s,'Confirmación o error','201 crea; 401/403 deniegan acceso; 422 valida datos; 409 indica conflicto. Ante duda de red se consulta antes de reintentar.',10.8,7.0,4.6,1.8,18);
 }
 // 18. Las decisiones de interfaz se vinculan con riesgos de operación y componentes reales.
 {
  const s=base(18,'La interfaz hace visibles permisos, unidades y consecuencias','Sistema de diseño compartido: Segoe UI, blanco, azul oscuro y cyan de Alivía','prototipos/00-sistema-diseno/identidad-visual.md; docs/09-interfaz/01-navegacion-roles.md; docs/09-interfaz/02-especificacion-interfaces.md');
  await cut(s,tmp,'01-solicitud/MK-02-registro-solicitud.png',{left:0,top:85,width:240,height:230},.6,2.0,2.7);
  await cut(s,tmp,'01-solicitud/MK-02-registro-solicitud.png',{left:272,top:555,width:845,height:331},4.0,2.0,7.2);
  await cut(s,tmp,'05-recepcion/MK-08-recepcion-variante.png',{left:272,top:421,width:845,height:176},4.0,5.24,7.2);
  para(s,'Guía por rol','El menú y la ubicación activa distinguen tareas. El servidor conserva los permisos efectivos.',11.9,2.0,3.5,2.0,19);
  para(s,'Validar cantidades','Producto, unidad y cantidad se revisan juntos, con errores por campo antes de confirmar.',11.9,4.5,3.5,2.0,19);
  t(s,'Las columnas distinguen enviado, recibido y conforme; los estados usan texto además de color. Alertas y mapas conservan fuente, fecha y detalle textual.',.6,7.7,14.8,.67,20);
 }
 // 19–25. Recortes fieles centrados en la tarea, con interpretación de decisiones y reglas.
 const mocks=[
  {n:19,title:'Comuna: registrar una necesidad verificable',lead:'MK-02 · El catálogo y las unidades convierten la solicitud en líneas comparables',file:'01-solicitud/MK-02-registro-solicitud.png',crop:{left:272,top:262,width:845,height:624},w:9.35,calls:[['Identidad vinculada','La cuenta fija la comunidad; población y situación describen su contexto de afectación.',[650,300]],['Líneas comparables','Producto, unidad y cantidad se validan juntos. Se rechazan duplicados y valores no positivos.',[650,590]],['Confirmación consciente','Se cotejan productos y cantidades. La solicitud confirmada ya no puede editarse.',[1070,800]]]},
  {n:20,title:'ONG: el matching propone; la organización decide',lead:'MK-04 · La propuesta explica el origen, la disponibilidad y los criterios de selección',file:'02-matching/MK-04-propuesta.png',crop:{left:272,top:262,width:845,height:592},w:9.35,calls:[['Vínculo con la necesidad','La solicitud de origen y el destino permiten verificar qué demanda se intenta cubrir.',[820,310]],['Criterios verificables','Producto y unidad coinciden; se usan lotes aptos y FEFO, priorizando el vencimiento más próximo.',[1075,700]],['Decisión sin compromiso','Confirmar o reducir no reserva stock. Rechazar exige motivo y deja elegible la porción nunca autorizada.',[1080,753]]]},
  {n:21,title:'ONG: autorizar es asumir un compromiso de stock',lead:'MK-05 · Confirmación y autorización son pasos separados para revalidar condiciones',file:'03-autorizacion/MK-05-autorizacion.png',crop:{left:272,top:262,width:845,height:588},w:9.35,calls:[['Cantidades ya confirmadas','La autorización conserva las cantidades aceptadas. No permite aumentarlas en este paso.',[1060,490]],['Validación atómica','Se revalidan disponibilidad, lotes y cobertura pendiente. Un conflicto impide registrar el compromiso.',[1080,620]],['Efecto explícito','El cotejo y la confirmación separan la decisión irreversible del descuento físico, que corresponde al retiro.',[1080,765]]]},
  {n:22,title:'Brigada: retirar exige una ruta vigente y carga completa',lead:'MK-07 · La verificación vial condiciona el retiro, sin acreditar una recepción conforme',file:'04-traslado/MK-07-ruta-traslado.png',crop:{left:272,top:262,width:1328,height:655},w:11.5,calls:[['Recorrido interpretable','Origen y destino;\ntramos y restricciones.',[690,475]],['Bloqueo conservador','UNKNOWN o IMPASSABLE y verificación vencida bloquean el retiro.',[1510,440]],['Hechos distintos','La brigada retira toda la carga y registra llegada; la comunidad verifica después.',[1510,820]]],foot:'La ruta es un esquema sin escala ni GPS. Una verificación menor a 30 minutos es una condición, no una garantía de tránsito.'},
  {n:23,title:'Comuna: recibir físicamente no equivale a recibir conforme',lead:'MK-08 · Variante final con discrepancias, vinculada al despacho llegado',file:'05-recepcion/MK-08-recepcion-variante.png',crop:{left:272,top:262,width:845,height:638},w:9.2,calls:[['Comparación por línea','Enviado, recibido y conforme tienen columnas distintas. El faltante se calcula sobre ese despacho.',[1080,450]],['Diferencias documentadas','Se registran 2 bidones faltantes y 2 frazadas dañadas. Las observaciones justifican cada discrepancia.',[1080,610]]],receipt:true},
  {n:24,title:'Defensa Civil: distinguir riesgo, atención y evidencia',lead:'MK-09 · Una misma comunidad conserva dimensiones territoriales independientes',file:'06-supervision/MK-09-mapa-territorial.png',crop:{left:272,top:292,width:1328,height:590},w:11.5,calls:[['Fenómeno y capas','Filtrar evita mezclar evaluaciones de desastres distintos.',[690,400]],['Atención independiente','Recibir ayuda no reduce el nivel registrado de inundación.',[1490,530]],['Procedencia visible','Fuente, fecha y verificación permiten valorar la evidencia disponible.',[1490,740]]],foot:'Defensa Civil consulta sin modificar operaciones. Las observaciones externas no equivalen a una declaración oficial de emergencia.'},
  {n:25,title:'El informe cierra la historia, no oculta las diferencias',lead:'MK-10 · La instantánea final consolida las etapas y conserva las brechas de satisfacción',file:'06-supervision/MK-10-informe-final.png',crop:{left:272,top:209,width:1328,height:658},w:11.5,calls:[['Cantidades conciliadas','118 de 120 bidones y 78 de 80 frazadas conformes; dos despachos finalizados.',[1020,570]],['Brechas diferentes','Sin autorizar: 0.\nBrecha de satisfacción:\n2 por producto.',[1490,610]]],conclusion:'Alivía coordina la ayuda mediante responsabilidades y procesos definidos, datos consistentes y una interfaz que permite verificar qué ocurrió con cada aporte.'}
 ];
 for(const m of mocks){const s=base(m.n,m.title,m.lead,`prototipos/${m.file}; prototipos/00-sistema-diseno/escenario-demostracion.md; docs/09-interfaz/02-especificacion-interfaces.md`,m.n===25?'Cierre por EMERGENCIA_FINALIZADA, preconfigurado al 20 de octubre 18:00; publicación 18:01. Una recepción conforme y otra con observaciones. 118 bidones físicos/conformes; 80 frazadas físicas y 78 conformes. El informe no es una operación de cierre de Defensa Civil.':m.n===23?'El PNG de variante es el final existente del repositorio. La recepción conserva discrepancias sin descontar inventario nuevamente ni reactivar matching. Documentos únicos XLSX/PDF tras finalizar; la imagen conserva el momento de verificación, anterior a su habilitación.':'La captura procede del PNG final del repositorio. Se omite el marco común para ampliar la tarea. Ningún control o dato ha sido reconstruido.');
  if(m.n===24)await cut(s,tmp,m.file,{left:272,top:208,width:490,height:67},.6,1.88,6.0);
  const frame=await cut(s,tmp,m.file,m.crop,.6,m.n===24?2.75:1.91,m.w),narrow=m.w>10,cx=narrow?12.65:10.6,cw=narrow?2.75:4.8;
  // Las marcas editables se superponen intencionalmente a espacios libres de las capturas.
  m.calls.forEach((v,i)=>{const y=2.15+i*(narrow?2.02:2.15);mark(s,i+1,cx,y);t(s,v[0],cx+.44,y-.01,cw-.44,.72,narrow?18:22,{bold:true,color:C.navy});t(s,v[1],cx,y+(narrow?.77:.87),cw,narrow?1.22:1.1,narrow?18:20);const px=frame.x+(v[2][0]-m.crop.left)/m.crop.width*frame.w,py=frame.y+(v[2][1]-m.crop.top)/m.crop.height*frame.h;if(px+.32<frame.x+frame.w&&py+.32<frame.y+frame.h)mark(s,i+1,px,py);});
  if(m.receipt){await cut(s,tmp,m.file,{left:1135,top:554,width:432,height:210},11.0,6.4,4.0);t(s,'Documentos únicos tras finalizar; generación reintentable.',10.6,8.4,4.8,.55,16);}
  if(m.foot)t(s,m.foot,.6,8.25,14.8,.55,18,{color:C.muted});
  if(m.conclusion)t(s,m.conclusion,.6,8.05,14.8,.8,21,{bold:true,color:C.navy});
 }
 assert.equal(pptx._slides.length,25);assert.deepEqual(meta.map(x=>x.n),Array.from({length:25},(_,i)=>i+1));
 assert(entities.length>=25&&relations.length>=20,'Modelado relacional insuficiente');
 await pptx.writeFile({fileName:path.join(OUT,'Alivia_Presentacion_Sistema_v2.pptx')});
 console.log(`25 diapositivas; ${entities.length} representaciones de entidades y ${relations.length} relaciones nativas.`);
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}}
main().catch(e=>{console.error(e);process.exitCode=1;});
