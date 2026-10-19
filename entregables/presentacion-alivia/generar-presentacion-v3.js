/* PptxGenJS 4.0.1 y sharp 0.35.5, declarados en package.json.
 * Desde la carpeta de entrega: node generar-presentacion-v3.js [salida].
 * ALIVIA_ROOT permite reconstruir desde otra ubicación. PNG originales de prototipos/.
 * Los recursos recortados se crean en el temporal del sistema y se incrustan en el PPTX.
 */
'use strict';
const pptxgen=require('pptxgenjs'),sharp=require('sharp'),fs=require('fs'),path=require('path'),os=require('os'),assert=require('assert/strict');
const ROOT=process.env.ALIVIA_ROOT||path.resolve(__dirname,'../..'),OUT=path.resolve(process.argv[2]||__dirname);
const W=16,H=9,C={navy:'123D4B',cyan:'007F99',pale:'E4F5FA',ink:'183B4A',muted:'4B6673',line:'D6E3E9',white:'FFFFFF',green:'126C4E',greenBg:'E9F7F0',amber:'8B590B',amberBg:'FFF5DC',red:'B83E48',redBg:'FFF0F1'};
const pptx=new pptxgen();pptx.defineLayout({name:'ALIVIA',width:W,height:H});pptx.layout='ALIVIA';
pptx.author='Equipo Alivía · Universidad Nacional de Piura';pptx.company='Universidad Nacional de Piura (UNP)';pptx.title='Alivía — Análisis y diseño del sistema · Revisión v3';pptx.subject='Ingeniería de Software';pptx.lang='es-PE';pptx.theme={headFontFace:'Segoe UI',bodyFontFace:'Segoe UI',lang:'es-PE'};
// Cuadrícula común de v3. Las composiciones de v2 se adaptan al margen de 0,7 pulgadas.
const G={margin:.7,width:14.6,section:.28,title:.76,lead:1.46,rule:1.96,body:2.15,footer:8.48};
const X=x=>G.margin+(x-.6)*G.width/14.8, DX=w=>w*G.width/14.8;
const S=pptx.ShapeType,meta=[],entities=[],relations=[],pictures=[];
const HEADERS=[
 ['PORTADA','Alivía',''],
 ['CONTEXTO','La fragmentación impide saber qué ayuda llegó','Coordinación humanitaria ante lluvias intensas asociadas a El Niño en Piura.'],
 ['DESCRIPCIÓN DEL SISTEMA','Alivía vincula necesidades, aportes y evidencias','Solución web propuesta y alcance del análisis y diseño.'],
 ['ANÁLISIS','Actores, responsabilidades y permisos','Cuatro roles; cada operación exige rol y titularidad en el servidor.'],
 ['ANÁLISIS','Flujo de los macroprocesos','La solicitud inicia la atención; la supervisión acompaña todo el recorrido.'],
 ['ANÁLISIS','Estados, reglas de negocio y alertas externas','Las decisiones operativas y la evidencia territorial tienen efectos diferentes.'],
 ['MODELADO','Modelo conceptual del dominio','Cinco dominios conectan identidad, necesidades, recursos, transporte y evidencia.'],
 ['MODELADO','Modelo ER: solicitudes, inventario y matching','La línea propuesta vincula una necesidad concreta con un lote utilizable.'],
 ['MODELADO','Modelo ER: autorización, logística y recepción','Cabeceras, detalles y referencias conservan la continuidad de cada aporte.'],
 ['MODELADO','Integridad transaccional y trazabilidad','Disponibilidad = stock físico utilizable − compromisos autorizados pendientes de retiro.'],
 ['ARQUITECTURA','Organización lógica por capas','Frontend independiente y un backend NestJS: monolito modular organizado en capas.'],
 ['ARQUITECTURA','Colaboración entre módulos','Contratos públicos y casos de uso coordinan responsabilidades sin compartir repositorios privados.'],
 ['INFRAESTRUCTURA','Servidor web y topología cloud','Referencia propuesta: Vercel para Next.js, Render para NestJS y Supabase para PostgreSQL.'],
 ['INFRAESTRUCTURA','Persistencia cloud, seguridad y recuperación','El backend accede a PostgreSQL; la continuidad exige restaurar y conciliar los datos.'],
 ['COMUNICACIONES','Del navegador a una operación persistida','HTTPS protege el transporte; la API autentica, autoriza y valida antes de confirmar.'],
 ['DISEÑO DE INTERFAZ','Sistema visual y registro de Comuna','MK-02 · Jerarquía por rol, identidad vinculada y cantidades comparables.'],
 ['DISEÑO DE INTERFAZ','ONG: evaluar el matching y autorizar la salida','MK-04 + MK-05 · Aceptar una propuesta y comprometer stock son decisiones distintas.'],
 ['DISEÑO DE INTERFAZ','Brigada y Comuna: del traslado a la recepción','MK-07 + MK-08 · Una llegada registrada habilita la verificación comunitaria.'],
 ['DISEÑO DE INTERFAZ','Defensa Civil: supervisión territorial','MK-09 · Riesgo, atención y evidencia se consultan como dimensiones independientes.'],
 ['RESULTADOS','Informe final y conclusión','MK-10 · La instantánea de cierre conserva lo entregado y las brechas de satisfacción.']
];
function boxCheck(x,y,w,h){assert(x>=.6&&y>=0&&w>0&&h>0&&x+w<=15.401&&y+h<=H+.001,`Geometría inválida ${[x,y,w,h]}`);}
function t(s,str,x,y,w,h,size=20,extra={}){boxCheck(x,y,w,h);s.addText(str,{x:X(x),y,w:DX(w),h,fontFace:'Segoe UI',fontSize:size,color:C.ink,margin:0,paraSpaceAfter:0,paraSpaceBefore:0,valign:'top',lang:'es-PE',...extra});}
function r(s,x,y,w,h,fill=C.white,border=C.line){boxCheck(x,y,w,h);s.addShape(S.rect,{x:X(x),y,w:DX(w),h,fill:{color:fill},line:{color:border,width:.8}});}
function l(s,x1,y1,x2,y2,opt={}){assert([x1,x2].every(v=>v>=0&&v<=W)&&[y1,y2].every(v=>v>=0&&v<=H));s.addShape(S.line,{x:X(Math.min(x1,x2)),y:Math.min(y1,y2),w:DX(Math.abs(x2-x1)),h:Math.abs(y2-y1),flipH:x2<x1,flipV:y2<y1,line:{color:C.cyan,width:1.4,...opt}});}
function a(s,x1,y1,x2,y2,opt={}){l(s,x1,y1,x2,y2,{endArrowType:'triangle',...opt});}
function label(s,str,x,y,w,size=20,color=C.navy){t(s,str,x,y,w,.45,size,{bold:true,color});}
function footer(s,str){t(s,str,.6,G.footer,14.8,.34,16,{color:C.muted});}
function para(s,title,body,x,y,w,h=1.6,size=20){label(s,title,x,y,w,22);t(s,body,x,y+.57,w,h-.57,size);}
function base(n,oldTitle,oldLead,sources,extra=''){
 const [section,title,lead]=HEADERS[n-1],s=pptx.addSlide();s.background={color:C.white};
 if(n!==1){
  t(s,section,.6,G.section,14,.35,19,{bold:true,color:C.cyan});
  t(s,title,.6,G.title,14.8,.58,30,{bold:true,color:C.navy});
  t(s,lead,.6,G.lead,14.8,.38,18,{color:C.muted});
  l(s,.6,G.rule,15.4,G.rule,{color:C.line,width:.8});
 }
 t(s,String(n).padStart(2,'0'),15.03,G.section,.37,.3,15,{color:C.cyan,align:'right'});
 meta.push({n,section,title,sources});s.addNotes(`Fuentes locales: ${sources}\n${extra}\n${oldLead}\nRevisión T06: se conserva y consolida el contenido de v2. Diseño de referencia; prototipos locales con datos ficticios. Fecha académica: 13 de octubre de 2026. Los cortes de demostración son del 18 y 20 de octubre.`);return s;
}
function node(s,title,body,x,y,w,h=1.35,fill=C.pale){r(s,x,y,w,h,fill);t(s,title,x+.15,y+.1,w-.3,.44,20,{bold:true,color:C.navy});t(s,body,x+.15,y+.59,w-.3,h-.65,18);}
function mark(s,n,x,y){s.addShape(S.ellipse,{x:X(x),y,w:DX(.32),h:DX(.32),fill:{color:C.white},line:{color:C.cyan,width:1.4}});t(s,String(n),x,y+.015,.32,.26,14,{bold:true,color:C.cyan,align:'center'});}
// Los bloques de entidades tienen texto nativo. Los campos FK y R mantienen la semántica documentada.
function entity(s,key,fields,x,y,w=3.9,h=1.65){r(s,x,y,w,h);r(s,x,y,w,.42,C.pale);t(s,key,x+.12,y+.035,w-.24,.34,17,{bold:true,color:C.navy});t(s,fields.join('\n'),x+.12,y+.55,w-.24,h-.59,14);const e={key,x,y,w,h};entities.push({slide:meta.length,...e,fields});return e;}
function edge(s,from,to,points,ends,dashed=false){for(let i=1;i<points.length;i++)l(s,...points[i-1],...points[i],{dashType:dashed?'dash':'solid',width:1.3});const p=points[0],pn=points[1],q=points.at(-1),qn=points.at(-2);if(points.length===2&&p[1]===q[1]&&q[0]-p[0]<1.1){t(s,ends.join(' : '),p[0]+.02,p[1]-.32,q[0]-p[0]-.04,.28,14);}else{const firstV=p[0]===pn[0],lastV=q[0]===qn[0];const sx=firstV?p[0]-.72:pn[0]>p[0]?p[0]+.04:p[0]-.7,sy=firstV&&pn[1]>p[1]?p[1]+.03:p[1]-.32;const ex=lastV?q[0]+.08:q[0]>qn[0]?q[0]-.7:q[0]+.06,ey=lastV&&q[1]<qn[1]?q[1]+.03:q[1]-.32;t(s,ends[0],sx,sy,.48,.28,14);t(s,ends[1],ex,ey,.48,.28,14);}relations.push({slide:meta.length,from:from.key,to:to.key,cardinalities:ends,logical:dashed});}
function erLegend(s){t(s,'PK: UUID   ·   FK: interna (continua)   ·   R: lógica entre módulos (discontinua)   ·   U: única',.6,2.07,14.8,.26,14,{color:C.muted});}
async function cut(s,tmp,file,crop,x,y,w){const h=DX(w)*crop.height/crop.width,dest=path.join(tmp,`crop-${fs.readdirSync(tmp).length}.png`);await sharp(path.join(ROOT,'prototipos',file)).extract(crop).toFile(dest);boxCheck(x,y,w,h);s.addImage({path:dest,x:X(x),y,w:DX(w),h,altText:`Recorte fiel de ${file}`});pictures.push({slide:meta.length,file,crop,x:X(x),y,w:DX(w),h});return {x,y,w,h,crop};}

