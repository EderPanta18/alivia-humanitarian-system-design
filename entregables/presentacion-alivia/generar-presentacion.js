/* Reconstrucción desde la raíz del repositorio, sin cambiar sus fuentes:
 * NODE_PATH=<node_modules con pptxgenjs y sharp> node generar-presentacion.js [directorio de salida]
 * Con las dependencias de package.json disponibles localmente: npm run generar.
 * En la ubicación de entrega, la raíz se obtiene de ../..; ALIVIA_ROOT permite indicarla explícitamente.
 * Los recortes se generan temporalmente a partir de los PNG finales, sin distorsión ni cambios de datos.
 */
'use strict';
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert/strict');
const ROOT = process.env.ALIVIA_ROOT || path.resolve(__dirname, '../..');
const OUT = path.resolve(process.argv[2] || __dirname);
const W = 13.333333, H = 7.5;
const C = {navy:'123D4B', cyan:'007F99', pale:'E4F5FA', ink:'183B4A', muted:'4B6673', line:'D6E3E9', white:'FFFFFF', green:'126C4E', greenBg:'E9F7F0', amber:'8B590B', amberBg:'FFF5DC', red:'B83E48', redBg:'FFF0F1'};
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Equipo Alivía · Universidad Nacional de Piura';
pptx.subject = 'Ingeniería de Software · Análisis y diseño del sistema';
pptx.title = 'Alivía — Análisis y diseño del sistema';
pptx.company = 'Universidad Nacional de Piura (UNP)';
pptx.lang = 'es-PE';
pptx.theme = {headFontFace:'Segoe UI', bodyFontFace:'Segoe UI', lang:'es-PE'};
const S = pptx.ShapeType;
const inventory = [];
function checkBox(x,y,w,h){assert(x>=0 && y>=0 && w>0 && h>0 && x+w<=W+.002 && y+h<=H+.002, `Fuera del lienzo: ${[x,y,w,h]}`);}
function text(s,t,x,y,w,h,size=18,extra={}) {checkBox(x,y,w,h); s.addText(t,{x,y,w,h,fontFace:'Segoe UI',fontSize:size,color:C.ink,margin:0,breakLine:false,vertAnchor:'top',paraSpaceAfterPt:0,...extra});}
function rect(s,x,y,w,h,fill=C.white,line=C.line,extra={}) {checkBox(x,y,w,h);s.addShape(S.rect,{x,y,w,h,fill:{color:fill},line:{color:line,width:.8},...extra});}
function line(s,x1,y1,x2,y2,extra={}) {s.addShape(S.line,{x:Math.min(x1,x2),y:Math.min(y1,y2),w:Math.abs(x2-x1),h:Math.abs(y2-y1),flipH:x2<x1,flipV:y2<y1,line:{color:C.cyan,width:1.5,beginArrowType:'none',endArrowType:'none',...extra}});}
function arrow(s,x1,y1,x2,y2,extra={}) {line(s,x1,y1,x2,y2,{endArrowType:'triangle',...extra});}
function label(s,t,x,y,w,color=C.cyan,size=14){text(s,t,x,y,w,.38,size,{color,bold:true});}
function block(s,title,body,x,y,w,h=1.45){label(s,title,x,y,w,C.navy,20);text(s,body,x,y+.43,w,h-.43,18);}
function note(s,t,y=6.83,color=C.muted){text(s,t,.48,y,12.35,.4,14,{color});}
function base(n,title,lead,source,notes=''){
  const s=pptx.addSlide();s.background={color:C.white};
  text(s,title,.48,.34,11.94,.62,31,{color:C.navy,bold:true});
  text(s,String(n).padStart(2,'0'),12.43,.43,.42,.3,14,{color:C.cyan,align:'right'});
  if(lead)text(s,lead,.5,1.01,12.3,.44,18,{color:C.muted});
  inventory.push({n,title,source});
  s.addNotes(`Fuentes locales: ${source}\n${notes}\nPresentación académica de diseño. Los registros de demostración son ficticios. Fecha académica solicitada: 13 de octubre de 2026; los cortes operativos de los mockups corresponden al 18 y 20 de octubre.`);
  return s;
}
function smallNode(s,title,body,x,y,w,h=1.25,fill=C.pale){rect(s,x,y,w,h,fill);text(s,title,x+.15,y+.13,w-.3,.45,19,{bold:true,color:C.navy});text(s,body,x+.15,y+.66,w-.3,h-.73,16);}
function numbered(s,num,x,y){s.addShape(S.ellipse,{x,y,w:.27,h:.27,fill:{color:C.white},line:{color:C.cyan,width:1.4}});text(s,String(num),x,y+.005,.27,.22,12,{color:C.cyan,bold:true,align:'center'});}

