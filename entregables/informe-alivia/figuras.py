"""Vistas resumidas reconstruibles y recortes fieles. No modifica las fuentes del repositorio."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

INK='#123D4B';ACCENT='#007F99';PALE='#E4F5FA';LINE='#54636B'
FONTS=Path('C:/Windows/Fonts')
def font(size,bold=False):return ImageFont.truetype(str(FONTS/('arialbd.ttf' if bold else 'arial.ttf')),size)
class Drawing:
 def __init__(self,w=1950,h=1200):self.im=Image.new('RGB',(w,h),'white');self.d=ImageDraw.Draw(self.im)
 def text(self,text,x,y,w,size=40,bold=False,color=INK,center=False):
  f=font(size,bold);yy=y
  for raw in text.split('\n'):
   words=raw.split();line='';lines=[]
   for word in words:
    trial=(line+' '+word).strip()
    if self.d.textlength(trial,font=f)>w and line:lines.append(line);line=word
    else:line=trial
   lines.append(line)
   for line in lines:
    xx=x+(w-self.d.textlength(line,font=f))/2 if center else x
    self.d.text((xx,yy),line,font=f,fill=color);yy+=round(size*1.28)
  return yy
 def box(self,x,y,w,h,title,body='',size=40):
  self.d.rectangle((x,y,x+w,y+h),fill=PALE,outline=LINE,width=3)
  yy=self.text(title,x+24,y+18,w-48,size,True)
  if body:self.text(body,x+24,yy+16,w-48,size-3)
 def edge(self,points,label='',dashed=False,arrow=True):
  for p,q in zip(points,points[1:]):
   if dashed:
    length=math.dist(p,q)
    for n in range(0,int(length),22):
     a=n/length;b=min(n+12,length)/length
     self.d.line((p[0]+(q[0]-p[0])*a,p[1]+(q[1]-p[1])*a,p[0]+(q[0]-p[0])*b,p[1]+(q[1]-p[1])*b),fill=ACCENT,width=4)
   else:self.d.line((p,q),fill=ACCENT,width=4)
  if arrow:
   p,q=points[-2:];ang=math.atan2(q[1]-p[1],q[0]-p[0]);sz=17
   self.d.polygon([q,(q[0]-sz*math.cos(ang-.45),q[1]-sz*math.sin(ang-.45)),(q[0]-sz*math.cos(ang+.45),q[1]-sz*math.sin(ang+.45))],fill=ACCENT)
  if label:
   p,q=max(zip(points,points[1:]),key=lambda pq:math.dist(*pq));cx=(p[0]+q[0])/2;cy=(p[1]+q[1])/2
   tw=self.d.textlength(label,font=font(32));xx=cx-tw/2;yy=cy-42
   self.d.rectangle((xx-5,yy,xx+tw+5,yy+42),fill='white');self.text(label,xx,yy,tw+3,32)
 def save(self,path):self.im.save(path,dpi=(300,300))

def er(out,key,tables,edges):
 a=Drawing(2700,1450);xy={}
 for i,(name,fields) in enumerate(tables):
  x=50+(i%3)*915;y=40+(i//3)*470;w=770;h=340;xy[name]=(x,y,w,h)
  a.d.rectangle((x,y,x+w,y+h),fill='white',outline=LINE,width=3)
  a.d.rectangle((x,y,x+w,y+64),fill=PALE,outline=LINE,width=3)
  a.text(name,x+17,y+9,w-34,39,True)
  a.text('\n'.join(fields),x+18,y+82,w-36,38)
 for i,j,card,logical in edges:
  x,y,w,h=xy[tables[i][0]];u,v,ww,hh=xy[tables[j][0]]
  if key=='er1' and (i,j)==(3,7):pts=[(435,850),(435,920),(1350,920),(1350,980)]
  elif key=='er1' and (i,j)==(7,5):pts=[(1735,1000),(1800,1000),(1800,920),(2265,920),(2265,850)]
  elif key=='er2' and (i,j)==(1,7):pts=[(1735,285),(1810,285),(1810,1225),(1735,1225)]
  elif y==v:pts=[(x+w,y+170),(u,v+170)] if x<u else [(x,y+170),(u+ww,v+170)]
  elif x==u:pts=[(x+w/2,y+h),(u+ww/2,v)] if y<v else [(x+w/2,y),(u+ww/2,v+hh)]
  else:
   # Canal libre entre columnas: mantiene las conexiones fuera de las tablas.
   if x<u:cx=x+w+75;pts=[(x+w,y+245),(cx,y+245),(cx,v+245),(u,v+245)]
   else:cx=u+ww+75;pts=[(x,y+245),(cx,y+245),(cx,v+245),(u+ww,v+245)]
  if x>u or (x==u and y>v):card=' : '.join(reversed(card.split(' : ')))
  a.edge(pts,card,logical,False)
 a.text('PK: UUID   FK: interna   R: lógica   U: unicidad. Cardinalidad: izquierda : derecha; misma columna, arriba : abajo.',50,1380,2600,32)
 a.save(out/(key+'.png'))

def build(out,root):
 out.mkdir(parents=True,exist_ok=True)
 a=Drawing(1950,1000)
 actors=[('Comuna',30,100),('ONG',30,600),('Brigada',1570,100),('Defensa Civil',1570,600)]
 for name,x,y in actors:a.box(x,y,350,170,name,'',42)
 a.d.rectangle((460,40,1490,950),outline=LINE,width=3);a.text('Alivía',500,55,950,46,True)
 cases=[('Solicitar y verificar recepción',520,170),('Inventario y matching',520,420),('Confirmar y autorizar',520,670),('Ruta, retiro y llegada',1030,170),('Supervisar riesgo y atención',1030,420),('Consultar informe final',1030,670)]
 for title,x,y in cases:
  a.d.ellipse((x,y,x+400,y+200),fill=PALE,outline=LINE,width=3);a.text(title,x+40,y+45,320,37,center=True)
 a.edge([(380,185),(520,270)],arrow=False);a.edge([(380,685),(520,520)],arrow=False);a.edge([(380,685),(520,770)],arrow=False)
 a.edge([(1570,185),(1430,270)],arrow=False);a.edge([(1570,685),(1430,520)],arrow=False);a.edge([(1570,685),(1430,770)],arrow=False)
 a.save(out/'uc.png')
 a=Drawing(1950,1130)
 items=[('1. Comuna','Confirma la solicitud.'),('2. Sistema','Propone matching.'),('3. ONG','Confirma y autoriza.'),('4. Brigada','Retira y registra llegada.'),('5. Comuna','Verifica recepción.'),('6. Defensa Civil','Consulta riesgo y atención.')]
 for i,(title,body) in enumerate(items[:5]):
  x=40+(i%3)*650;y=80+(i//3)*400;a.box(x,y,570,240,title,body)
 a.edge([(610,200),(690,200)]);a.edge([(1260,200),(1340,200)]);a.edge([(1625,320),(1625,415),(325,415),(325,480)])
 a.edge([(610,600),(690,600)])
 a.box(1340,480,570,240,'Observaciones externas','Fuente, fecha y certeza.')
 a.box(40,830,1870,150,'6. Defensa Civil · Supervisión territorial','Consulta durante toda la operación.')
 a.edge([(1625,725),(1625,820)],dashed=True)
 a.text('La supervisión acompaña el proceso. El informe final requiere el evento de cierre.',40,1020,1860,41)
 a.save(out/'flujo.png')
 # Secuencias: coordinación de responsabilidades, no servicios ni rutas adicionales.
 for key,withdraw in [('retiro',True),('comunicacion',False)]:
  a=Drawing(1950,1280);xs=[230,720,1210,1700]
  labels=['Brigada','API / aplicación','Logistics + Inventory','PostgreSQL'] if withdraw else ['Navegador','Next.js / proxy','API NestJS','PostgreSQL']
  for x,label in zip(xs,labels):a.box(x-210,30,420,140,label,'',35);a.edge([(x,190),(x,1160)],dashed=True,arrow=False)
  msgs=[(0,1,'Confirmar retiro completo'),(1,2,'Validar rol, despacho y ruta'),(2,3,'TX: revalidar lotes y compromiso'),(2,3,'Movimiento + estado + auditoría'),(3,2,'Confirmar una sola operación'),(2,1,'Resultado idempotente'),(1,0,'Retiro confirmado')] if withdraw else [(0,1,'HTTPS y cookie protegida'),(1,2,'POST /v1/requests · JSON'),(2,2,'Sesión, titularidad y datos'),(2,3,'Crear solicitud y líneas en TX'),(3,2,'Resultado persistido'),(2,1,'201 o error tipado'),(1,0,'Actualizar estado visible')]
  for n,(i,j,label) in enumerate(msgs):
   y=280+n*123
   if i==j:a.box(xs[i]-210,y-80,420,100,'Validar','',36)
   else:a.edge([(xs[i],y),(xs[j],y)],arrow=True);a.text(label,min(xs[i],xs[j])+14,y-93,abs(xs[j]-xs[i])-25,32)
  a.text('Misma clave y contenido: resultado previo. Un conflicto no confirma una operación parcial.' if withdraw else 'La comunidad proviene de la sesión. La interfaz informa éxito solo después de la confirmación.',40,1190,1870,35)
  a.save(out/(key+'.png'))
 a=Drawing(1950,1300)
 for x,title,body in [(35,'Identity','Usuario, rol, pertenencia y auditoría.'),(680,'Shelter','Comunidad, solicitud y recepción.'),(1325,'Territory','Observación y evaluación de riesgo.')]:a.box(x,30,585,225,title,body)
 central=[('Solicitud','Productos y cantidades.'),('Propuesta','Lotes aptos de una ONG.'),('Autorización','Compromiso de recursos.'),('Recepción','Cantidad y condición.'),('Lote','Producto en almacén.'),('Despacho','Retiro y traslado.')]
 for i,(title,body) in enumerate(central):a.box(35+(i%3)*645,410+(i//3)*390,585,240,title,body)
 a.edge([(620,530),(680,530)]);a.edge([(1265,530),(1325,530)]);a.edge([(1617,650),(1617,800)])
 a.edge([(1617,1040),(1617,1100),(327,1100),(327,1040)])
 a.edge([(972,800),(972,650)],dashed=True)
 a.text('Una necesidad admite varias propuestas. Una autorización puede originar varios despachos; cada uno tiene su verificación.',35,1170,1880,37)
 a.save(out/'concepto.png')
 er(out,'er1',[
 ('shelter.community',['PK id','FK district_id']),('shelter.request',['PK id','FK community_id · emergency_id','R created_by_user_id']),('inventory.matching',['PK id','R request_id · ong_id','status']),
 ('inventory.warehouse',['PK id','R ong_id']),('shelter.request_item',['PK id · FK request_id','R product_id','requested_quantity']),('inventory.matching_item',['PK id · FK matching_id · stock_id','R request_item_id','proposed_quantity','confirmed_quantity']),
 ('inventory.product',['PK id','FK category_id · unit_of_measure_id','delivery_multiple']),('inventory.stock',['PK id · FK warehouse_id · product_id','physical_quantity','expires_on · status']),('inventory.movement',['PK id · U operation_key','FK stock_id · R dispatch_id','R actor_user_id','type · quantity_delta · created_at'])
 ],[(0,1,'1 : 0..*',False),(1,2,'1 : 0..*',True),(1,4,'1 : 1..*',False),(2,5,'1 : 1..*',False),(4,5,'1 : 0..*',True),(3,7,'1 : 0..*',False),(6,7,'1 : 0..*',False),(7,8,'1 : 0..*',False),(7,5,'1 : 0..*',False)])
 er(out,'er2',[
 ('inventory.authorization',['PK id · FK matching_id [U]','U operation_key']),('logistics.dispatch',['PK id · R authorization_id','R warehouse_id · community_id','R brigade_user_id','status · withdrawn_at · arrived_at']),('shelter.receipt',['PK id · FK request_id','R dispatch_id [U]','result · confirmed_at']),
 ('inventory.matching',['PK id','R request_id · ong_id','status']),('logistics.dispatch_item',['PK id · FK dispatch_id','R matching_item_id [U]','authorized_quantity','withdrawn_quantity']),('shelter.receipt_item',['PK id · FK receipt_id · request_item_id','R dispatch_item_id [U]','received_quantity · conforming_quantity','missing_quantity']),
 ('logistics.route',['PK id · FK dispatch_id','status · verified_at']),('logistics.document',['PK id · FK dispatch_id','R receipt_id · U(dispatch_id, type)','file_location · checksum']),('shelter.discrepancy_report',['PK id · FK receipt_id [U]','description'])
 ],[(1,7,'1 : 0..*',False),(0,1,'1 : 1..*',True),(1,2,'1 : 0..1',True),(1,4,'1 : 1..*',False),(2,5,'1 : 1..*',False),(3,0,'1 : 0..1',False),(4,5,'1 : 0..1',True),(1,6,'1 : 0..*',False)])
 er(out,'er3',[
 ('identity.ong',['PK id','name']),('identity.brigade',['PK id','name']),('territory.catastrophe',['PK id · U code','name']),
 ('identity.user',['PK id · U email · role','FK ong_id · brigade_id','R community_id']),('identity.audit_event',['PK id · U operation_key','FK actor_user_id','object_id · action · occurred_at']),('territory.risk',['PK id · R community_id','FK catastrophe_id · catastrophe_level_id','FK observation_id (opcional)','source · assessed_at']),
 ('shelter.community',['PK id','FK district_id']),('territory.observation',['PK id','source · external_id · certainty','observed_at · ingested_at']),('territory.catastrophe_level',['PK id · U code','U severity_order · name'])
 ],[(0,3,'1 : 0..1',False),(1,3,'1 : 0..1',False),(3,4,'1 : 0..*',False),(6,3,'1 : 0..1',True),(2,5,'1 : 0..*',False),(8,5,'1 : 0..*',False),(7,5,'0..1 : 0..*',False)])
 a=Drawing(1950,1200)
 a.box(35,80,500,310,'Frontend Next.js','Interfaz por rol, formularios, mapas y estados.')
 a.box(660,35,1255,180,'Presentación / API','DTO, sesión, autorización y HTTP.')
 a.box(660,320,1255,180,'Aplicación','Casos de uso, contratos y transacciones.')
 a.box(660,610,575,310,'Dominio','Invariantes, matching, estados y conformidad.')
 a.box(1340,610,575,310,'Infraestructura','Prisma, archivos y adaptadores externos.')
 a.edge([(535,190),(650,190)],'HTTPS');a.edge([(1250,220),(1250,310)]);a.edge([(950,505),(950,600)]);a.edge([(1600,505),(1600,600)])
 a.text('La aplicación usa contratos; infraestructura los implementa. El dominio no depende de HTTP, ORM ni proveedores.',35,1040,1870,43)
 a.save(out/'capas.png')
 a=Drawing(1950,1100)
 a.box(35,35,1880,170,'Identity','Sesión, rol, pertenencia y auditoría transversal.')
 for x,title,body in [(35,'Shelter','Necesidades y recepciones.'),(680,'Inventory','Lotes, propuestas y autorizaciones.'),(1325,'Logistics','Despachos, rutas y documentos.')]:a.box(x,320,585,255,title,body)
 a.edge([(620,445),(670,445)]);a.edge([(1265,445),(1315,445)])
 a.edge([(1600,580),(1600,665),(970,665),(970,580)],'Retiro: descuento')
 a.edge([(1810,580),(1810,765),(320,765),(320,580)],'Llegada: habilita recepción')
 a.box(35,860,585,190,'Territory','Riesgo y evidencia.')
 a.box(820,860,1095,190,'Consulta de supervisión','Combina Territory, Shelter y Logistics.')
 a.edge([(625,955),(810,955)])
 a.save(out/'modulos.png')
 a=Drawing(1950,1130)
 a.box(35,150,400,220,'Navegador','Interfaz por rol.')
 a.box(610,150,570,220,'Vercel / Next.js','Web y proxy de servidor.')
 a.box(1345,150,570,220,'Render / NestJS','API y tareas internas.')
 a.edge([(440,265),(600,265)],'HTTPS');a.edge([(1185,265),(1335,265)],'HTTPS')
 a.box(1000,650,915,310,'Supabase','PostgreSQL: cinco schemas.\nStorage candidato: XLSX y PDF.')
 a.edge([(1610,375),(1610,640)],'TLS / acceso autorizado')
 a.text('Propuesta de despliegue administrado. Secretos y accesos a datos permanecen en el backend.',35,1010,1870,42)
 a.save(out/'cloud.png')
 # Los recortes mantienen píxeles y proporciones, sin recomponer controles ni datos.
 crops={
 'mk02':('01-solicitud/MK-02-registro-solicitud.png',(272,262,1117,886)),
 'mk04':('02-matching/MK-04-propuesta.png',(272,262,1117,854)),
 'mk05':('03-autorizacion/MK-05-autorizacion.png',(272,262,1117,850)),
 'mk07':('04-traslado/MK-07-ruta-traslado.png',(272,262,1117,917)),
 'mk08':('05-recepcion/MK-08-recepcion-variante.png',(272,262,1117,900)),
 'mk09':('06-supervision/MK-09-mapa-territorial.png',(1135,292,1568,834)),
 'mk10':('06-supervision/MK-10-informe-final.png',(272,395,1078,867))}
 for key,(file,crop) in crops.items():
  im=Image.open(root/'prototipos'/file);assert crop[2]<=im.width and crop[3]<=im.height
  im.crop(crop).save(out/(key+'.png'))