async function main(){fs.mkdirSync(OUT,{recursive:true});const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'alivia-v3-'));try{
 // 01. Se conserva toda la información académica y se mejora su jerarquía.
 {
  const s=base(1,'','','T06, información académica; prototipos/00-sistema-diseno/identidad-visual.md');
  label(s,'Universidad Nacional de Piura (UNP)',.6,.6,14.7,26);t(s,'Curso: Ingeniería de Software',.6,1.2,14.7,.45,22,{color:C.muted});
  const logo='<svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 40 44"><path d="M20 3 35 9v12c0 9-15 18-15 18S5 30 5 21V9Z" fill="#e2f5fa" stroke="#007f99" stroke-width="2"/><path d="m11 23 6 5 12-14" fill="none" stroke="#007f99" stroke-width="3" stroke-linecap="round"/></svg>';
  s.addImage({data:'image/svg+xml;base64,'+Buffer.from(logo).toString('base64'),x:X(.65),y:2.05,w:DX(.75),h:DX(.825),altText:'Escudo de Alivía'});t(s,'Alivía',1.68,2,12,.9,48,{bold:true,color:C.navy});
  t(s,'Análisis y diseño de un sistema de coordinación\ny trazabilidad de ayuda humanitaria',.6,3.3,14.7,1.22,32,{color:C.navy});l(s,.6,5.03,15.4,5.03,{color:C.line,width:1});
  label(s,'Tarea grupal — Análisis y diseño del sistema',.6,5.37,14.7,23,C.cyan);label(s,'Integrantes',.6,6.15,2.6,20,C.muted);
  t(s,'Paucar Campoverder Kenyi Yair\nVillegas Saavedra Axel Alberto\nPanta Sanchez Eder Daniel\nInoñan González Justin Hafid',3.4,6.05,11.9,1.8,22,{lineSpacingMultiple:1.1});t(s,'13 de octubre de 2026',.6,8.42,12,.4,20,{color:C.muted});
 }
 // 02. Causas y efectos, sin tecnologías prematuras.
 {
  const s=base(2,'La fragmentación impide saber qué ayuda llegó','Lluvias intensas asociadas a El Niño en Piura','docs/00-definicion/01-problema-objetivos.md; docs/00-definicion/02-alcance-supuestos.md');
  label(s,'Registros dispersos',.6,2.15,4.1,24);t(s,'Las comunidades registran sus necesidades por separado. Cada ONG conoce su inventario, pero no toda la demanda.',.6,2.8,4.25,2.3,22);
  label(s,'Decisiones inciertas',5.8,2.15,4.1,24);t(s,'La coordinación pierde la relación entre lo solicitado, lo comprometido y lo recibido. Las restricciones de acceso cambian durante la atención.',5.8,2.8,4.1,2.45,22);
  label(s,'Consecuencias operativas',11.0,2.15,4.4,24);t(s,'Se dificulta evitar sobreasignaciones, identificar brechas y reconstruir responsables. Una entrega anunciada o un arribo puede confundirse con ayuda recibida conforme.',11.0,2.8,4.4,2.75,22);
  a(s,4.9,4.05,5.55,4.05);a(s,10.1,4.05,10.75,4.05);
  r(s,.6,6.62,14.8,.95,C.pale);t(s,'Coordinar decisiones y evidencias permite reconstruir la historia de cada recurso.',.85,6.84,14.3,.55,24,{bold:true,color:C.navy});
  footer(s,'Escenario académico ficticio: no se presentan cifras de daños ni boletines oficiales de un evento real.');
 }
 // 03. Define el sistema mediante la información y las decisiones que articula.
 {
  const s=base(3,'Alivía vincula necesidades, aportes y evidencias','Plataforma web de coordinación y trazabilidad de ayuda humanitaria','docs/00-definicion/01-problema-objetivos.md; docs/02-procesos/00-flujo-general.md');
  t(s,'Cada necesidad conserva su vínculo con las propuestas de las ONG, las salidas autorizadas y la verificación comunitaria. Esto permite consultar el estado de atención sin equiparar una intención de aporte con una entrega conforme.',.6,2.15,14.8,1.3,24);
  const rows=[['Necesidad','Comunidad, productos, unidades y cantidades requeridas.'],['Decisión de aporte','Origen, cantidades confirmadas, autorización y responsable.'],['Ejecución y resultado','Retiro, llegada, recepción física, conformidad y discrepancias.']];
  rows.forEach((v,i)=>{const y=3.65+i*1.1;l(s,.6,y-.15,15.4,y-.15,{color:C.line,width:.8});label(s,v[0],.6,y,4.0,24,C.cyan);t(s,v[1],5.0,y,10.4,.7,22);});
  para(s,'Alcance y límites','Análisis, diseño y prototipos locales. No declara emergencias ni administra vehículos, conductores o pagos.',.6,7.08,14.8,1.05,20);
  // El alcance operativo se incorpora a la descripción de la solución.
  // footer(s,'Alcance del trabajo: análisis, diseño y prototipos locales. La plataforma no declara oficialmente emergencias.');
 }
 // 04. Fusión de alcance y actores, con límites operativos explícitos.
 {
  const s=base(4,'Cuatro roles comparten el proceso, con permisos distintos','Cada responsable opera sobre su entidad; la supervisión territorial mantiene acceso de lectura','docs/01-negocio/02-actores-responsabilidades.md; docs/03-requisitos/01-requisitos-funcionales.md');
  const xs=[.6,3.65,8.35,12.1],ws=[2.8,4.4,3.45,3.3];['Actor','Operación a su cargo','Información visible','Límite operativo'].forEach((v,i)=>label(s,v,xs[i],2.15,ws[i],19,C.cyan));
  const rows=[['Jefe de Comuna','Registra necesidades y confirma recepción.','Solicitudes y entregas propias.','Sin acceso al stock.'],['Jefe de ONG','Gestiona inventario.\nDecide aportes y autoriza.','Lotes y propuestas de su ONG.','No verifica recepción.'],['Jefe de Brigada','Verifica ruta, retira la carga y registra llegada.','Despachos asignados.','No cambia cantidades.'],['Jefe de Defensa Civil','Consulta riesgo, cobertura e informe final.','Consulta territorial.','No modifica operaciones.']];
  rows.forEach((row,i)=>{const y=2.7+i*1.15;l(s,.6,y-.16,15.4,y-.16,{color:C.line,width:.8});row.forEach((v,j)=>t(s,v,xs[j],y,ws[j],.86,20,{bold:j===0,color:j===0?C.navy:C.ink}));});
  footer(s,'El backend debe aplicar rol y titularidad en cada operación; ocultar un menú no constituye autorización.');
 }
 // 05. Flujo por carriles; generación automática y acciones humanas diferenciadas.
 {
  const s=base(5,'De la solicitud a la recepción, cada hecho tiene un responsable','Seis macroprocesos; la supervisión acompaña toda la operación','docs/02-procesos/00-flujo-general.md; diagramas/02-casos-uso-procesos/; diagramas/04-secuencias-automaticas/');
  const xx=[3.2,5.68,8.16,10.64,13.12],ww=2.28;
  ['1. Solicitud','2. Matching','3. Confirmación\ny autorización','4. Traslado','5. Recepción'].forEach((v,i)=>t(s,v,xx[i],2.15,ww,.67,19,{bold:true,color:C.navy}));
  const ys=[2.85,3.95,5.05,6.15];['Comuna','Sistema','ONG','Brigada'].forEach((v,i)=>{label(s,v,.6,ys[i]+.12,2.1,20,C.muted);l(s,2.9,ys[i]+.9,15.4,ys[i]+.9,{color:C.line,width:.6});});
  const nodes=[[0,0,'Registra necesidades'],[1,1,'Genera propuestas'],[2,2,'Confirma y autoriza'],[3,3,'Retira y registra llegada'],[4,0,'Verifica recepción']];nodes.forEach(([col,row,tx])=>{r(s,xx[col],ys[row],ww,.83,row===1?C.pale:C.white);t(s,tx,xx[col]+.12,ys[row]+.13,ww-.24,.63,18,{bold:true,color:C.navy});});
  a(s,5.49,3.28,5.62,4.37);a(s,7.99,4.37,8.1,5.47);a(s,10.47,5.47,10.58,6.57);a(s,12.98,6.57,13.04,3.28);
  r(s,.6,7.47,10.6,.63,C.pale);t(s,'6. Supervisión: Defensa Civil consulta avance, riesgos y resultados.',.8,7.6,10.2,.36,19,{bold:true,color:C.navy});
  t(s,'Ingesta de observaciones\nComplemento informativo',11.8,7.43,3.6,.73,17,{color:C.muted});a(s,11.6,7.8,11.25,7.8,{dashType:'dash'});
  footer(s,'Una solicitud no necesita esperar una alerta externa. Las propuestas automáticas siempre requieren decisión de la ONG.');
 }

 // 06. Consolidación de v2: transiciones, guardas y observaciones externas.
 {
  const s=base(6,'','','docs/05-analisis/02-estados-transiciones.md; docs/01-negocio/03-reglas-negocio.md; docs/07-datos/05-territory.md; docs/08-comunicaciones/04-integraciones-externas.md','PROPOSED puede pasar a REJECTED solo con motivo. Confirmar o reducir no compromete stock. Autorizar revalida lotes USABLE y demanda pendiente. Retiro completo exige ruta vigente, sin UNKNOWN ni IMPASSABLE y verificación menor de 30 minutos. FINALIZED exige recepción única, conforme o con observaciones. Las discrepancias cerradas no reactivan matching. SENAMHI es una fuente considerada; no se acredita integración activa ni boletín oficial.');
  label(s,'Decisión de la ONG',.6,2.15,7.0,22);
  const px=[.6,5.7,10.8],pw=4.6;
  [['PROPOSED','Propone; no compromete.'],['CONFIRMED','Acepta cantidades; no reserva.'],['AUTHORIZED','Compromete stock disponible.']].forEach((v,i)=>{node(s,...v,px[i],2.72,pw,1.18);if(i<2)a(s,px[i]+pw+.06,3.3,px[i+1]-.07,3.3);});
  t(s,'REJECTED: rechazo motivado',.6,4.04,4.6,.35,18,{bold:true,color:C.red});t(s,'Antes de autorizar: revalidar disponibilidad y demanda.',5.7,4.04,9.7,.42,19);
  label(s,'Ejecución logística y verificación',.6,4.72,14.8,22);
  const dx=[.6,4.45,8.3,12.15];
  [['AUTHORIZED','Habilita el despacho.'],['WITHDRAWN','Retiro completo; descuenta.'],['ARRIVED','Llegada registrada.'],['FINALIZED','Recepción verificada.']].forEach((v,i)=>{node(s,...v,dx[i],5.28,3.25,1.28);if(i<3)a(s,dx[i]+3.32,5.89,dx[i+1]-.08,5.89);});
  l(s,.6,6.8,15.4,6.8,{color:C.line,width:.8});
  label(s,'Alertas externas: contexto verificable',.6,7.04,7.1,21);
  t(s,'Validar fuente, fecha, fenómeno y duplicados antes de vincular una observación a una evaluación.',.6,7.57,7.1,.75,20);
  label(s,'Riesgo territorial ≠ atención humanitaria',8.3,7.04,7.1,21);
  t(s,'Las alertas no declaran emergencias ni autorizan recursos. Recibir ayuda no reduce el riesgo registrado.',8.3,7.57,7.1,.75,20);
 }

 // 07. El recorrido conceptual de v2 incorpora Identity y Territory como relaciones del dominio.
 {
  const s=base(7,'','','docs/05-analisis/01-modelo-dominio.md; diagramas/05-estructura/EST-01-clases-dominio.puml; docs/07-datos/01-identity.md; docs/07-datos/05-territory.md','Modelo conceptual sin PK/FK. Identity: usuario con un rol y pertenencia exclusiva; ONG administra almacenes y Brigada ejecuta traslados. Shelter: comunidad, emergencia, solicitud, líneas, recepción e informe final. Inventory: productos, almacenes, lotes, propuestas y autorizaciones. Logistics: despachos, rutas y documentos. Territory: observaciones y evaluaciones por comunidad, desastre, nivel, fuente y fecha. El informe final es una instantánea al cierre.');
  r(s,.6,2.15,14.8,.66,C.pale);t(s,'Identity · Usuario, rol y pertenencia según permisos; ONG, Brigada y auditoría.',.8,2.3,14.4,.38,20,{bold:true,color:C.navy});
  a(s,2.2,2.87,2.2,3.35,{dashType:'dash'});
  [['Shelter',.6],['Shelter',4.5],['Inventory',8.4],['Inventory',12.3]].forEach(([nm,x])=>t(s,nm,x,3.08,3.1,.28,15,{bold:true,color:C.cyan}));
  const first=[['Comunidad','Origina necesidades.'],['Solicitud','Agrupa productos y cantidades.'],['Matching','Propone lotes aptos.'],['Autorización','Compromete el aporte.']];
  first.forEach((v,i)=>node(s,...v,[.6,4.5,8.4,12.3][i],3.48,[3.2,3.2,3.2,3.1][i],1.25));
  a(s,3.87,4.1,4.43,4.1);a(s,7.77,4.1,8.33,4.1);a(s,11.67,4.1,12.23,4.1);
  [['Territory',.6],['Shelter',4.5],['Inventory',8.4],['Logistics',12.3]].forEach(([nm,x])=>t(s,nm,x,5.08,3.1,.28,15,{bold:true,color:C.cyan}));
  node(s,'Evaluación de riesgo','Fenómeno, nivel y evidencia.',.6,5.48,3.2,1.25);node(s,'Recepción','Verifica físico y conforme.',4.5,5.48,3.2,1.25);node(s,'Lote de stock','Producto en almacén de ONG.',8.4,5.48,3.2,1.25);node(s,'Despacho','Retiro y traslado.',12.3,5.48,3.1,1.25);
  a(s,13.85,4.8,13.85,5.41);a(s,10,5.41,10,4.8);l(s,13.85,6.8,13.85,7.05);l(s,13.85,7.05,6.1,7.05);a(s,6.1,7.05,6.1,6.8);
  a(s,2.2,4.8,2.2,5.01);a(s,2.2,7.48,2.2,6.8);
  r(s,.6,7.55,14.8,.73,C.pale);t(s,'Territory · Observación → Evaluación de riesgo: comunidad, fenómeno, nivel, fuente y fecha.',.8,7.73,14.4,.4,20,{bold:true,color:C.navy});
  footer(s,'La emergencia contextualiza la solicitud. La identidad controla quién actúa; la evidencia territorial informa la supervisión.');
 }
 // 08. Primera vista relacional: cabeceras, detalles y referencias de producto/lote.
 {
  const s=base(8,'Modelo ER: de la necesidad al lote propuesto','Vista 1: una línea de matching conecta una línea solicitada con un lote concreto','docs/07-datos/00-diagrama-er-global.md; 02-shelter.md; 03-inventory.md; 01-identity.md; 05-territory.md','Identity: user tiene PK UUID, role, ong_id y brigade_id con FK internas y community_id como referencia lógica. CHECK por rol e índices UNIQUE parciales garantizan pertenencia exclusiva. Territory: risk tiene PK UUID y una comunidad [R]; catastrophe y catastrophe_level son FK internas, observation_id es opcional. Una comunidad admite cero o más evaluaciones. UNIQUE(request_id, product_id), requested_quantity > 0, numeric(18,3); solo lotes USABLE. Observaciones únicas por fuente e identificador externo.');erLegend(s);
  const com=entity(s,'shelter.community',['PK id','FK district_id'],.6,2.35),req=entity(s,'shelter.request',['PK id','FK community_id · emergency_id','R created_by_user_id'],6.05,2.35),mat=entity(s,'inventory.matching',['PK id','R request_id · ong_id','status'],11.5,2.35);
  const wh=entity(s,'inventory.warehouse',['PK id','R ong_id'],.6,4.55),ri=entity(s,'shelter.request_item',['PK id','FK request_id','R product_id','requested_quantity'],6.05,4.55),mi=entity(s,'inventory.matching_item',['PK id','FK matching_id · stock_id','R request_item_id','proposed_quantity · confirmed_quantity'],11.5,4.55);
  const pro=entity(s,'inventory.product',['PK id','FK category_id · unit_of_measure_id','delivery_multiple'],.6,6.75),stock=entity(s,'inventory.stock',['PK id','FK warehouse_id · product_id','physical_quantity · expires_on · status'],6.05,6.75),risk=entity(s,'territory.risk',['PK id · R community_id','FK catastrophe_id','FK catastrophe_level_id · observation_id','source · assessed_at'],11.5,6.75);
  edge(s,com,req,[[4.5,3.15],[6.05,3.15]],['1','0..*']);edge(s,req,mat,[[9.95,3.15],[11.5,3.15]],['1','0..*'],true);edge(s,req,ri,[[8.0,4.0],[8.0,4.55]],['1','1..*']);edge(s,mat,mi,[[13.45,4.0],[13.45,4.55]],['1','1..*']);edge(s,ri,mi,[[9.95,5.35],[11.5,5.35]],['1','0..*'],true);edge(s,pro,stock,[[4.5,7.55],[6.05,7.55]],['1','0..*']);
  edge(s,pro,ri,[[4.5,7.12],[5.2,7.12],[5.2,5.72],[6.05,5.72]],['1','0..*'],true);edge(s,wh,stock,[[2.55,6.2],[2.55,6.48],[8.0,6.48],[8.0,6.75]],['1','0..*']);edge(s,stock,mi,[[9.6,6.75],[9.6,6.45],[13.45,6.45],[13.45,6.2]],['1','0..*']);
  t(s,'Comunidad 1 : 0..* risk [R] · created_by_user_id → identity.user.id [R] · observation_id opcional.',.6,8.57,14.8,.3,14,{color:C.muted});
 }
 // 09. Continuidad entre autorización, líneas de envío y recepción final.
 {
  const s=base(9,'Modelo ER: cada salida y cada recepción conservan su detalle','Vista 2: las referencias enlazan los módulos sin convertirlas en FK físicas entre schemas','docs/07-datos/00-diagrama-er-global.md; 02-shelter.md; 03-inventory.md; 04-logistics.md');erLegend(s);
  const au=entity(s,'inventory.authorization',['PK id','FK matching_id [U]','U operation_key'],.6,2.35),d=entity(s,'logistics.dispatch',['PK id','R authorization_id · warehouse_id','R community_id · brigade_user_id','status · withdrawn_at · arrived_at'],6.05,2.35),rec=entity(s,'shelter.receipt',['PK id','FK request_id','R dispatch_id [U]','result · confirmed_at'],11.5,2.35);
  const mat=entity(s,'inventory.matching',['PK id','R request_id · ong_id','status'],.6,4.58),di=entity(s,'logistics.dispatch_item',['PK id','FK dispatch_id','R matching_item_id [U]','authorized_quantity · withdrawn_quantity'],6.05,4.58),rei=entity(s,'shelter.receipt_item',['PK id','FK receipt_id · request_item_id','R dispatch_item_id [U]','received_quantity · conforming_quantity','missing_quantity'],11.5,4.58,3.9,1.8);
  const route=entity(s,'logistics.route',['PK id','FK dispatch_id','status · verified_at'],.6,6.78),doc=entity(s,'logistics.document',['PK id · FK dispatch_id','R receipt_id','U (dispatch_id, type)','file_location · checksum'],6.05,6.78),dis=entity(s,'shelter.discrepancy_report',['PK id','FK receipt_id [U]','description'],11.5,6.78);
  edge(s,au,d,[[4.5,3.15],[6.05,3.15]],['1','1..*'],true);edge(s,d,rec,[[9.95,3.15],[11.5,3.15]],['1','0..1'],true);edge(s,mat,au,[[2.55,4.58],[2.55,4.0]],['1','0..1']);edge(s,di,rei,[[9.95,5.38],[11.5,5.38]],['1','0..1'],true);edge(s,d,di,[[8,4],[8,4.58]],['1','1..*']);edge(s,rec,rei,[[13.45,4],[13.45,4.58]],['1','1..*']);
  edge(s,d,route,[[6.05,3.68],[5.1,3.68],[5.1,7.58],[4.5,7.58]],['1','0..*']);
  edge(s,rec,dis,[[11.5,3.7],[11.3,3.7],[11.3,7.58],[11.5,7.58]],['1','0..1']);
  // Cruce sin unión: la referencia entre líneas pasa por encima de la FK a discrepancias.
  r(s,11.235,5.31,.13,.14,C.white,C.white);l(s,10.85,5.38,11.5,5.38,{dashType:'dash',width:1.3});
  // La tabla document explicita sus FK/R; se omiten sus conectores para no cruzar las líneas de recepción.
  t(s,'Ruta: route_segment vincula route y road mediante FK; UNIQUE(route_id, sequence) conserva el orden.',.6,8.56,14.8,.3,14,{color:C.muted});
 }
 // 10. Conceptos primero: límites atómicos, concurrencia e idempotencia. El ejemplo queda como apoyo.
 {
  const s=base(10,'Control transaccional del inventario','Disponibilidad = stock físico utilizable − compromisos autorizados pendientes de retiro','docs/07-datos/06-integridad-transaccional.md; docs/07-datos/03-inventory.md; docs/07-datos/02-shelter.md');
  const xx=[.6,3.25,7.3],ww=[2.4,3.8,3.0];['Operación','Escrituras atómicas','Invariante'].forEach((v,i)=>label(s,v,xx[i],2.15,ww[i],19,C.cyan));
  const rows=[['Autorizar','Revalidar lotes y demanda; registrar autorización y compromiso.','Comprometido ≤ físico utilizable.'],['Retirar','Registrar inventory.movement (WITHDRAWAL) y estado WITHDRAWN.','Un solo descuento\npor operación.'],['Recepcionar','Registrar cabecera, líneas y discrepancias conjuntamente.','0 ≤ conforme\n≤ recibida ≤ enviada.']];
  rows.forEach((row,i)=>{const y=2.72+i*1.38;l(s,.6,y-.13,10.35,y-.13,{color:C.line,width:.8});row.forEach((v,j)=>t(s,v,xx[j],y,ww[j],1.1,20,{bold:j===0,color:j===0?C.navy:C.ink}));});
  l(s,10.8,2.15,10.8,7.75,{color:C.line,width:1});
  para(s,'Concurrencia','Bloqueo de filas o SERIALIZABLE\ncon reintentos impide exceder\nel stock utilizable.',11.25,2.15,4.15,1.55,19);
  para(s,'Idempotencia','Misma clave y contenido:\nresultado previo. Si los datos\ncambian, conflicto 409.',11.25,4.05,4.15,1.55,19);
  para(s,'Trazabilidad','Actor, fecha y cambios se auditan\nen la transacción. Se conserva\nel historial de discrepancias.',11.25,6.1,4.15,1.65,19);
  t(s,'Ejemplo secundario: 80 físicos y 70 comprometidos dejan 10 disponibles; al retirar 70 quedan 10 físicos y cero comprometidos.',.6,7.24,9.75,.78,18,{color:C.muted});
  footer(s,'Los documentos se generan fuera de la transacción principal; un fallo permite reintentar sin revertir la recepción.');
 }
 // 11. Capas y contratos, con dominio independiente de infraestructura.
 {
  const s=base(11,'Una aplicación modular separa reglas y tecnología','Monolito modular NestJS en capas: simplifica desarrollo y despliegue, manteniendo límites funcionales','docs/06-arquitectura/01-arquitectura-logica.md; docs/06-arquitectura/02-decisiones-arquitectonicas.md; diagramas/05-estructura/EST-03-componentes.puml');
  node(s,'Frontend Next.js / React','Navegación por rol, formularios, mapas y estados visibles.',.6,2.15,4.0,1.8);t(s,'La interfaz no determina permisos ni saldos definitivos.',.6,4.35,4.0,1.13,21);
  r(s,5.35,2.15,10.05,5.6);label(s,'Backend NestJS · Una aplicación',5.57,2.33,9.6,23);
  node(s,'Presentación / API','Valida DTO, sesión, rol y titularidad; traduce resultados a HTTP.',5.6,2.85,9.55,1.12,C.white);
  node(s,'Aplicación','Orquesta casos de uso, contratos modulares, transacciones y eventos.',5.6,4.28,9.55,1.12,C.pale);
  node(s,'Dominio','Matching, disponibilidad, transiciones y conformidad sin depender de HTTP ni ORM.',5.6,5.71,5.38,1.65,C.white);
  node(s,'Infraestructura','Repositorios Prisma, PostgreSQL, archivos y adaptadores externos.',11.35,5.71,3.8,1.65,C.white);
  a(s,4.67,2.9,5.27,2.9);t(s,'HTTPS',4.64,2.45,.67,.3,14,{color:C.muted});a(s,10.2,4.02,10.2,4.21);a(s,8.2,5.45,8.2,5.64);a(s,13.2,5.45,13.2,5.64);
  a(s,13.2,7.42,13.2,7.9);t(s,'PostgreSQL · archivos · fuentes externas',9.4,7.98,6.0,.32,16,{color:C.muted});
  para(s,'Decisión de diseño','Una aplicación simplifica desarrollo y despliegue, conservando límites funcionales.',.6,5.9,4.0,1.8,19);
  footer(s,'La capa de aplicación usa contratos; la infraestructura implementa el acceso. El dominio conserva las reglas al cambiar proveedores.');
 }
 // 12. Colaboraciones de negocio, no un grafo de dependencias privadas o microservicios.
 {
  const s=base(12,'Los módulos colaboran mediante contratos públicos','Las flechas representan coordinación de casos de uso, no dependencias circulares entre implementaciones','docs/06-arquitectura/01-arquitectura-logica.md; diagramas/05-estructura/EST-02-paquetes.puml; EST-03-componentes.puml');
  node(s,'Identity','Sesión, rol, pertenencia y auditoría transversal.',.6,2.15,4.2,1.5);t(s,'Los casos de uso coordinan los módulos; cada módulo conserva reglas y datos propios en su schema.',5.45,2.15,9.95,1.0,23,{bold:true,color:C.navy});
  const xx=[.6,6.05,11.5];[['Shelter','Comunidades, solicitudes, recepción e informe final.'],['Inventory','Productos, lotes, movimientos, matching y autorización.'],['Logistics','Despachos, rutas y retiros.\nLlegada y documentos.']].forEach((v,i)=>node(s,v[0],v[1],xx[i],3.89,3.9,1.65));
  a(s,4.56,4.5,5.98,4.5);t(s,'Necesidades',4.58,4.03,1.38,.33,14,{color:C.muted});a(s,10.01,4.5,11.43,4.5);t(s,'Autorización',10.01,4.03,1.42,.33,14,{color:C.muted});
  l(s,13.45,5.6,13.45,5.97);a(s,13.45,5.97,8,5.97);t(s,'Retiro: Logistics solicita descuento a Inventory',7.0,6.07,7.7,.38,17,{color:C.cyan});
  l(s,14.7,5.6,14.7,6.67);l(s,14.7,6.67,2.55,6.67);a(s,2.55,6.67,2.55,5.6);t(s,'Arribo: habilita recepción',3.0,6.3,3.6,.32,17,{color:C.cyan});
  node(s,'Territory','Observaciones y riesgo con fuente y fecha.',.6,6.91,4.2,1.35);node(s,'Consulta de supervisión','Combina Territory, Shelter y Logistics; excluye stock privado de ONG.',6.05,6.91,9.35,1.35);a(s,4.87,7.48,5.98,7.48);
  footer(s,'Al llegar, Logistics habilita la recepción en Shelter. Los contratos evitan acceder a repositorios privados de otros módulos.');
 }
 // 13. Topología cloud con límites de proveedores, dos aplicaciones y servicios de soporte.
 {
  const s=base(13,'La topología cloud separa aplicaciones y servicios de datos','Referencia propuesta: Vercel para Next.js, Render para NestJS y Supabase para PostgreSQL','docs/12-infraestructura/01-topologia-cloud.md; docs/12-infraestructura/03-servidor-web-cloud.md; diagramas/05-estructura/EST-04-despliegue.puml');
  node(s,'Navegador','Interfaz por rol.',.6,2.94,2.25,1.2);r(s,3.7,2.15,4.5,2.42);label(s,'Vercel',3.9,2.31,4.05,23);node(s,'Next.js','Web y proxy de servidor.',3.95,2.94,4.0,1.2,C.white);
  r(s,9.1,2.15,6.3,2.42);label(s,'Render',9.3,2.31,5.85,23);node(s,'NestJS','API REST y tareas internas idempotentes.',9.35,2.94,5.8,1.2,C.white);
  a(s,2.92,3.54,3.62,3.54);a(s,8.27,3.54,9.02,3.54);t(s,'HTTPS',2.91,3.11,.76,.31,14,{color:C.muted});t(s,'HTTPS',8.27,3.11,.76,.31,14,{color:C.muted});
  r(s,9.1,5.69,6.3,2.22);label(s,'Supabase',9.3,5.87,5.8,23);node(s,'PostgreSQL','Datos operativos.',9.35,6.53,2.65,1.12,C.white);node(s,'Storage candidato','XLSX y PDF.',12.3,6.53,2.85,1.12,C.white);a(s,10.7,4.64,10.7,5.62);a(s,13.7,4.64,13.7,5.62);t(s,'SQL / TLS',10.82,5.03,1.5,.32,15,{color:C.muted});t(s,'Acceso autorizado',13.82,5.03,1.55,.57,15,{color:C.muted});
  para(s,'Publicación y operación','Repositorios Git separados y CI/CD permiten publicar frontend y API por separado. La operación requiere monitoreo, límites de conexión y capacidad medida.',.6,5.22,7.6,2.05,21);
  footer(s,'Solo el backend guarda credenciales de datos e integraciones. La referencia no acredita un despliegue real ni una red privada contratada.');
 }
 // 14. Controles alrededor de la persistencia y un procedimiento de restauración verificable.
 {
  const s=base(14,'Persistir también exige proteger y poder restaurar','PostgreSQL administrado, acceso exclusivo del backend y continuidad planificada','docs/12-infraestructura/02-base-datos-cloud.md; docs/07-datos/06-integridad-transaccional.md');
  para(s,'Acceso y credenciales','Prisma es el ORM del backend. La conexión usa TLS, un pool dimensionado y privilegios mínimos; las cuentas de ejecución y migración son distintas.',.6,2.15,4.5,2.5,21);
  s.addShape(S.can,{x:X(5.65),y:2.15,w:DX(4.7),h:3.23,fill:{color:C.pale},line:{color:C.cyan,width:1}});t(s,'PostgreSQL\nSupabase',6,3.05,4.0,.95,25,{bold:true,color:C.navy,align:'center'});t(s,'identity · shelter · inventory\nlogistics · territory',6,4.23,4.0,.8,18,{align:'center'});
  para(s,'Restricciones y evolución','PostgreSQL aplica FK, UNIQUE y CHECK. Prisma usa SQL en sus migraciones para índices parciales y restricciones.',11.0,2.15,4.4,2.5,21);
  t(s,'El navegador no recibe credenciales SQL. Los documentos binarios quedan fuera de la base; se registran ubicación y checksum.',.6,5.62,7.1,1.1,20);
  t(s,'Respaldo diario, retención de 30 días,\nensayo mensual. Pérdida máxima prevista:\n24 h de datos; recuperación del servicio: 8 h.',8.3,5.62,7.1,1.1,20);
  const xx=[.6,4.45,8.3,12.15];['Copia cifrada','Restaurar aislado','Conciliar datos y saldos','Probar acceso y recepción'].forEach((v,i)=>{r(s,xx[i],7.16,3.25,.7);t(s,v,xx[i]+.12,7.28,3.01,.45,17,{bold:true,color:C.navy});if(i<3)a(s,xx[i]+3.31,7.51,xx[i+1]-.07,7.51);});
  footer(s,'Son objetivos de diseño sujetos al plan y a pruebas. Iniciar el motor no basta para acreditar una recuperación correcta.');
 }
 // 15. Secuencia real de petición y retorno, con contrato y autenticación separados del transporte.
 {
  const s=base(15,'Del formulario a una operación confirmada','HTTPS protege el transporte; la API verifica identidad, permisos y datos antes de persistir','docs/08-comunicaciones/01-navegador-servidor.md; docs/08-comunicaciones/02-contratos-api.md; docs/08-comunicaciones/03-seguridad-comunicaciones.md');
  const cx=[2.25,6.08,9.91,13.74];['Navegador de Comuna','Next.js / proxy','API NestJS','PostgreSQL'].forEach((v,i)=>{r(s,cx[i]-1.65,2.15,3.3,.6,C.pale);t(s,v,cx[i]-1.53,2.26,3.06,.38,18,{bold:true,color:C.navy});l(s,cx[i],2.8,cx[i],6.26,{color:C.line,dashType:'dash',width:1});});
  a(s,cx[0],3.15,cx[1],3.15);t(s,'1  HTTPS · cookie protegida',2.4,2.81,3.5,.3,15);a(s,cx[1],3.63,cx[2],3.63);t(s,'2  POST /v1/requests · JSON',6.2,3.3,3.5,.3,15);
  r(s,8.5,3.92,2.85,.73);t(s,'Sesión, rol, comunidad,\nproductos y cantidades',8.62,4.05,2.61,.56,16,{bold:true,color:C.navy});a(s,cx[2],4.98,cx[3],4.98);t(s,'3  Transacción validada',10.05,4.65,3.5,.3,15);
  a(s,cx[3],5.51,cx[2],5.51,{dashType:'dash'});a(s,cx[2],5.84,cx[1],5.84,{dashType:'dash'});a(s,cx[1],6.17,cx[0],6.17,{dashType:'dash'});t(s,'4  Resultado persistido; retorno hasta la interfaz',4.0,6.3,10.8,.4,18,{bold:true,color:C.cyan});
  para(s,'Contrato REST','UUID, UTC y decimales exactos. La comunidad proviene de la sesión.',.6,6.98,4.45,1.8,18);
  para(s,'Sesión y permisos','JWT validado por API. Cookie HttpOnly, Secure y SameSite=Lax; CSRF. Rol y titularidad en servidor.',5.7,6.98,4.45,1.8,18);
  para(s,'Confirmación o error','201 crea; 401/403 deniegan; 422 valida; 409: conflicto. Ante red incierta, consultar antes de repetir.',10.8,6.98,4.6,1.8,18);
 }

 // 16. MK-02 conserva escala y anotaciones; la introducción visual se integra al costado.
 {
  const s=base(16,'','','prototipos/01-solicitud/MK-02-registro-solicitud.png; prototipos/00-sistema-diseno/identidad-visual.md; docs/09-interfaz/01-navegacion-roles.md; docs/09-interfaz/02-especificacion-interfaces.md','Se conserva Segoe UI, fondo blanco, azul oscuro y cyan. Navegación por rol, estados expresados también en texto, etiquetas y unidades visibles. El menú no determina permisos; los aplica el backend. La confirmación comunitaria vuelve inmutable la solicitud.');
  await cut(s,tmp,'01-solicitud/MK-02-registro-solicitud.png',{left:272,top:262,width:845,height:624},.6,G.body,8.9);
  label(s,'Sistema visual compartido',10.0,G.body,5.4,22);
  t(s,'Segoe UI · blanco · azul oscuro · cyan. El color acompaña etiquetas y estados explícitos.',10.0,2.72,5.4,1.0,20);
  // Los recortes del menú y las marcas permanecen como evidencia fiel y anotación nativa.
  await cut(s,tmp,'01-solicitud/MK-02-registro-solicitud.png',{left:15,top:105,width:204,height:206},10.0,3.83,2.2);
  t(s,'Navegación por rol y ubicación activa; los permisos se aplican en servidor.',12.55,3.83,2.85,1.4,18);
  mark(s,1,10.0,6.3);label(s,'Identidad y cantidades',10.45,6.27,4.9,21);
  t(s,'La cuenta fija la comunidad. Producto, unidad y cantidad se validan juntos: sin duplicados ni valores no positivos.',10.0,6.88,5.4,1.05,20);
  t(s,'Tras confirmar, la solicitud ya no se edita.',10.0,8.16,5.4,.5,19,{bold:true,color:C.navy});
  mark(s,1,9.05,5.72);
 }

 // 17. Matching principal; MK-05 se incorpora mediante un recorte de la decisión final, no otra pantalla completa.
 {
  const s=base(17,'','','prototipos/02-matching/MK-04-propuesta.png; prototipos/03-autorizacion/MK-05-autorizacion.png; docs/07-datos/03-inventory.md; docs/07-datos/06-integridad-transaccional.md','Matching usa producto y unidad coincidentes, stock USABLE y FEFO cuando corresponde. El rechazo requiere motivo y deja elegible lo nunca autorizado. Confirmar o reducir no reserva. Autorizar no aumenta cantidades y revalida en transacción lotes y demanda pendiente. El recorte MK-05 conserva su estado previo a la autorización y no altera datos ni controles.');
  label(s,'MK-04 · Evaluación de la propuesta',.6,2.15,8.9,21);
  await cut(s,tmp,'02-matching/MK-04-propuesta.png',{left:272,top:262,width:845,height:592},.6,2.72,8.55);
  label(s,'1. Confirmar el aporte',9.75,2.15,5.65,22);
  t(s,'La ONG comprueba destino, lotes y cantidades. Confirmar o reducir no reserva existencias.',9.75,2.75,5.65,1.05,20);
  label(s,'2. Autorizar la salida',9.75,4.15,5.65,22);
  t(s,'Revalida disponibilidad y demanda; registra el compromiso. El descuento físico ocurre al retirar.',9.75,4.75,5.65,1.05,20);
  t(s,'MK-05 · Verificación y confirmación',9.75,6.15,5.65,.38,18,{bold:true,color:C.cyan});
  await cut(s,tmp,'03-autorizacion/MK-05-autorizacion.png',{left:760,top:780,width:356,height:70},9.75,6.68,5.65);
  t(s,'Conserva lo confirmado; exige cotejo final.',9.75,8.08,5.65,.5,19,{bold:true,color:C.navy});
  // La marca 2 ocupa el margen libre bajo los controles, sin taparlos.
  mark(s,1,8.65,7.45);mark(s,2,14.95,7.75);
 }

 // 18. MK-07 principal: mapa e información vial. MK-08 aporta solo la comparación por línea.
 {
  const s=base(18,'','','prototipos/04-traslado/MK-07-ruta-traslado.png; prototipos/05-recepcion/MK-08-recepcion-variante.png; docs/07-datos/04-logistics.md; docs/07-datos/02-shelter.md','El mapa es esquemático, sin escala ni GPS. El retiro es completo y exige verificación de ruta menor de 30 minutos, sin UNKNOWN ni IMPASSABLE; no garantiza transitabilidad física. Brigada registra llegada. Comuna valida después una recepción única. Recibido físico puede diferir de conforme; missing = enviado − recibido. El ejemplo final conserva 2 bidones faltantes y 2 frazadas dañadas. Las discrepancias no reactivan matching ni descuentan inventario otra vez. Documentos únicos XLSX/PDF tras finalizar, fuera de TX y reintentables.');
  label(s,'MK-07 · Ruta y traslado',.6,2.15,8.55,21);
  await cut(s,tmp,'04-traslado/MK-07-ruta-traslado.png',{left:272,top:262,width:845,height:655},.6,2.72,7.5);
  label(s,'Brigada: retirar y registrar llegada',8.7,2.15,6.7,22);
  t(s,'Ruta vigente, sin UNKNOWN ni IMPASSABLE.\nEl retiro es completo; registrar llegada\nno acredita una recepción conforme.',8.7,2.75,6.7,1.0,20);
  label(s,'Comuna: verificar lo recibido',8.7,4.14,6.7,22);
  t(s,'MK-08 · Enviado, recibido y conforme',8.7,4.75,6.7,.38,18,{bold:true,color:C.cyan});
  await cut(s,tmp,'05-recepcion/MK-08-recepcion-variante.png',{left:272,top:421,width:845,height:176},8.7,5.28,6.7);
  t(s,'Faltan 2 bidones; 2 frazadas llegan dañadas. La recepción registra y justifica ambas diferencias.',8.7,6.95,6.7,1.0,20);
  t(s,'La ruta se verifica antes del retiro; el mapa es un esquema sin escala ni GPS.',8.7,8.12,6.7,.62,18,{color:C.muted});
  mark(s,1,7.55,3.15);mark(s,2,14.95,6.35);
 }
 const mocks=[
  {n:19,title:'Defensa Civil: distinguir riesgo, atención y evidencia',lead:'MK-09 · Una misma comunidad conserva dimensiones territoriales independientes',file:'06-supervision/MK-09-mapa-territorial.png',crop:{left:272,top:292,width:1328,height:590},w:11.5,calls:[['Fenómeno y capas','Filtrar evita mezclar evaluaciones de desastres distintos.',[690,400]],['Atención independiente','Recibir ayuda no reduce el nivel registrado de inundación.',[1490,530]],['Fuente y vigencia','Fuente, fecha y verificación permiten valorar la evidencia disponible.',[1490,740]]],foot:'Defensa Civil consulta sin modificar operaciones. Las observaciones externas no equivalen a una declaración oficial de emergencia.'},
  {n:20,title:'El informe cierra la historia, no oculta las diferencias',lead:'MK-10 · La instantánea final consolida las etapas y conserva las brechas de satisfacción',file:'06-supervision/MK-10-informe-final.png',crop:{left:272,top:209,width:1328,height:658},w:11.5,calls:[['Cantidades conciliadas','118/120 bidones y\n78/80 frazadas conformes.\n2 despachos finalizados.',[1020,570]],['Brechas diferentes','Sin autorizar: 0.\nBrecha de satisfacción:\n2 por producto.',[1490,610]]],conclusion:'Alivía vincula necesidades, decisiones y entregas para reconstruir quién aportó, qué se trasladó y qué recibió conforme cada comunidad.'}
 ];
 for(const m of mocks){const s=base(m.n,m.title,m.lead,`prototipos/${m.file}; prototipos/00-sistema-diseno/escenario-demostracion.md; docs/09-interfaz/02-especificacion-interfaces.md`,m.n===20?'Cierre por EMERGENCIA_FINALIZADA, preconfigurado al 20 de octubre 18:00; publicación 18:01. Una recepción conforme y otra con observaciones. 118 bidones físicos/conformes; 80 frazadas físicas y 78 conformes. El informe no es una operación de cierre de Defensa Civil.':'La captura procede del PNG final del repositorio. Se omite el marco común para ampliar la tarea. Ningún control o dato ha sido reconstruido.');
  if(m.n===19)await cut(s,tmp,m.file,{left:272,top:208,width:490,height:67},.6,2.15,6.0);
  const frame=await cut(s,tmp,m.file,m.crop,.6,m.n===19?3.05:2.15,m.w),narrow=m.w>10,cx=narrow?12.65:10.6,cw=narrow?2.75:4.8;
  // Las marcas editables se superponen intencionalmente a espacios libres de las capturas.
  m.calls.forEach((v,i)=>{const y=2.3+i*(narrow?2.02:2.15);mark(s,i+1,cx,y);t(s,v[0],cx+.44,y-.01,cw-.44,.72,narrow?18:22,{bold:true,color:C.navy});t(s,v[1],cx,y+(narrow?.77:.87),cw,narrow?1.22:1.1,narrow?18:20);const px=frame.x+(v[2][0]-m.crop.left)/m.crop.width*frame.w,py=frame.y+(v[2][1]-m.crop.top)/m.crop.height*frame.h;if(px+.32<frame.x+frame.w&&py+.32<frame.y+frame.h)mark(s,i+1,px,py);});
  if(m.foot)t(s,m.foot,.6,G.footer,14.8,.34,16,{color:C.muted});
  if(m.conclusion)t(s,m.conclusion,.6,8.08,14.8,.7,20,{bold:true,color:C.navy});
 }

 assert.equal(pptx._slides.length,20);assert.deepEqual(meta.map(x=>x.n),Array.from({length:20},(_,i)=>i+1));
 assert.deepEqual(meta.map(x=>x.section),HEADERS.map(x=>x[0]));
 assert.equal(entities.length,18);assert(relations.length>=16,'Faltan relaciones del ER');
 for(const p of pictures)assert(Math.abs(p.w/p.h-p.crop.width/p.crop.height)<1e-9,'Captura deformada');
 assert.deepEqual([...new Set(pictures.map(p=>p.file.match(/MK-\d+/)[0]))].sort(),['MK-02','MK-04','MK-05','MK-07','MK-08','MK-09','MK-10']);
 await pptx.writeFile({fileName:path.join(OUT,'Alivia_Presentacion_Sistema_v3.pptx')});
 console.log(`20 diapositivas; ${entities.length} tablas y ${relations.length} relaciones nativas; siete mockups finales.`);
 }finally{fs.rmSync(tmp,{recursive:true,force:true});}}
main().catch(e=>{console.error(e);process.exitCode=1;});
