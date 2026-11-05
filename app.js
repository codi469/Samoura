const INITIAL_ITEMS = [
 {id:'g1',name:'كيلو بانيه مشوي على الفحم',price:270,category:'مشويات بالكيلو',icon:'🍗'},
 {id:'g2',name:'كيلو شيش طاووق مشوي',price:260,category:'مشويات بالكيلو',icon:'🍢'},
 {id:'g3',name:'كيلو كفتة فراخ مشوية',price:200,category:'مشويات بالكيلو',icon:'🍢'},
 {id:'g4',name:'كيلو كفتة لحمة مشوية',price:210,category:'مشويات بالكيلو',icon:'🥩'},
 {id:'g5',name:'كيلو كفتة لحمة مشوية',price:250,category:'مشويات بالكيلو',icon:'🥩'},
 {id:'g6',name:'كيلو كفتة مشوية (النوع غير محدد)',price:230,category:'مشويات بالكيلو',icon:'🥩'},
 {id:'g7',name:'كيلو جناح مشوي',price:75,category:'مشويات بالكيلو',icon:'🍗',note:'ضمن عرض 2 كيلو بـ 150 جنيه'},
 {id:'c1',name:'فرخة مشوية كاملة',price:250,category:'فراخ مشوية',icon:'🍗'},
 {id:'c2',name:'فرخة مشوية كاملة',price:260,category:'فراخ مشوية',icon:'🍗'},
 {id:'c3',name:'فرخة مشوية كبيرة',price:450,category:'فراخ مشوية',icon:'🍗',note:'ضمن عرض مع كيلو كفتة فراخ'},
 {id:'m1',name:'ربع فرخة + بانيه + أرز',price:120,category:'وجبات فردية',icon:'🍛'},
 {id:'m2',name:'ربع فرخة + شيش + أرز',price:120,category:'وجبات فردية',icon:'🍛'},
 {id:'m3',name:'ربع فرخة + كفتة لحمة + أرز',price:80,category:'وجبات فردية',icon:'🍛'},
 {id:'m4',name:'ربع فرخة + كفتة فراخ + أرز',price:60,category:'وجبات فردية',icon:'🍛'},
 {id:'m5',name:'ربع فرخة + قطعتين كفتة + أرز',price:110,category:'وجبات فردية',icon:'🍛'},
 {id:'m6',name:'ربع فرخة + قطعتين كفتة + أرز',price:140,category:'وجبات فردية',icon:'🍛'},
 {id:'m7',name:'ربع فرخة + كفتة لحمة (بدون ذكر الأرز)',price:80,category:'وجبات فردية',icon:'🍛'},
 {id:'m8',name:'نصف فرخة + أرز',price:190,category:'وجبات فردية',icon:'🍛'},
 {id:'m9',name:'نصف كفتة لحمة + أرز',price:160,category:'وجبات فردية',icon:'🥘'},
 {id:'m10',name:'ربع بانيه + أرز',price:120,category:'وجبات فردية',icon:'🍛'},
 {id:'m11',name:'ربع شيش طاووق',price:120,category:'وجبات فردية',icon:'🍢'},
 {id:'m12',name:'وجبة الأكيل: ربع فرخة ورك + كفتة + أرز + سلطة + طحينة',price:120,category:'وجبات فردية',icon:'🍽️'},
 {id:'m13',name:'وجبة الأكيل: أصابع كفتة + ورك فرخة + أرز + سلطة + طحينة',price:130,category:'وجبات فردية',icon:'🍽️'},
 {id:'m14',name:'وجبة مكس: كفتة + شيش + بانيه',price:200,category:'وجبات فردية',icon:'🍽️'},
 {id:'o1',name:'نصف فرخة + أرز + سلطة + طحينة',price:150,category:'عروض الفراخ والوجبات',icon:'🍗',offer:true},
 {id:'o2',name:'فرخة مشوية + كيلو كفتة فراخ',price:460,category:'عروض الفراخ والوجبات',icon:'🔥',offer:true},
 {id:'o3',name:'فرخة مشوية + كيلو كفتة فراخ',price:450,category:'عروض الفراخ والوجبات',icon:'🔥',offer:true},
 {id:'o4',name:'فرخة مشوية + كيلو كفتة لحمة',price:480,category:'عروض الفراخ والوجبات',icon:'🔥',offer:true},
 {id:'o5',name:'فرختان مشويتان',price:500,category:'عروض الفراخ والوجبات',icon:'🍗',offer:true},
 {id:'o6',name:'فرختان مشويتان',price:520,category:'عروض الفراخ والوجبات',icon:'🍗',offer:true},
 {id:'o7',name:'فرختان متبلتان',price:450,category:'عروض الفراخ والوجبات',icon:'🍗',offer:true},
 {id:'o8',name:'2 كيلو كفتة لحمة مشوية',price:450,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o9',name:'2 كيلو كفتة لحمة متبلة',price:300,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o10',name:'2 كيلو كفتة فراخ مشوية',price:400,category:'عروض المشويات',icon:'🍢',offer:true},
 {id:'o11',name:'1 كيلو كفتة لحمة + 1 كيلو كفتة فراخ',price:350,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o12',name:'1 كيلو كفتة لحمة + 1 كيلو كفتة فراخ',price:400,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o13',name:'1 كيلو كفتة لحمة + 1 كيلو كفتة فراخ',price:430,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o14',name:'2 كيلو شيش مشوي',price:520,category:'عروض المشويات',icon:'🍢',offer:true},
 {id:'o15',name:'2 كيلو شيش مشوي',price:540,category:'عروض المشويات',icon:'🍢',offer:true},
 {id:'o16',name:'2 كيلو بانيه مشوي',price:550,category:'عروض المشويات',icon:'🍗',offer:true},
 {id:'o17',name:'2 كيلو بانيه مشوي',price:560,category:'عروض المشويات',icon:'🍗',offer:true},
 {id:'o18',name:'1 كيلو بانيه مشوي + 1 كيلو شيش مشوي',price:500,category:'عروض المشويات',icon:'🍢',offer:true},
 {id:'o19',name:'2 حواوشي + 2 شيش + 2 بانيه',price:200,category:'عروض متنوعة',icon:'🥙',offer:true},
 {id:'o20',name:'4 ساندوتشات حواوشي',price:100,category:'عروض متنوعة',icon:'🥙',offer:true},
 {id:'o21',name:'ساندوتش كفتة (يبدأ من)',price:40,category:'عروض متنوعة',icon:'🥙',offer:true,note:'السعر يبدأ من 40 جنيه'},
 {id:'f1',name:'صينية سمورة',price:850,category:'صواني عائلية',icon:'🍱',offer:true,note:'فرخة كاملة مشوية • نصف كيلو كفتة • نصف كيلو أرز بسمتي • ربع كيلو بانيه • ربع كيلو شيش'},
 {id:'f2',name:'صينية المدلعة',price:300,category:'صواني عائلية',icon:'🍱',offer:true,note:'2 حواوشي • نصف فرخة • ربع كيلو كفتة • ربع كيلو شيش • أرز'},
 {id:'f3',name:'صينية كولاش باللحمة',price:450,category:'صواني عائلية',icon:'🍱',offer:true,note:'صينية كولاش باللحمة • فرخة مشوية'},
 {id:'s1',name:'مكرونة بشاميل — طبق وسط',price:80,category:'مكرونة وأطباق جانبية',icon:'🍝'},
 {id:'s2',name:'مكرونة بشاميل — طبق كبير',price:120,category:'مكرونة وأطباق جانبية',icon:'🍝'},
 {id:'s3',name:'طبق مكرونة كبير + فرخة مشوية',price:370,category:'مكرونة وأطباق جانبية',icon:'🍝',offer:true},
 {id:'s4',name:'طبق مكرونة وسط + كيلو كفتة لحمة',price:330,category:'مكرونة وأطباق جانبية',icon:'🍝',offer:true},
 {id:'o22',name:'عرض 2 كفتة لحمة',price:490,category:'عروض المشويات',icon:'🥩',offer:true},
 {id:'o23',name:'عرض 2 شيش مشوي',price:520,category:'عروض المشويات',icon:'🍢',offer:true},
 {id:'o24',name:'عرض 2 بانيه مشوي',price:550,category:'عروض المشويات',icon:'🍗',offer:true},
 {id:'o25',name:'2 كيلو جناح مشوي',price:150,category:'عروض المشويات',icon:'🍗',offer:true}
];
const PRODUCT_PHOTOS={g1:9,g2:6,g3:4,g4:7,g5:57,g6:7,g7:32,c1:8,c2:14,c3:48,m1:5,m2:3,m3:11,m4:4,m5:47,m6:47,m7:11,m8:20,m9:17,m10:9,m11:3,m12:33,m13:47,m14:1,o1:31,o2:49,o3:48,o4:36,o5:16,o6:56,o7:16,o8:46,o9:42,o10:38,o11:12,o12:38,o13:47,o14:45,o15:37,o16:15,o17:39,o18:1,o19:1,o20:55,o21:23,f1:25,f2:34,f3:53,s1:10,s2:2,s3:54,s4:57,o22:18,o23:45,o24:15,o25:32};
const bundledContent=window.SAMOURA_CONTENT||{};
if(Array.isArray(bundledContent.products)&&bundledContent.products.length)INITIAL_ITEMS.splice(0,INITIAL_ITEMS.length,...bundledContent.products.map(x=>({...x})));
INITIAL_ITEMS.forEach(x=>{x.image=x.image||`assets/product-images/food-${String(PRODUCT_PHOTOS[x.id]||1).padStart(2,'0')}.webp`;x.active=x.active!==false});
window.SAMOURA_INITIAL_ITEMS=INITIAL_ITEMS;
const STORE_KEY='samoura_menu_v1';
let items=readItems(),cart=JSON.parse(localStorage.getItem('samoura_cart_v1')||'[]'),activeCategory='الكل',search='';
const parseStored=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}};
let managedContent={...bundledContent,...parseStored('samoura_site_content_v1',{})};
let businessSettings={...(bundledContent.settings||{}),...parseStored('samoura_settings_v1',{}),...(managedContent.settings||{})};
let categories=[...new Set(['الكل','العروض',...(Array.isArray(managedContent.categories)?managedContent.categories:['وجبات فردية','مشويات بالكيلو','فراخ مشوية','صواني عائلية','مكرونة وأطباق جانبية','عروض متنوعة'])])];
let managedVideos=Array.isArray(managedContent.videos)?managedContent.videos:[];
let managedReviews=Array.isArray(managedContent.reviews)?managedContent.reviews:[];
function readItems(){try{return (parseStored(STORE_KEY,null)||INITIAL_ITEMS).map(x=>({...x,image:x.image||`assets/product-images/food-${String(PRODUCT_PHOTOS[x.id]||1).padStart(2,'0')}.webp`,active:x.active!==false}))}catch{return INITIAL_ITEMS.slice()}}
function saveItems(){localStorage.setItem(STORE_KEY,JSON.stringify(items))}
function money(n){return `${Number(n).toLocaleString('ar-EG')} ج.م`}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const categoryTabs=document.getElementById('categoryTabs'),menuGrid=document.getElementById('menuGrid');
function drawTabs(){const visibleCategories=['الكل','العروض',...categories.filter(c=>c!=='الكل'&&c!=='العروض')];if(!visibleCategories.includes(activeCategory))activeCategory='الكل';categoryTabs.innerHTML=visibleCategories.map(c=>`<button class="category-tab ${activeCategory===c?'active':''}" data-category="${esc(c)}">${esc(c)}</button>`).join('')}
function selectedItems(){return items.filter(x=>x.active!==false&&(activeCategory==='الكل'||(activeCategory==='العروض'?x.offer:x.category===activeCategory))&&(`${x.name} ${x.category} ${x.note||''}`.includes(search)))}
function card(x){return `<article class="menu-card"><a class="menu-product-link" href="product.html?id=${encodeURIComponent(x.id)}"><img class="product-thumb" src="${esc(x.image||'assets/hero-grill.png')}" alt="${esc(x.name)}" loading="lazy"><div class="dish-info"><h3>${esc(x.name)}</h3><p>${esc(x.note||x.category)}</p></div></a><div class="dish-actions"><span class="dish-price">${money(x.price)}</span><a class="details-button" href="product.html?id=${encodeURIComponent(x.id)}" aria-label="تفاصيل ${esc(x.name)}">التفاصيل</a><button class="add-button" data-add="${esc(x.id)}" aria-label="أضف ${esc(x.name)} للسلة">+</button></div></article>`}
function drawMenu(){menuGrid.innerHTML=selectedItems().map(card).join('');document.getElementById('emptyState').hidden=!!menuGrid.innerHTML}
function drawOffers(){const limit=Math.max(1,Math.min(9,Number(businessSettings.featuredOffersCount)||3));const featured=items.filter(x=>x.active!==false&&x.offer).slice(0,limit);document.getElementById('featuredOffers').innerHTML=featured.map(x=>`<article class="offer-card"><a class="offer-image-link" href="product.html?id=${encodeURIComponent(x.id)}"><img src="${esc(x.image||'assets/hero-grill.png')}" alt="${esc(x.name)}" loading="lazy"><span class="offer-tag">اختيار سمورة</span></a><div class="offer-copy"><a href="product.html?id=${encodeURIComponent(x.id)}"><h3>${esc(x.name)}</h3></a><p>${esc(x.note||'اختيار لذيذ من عروض سمورة')}</p><div class="offer-bottom"><span class="price">${money(x.price)}</span><button class="mini-add" data-add="${esc(x.id)}">أضف للسلة +</button></div></div></article>`).join('')}
function saveCart(){localStorage.setItem('samoura_cart_v1',JSON.stringify(cart))}
function addItem(id){const item=items.find(x=>x.id===id);if(!item)return;const row=cart.find(x=>x.id===id);if(row)row.qty++;else cart.push({id,qty:1});saveCart();drawCart();toast(`اتضاف ${item.name} لطلبك`)}
function updateQty(id,delta){const row=cart.find(x=>x.id===id);if(!row)return;row.qty+=delta;if(row.qty<1)cart=cart.filter(x=>x.id!==id);saveCart();drawCart()}
function drawCart(){cart=cart.filter(row=>items.some(item=>item.id===row.id&&row.qty>0));const count=cart.reduce((a,x)=>a+x.qty,0),total=cart.reduce((a,x)=>a+(items.find(i=>i.id===x.id)?.price||0)*x.qty,0),totalText=money(total);document.getElementById('cartCount').textContent=count;document.getElementById('cartFabCount').textContent=count;document.getElementById('fabCartTotal').textContent=totalText;document.getElementById('drawerTotal').textContent=totalText;document.getElementById('cartItems').innerHTML=cart.map(row=>{const x=items.find(i=>i.id===row.id);return x?`<div class="cart-row"><img class="cart-row-image" src="${esc(x.image||'assets/hero-grill.png')}" alt=""><div class="cart-row-info"><b>${esc(x.name)}</b><small>${money(x.price)} × ${row.qty} = ${money(x.price*row.qty)}</small></div><div class="qty-controls"><button type="button" data-qty="${esc(x.id)}" data-delta="-1" aria-label="تقليل الكمية">−</button><span>${row.qty}</span><button type="button" data-qty="${esc(x.id)}" data-delta="1" aria-label="زيادة الكمية">+</button><button type="button" data-remove="${esc(x.id)}" aria-label="حذف الصنف">×</button></div></div>`:''}).join('');const empty=count===0;document.getElementById('cartEmpty').hidden=!empty;document.getElementById('checkoutForm').hidden=empty;saveCart()}
let lastCartTrigger=null;function openCart(event){if(event?.currentTarget)lastCartTrigger=event.currentTarget;document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartOverlay').classList.add('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','false');document.getElementById('openCartHeader').setAttribute('aria-expanded','true');document.getElementById('cartFab').setAttribute('aria-expanded','true');document.body.classList.add('cart-open');document.getElementById('closeCart').focus()}function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartOverlay').classList.remove('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','true');document.getElementById('openCartHeader').setAttribute('aria-expanded','false');document.getElementById('cartFab').setAttribute('aria-expanded','false');document.body.classList.remove('cart-open');lastCartTrigger?.focus()}
function whatsappNumber(){return String(businessSettings.whatsapp||'201042653559').replace(/\D/g,'')}
function orderMessage(event){
  event.preventDefault();
  if(!cart.length){toast('أضف صنفًا إلى السلة أولًا');return}
  const form=new FormData(event.currentTarget);
  const name=String(form.get('name')||'').trim();
  const phone=String(form.get('phone')||'').trim();
  const address=String(form.get('address')||'').trim();
  const notes=String(form.get('notes')||'').trim();
  if(!name||!phone||!address)return;
  const newline='\r\n';
  const lines=cart.map((row,index)=>{
   const item=items.find(x=>x.id===row.id);
   return item?`${index+1}. ${item.name}${newline}   ${row.qty} × ${money(item.price)} = ${money(item.price*row.qty)}`:'';
  }).filter(Boolean);
  const total=cart.reduce((sum,row)=>sum+(items.find(x=>x.id===row.id)?.price||0)*row.qty,0);
  const message=[
   '🍗 *طلب جديد | دواجن ومشويات سمورة*','',
   '━━━━━━━━━━━━━━','',
   '👤 *بيانات العميل*',`الاسم: ${name}`,`رقم الموبايل: ${phone}`,`العنوان: ${address}`,'',
   '━━━━━━━━━━━━━━','',
   '🛒 *تفاصيل الطلب*','',lines.join(newline),'',
   '━━━━━━━━━━━━━━','',
   `💰 *إجمالي المنتجات: ${money(total)}*`,'',
   '🚚 *التوصيل:*','رسوم التوصيل والتوفر يتم تأكيدهما مع المطعم.','',
   '📝 *ملاحظات الطلب:*',notes||'لا توجد ملاحظات.','',
   '━━━━━━━━━━━━━━','',
   '*يرجى تأكيد الطلب.*'
  ].join(newline);
  const query=new URLSearchParams({text:message});
  window.open(`https://wa.me/${whatsappNumber()}?${query}`,'_blank','noopener');
  closeCart();
 }let toastTimer;function toast(text){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2300)}