async function main(){
  fs.mkdirSync(OUT,{recursive:true});
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'alivia-ppt-assets-'));
  try {
  // 01: Identidad tipográfica y logo vectorial fiel al escudo del prototipo.
  {
    const s=base(1,'','', 'prototipos/00-sistema-diseno/identidad-visual.md; información académica T04');
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 40 44"><path d="M20 3 35 9v12c0 9-15 18-15 18S5 30 5 21V9Z" fill="#e2f5fa" stroke="#007f99" stroke-width="2"/><path d="m11 23 6 5 12-14" fill="none" stroke="#007f99" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    s.addImage({data:'image/svg+xml;base64,'+Buffer.from(svg).toString('base64'),x:.53,y:1.55,w:.64,h:.704});
    text(s,'Universidad Nacional de Piura (UNP)',.5,.44,11.8,.5,23,{bold:true,color:C.navy});
    text(s,'Curso: Ingeniería de Software',.5,1,11.8,.4,19,{color:C.muted});
    text(s,'Alivía',1.38,1.5,10.8,.82,44,{bold:true,color:C.navy});
    text(s,'Análisis y diseño de un sistema de coordinación\ny trazabilidad de ayuda humanitaria',.5,2.57,11.8,1.16,29,{color:C.navy});
    line(s,.5,4.04,12.8,4.04,{color:C.line,width:1});
    label(s,'Tarea grupal — Análisis y diseño del sistema',.5,4.37,11.8,C.cyan,20);
    text(s,'Integrantes',.5,5.05,2.15,.3,17,{bold:true,color:C.muted});
    text(s,'Paucar Campoverder Kenyi Yair\nVillegas Saavedra Axel Alberto\nPanta Sanchez Eder Daniel\nInoñan González Justin Hafid',3.0,4.99,9.6,1.65,20,{breakLine:false,lineSpacingMultiple:1.15});
    text(s,'13 de octubre de 2026',.5,6.85,8,.35,18,{color:C.muted});
  }
  // 02: El problema se presenta sin introducir tecnologías.
  {
    const s=base(2,'Problemática: atención ante desastres','Lluvias intensas asociadas a El Niño en Piura','docs/00-definicion/01-problema-objetivos.md; docs/00-definicion/02-alcance-supuestos.md');
    text(s,'La ayuda requiere una visión compartida de necesidades, recursos y entregas.',.5,1.77,5.15,1.25,25,{bold:true,color:C.navy});
    text(s,'Cuando los registros están dispersos, resulta difícil decidir qué atender, evitar aportes duplicados y saber qué recibió realmente cada comunidad.',.5,3.36,5.15,1.7,21);
    const rows=[['Necesidades dispersas','La demanda comunitaria pierde visibilidad.'],['Recursos sin coordinación','Las ONG no cuentan con una visión común.'],['Entregas inciertas','El arribo no acredita cantidades conformes.'],['Accesos restringidos','Las lluvias alteran los recorridos posibles.'],['Trazabilidad insuficiente','Cuesta reconstruir responsables y resultados.']];
    rows.forEach((r,i)=>{const y=1.75+i*.94;label(s,r[0],6.13,y,6.56,C.cyan,20);text(s,r[1],6.13,y+.35,6.56,.48,18);if(i<4)line(s,6.13,y+.79,12.8,y+.79,{color:C.line,width:.6});});
    note(s,'Contexto de diseño: escenario académico ficticio, sin atribuir cifras de daños a un evento real.');
  }
  // 03
  {
    const s=base(3,'Solución propuesta: ¿qué es Alivía?','Una plataforma web para coordinar la ayuda y conservar su historia','docs/00-definicion/01-problema-objetivos.md; docs/02-procesos/00-flujo-general.md');
    text(s,'Alivía centraliza solicitudes comunitarias, inventarios de ONG, decisiones de aporte, autorizaciones y evidencias de entrega.',.5,1.75,12.1,.9,23,{bold:true,color:C.navy});
    smallNode(s,'Necesidad registrada','Producto, cantidad y comunidad destinataria.',.5,3.12,3.75,1.55);
    smallNode(s,'Coordinación entre actores','Quién propone, autoriza y transporta cada aporte.',4.79,3.12,3.75,1.55);
    smallNode(s,'Resultado verificable','Qué llegó conforme y qué diferencias quedaron.',9.08,3.12,3.75,1.55);
    arrow(s,4.3,3.9,4.7,3.9);arrow(s,8.59,3.9,8.99,3.9);
    text(s,'Cada actor consulta el estado que le corresponde. Las alertas aportan contexto; la plataforma no declara oficialmente emergencias.',.5,5.3,12.25,.9,21);
    note(s,'Se presentan especificaciones y prototipos locales. Las integraciones de producción son parte del diseño.');
  }
  // 04
  {
    const s=base(4,'Alcance y capacidades principales','Seis responsabilidades delimitan la coordinación','docs/00-definicion/02-alcance-supuestos.md; docs/03-requisitos/01-requisitos-funcionales.md');
    const a=[['Registrar necesidades','Productos, cantidades y contexto de afectación.'],['Relacionar demanda y oferta','Inventario apto y propuestas automáticas de aporte.'],['Confirmar y autorizar','Decisión de ONG y compromiso explícito de recursos.'],['Gestionar el traslado','Despachos, rutas verificadas, retiro y llegada.'],['Verificar la recepción','Cantidades físicas, conformidad y discrepancias.'],['Supervisar resultados','Riesgos, cobertura, brechas e informe final.']];
    a.forEach((v,i)=>{const x=i<3?.5:6.9,y=1.85+(i%3)*1.3;label(s,String(i+1).padStart(2,'0'),x,y,.5,C.cyan,20);block(s,v[0],v[1],x+.65,y,5.15,1.12);});
    rect(s,.5,6.15,12.33,.69,C.pale,C.pale);text(s,'Límite: las observaciones externas informan; no autorizan recursos ni activan una declaración oficial.',.7,6.32,11.95,.37,18);
  }
  // 05
  {
    const s=base(5,'Actores y responsabilidades','Los permisos dependen del rol y de la entidad vinculada','docs/01-negocio/02-actores-responsabilidades.md; diagramas/01-casos-uso-actores/UC-01 a UC-04');
    const xs=[.5,3.42,7.75],ws=[2.65,4.04,5.08];
    ['Actor','Responsabilidad en el proceso','Información que consulta'].forEach((v,i)=>label(s,v,xs[i],1.8,ws[i],C.cyan,17));
    const rows=[['Jefe de Comuna','Solicita y verifica la recepción.','Necesidades, despachos y cantidades de su comunidad.'],['Jefe de ONG','Gestiona stock, decide y autoriza.','Inventarios y propuestas de su organización.'],['Jefe de Brigada','Verifica retiro y registra llegada.','Carga, origen, destino y ruta de sus despachos.'],['Jefe de Defensa Civil','Supervisa en modo de lectura.','Riesgos, cobertura, brechas e informe publicado.']];
    rows.forEach((r,i)=>{const y=2.4+i*.94;line(s,.5,y-.14,12.83,y-.14,{color:C.line,width:.8});r.forEach((v,j)=>text(s,v,xs[j],y,ws[j],.75,j===0?19:18,{bold:j===0,color:j===0?C.navy:C.ink}));});
    note(s,'Defensa Civil no modifica operaciones ni consulta inventarios privados. Los procesos automáticos no son un quinto rol.');
  }
  // 06: Flujo editable; supervisión es transversal, no una dependencia de la recepción.
  {
    const s=base(6,'Flujo general del sistema','La propuesta automática conecta necesidades y recursos; las personas confirman los hechos','docs/02-procesos/00-flujo-general.md; diagramas/02-casos-uso-procesos/UC-05 a UC-10; diagramas/04-secuencias-automaticas/AUT-01-matching.puml; AUT-02-ingesta-externa.puml');
    const xs=[.5,3.07,5.64,8.21,10.78],w=2.05;
    const steps=[['1. Solicitud','Comuna','Registra productos y cantidades.'],['2. Matching','Automático','Cruza demanda con lotes aptos.'],['3. Confirmación\ny autorización','ONG','Decide el aporte. Autoriza su salida.'],['4. Traslado','Brigada','Verifica, retira y registra llegada.'],['5. Recepción','Comuna','Verifica la carga y su conformidad.']];
    steps.forEach((v,i)=>{rect(s,xs[i],2.05,w,2.55,i===1?C.pale:C.white);text(s,v[0],xs[i]+.12,2.22,w-.24,.94,i===2?18:19,{bold:true,color:C.navy});label(s,v[1],xs[i]+.12,3.27,w-.24,C.cyan,15);text(s,v[2],xs[i]+.12,3.75,w-.24,.81,16);if(i<4)arrow(s,xs[i]+w+.05,3.25,xs[i+1]-.06,3.25);});
    line(s,.8,4.85,12.5,4.85,{color:C.line,width:1.5});
    [1.53,4.1,6.66,9.23,11.8].forEach(x=>line(s,x,4.65,x,4.85,{color:C.line,width:1}));
    arrow(s,6.66,4.85,6.66,5.16,{dashType:'dash'});
    rect(s,.5,5.22,7.5,1.05,C.pale);text(s,'6. Supervisión',.7,5.4,2.5,.35,21,{bold:true,color:C.navy});text(s,'Defensa Civil consulta riesgos, avance y resultados a lo largo del proceso.',3.4,5.38,4.35,.7,17);
    rect(s,9.0,5.22,3.83,1.05);text(s,'Observaciones externas',9.18,5.37,3.47,.35,17,{bold:true,color:C.navy});text(s,'Ingesta automática informativa.',9.18,5.83,3.47,.3,15);
    arrow(s,8.96,5.75,8.05,5.75,{dashType:'dash'});
    note(s,'La ingesta complementa la supervisión; una comunidad puede solicitar ayuda sin esperar una alerta externa.');
  }
  // 07
  {
    const s=base(7,'Análisis funcional y reglas de negocio','Los estados representan decisiones y hechos diferentes','docs/01-negocio/03-reglas-negocio.md; docs/05-analisis/02-estados-transiciones.md; diagramas/03-secuencias-casos-uso/ong/CU-ONG-06-autorizar-salida.puml; brigada/CU-BRI-04-confirmar-retiro.puml; comuna/CU-COM-04-recepcion-discrepante.puml');
    const cols=[.5,4.75,9];
    const v=[['Propuesta y decisión','Matching sugiere cantidades sin comprometer stock. Confirmar expresa el aporte aceptado; todavía se requiere autorizar su salida.','Propuesto / Confirmado'],['Autorización y retiro','Autorizar exige revalidar el stock y compromete recursos. Retirar la carga completa descuenta el físico una sola vez y exige ruta vigente.','Autorizado / Retirado'],['Llegada y recepción','La llegada habilita la verificación comunitaria. La recepción registra conformidad o discrepancias; esas diferencias no reactivan automáticamente el matching.','Llegado / Finalizado']];
    v.forEach((r,i)=>{label(s,r[0],cols[i],1.88,3.82,C.navy,21);line(s,cols[i],2.51,cols[i]+3.82,2.51,{color:C.cyan,width:2});text(s,r[1],cols[i],2.83,3.82,2.25,20);text(s,r[2],cols[i],5.55,3.82,.48,16,{color:C.cyan,bold:true});});
    note(s,'En todas las fases, el servidor valida rol, titularidad, transición de estado y trazabilidad del responsable.');
  }
  // 08: Las líneas continuas son FK internas y las discontinuas son referencias lógicas documentadas.
  {
    const s=base(8,'Diseño de datos: relaciones principales','Vista resumida del modelo relacional. Todas las entidades mostradas tienen PK UUID.','docs/07-datos/00-diagrama-er-global.md; docs/07-datos/01-identity.md; 02-shelter.md; 03-inventory.md; 04-logistics.md; 05-territory.md; diagramas/05-estructura/EST-01-clases-dominio.puml','Se omiten entidades de detalle, catálogos y campos para conservar legibilidad. Las cardinalidades proceden del ER global, no del diagrama conceptual de clases. Usuario-Comunidad: una comunidad puede tener 0..1 jefe en configuración; funcionalmente cada comunidad operativa tiene un jefe. Referencias entre módulos son UUID lógicos sin FK física.');
    const xs=[.5,3.08,5.66,8.24,10.82],w=2.01,yt=2.0,yb=4.42,hh=.96;
    function entity(name,field,module,x,y,h=hh){rect(s,x,y,w,h);rect(s,x,y,w,.36,C.pale,C.line);text(s,name,x+.07,y+.035,w-.14,.29,15,{bold:true,color:C.navy});text(s,field,x+.07,y+.45,w-.14,h-.48,14);text(s,module,x,y-.29,w,.24,14,{color:C.muted});}
    function rel(x1,y1,x2,y2,a,b,dashed=false){line(s,x1,y1,x2,y2,{dashType:dashed?'dash':'solid',width:1.3});if(y1===y2){text(s,a,x1+.03,y1-.31,.55,.25,14);text(s,b,x2-.57,y2-.31,.55,.25,14,{align:'right'});}else{text(s,a,x1+.08,y1+.05,.7,.25,14);text(s,b,x2+.08,y2-.32,.72,.25,14);}}
    entity('Usuario','id · rol','Identity',xs[0],yt);entity('Comunidad','id · nombre','Shelter',xs[1],yt);entity('Solicitud','id · community_id','Shelter',xs[2],yt);entity('Propuesta','id · request_id (ref.)','Inventory',xs[3],yt);entity('Autorización','id · matching_id','Inventory',xs[4],yt);
    entity('Riesgo','id · community_id','Territory',xs[0],yb);entity('Producto','id\nunit_of_measure_id','Inventory',xs[1],yb);entity('Lote de stock','id · product_id','Inventory',xs[2],yb);entity('Línea propuesta','id · matching_id\nstock_id','Inventory',xs[3],yb,1.17);entity('Despacho','id · authorization_id','Logistics',xs[4],yb,1.17);
    entity('Recepción','id · dispatch_id (ref.)','Shelter',xs[4],6.13,.93);
    rel(xs[0]+w,yt+.5,xs[1],yt+.5,'0..1','1',true);rel(xs[1]+w,yt+.5,xs[2],yt+.5,'1','0..*');rel(xs[2]+w,yt+.5,xs[3],yt+.5,'1','0..*',true);rel(xs[3]+w,yt+.5,xs[4],yt+.5,'1','0..1');
    rel(xs[1]+w,yb+.5,xs[2],yb+.5,'1','0..*');rel(xs[2]+w,yb+.5,xs[3],yb+.5,'1','0..*');rel(xs[3]+1,yt+hh,xs[3]+1,yb,'1','1..*');rel(xs[4]+1,yt+hh,xs[4]+1,yb,'1','1..*',true);rel(xs[4]+1,yb+1.17,xs[4]+1,6.13,'1','0..1',true);
    // El conector acodado evita atravesar entidades; ambos segmentos son una sola relación lógica.
    line(s,xs[1]+.65,yt+hh,xs[1]+.65,3.63,{dashType:'dash'});line(s,xs[1]+.65,3.63,xs[0]+1,3.63,{dashType:'dash'});line(s,xs[0]+1,3.63,xs[0]+1,yb,{dashType:'dash'});text(s,'1',xs[1]+.77,3.02,.5,.28,14);text(s,'0..*',xs[0]+1.12,4.06,.7,.28,14);
    line(s,.5,6.12,1.12,6.12);text(s,'FK dentro del módulo',1.28,5.98,3.4,.32,14);line(s,4.67,6.12,5.29,6.12,{dashType:'dash'});text(s,'Referencia lógica entre módulos',5.45,5.98,4.84,.34,14);
    text(s,'Las propuestas relacionan necesidades con lotes mediante sus líneas; la autorización habilita el despacho y su recepción.',.5,6.61,9.82,.54,16);
  }
  // 09
  {
    const s=base(9,'Integridad y trazabilidad de los datos','Ejemplo documentado: 70 bidones de Puente Verde para Las Palmeras','docs/07-datos/06-integridad-transaccional.md; prototipos/00-sistema-diseno/escenario-demostracion.md');
    const xs=[.5,4.73,8.96];
    const states=[['Antes de autorizar','80','0','80'],['Después de autorizar','80','70','10'],['Después de retirar 70','10','0','10']];
    states.forEach((r,i)=>{label(s,r[0],xs[i],1.91,3.87,C.navy,20);['Físico','Comprometido','Disponible'].forEach((t,j)=>{text(s,t,xs[i],2.69+j*.53,2.63,.35,18);text(s,r[j+1],xs[i]+2.85,2.64+j*.53,.85,.45,23,{bold:true,color:j===2?C.cyan:C.ink,align:'right'});});if(i<2)arrow(s,xs[i]+3.91,3.22,xs[i+1]-.12,3.22);});
    line(s,.5,4.47,12.83,4.47,{color:C.line,width:1});
    block(s,'Recepción del aporte','De 70 bidones enviados, se reciben 68 conformes y se registran 2 faltantes. La recepción no vuelve a descontar stock.',.5,4.86,5.7,1.48);
    block(s,'Protección transaccional','Autorizar y retirar revalidan cantidades de forma atómica. Una clave idempotente evita duplicar el efecto de un reintento.',6.86,4.86,5.97,1.48);
    note(s,'La auditoría conserva actor, fecha, estado y cantidades. Las discrepancias cerradas permanecen en el historial.');
  }
  // 10
  {
    const s=base(10,'Arquitectura lógica del sistema','Diseño de un frontend web y un backend organizado como monolito modular','docs/06-arquitectura/01-arquitectura-logica.md; docs/06-arquitectura/02-decisiones-arquitectonicas.md; diagramas/05-estructura/EST-02-paquetes.puml; EST-03-componentes.puml');
    smallNode(s,'Next.js / React','Frontend por rol.',.5,1.93,2.65,1.72);
    rect(s,3.85,1.76,8.98,3.72,C.white);label(s,'Backend NestJS · Una aplicación modular',4.05,1.93,8.5,C.navy,21);
    text(s,'API REST: autenticación, permisos y validación',4.05,2.55,8.5,.38,18);
    text(s,'Aplicación: orquesta casos de uso y transacciones',4.05,3.1,8.5,.4,18);
    const mods=[['Identity','Acceso'],['Shelter','Necesidades'],['Inventory','Stock y aportes'],['Logistics','Despachos'],['Territory','Riesgo']];
    mods.forEach((m,i)=>{const x=4.05+i*1.71;rect(s,x,3.85,1.53,1.05,C.pale);text(s,m[0],x+.07,3.98,1.39,.29,16,{bold:true,color:C.navy});text(s,m[1],x+.07,4.42,1.39,.3,14);});
    text(s,'Dominio: reglas de negocio independientes del framework',4.05,5.04,8.5,.3,16,{color:C.muted});
    arrow(s,3.2,2.8,3.8,2.8);text(s,'HTTPS',3.15,2.3,.67,.25,12,{color:C.muted});
    smallNode(s,'Persistencia','Prisma (ORM) accede a PostgreSQL.',4.05,5.91,4.14,1.15);smallNode(s,'Adaptadores','Fuentes territoriales y rutas previstas.',8.65,5.91,4.18,1.15);
    // Cajas pequeñas: los rótulos de infraestructura se disponen aparte para conservar 16 pt.
    arrow(s,6.1,5.5,6.1,5.85);arrow(s,10.7,5.5,10.7,5.85);
    text(s,'Cinco módulos comparten aplicación y base de datos. Sus contratos delimitan cada responsabilidad.',.5,4.41,2.65,1.67,18);
  }
  // 11
  {
    const s=base(11,'Servidor web e infraestructura cloud','Topología de referencia propuesta; no representa un despliegue ejecutado','docs/12-infraestructura/01-topologia-cloud.md; docs/12-infraestructura/03-servidor-web-cloud.md; diagramas/05-estructura/EST-04-despliegue.puml');
    smallNode(s,'Navegador','Accede a la aplicación web.',.5,2.03,2.35,1.65);
    smallNode(s,'Vercel','Frontend Next.js\ny proxy del servidor.',3.82,2.03,2.7,1.65);
    smallNode(s,'Render','API pública NestJS\ny tareas internas.',7.5,2.03,2.7,1.65);
    smallNode(s,'Supabase','PostgreSQL\nadministrado.',10.95,2.03,1.88,1.65);
    arrow(s,2.9,2.9,3.76,2.9);arrow(s,6.57,2.9,7.44,2.9);arrow(s,10.25,2.9,10.89,2.9);
    label(s,'HTTPS',2.91,2.39,.89,C.muted,14);label(s,'HTTPS',6.61,2.39,.89,C.muted,14);label(s,'TLS',10.31,2.39,.6,C.muted,14);
    block(s,'Servicios separados','Frontend y API se publican por separado. El proxy del frontend intermedia las solicitudes; la API vuelve a validar permisos.',.5,4.5,5.8,1.65);
    block(s,'Disponibilidad y seguridad','El diseño requiere monitoreo, recuperación y capacidad suficiente. Las conexiones entre proveedores usan cifrado y credenciales restringidas.',6.95,4.5,5.88,1.65);
    note(s,'La selección de servicios no acredita una disponibilidad contratada ni una red privada entre proveedores.');
  }
  // 12
  {
    const s=base(12,'Base de datos en la nube','PostgreSQL administrado en Supabase como servicio de referencia','docs/12-infraestructura/02-base-datos-cloud.md; docs/07-datos/README.md');
    smallNode(s,'Navegador','Sin acceso directo a la base de datos.',.5,1.97,3.2,1.55);
    smallNode(s,'Backend NestJS','Prisma accede a datos.\nConserva las credenciales.',5.0,1.97,3.45,1.55);
    smallNode(s,'PostgreSQL','Almacena registros y relaciones\nen cinco esquemas.',9.6,1.97,3.23,1.55);
    arrow(s,3.75,2.76,4.94,2.76);label(s,'Vía API',3.82,2.3,1.05,C.muted,14);arrow(s,8.5,2.76,9.54,2.76);label(s,'TLS',8.76,2.3,.6,C.muted,14);
    block(s,'Acceso restringido','Solo el backend opera con credenciales protegidas y permisos mínimos. Las migraciones utilizan una cuenta separada.',.5,4.22,5.85,1.75);
    block(s,'Continuidad de datos','Se proponen respaldos diarios y pruebas\nde restauración mensuales (retención: 30 días).\nObjetivos: perder como máximo 24 h de datos\ny recuperar el servicio en 8 h.',6.95,4.22,5.88,1.75);
    note(s,'Prisma es un ORM, no un servidor de base de datos. Los objetivos de recuperación requieren validación operativa.');
  }
  // 13
  {
    const s=base(13,'Comunicación a través del navegador','Ejemplo: registrar una solicitud comunitaria','docs/08-comunicaciones/01-navegador-servidor.md; docs/08-comunicaciones/02-contratos-api.md; docs/08-comunicaciones/03-seguridad-comunicaciones.md; diagramas/03-secuencias-casos-uso/comuna/CU-COM-01-registrar-solicitud.puml');
    const xs=[.5,3.07,5.64,8.21,10.78],titles=['Usuario','Navegador','Frontend','API','Base de datos'],sub=['Comuna','Formulario','Next.js / proxy','NestJS','PostgreSQL'];
    titles.forEach((t,i)=>{rect(s,xs[i],1.88,2.05,.92,C.pale);text(s,t,xs[i]+.1,2,1.85,.35,19,{bold:true,color:C.navy});text(s,sub[i],xs[i]+.1,2.47,1.85,.26,14);line(s,xs[i]+1.02,2.84,xs[i]+1.02,5.57,{color:C.line,dashType:'dash',width:1});});
    const yy=[3.19,3.62,4.05,4.48];
    const msgs=['Confirma datos','HTTPS al mismo origen','HTTPS · REST / JSON','Transacción validada'];
    yy.forEach((y,i)=>{arrow(s,xs[i]+1.02,y,xs[i+1]+1.02,y);text(s,msgs[i],xs[i]+1.1,y-.31,2.38,.27,14,{color:C.muted});});
    arrow(s,11.8,5.12,1.52,5.12,{dashType:'dash'});text(s,'Respuesta: identificador y estado confirmado, o errores específicos',2.37,5.3,8.5,.45,17,{color:C.cyan,bold:true,align:'center'});
    text(s,'La sesión identifica al usuario; la API autoriza su rol y comunidad, valida productos y cantidades, y persiste la solicitud antes de informar éxito. Los contratos REST definen peticiones y respuestas JSON. Los reintentos críticos usan claves idempotentes.',.5,6.1,12.25,.95,18);
  }
  // 14: Recortes fieles, no una captura completa ni una interfaz reconstruida.
  {
    const s=base(14,'Diseño general de interfaz','La experiencia mantiene un marco común y cambia con la responsabilidad del rol','docs/09-interfaz/01-navegacion-roles.md; docs/09-interfaz/02-especificacion-interfaces.md; docs/09-interfaz/03-visualizacion-cartografica.md; prototipos/00-sistema-diseno/identidad-visual.md; MK-02; MK-09');
    const cuts=[['sidebar','01-solicitud/MK-02-registro-solicitud.png',{left:0,top:0,width:240,height:320},.5,1.83,2.1,2.8],['topbar','01-solicitud/MK-02-registro-solicitud.png',{left:240,top:0,width:1360,height:68},3.0,1.83,9.83,.4915],['form','01-solicitud/MK-02-registro-solicitud.png',{left:272,top:555,width:845,height:331},3.0,2.79,5.92,2.319],['mapcontrols','06-supervision/MK-09-mapa-territorial.png',{left:272,top:208,width:490,height:67},9.26,2.79,3.57,.488]];
    for(const [name,src,crop,x,y,w,h] of cuts){const dest=path.join(tmp,name+'.png');await sharp(path.join(ROOT,'prototipos',src)).extract(crop).toFile(dest);s.addImage({path:dest,x,y,w,h});}
    text(s,'Sidebar por rol',.5,4.88,2.1,.35,17,{bold:true,color:C.navy});
    text(s,'Tablas y estados separan cantidades y etapas. Las alertas conservan fuente, fecha y grado de verificación.',9.26,3.68,3.57,1.55,18);
    line(s,.5,5.55,12.83,5.55,{color:C.line,width:1});
    text(s,'Sidebar y topbar compartidos orientan al usuario. Formularios y controles reutilizables mantienen etiquetas, unidades y confirmaciones coherentes. Cyan identifica acciones y selección; los estados incluyen texto además de color. La cartografía ofrece filtros y detalle textual para consultar riesgo y atención por separado.',.5,5.89,12.25,1.32,19);
  }
  const mockups=[
    {n:15,title:'Interfaz Comuna: registro de solicitudes',lead:'MK-02 · Primera etapa del flujo',file:'01-solicitud/MK-02-registro-solicitud.png',calls:[['Comunidad vinculada','La cuenta identifica Las Palmeras y registra la afectación de 180 personas.',[650,300]],['Productos y cantidades','Se solicitan 120 bidones de agua de 20 L y 80 frazadas.',[650,590]],['Validar y confirmar','Valida cantidades, unidades y duplicados antes de confirmar. La solicitud queda inmutable.',[1110,525]]]},
    {n:16,title:'Interfaz ONG: evaluación de matching',lead:'MK-04 · La propuesta automática requiere una decisión humana',file:'02-matching/MK-04-propuesta.png',calls:[['Origen de la propuesta','SOL-2026-001 vincula la necesidad de Las Palmeras con el aporte sugerido a Puente Verde.',[820,310]],['Propuesta y disponibilidad','Se proponen 70 bidones y 40 frazadas; están disponibles 80 y 50, respectivamente.',[1080,450]],['Decisión de la ONG','Puede confirmar, reducir o rechazar. Confirmar todavía no autoriza la salida ni compromete inventario.',[1080,753]]]},
    {n:17,title:'Interfaz ONG: autorización de salida',lead:'MK-05 · Después de confirmar, se revalida y autoriza el aporte',file:'03-autorizacion/MK-05-autorizacion.png',calls:[['Cantidades confirmadas','La ONG revisa 70 bidones y 40 frazadas, con su almacén y destino.',[1060,490]],['Revalidación','Comprueba lotes, disponibilidad y demanda pendiente. Un conflicto bloquea la operación.',[1080,620]],['Compromiso de stock','Autorizar compromete stock. El retiro completo descuenta las existencias físicas.',[1250,430]]]},
    {n:18,title:'Interfaz Brigada: ruta y traslado',lead:'MK-07 · El acceso condicionado por las lluvias exige verificación',file:'04-traslado/MK-07-ruta-traslado.png',calls:[['Origen y destino','El esquema une Puente Verde con Las Palmeras e identifica los tramos de acceso.',[690,475]],['Ruta y restricciones','Exige tramos transitables y verificación menor a 30 minutos; la incertidumbre bloquea.',[1510,440]],['Retiro y llegada','Se coteja y retira la carga completa. La llegada aún requiere recepción comunitaria.',[1510,820]]]},
    {n:19,title:'Defensa Civil: supervisión territorial',lead:'MK-09 · Riesgo y atención se consultan con significados diferentes',file:'06-supervision/MK-09-mapa-territorial.png',calls:[['Mapa y filtros','Comunidad, fenómeno y capas permiten consultar riesgo, atención y observaciones.',[690,400]],['Riesgo y cobertura','El riesgo de inundación sigue alto, con 118 bidones y 78 frazadas conformes.',[1490,530]],['Evidencia y alertas','Conservan fuente, fecha y verificación. Las alertas no declaran una emergencia.',[1490,740]]]},
    {n:20,title:'Informe final y conclusión',lead:'MK-10 · El resultado conserva cantidades, responsables y diferencias',file:'06-supervision/MK-10-informe-final.png',calls:[['Resultado consolidado','Una solicitud y dos despachos. Conformes: 118 de 120 bidones y 78 de 80 frazadas.',[1020,570]],['Diferencias visibles','Quedan dos bidones faltantes y dos frazadas dañadas. Demanda sin autorizar: cero; satisfacción pendiente: dos por producto.',[1490,610]]],conclusion:'Alivía organiza la coordinación humanitaria mediante procesos definidos, datos trazables, responsabilidades diferenciadas y una interfaz que permite consultar el estado de atención.'}
  ];
  for(const m of mockups){
    const s=base(m.n,m.title,m.lead,'prototipos/'+m.file+'; prototipos/00-sistema-diseno/escenario-demostracion.md; docs/09-interfaz/02-especificacion-interfaces.md',m.n===18?'Cartografía del prototipo: esquema por sectores sin escala, sin GPS en vivo ni coordenadas reales. La llegada se explica como el paso posterior al corte capturado.':m.n===20?'Informe publicado tras el evento preconfigurado del 20 de octubre de 2026 a las 18:00; publicación 18:01. No es un cierre ejecutado desde Defensa Civil. Una recepción conforme y otra con observaciones, 118 bidones recibidos/conformes, 80 frazadas físicas y 78 conformes. La brecha de satisfacción es 2 por producto, distinta de demanda nunca autorizada (0) y compromisos pendientes (0).':'El PNG se utiliza sin editar controles ni datos. Se recorta el área de trabajo para mejorar su legibilidad. Anotaciones nativas editables.');
    const crop={left:260,top:85,width:1320,height:m.n===20?790:m.n===18?870:850};
    const dest=path.join(tmp,'mk'+m.n+'.png');await sharp(path.join(ROOT,'prototipos',m.file)).extract(crop).toFile(dest);
    const x=.46,y=1.42,w=9.03,h=w*crop.height/crop.width;
    s.addImage({path:dest,x,y,w,h});
    // Solapamiento intencional: las pequeñas marcas numeradas señalan espacios libres de las capturas.
    m.calls.forEach((c,i)=>{const cy=1.73+i*1.79;numbered(s,i+1,9.86,cy);text(s,c[0],10.25,cy-.015,2.62,.6,18,{bold:true,color:C.navy});text(s,c[1],9.87,cy+.64,2.97,m.n===20&&i===1?2.05:1.13,17);if(c[2]){const px=x+(c[2][0]-crop.left)/crop.width*w,py=y+(c[2][1]-crop.top)/crop.height*h;numbered(s,i+1,px,py);}});
    if(m.conclusion)text(s,m.conclusion,.5,6.88,12.33,.59,17,{bold:true,color:C.navy});
  }
  assert.equal(pptx._slides.length,20,'Se requieren exactamente veinte diapositivas');
  assert.deepEqual(inventory.map(v=>v.n),Array.from({length:20},(_,i)=>i+1));
  await pptx.writeFile({fileName:path.join(OUT,'Alivia_Presentacion_Sistema.pptx')});
  console.log('20 diapositivas generadas en '+OUT);
  } finally {fs.rmSync(tmp,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