function setManagedText(selector,key){const element=document.querySelector(selector);if(element&&businessSettings[key]!==undefined)element.textContent=businessSettings[key]}
function setSplitText(selector,firstKey,secondKey,breakLine=false){const element=document.querySelector(selector);if(!element)return;const first=businessSettings[firstKey],second=businessSettings[secondKey];if(first===undefined&&second===undefined)return;const highlight=document.createElement('span');highlight.textContent=second||'';element.replaceChildren(document.createTextNode(first||''));if(breakLine)element.append(document.createElement('br'));else element.append(document.createTextNode(' '));element.append(highlight)}
function setLeadingLabel(element,text){if(!element||text===undefined)return;const node=[...element.childNodes].find(child=>child.nodeType===Node.TEXT_NODE);if(node)node.textContent=text+' ';else element.prepend(document.createTextNode(text+' '))}
function setHeroNote(selector,titleKey,detailKey){const element=document.querySelector(selector);if(!element)return;const detail=element.querySelector('b'),first=[...element.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);if(first&&businessSettings[titleKey]!==undefined)first.textContent=businessSettings[titleKey]+' ';if(detail&&businessSettings[detailKey]!==undefined)detail.textContent=businessSettings[detailKey]}
function applyManagedAdditionalContent(){const s=businessSettings;const cartLabel=document.querySelector('#openCartHeader b');if(cartLabel&&s.headerCartButton)cartLabel.textContent=s.headerCartButton;setManagedText('.hero-stamp span','heroStampTop');setManagedText('.hero-stamp b','heroStampBottom');setHeroNote('.hero-note>span:nth-child(2)','heroNoteOne','heroNoteOneSub');setHeroNote('.hero-note>span:nth-child(5)','heroNoteTwo','heroNoteTwoSub');[1,2,3].forEach(index=>{const word=['One','Two','Three'][index-1];setManagedText('.benefit-row>div:nth-child('+index+') b','benefit'+word+'Title');setManagedText('.benefit-row>div:nth-child('+index+') small','benefit'+word+'Text');setManagedText('.about-stats>div:nth-child('+index+') b','aboutStat'+word+'Title');setManagedText('.about-stats>div:nth-child('+index+') span','aboutStat'+word+'Text')});setManagedText('.checkout-form .delivery-note','cartDeliveryNote');if(s.seoTitle){document.title=s.seoTitle;const ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.content=s.seoTitle}if(s.seoDescription){const description=document.querySelector('meta[name="description"]');if(description)description.content=s.seoDescription;const ogDescription=document.querySelector('meta[property="og:description"]');if(ogDescription)ogDescription.content=s.seoDescription}}
function applySharedBranding(){const logo=businessSettings.logo||'assets/logo.jpg';document.querySelectorAll('.brand img,.about-mark img').forEach(image=>{image.src=logo;image.alt=(businessSettings.brandName||'سمورة')+' — '+(businessSettings.brandSubtitle||'دواجن ومشويات')});document.querySelectorAll('.brand>span').forEach(label=>{const subtitle=label.querySelector('small');const first=[...label.childNodes].find(node=>node.nodeType===Node.TEXT_NODE);if(first)first.textContent=businessSettings.brandName||'سمورة';if(subtitle)subtitle.textContent=businessSettings.brandSubtitle||'دواجن ومشويات'});if(businessSettings.goldColor)document.documentElement.style.setProperty('--gold',businessSettings.goldColor);if(businessSettings.darkColor){document.documentElement.style.setProperty('--ink',businessSettings.darkColor);document.documentElement.style.setProperty('--ink2',businessSettings.darkColor)}if(businessSettings.heroBanner)document.documentElement.style.setProperty('--hero-banner',`url(${JSON.stringify(businessSettings.heroBanner)})`);if(businessSettings.familyBanner)document.documentElement.style.setProperty('--family-banner',`url(${JSON.stringify(businessSettings.familyBanner)})`)}
function renderManagedVideos(){const grid=document.querySelector('.video-grid');if(!grid)return;grid.innerHTML=managedVideos.filter(item=>item.active!==false&&item.source).map((item,index)=>{const poster=item.poster?` poster="${esc(item.poster)}"`:'';return `<article class="video-card"><div class="video-frame"><video width="1280" height="720" playsinline preload="metadata"${poster} src="${esc(item.source)}"></video><button class="video-play-button" type="button" aria-label="تشغيل الفيديو"><span aria-hidden="true">▶</span></button><div class="video-controls" aria-label="عناصر التحكم بالفيديو"><button class="video-control-play" type="button" aria-label="تشغيل الفيديو"><span aria-hidden="true">▶</span></button><input class="video-progress" type="range" min="0" max="1000" value="0" step="1" aria-label="موضع الفيديو"><span class="video-time">0:00 / 0:00</span><button class="video-mute" type="button" aria-label="كتم الصوت">♪</button><input class="video-volume" type="range" min="0" max="1" value="1" step="0.05" aria-label="مستوى الصوت"><button class="video-fullscreen" type="button" aria-label="ملء الشاشة">⛶</button></div></div><div class="video-caption"><span>${String(index+1).padStart(2,'0')}</span><h3>${esc(item.title||'فيديو من سمورة')}</h3></div></article>`}).join('')}
function renderManagedReviews(){const grid=document.querySelector('.review-grid');if(!grid)return;grid.innerHTML=managedReviews.filter(item=>item.active!==false&&item.image).map(item=>`<figure class="review-card ${item.long?'review-card--long':''}"><div class="review-shot"><a href="${esc(item.image)}" target="_blank" rel="noreferrer" aria-label="عرض رسالة العميل بحجم أكبر"><img src="${esc(item.image)}" alt="${esc(item.alt||item.caption||'رسالة من عميل سمورة')}" loading="lazy"></a></div><figcaption><span>♡</span> ${esc(item.caption||'من رسائل عملاء سمورة')}</figcaption></figure>`).join('')}
function applyManagedSiteContent(){applySharedBranding();applyManagedAdditionalContent();const s=businessSettings;const navLabels=[s.navHome,s.navOffers,s.navMenu,s.navAbout,s.navVideos,s.navReviews,s.navContact];document.querySelectorAll('#mainNav a').forEach((link,index)=>{if(navLabels[index])link.textContent=navLabels[index]});setLeadingLabel(document.querySelector('.hero .eyebrow'),s.heroEyebrow);setSplitText('.hero h1','heroTitleTop','heroTitleBottom',true);setManagedText('.hero-copy>p','heroDescription');setLeadingLabel(document.querySelector('.hero-actions .button-red'),s.heroMenuButton);setLeadingLabel(document.querySelector('.hero-actions [data-whatsapp]'),s.heroOrderButton);setLeadingLabel(document.querySelector('#offers .section-heading .kicker'),s.offersKicker);setSplitText('#offers .section-heading h2','offersTitle','offersHighlight');setManagedText('#offers .section-heading>p','offersDescription');setLeadingLabel(document.querySelector('#menu .section-heading .kicker'),s.menuKicker);setSplitText('#menu .section-heading h2','menuTitle','menuHighlight');const searchBox=document.getElementById('searchInput');if(searchBox&&s.menuSearchPlaceholder)searchBox.placeholder=s.menuSearchPlaceholder;setManagedText('#emptyState','menuEmptyMessage');setLeadingLabel(document.querySelector('#videos .section-heading .kicker'),s.videosKicker);setSplitText('#videos .section-heading h2','videosTitle','videosHighlight');setManagedText('#videos .section-heading>p','videosDescription');setLeadingLabel(document.querySelector('#reviews .section-heading .kicker'),s.reviewsKicker);setSplitText('#reviews .section-heading h2','reviewsTitle','reviewsHighlight');setManagedText('#reviews .section-heading>p','reviewsDescription');setLeadingLabel(document.querySelector('.about-copy .kicker'),s.aboutKicker);setSplitText('.about-copy h2','aboutTitleTop','aboutTitleBottom',true);setManagedText('.about-copy>p','aboutText');setManagedText('.about-mark span','aboutMark');setLeadingLabel(document.querySelector('.about-copy .text-link'),s.aboutLink);setLeadingLabel(document.querySelector('.family-copy .kicker'),s.familyKicker);setSplitText('.family-copy h2','familyTitleTop','familyTitleBottom',true);setManagedText('.family-copy p','familyDescription');setLeadingLabel(document.querySelector('.family-copy .button'),s.familyButton);setLeadingLabel(document.querySelector('.contact-inner .kicker'),s.contactKicker);setSplitText('.contact-inner h2','contactTitleTop','contactTitleBottom',true);setManagedText('.contact-inner>div:first-child>p','contactDescription');setManagedText('.contact-card>b','contactCardTitle');const mapLink=document.querySelector('.contact-card .text-link');if(mapLink){setLeadingLabel(mapLink,s.mapLinkLabel);if(s.mapUrl)mapLink.href=s.mapUrl}setLeadingLabel(document.querySelector('.contact-card [data-whatsapp]'),s.whatsappButtonLabel);setManagedText('.footer-main>p','footerText');const facebook=document.querySelector('.facebook-link');if(facebook){if(s.facebookUrl)facebook.href=s.facebookUrl;const label=facebook.querySelector('span:nth-child(2)');if(label&&s.facebookLabel)label.textContent=s.facebookLabel}const builtBy=document.querySelector('.built-by');if(builtBy&&s.builtByUrl)builtBy.href=s.builtByUrl;const shortAddress=document.querySelector('[data-address-short]'),fullAddress=document.querySelector('[data-address]');if(fullAddress&&s.address)fullAddress.textContent=s.address;if(shortAddress&&s.address)shortAddress.textContent=s.address.split('،').slice(0,2).join('،');document.querySelectorAll('[data-phone="primary"]').forEach(link=>{const number=s.phonePrimary||'01042653559';link.textContent=number;link.href='tel:'+number.replace(/\D/g,'')});document.querySelectorAll('[data-phone="secondary"]').forEach(link=>{const number=s.phoneSecondary||'01042634775';link.textContent=number;link.href='tel:'+number.replace(/\D/g,'')});const showMap={showOffers:'#offers',showAbout:'#about',showVideos:'#videos',showReviews:'#reviews',showFamily:'.family-banner',showContact:'#contact'};Object.entries(showMap).forEach(([key,selector])=>{const section=document.querySelector(selector);if(section)section.hidden=s[key]===false;const navLink=document.querySelector(`#mainNav a[href="${selector.startsWith('.')?'#family':selector}"]`);if(navLink)navLink.hidden=s[key]===false});renderManagedVideos();renderManagedReviews()}
applySharedBranding();
if(document.getElementById('categoryTabs')){
 document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add)addItem(add.dataset.add);const qty=e.target.closest('[data-qty]');if(qty)updateQty(qty.dataset.qty,Number(qty.dataset.delta));const remove=e.target.closest('[data-remove]');if(remove){cart=cart.filter(row=>row.id!==remove.dataset.remove);saveCart();drawCart()}if(e.target.closest('[data-whatsapp]')){e.preventDefault();window.open(`https://wa.me/${whatsappNumber()}`,'_blank','noopener')}});
 categoryTabs.addEventListener('click',e=>{if(e.target.closest('[data-category]')){activeCategory=e.target.closest('[data-category]').dataset.category;drawTabs();drawMenu()}});
 document.getElementById('searchInput').addEventListener('input',e=>{search=e.target.value.trim();drawMenu()});document.getElementById('openCartHeader').addEventListener('click',openCart);document.getElementById('cartFab').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);document.getElementById('cartOverlay').addEventListener('click',closeCart);document.getElementById('checkoutForm').addEventListener('submit',orderMessage);document.getElementById('browseMenu').addEventListener('click',()=>{closeCart();document.getElementById('menu').scrollIntoView({behavior:'auto'})});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('cartDrawer').classList.contains('open'))closeCart()});
 const toggle=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
 toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});
 nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}});
 applyManagedSiteContent();drawTabs();drawMenu();drawOffers();drawCart();document.getElementById('year').textContent=new Date().getFullYear();
 if(businessSettings.address){document.querySelector('[data-address]').textContent=businessSettings.address;document.querySelector('[data-address-short]').textContent=businessSettings.address.split('،').slice(0,2).join('،')}
 if(new URLSearchParams(location.search).get('openCart')==='1')openCart();
}


function initBusinessVideos(){
 if(window.__samouraVideoVisibilityObserver){window.__samouraVideoVisibilityObserver.disconnect();window.__samouraVideoVisibilityObserver=null}
 const frames=[...document.querySelectorAll('.video-frame')];
 const videos=frames.map(frame=>frame.querySelector('video')).filter(Boolean);
 if(!frames.length)return;
 const pauseOthers=current=>videos.forEach(video=>{if(video!==current&&!video.paused)video.pause()});
 const formatTime=value=>{if(!Number.isFinite(value))return'0:00';const seconds=Math.floor(value);return`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`};
 frames.forEach(frame=>{
  const video=frame.querySelector('video');
  if(!video){
   const embed=frame.querySelector('iframe');
   if(!embed)return;
   const declaredAspect=(embed.dataset.aspectRatio||'').split(/[/:]/).map(Number);
   const declaredWidth=Number(embed.getAttribute('width'));
   const declaredHeight=Number(embed.getAttribute('height'));
   const source=embed.getAttribute('src')||'';
   const aspect=declaredAspect.length===2&&declaredAspect[0]>0&&declaredAspect[1]>0?declaredAspect[0]/declaredAspect[1]:declaredWidth>0&&declaredHeight>0?declaredWidth/declaredHeight:/tiktok\.com/i.test(source)?9/16:16/9;
   const fitEmbed=()=>{
    const bounds=frame.getBoundingClientRect();
    if(!bounds.width||!bounds.height)return;
    const frameAspect=bounds.width/bounds.height;
    const width=frameAspect>aspect?bounds.height*aspect:bounds.width;
    const height=frameAspect>aspect?bounds.height:bounds.width/aspect;
    embed.style.width=`${width}px`;
    embed.style.height=`${height}px`;
   };
   fitEmbed();
   if('ResizeObserver'in window){const embedObserver=new ResizeObserver(fitEmbed);embedObserver.observe(frame)}else window.addEventListener('resize',fitEmbed);
   return;
  }
  const playButton=frame.querySelector('.video-play-button');
  const playControl=frame.querySelector('.video-control-play');
  const progress=frame.querySelector('.video-progress');
  const time=frame.querySelector('.video-time');
  const mute=frame.querySelector('.video-mute');
  const volume=frame.querySelector('.video-volume');
  const fullscreen=frame.querySelector('.video-fullscreen');
  let controlsTimer;
  const syncVideoOrientation=()=>{const width=video.videoWidth||video.width;const height=video.videoHeight||video.height;frame.classList.toggle('is-portrait',Boolean(width&&height&&height>width))};
  video.setAttribute('aria-label',frame.closest('.video-card')?.querySelector('h3')?.textContent||'فيديو من مطعم سمورة');
  const revealControls=()=>{frame.classList.remove('controls-hidden');frame.classList.add('controls-visible');clearTimeout(controlsTimer);controlsTimer=setTimeout(()=>{frame.classList.remove('controls-visible');frame.classList.add('controls-hidden')},3000)};
  const togglePlayback=()=>{if(video.paused){pauseOthers(video);video.play().catch(()=>{})}else video.pause()};
  const syncPlayback=()=>{const paused=video.paused;frame.classList.toggle('is-paused',paused);playButton.classList.toggle('is-hidden',!paused);playButton.setAttribute('aria-label',paused?'تشغيل الفيديو':'إيقاف الفيديو');playControl.innerHTML=`<span aria-hidden="true">${paused?'▶':'Ⅱ'}</span>`;playControl.setAttribute('aria-label',paused?'تشغيل الفيديو':'إيقاف الفيديو')};
  const syncProgress=()=>{const duration=video.duration||0;progress.value=duration?String(Math.round(video.currentTime/duration*1000)):'0';time.textContent=`${formatTime(video.currentTime)} / ${formatTime(duration)}`};
  const syncVolume=()=>{volume.value=String(video.muted?0:video.volume);mute.textContent=video.muted||video.volume===0?'×':'♪';mute.setAttribute('aria-label',video.muted||video.volume===0?'تشغيل الصوت':'كتم الصوت')};
  frame.addEventListener('pointerdown',revealControls);
  frame.addEventListener('pointermove',event=>{if(event.pointerType==='touch')revealControls()});
  frame.addEventListener('click',event=>{if(event.target.closest('.video-controls,.video-play-button'))return;togglePlayback()});
  playButton.addEventListener('click',event=>{event.stopPropagation();togglePlayback()});
  playControl.addEventListener('click',togglePlayback);
  progress.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=video.duration*Number(progress.value)/1000});
  mute.addEventListener('click',()=>{video.muted=!video.muted;syncVolume()});
  volume.addEventListener('input',()=>{video.volume=Number(volume.value);video.muted=video.volume===0;syncVolume()});
  fullscreen.addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else frame.requestFullscreen?.()});
  video.addEventListener('play',()=>{pauseOthers(video);syncPlayback()});
  video.addEventListener('pause',syncPlayback);
  video.addEventListener('ended',syncPlayback);
  video.addEventListener('timeupdate',syncProgress);
  video.addEventListener('loadedmetadata',syncProgress);
  video.addEventListener('loadedmetadata',syncVideoOrientation);
  video.addEventListener('resize',syncVideoOrientation);
  video.addEventListener('durationchange',syncProgress);
  video.addEventListener('volumechange',syncVolume);
  syncVideoOrientation();syncPlayback();syncProgress();syncVolume();
 });
 if('IntersectionObserver'in window){const visibility=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.intersectionRatio<.2)entry.target.pause()}),{threshold:[0,.2]});videos.forEach(video=>visibility.observe(video));window.__samouraVideoVisibilityObserver=visibility}
 if(!window.__samouraVideoVisibilityBound){document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('.video-frame video').forEach(video=>video.pause())});window.__samouraVideoVisibilityBound=true}
}
initBusinessVideos();




