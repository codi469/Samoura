(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const readJSON = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
  const original = JSON.parse(JSON.stringify(window.SAMOURA_CONTENT || {}));
  const MENU_KEY = 'samoura_menu_v1', SETTINGS_KEY = 'samoura_settings_v1', CONTENT_KEY = 'samoura_site_content_v1';
  const initialProducts = Array.isArray(original.products) && original.products.length ? original.products : (window.SAMOURA_INITIAL_ITEMS || []);
  const savedProducts = readJSON(MENU_KEY, initialProducts);
  let products = (Array.isArray(savedProducts) ? savedProducts : initialProducts).map(item => ({...item, active:item.active !== false}));
  let settings = {...(original.settings || {}), ...(readJSON(SETTINGS_KEY, {}))};
  const localContent = readJSON(CONTENT_KEY, {});
  settings = {...settings, ...(localContent.settings || {})};
  let categories = [...new Set((Array.isArray(localContent.categories) ? localContent.categories : (Array.isArray(original.categories) ? original.categories : products.map(item => item.category))).filter(Boolean))];
  let videos = (Array.isArray(localContent.videos) ? localContent.videos : (Array.isArray(original.videos) ? original.videos : [])).map(item => ({active:true,...item}));
  let reviews = (Array.isArray(localContent.reviews) ? localContent.reviews : (Array.isArray(original.reviews) ? original.reviews : [])).map(item => ({active:true,...item}));
  let searchText = '', editingId = null, selectedProductImage = '', lastExported = false;

  const contentGroups = [
    {title:'الشريط العلوي والهوية', fields:[['brandName','اسم المطعم'],['brandSubtitle','الوصف أسفل الاسم'],['navHome','رابط الرئيسية'],['navOffers','رابط العروض'],['navMenu','رابط المنيو'],['navAbout','رابط من نحن'],['navVideos','رابط الفيديوهات'],['navReviews','رابط آراء العملاء'],['navContact','رابط التواصل'],['headerCartButton','نص زر السلة']]},
    {title:'الواجهة الرئيسية', fields:[['heroEyebrow','النص التمهيدي'],['heroTitleTop','العنوان — السطر الأول'],['heroTitleBottom','العنوان — السطر الثاني'],['heroDescription','وصف الواجهة','textarea'],['heroMenuButton','نص زر المنيو'],['heroOrderButton','نص زر واتساب'],['heroStampTop','الختم الدائري — السطر الأول'],['heroStampBottom','الختم الدائري — السطر الثاني'],['heroNoteOne','عبارة الميزة الأولى'],['heroNoteOneSub','تفصيل الميزة الأولى'],['heroNoteTwo','عبارة الميزة الثانية'],['heroNoteTwoSub','تفصيل الميزة الثانية']]},
    {title:'مميزات الموقع', fields:[['benefitOneTitle','الميزة الأولى'],['benefitOneText','وصف الميزة الأولى'],['benefitTwoTitle','الميزة الثانية'],['benefitTwoText','وصف الميزة الثانية'],['benefitThreeTitle','الميزة الثالثة'],['benefitThreeText','وصف الميزة الثالثة']]},
    {title:'العروض والمنيو', fields:[['offersKicker','عبارة قسم العروض'],['offersTitle','عنوان العروض'],['offersHighlight','الكلمة المميزة للعروض'],['offersDescription','وصف قسم العروض'],['featuredOffersCount','عدد بطاقات العروض','number'],['menuKicker','عبارة قسم المنيو'],['menuTitle','عنوان المنيو'],['menuHighlight','الكلمة المميزة للمنيو'],['menuSearchPlaceholder','نص حقل البحث'],['menuEmptyMessage','رسالة عدم وجود نتائج','textarea']]},
    {title:'نبذة عن المطعم', fields:[['aboutKicker','عبارة القسم'],['aboutTitleTop','العنوان — السطر الأول'],['aboutTitleBottom','العنوان — السطر الثاني'],['aboutText','وصف المطعم','textarea'],['aboutMark','عبارة الشعار المصغّر'],['aboutLink','نص رابط الزيارة'],['aboutStatOneTitle','المعلومة الأولى'],['aboutStatOneText','تفصيل المعلومة الأولى'],['aboutStatTwoTitle','المعلومة الثانية'],['aboutStatTwoText','تفصيل المعلومة الثانية'],['aboutStatThreeTitle','المعلومة الثالثة'],['aboutStatThreeText','تفصيل المعلومة الثالثة']]},
    {title:'الفيديوهات ورسائل العملاء', fields:[['videosKicker','عبارة قسم الفيديوهات'],['videosTitle','عنوان الفيديوهات'],['videosHighlight','الكلمة المميزة للفيديوهات'],['videosDescription','وصف الفيديوهات'],['reviewsKicker','عبارة قسم المراجعات'],['reviewsTitle','عنوان المراجعات'],['reviewsHighlight','الكلمة المميزة للمراجعات'],['reviewsDescription','وصف المراجعات']]},
    {title:'الصواني العائلية', fields:[['familyKicker','عبارة القسم'],['familyTitleTop','العنوان — السطر الأول'],['familyTitleBottom','العنوان — السطر الثاني'],['familyDescription','وصف القسم','textarea'],['familyButton','نص زر الاختيار']]},
    {title:'الدعوة للتواصل والتذييل', fields:[['contactKicker','عبارة التواصل'],['contactTitleTop','عنوان التواصل — السطر الأول'],['contactTitleBottom','عنوان التواصل — السطر الثاني'],['contactDescription','وصف التواصل','textarea'],['contactCardTitle','عنوان بطاقة العنوان'],['mapLinkLabel','نص رابط الخريطة'],['whatsappButtonLabel','نص زر واتساب'],['cartDeliveryNote','رسالة التوصيل في السلة','textarea'],['footerText','نص التذييل','textarea'],['facebookLabel','نص رابط فيسبوك'],['seoTitle','عنوان الصفحة في محركات البحث'],['seoDescription','وصف الصفحة في محركات البحث','textarea']]},
  ];
  const contactGroups = [
    {title:'الهاتف والعنوان', fields:[['whatsapp','رقم واتساب بصيغة دولية دون +','tel'],['phonePrimary','رقم الهاتف الأول','tel'],['phoneSecondary','رقم الهاتف الثاني','tel'],['address','العنوان الكامل','textarea'],['mapUrl','رابط الخريطة','url']]},
    {title:'روابط التواصل والمبرمج', fields:[['facebookUrl','رابط صفحة فيسبوك','url'],['builtByUrl','رابط صفحة Torchman','url']]},
  ];

  function previewPath(path) {
    if (!path) return '';
    if (/^(data:|blob:|https?:\/\/|\/)/i.test(path)) return path;
    return path.startsWith('assets/') ? '../' + path : '../' + path;
  }
  function notify(message) {
    const toast = $('#adminToast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove('show'), 2500);
  }
  function persistDraft() {
    try {
      localStorage.setItem(MENU_KEY, JSON.stringify(products));
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({whatsapp:settings.whatsapp, address:settings.address}));
      localStorage.setItem(CONTENT_KEY, JSON.stringify({settings, categories, videos, reviews}));
    } catch {
      notify('مساحة المتصفح ممتلئة. قلّل الصور المرفوعة ثم جرّب مرة أخرى.');
    }
  }
  function markSaved(message) {
    lastExported = false;
    $('#draftState').textContent = 'مسودة محفوظة';
    $('#draftState').style.color = '#a5681b';
    $('#draftHint').textContent = 'صدّر المحتوى لتطبيقه على ملفات الموقع';
    updateStats();
    clearTimeout(markSaved.timer);
    markSaved.timer = setTimeout(()=>{persistDraft();if(message)notify(message)},350);
  }
  function markChanged() { markSaved(); }
  function inputHTML(key, label, type='text') {
    const value = settings[key] ?? '';
    const full = type === 'textarea' || ['heroDescription','aboutText','familyDescription','contactDescription','address','menuEmptyMessage','footerText','videosDescription','reviewsDescription'].includes(key);
    if (type === 'checkbox') return '<label class="settings-field"><span>' + escapeHTML(label) + '</span><input type="checkbox" data-setting="' + key + '" ' + (value !== false ? 'checked' : '') + '></label>';
    if (type === 'textarea' || full) return '<label class="settings-field ' + (full ? 'full' : '') + '">' + escapeHTML(label) + '<textarea class="admin-control" rows="3" data-setting="' + key + '">' + escapeHTML(value) + '</textarea></label>';
    return '<label class="settings-field">' + escapeHTML(label) + '<input class="admin-control" type="' + (type || 'text') + '" data-setting="' + key + '" value="' + escapeHTML(value) + '"></label>';
  }
  function renderSettingGroups(container, groups) {
    $(container).innerHTML = groups.map(group => '<section class="settings-group"><h3>' + escapeHTML(group.title) + '</h3><div class="settings-fields">' + group.fields.map(field => inputHTML(field[0],field[1],field[2])).join('') + '</div></section>').join('');
  }
  function updateStats() {
    $('#statProducts').textContent = products.length;
    $('#statCategories').textContent = categories.length;
    $('#statVideos').textContent = videos.filter(item => item.active !== false && item.source).length;
    $('#navProductCount').textContent = products.length;
    const images = [...products.map(item=>item.image), settings.logo, settings.heroBanner, settings.familyBanner, ...reviews.map(item=>item.image)].filter(value=>String(value||'').startsWith('data:')).length;
    $('#draftHint').title = images + ' صورة مخصصة ضمن المسودة';
    $('#overviewProducts').innerHTML = products.slice(0,6).map(item=>'<div class="mini-product"><strong>' + escapeHTML(item.name) + '</strong><span>' + Number(item.price).toLocaleString('ar-EG') + ' ج.م</span></div>').join('') || '<small>لا توجد أصناف بعد.</small>';
  }
  function renderProducts() {
    const filterCategory = $('#productCategoryFilter').value;
    const filterStatus = $('#productStatusFilter').value;
    const categoriesToShow = [...new Set([...categories, ...products.map(item=>item.category)])];
    $('#productCategoryFilter').innerHTML = '<option value="">كل التصنيفات</option>' + categoriesToShow.map(value=>'<option value="' + escapeHTML(value) + '">' + escapeHTML(value) + '</option>').join('');
    $('#productCategoryFilter').value = filterCategory;
    $('#adminCategoryOptions').innerHTML = categoriesToShow.map(value=>'<option value="' + escapeHTML(value) + '"></option>').join('');
    const filtered = products.filter(item => (!filterCategory || item.category===filterCategory) && (filterStatus==='all' || (filterStatus==='active' ? item.active!==false : item.active===false)) && (String(item.name+' '+item.category+' '+(item.note||'')).toLowerCase().includes(searchText)));
    $('#productResultCount').textContent = filtered.length + ' صنف';
    $('#productsEmpty').hidden = filtered.length > 0;
    $('#productsBody').innerHTML = filtered.map(item => {
      const image = item.image || window.SAMOURA_INITIAL_ITEMS.find(origin=>origin.id===item.id)?.image || 'assets/hero-grill.png';
      return '<tr data-product-row="' + escapeHTML(item.id) + '"><td class="row-image"><img src="' + escapeHTML(previewPath(image)) + '" alt=""></td><td><strong>' + escapeHTML(item.name) + '</strong><br><small>' + escapeHTML(item.note||'') + '</small></td><td>' + escapeHTML(item.category) + '</td><td>' + Number(item.price).toLocaleString('ar-EG') + ' ج.م</td><td><input class="admin-check" type="checkbox" data-product-toggle="offer" ' + (item.offer?'checked':'') + ' aria-label="ضمن العروض"></td><td><span class="visibility-pill ' + (item.active===false?'off':'') + '">' + (item.active===false?'مخفي':'ظاهر') + '</span><input class="admin-check" type="checkbox" data-product-toggle="active" ' + (item.active!==false?'checked':'') + ' aria-label="ظاهر في الموقع"></td><td class="row-actions"><button type="button" data-edit-product>تعديل</button><button type="button" class="delete" data-delete-product>حذف</button></td></tr>';
    }).join('');
    updateStats();
  }
  function renderCategories() {
    const allCategories = [...new Set([...categories,...products.map(item=>item.category)])];
    categories = allCategories;
    $('#categoriesList').innerHTML = allCategories.map((category,index) => {
      const count = products.filter(item=>item.category===category).length;
      const targets = allCategories.filter(item=>item!==category);
      return '<div class="category-row" data-category-row="' + index + '"><input class="admin-control" data-category-name value="' + escapeHTML(category) + '" aria-label="اسم التصنيف"><small>' + count + ' منتج</small><select data-category-target aria-label="نقل المنتجات إلى">' + (targets.length ? '<option value="">نقل المنتجات إلى…</option>' + targets.map(target=>'<option value="' + escapeHTML(target) + '">' + escapeHTML(target) + '</option>').join('') : '<option value="">لا يوجد تصنيف بديل</option>') + '</select><button type="button" data-delete-category>حذف</button></div>';
    }).join('') || '<div class="empty-result">لا توجد تصنيفات حاليًا.</div>';
    updateStats();
  }
  function renderMediaSettings() {
    const media = [
      ['logo','شعار الموقع','يظهر في الترويسة والتذييل','assets/logo.jpg'],
      ['heroBanner','بانر الواجهة الرئيسية','الصورة الكبيرة في بداية الموقع','assets/hero-grill.png'],
      ['familyBanner','صورة قسم الصينية العائلية','الخلفية البصرية لقسم الصواني','assets/hero-grill.png']
    ];
    $('#mediaSettings').innerHTML = media.map(([key,title,description,fallback]) => {
      const path = settings[key] || fallback;
      return '<article class="media-setting"><img data-media-preview="' + key + '" src="' + escapeHTML(previewPath(path)) + '" alt=""><div><h3>' + title + '</h3><p>' + description + '</p><div class="media-setting-actions"><label class="file-button">استبدال الصورة<input type="file" accept="image/*" data-brand-image="' + key + '"></label><button class="text-action" type="button" data-reset-media="' + key + '" data-default="' + fallback + '">استعادة الأصل</button></div></div></article>';
    }).join('');
    renderTheme();
  }
  function renderTheme() {
    const colors = [['goldColor','اللون الذهبي','#f8b829'],['darkColor','لون الخلفية الداكنة','#180d08']];
    $('#themeSettings').innerHTML = colors.map(([key,label,fallback]) => '<label class="color-control"><input type="color" value="' + escapeHTML(/^#[\da-f]{6}$/i.test(settings[key]||'')?settings[key]:fallback) + '" data-color-setting="' + key + '">' + label + '<code>' + escapeHTML(settings[key]||fallback) + '</code></label>').join('');
    colors.forEach(([key])=>document.documentElement.style.setProperty(key==='goldColor'?'--gold':'--ink',settings[key]||'#180d08'));
    const toggles = [['showOffers','قسم العروض'],['showAbout','قسم من نحن'],['showVideos','قسم الفيديوهات'],['showReviews','قسم آراء العملاء'],['showFamily','قسم الصينية العائلية'],['showContact','قسم التواصل']];
    $('#sectionToggles').innerHTML = toggles.map(([key,label])=>'<label class="toggle-control"><input type="checkbox" data-setting="' + key + '" ' + (settings[key]!==false?'checked':'') + '><span>' + label + '</span></label>').join('');
  }
  function mediaImage(value, fallback, className='') {
    const path = value || fallback || '';
    return path ? '<img class="' + className + '" src="' + escapeHTML(previewPath(path)) + '" alt="">' : '<div class="media-placeholder">صورة</div>';
  }
  function renderVideos() {
    $('#videosEditor').innerHTML = videos.map((item,index)=>'<article class="editable-media" data-media-index="' + index + '" data-media-kind="videos">' + mediaImage(item.poster,'','') + '<div class="editable-fields"><label>اسم الفيديو<input class="admin-control" data-media-field="title" value="' + escapeHTML(item.title||'') + '"></label><label class="wide">مسار أو رابط ملف الفيديو<input class="admin-control" data-media-field="source" value="' + escapeHTML(item.source||'') + '" placeholder="assets/business-videos/video.mp4"></label><label class="wide">مسار صورة الغلاف<input class="admin-control" data-media-field="poster" value="' + escapeHTML(item.poster||'') + '" placeholder="assets/video-posters/poster.jpg"></label><label class="media-active"><input type="checkbox" data-media-field="active" ' + (item.active!==false?'checked':'') + '><span>ظاهر</span></label></div><div class="media-row-actions"><label>اختيار غلاف<input type="file" accept="image/*" data-media-upload="poster"></label><button type="button" data-remove-media>حذف</button></div></article>').join('') || '<div class="empty-result">أضف فيديو لعرضه في الموقع.</div>';
  }
  function renderReviews() {
    $('#reviewsEditor').innerHTML = reviews.map((item,index)=>'<article class="editable-media" data-media-index="' + index + '" data-media-kind="reviews">' + mediaImage(item.image,'','') + '<div class="editable-fields"><label>نص التعليق<input class="admin-control" data-media-field="caption" value="' + escapeHTML(item.caption||'') + '"></label><label>وصف الصورة<input class="admin-control" data-media-field="alt" value="' + escapeHTML(item.alt||'') + '"></label><label class="wide">مسار الصورة<input class="admin-control" data-media-field="image" value="' + escapeHTML(item.image||'') + '" placeholder="assets/reviews/review.jpg"></label><label class="media-active"><input type="checkbox" data-media-field="long" ' + (item.long?'checked':'') + '><span>صورة طويلة</span></label><label class="media-active"><input type="checkbox" data-media-field="active" ' + (item.active!==false?'checked':'') + '><span>ظاهرة</span></label></div><div class="media-row-actions"><label>اختيار صورة<input type="file" accept="image/*" data-media-upload="image"></label><button type="button" data-remove-media>حذف</button></div></article>').join('') || '<div class="empty-result">أضف رسالة عميل لعرضها في الموقع.</div>';
  }
  function renderAll() { renderProducts(); renderCategories(); renderSettingGroups('#contentGroups',contentGroups); renderSettingGroups('#contactGroups',contactGroups); renderMediaSettings(); renderVideos(); renderReviews(); updateStats(); }

  function optimizeImage(file) {
    return new Promise((resolve,reject)=>{
      if (file.size > 14*1024*1024) { reject(new Error('large')); return; }
      const url=URL.createObjectURL(file), image=new Image();
      image.onload=()=>{
        const scale=Math.min(1,1500/Math.max(image.naturalWidth,image.naturalHeight));
        const canvas=document.createElement('canvas');canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);
        const context=canvas.getContext('2d');context.drawImage(image,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);
        canvas.toBlob(blob=>{
          if(!blob){reject(new Error('encode'));return;}
          const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('read'));reader.readAsDataURL(blob);
        },'image/webp',.82);
      };
      image.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('image'));};image.src=url;
    });
  }
  function defaultProductImage(product) {
    return original.products?.find(item=>String(item.id)===String(product?.id))?.image || window.SAMOURA_INITIAL_ITEMS.find(item=>String(item.id)===String(product?.id))?.image || 'assets/hero-grill.png';
  }
  function openProduct(product) {
    editingId=product?.id||null;selectedProductImage=product?(product.image||defaultProductImage(product)):'';
    const form=$('#productForm');form.reset();
    form.elements.id.value=product?.id||'';form.elements.name.value=product?.name||'';form.elements.category.value=product?.category||categories[0]||'وجبات فردية';
    form.elements.price.value=product?.price??'';form.elements.note.value=product?.note||'';form.elements.icon.value=product?.icon||'🍽️';
    form.elements.offer.checked=!!product?.offer;form.elements.active.checked=product?.active!==false;
    $('#productImagePreview').src=previewPath(selectedProductImage||product?.image||'assets/hero-grill.png');
    $('#productDialogTitle').textContent=product?'تعديل الصنف':'إضافة صنف';
    $('#productDialog').showModal();
  }
  function exportContent() {
    const invalid=products.find(item=>!String(item.name||'').trim()||!String(item.category||'').trim()||!Number.isFinite(Number(item.price))||Number(item.price)<0);
    if(invalid){notify('راجع اسم القسم والسعر للصنف: ' + (invalid.name||'بدون اسم'));return;}
    clearTimeout(markSaved.timer);persistDraft();
    const content={settings,products,categories,videos,reviews};
    const source='window.SAMOURA_CONTENT = ' + JSON.stringify(content,null,2) + ';\n';
    const url=URL.createObjectURL(new Blob([source],{type:'text/javascript;charset=utf-8'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='content.js';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1200);
    lastExported=true;$('#draftState').textContent='تم التصدير';$('#draftState').style.color='#27764b';$('#draftHint').textContent='استبدل ملف content.js في المشروع';notify('تم تنزيل content.js. استبدله في المجلد الرئيسي للمشروع.');
  }
  function parseImported(text,fileName) {
    if(fileName.toLowerCase().endsWith('.json')) return JSON.parse(text);
    const start=text.indexOf('=');
    if(start<0) throw new Error('format');
    const payload=text.slice(start+1).trim().replace(/;\s*$/,'');
    return JSON.parse(payload);
  }
  function importContent(file) {
    const reader=new FileReader();
    reader.onload=()=>{
      try {
        const data=parseImported(String(reader.result||''),file.name);
        if(!data||!data.settings||!Array.isArray(data.products)) throw new Error('shape');
        settings={...data.settings};products=data.products.map(item=>({...item,active:item.active!==false}));
        categories=[...new Set(Array.isArray(data.categories)?data.categories:products.map(item=>item.category))];
        videos=Array.isArray(data.videos)?data.videos:[];reviews=Array.isArray(data.reviews)?data.reviews:[];
        renderAll();markSaved('تم استيراد المحتوى وحفظه كمسودة محلية.');
      } catch { notify('الملف غير صالح أو لا يحتوي محتوى سمورة المدعوم.'); }
    };
    reader.onerror=()=>notify('تعذرت قراءة الملف.');
    reader.readAsText(file);
  }

  function showView(name) {
    $$('.admin-view').forEach(view=>view.classList.toggle('active',view.id==='view-'+name));
    $$('.sidebar-link').forEach(button=>button.classList.toggle('active',button.dataset.tab===name));
    if(name==='products')renderProducts();if(name==='categories')renderCategories();
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }

  $$('.sidebar-link').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.tab)));
  $$('[data-goto]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.goto)));
  $('#today').textContent=new Intl.DateTimeFormat('ar-EG',{dateStyle:'full'}).format(new Date());
  $('#productSearch').addEventListener('input',event=>{searchText=event.target.value.trim().toLowerCase();renderProducts();});
  $('#productCategoryFilter').addEventListener('change',renderProducts);$('#productStatusFilter').addEventListener('change',renderProducts);
  $('#addProduct').addEventListener('click',()=>openProduct());
  $('#productsBody').addEventListener('click',event=>{
    const row=event.target.closest('[data-product-row]');if(!row)return;
    const product=products.find(item=>String(item.id)===row.dataset.productRow);if(!product)return;
    if(event.target.closest('[data-edit-product]'))openProduct(product);
    if(event.target.closest('[data-delete-product]')){if(confirm('حذف «'+product.name+'» من المنيو؟')){products=products.filter(item=>item!==product);markSaved('تم حذف الصنف.');renderProducts();renderCategories();}}
  });
  $('#productsBody').addEventListener('change',event=>{
    const toggle=event.target.closest('[data-product-toggle]');if(!toggle)return;
    const row=toggle.closest('[data-product-row]'),product=products.find(item=>String(item.id)===row?.dataset.productRow);if(!product)return;
    product[toggle.dataset.productToggle]=toggle.checked;markSaved();renderProducts();
  });
  $('#productForm').addEventListener('submit',event=>{
    event.preventDefault();const form=event.currentTarget,id=form.elements.id.value||'item-'+Date.now();
    const item={id,name:form.elements.name.value.trim(),category:form.elements.category.value.trim(),price:Number(form.elements.price.value),note:form.elements.note.value.trim(),icon:form.elements.icon.value.trim()||'🍽️',offer:form.elements.offer.checked,active:form.elements.active.checked,image:selectedProductImage||'assets/hero-grill.png'};
    if(!item.name||!item.category||!Number.isFinite(item.price)||item.price<0){notify('راجع الاسم والقسم والسعر.');return;}
    const index=products.findIndex(existing=>String(existing.id)===String(id));if(index<0)products.unshift(item);else products[index]=item;
    if(!categories.includes(item.category))categories.push(item.category);
    $('#productDialog').close();markSaved(index<0?'تمت إضافة الصنف إلى المسودة.':'تم تحديث الصنف.');renderProducts();renderCategories();
  });
  $('#productImageFile').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    try{selectedProductImage=await optimizeImage(file);$('#productImagePreview').src=selectedProductImage;markSaved('تم تجهيز صورة الصنف. احفظ الصنف لتثبيتها.');}
    catch{notify('تعذّر ضغط الصورة أو حجمها أكبر من 14 ميجابايت.');}
  });
  $('#clearProductImage').addEventListener('click',()=>{const product=products.find(item=>String(item.id)===String(editingId));selectedProductImage=product?defaultProductImage(product):'';$('#productImagePreview').src=previewPath(selectedProductImage||'assets/hero-grill.png');});
  $('#closeProductDialog').addEventListener('click',()=>$('#productDialog').close());$('#cancelProduct').addEventListener('click',()=>$('#productDialog').close());
  $('#productDialog').addEventListener('click',event=>{if(event.target===$('#productDialog'))$('#productDialog').close();});

  $('#categoriesList').addEventListener('change',event=>{
    const row=event.target.closest('[data-category-row]');if(!row)return;const index=Number(row.dataset.categoryRow),old=categories[index];if(old===undefined)return;
    if(event.target.matches('[data-category-name]')){
      const next=event.target.value.trim();if(!next){event.target.value=old;notify('اكتب اسمًا للتصنيف.');return;}
      if(categories.includes(next)&&next!==old){event.target.value=old;notify('هذا التصنيف موجود بالفعل.');return;}
      products.forEach(item=>{if(item.category===old)item.category=next;});categories[index]=next;categories=[...new Set(categories)];markSaved('تم تحديث اسم التصنيف.');renderProducts();renderCategories();
    }
    if(event.target.matches('[data-category-target]'))row.dataset.nextCategory=event.target.value;
  });
  $('#categoriesList').addEventListener('click',event=>{
    if(!event.target.closest('[data-delete-category]'))return;
    const row=event.target.closest('[data-category-row]'),index=Number(row.dataset.categoryRow),category=categories[index],count=products.filter(item=>item.category===category).length;
    if(count){const target=row.querySelector('[data-category-target]').value;if(!target||!categories.includes(target)){notify('اختر تصنيفًا بديلًا قبل حذف هذا القسم.');return;}products.forEach(item=>{if(item.category===category)item.category=target;});}
    categories=categories.filter(item=>item!==category);markSaved('تم حذف التصنيف.');renderProducts();renderCategories();
  });
  $('#addCategoryForm').addEventListener('submit',event=>{
    event.preventDefault();const value=new FormData(event.currentTarget).get('category').trim();
    if(categories.includes(value)){notify('هذا التصنيف موجود بالفعل.');return;}categories.push(value);event.currentTarget.reset();markSaved('تمت إضافة التصنيف.');renderProducts();renderCategories();
  });

  document.addEventListener('input',event=>{
    const field=event.target.closest('[data-setting]');if(!field)return;
    settings[field.dataset.setting]=field.type==='checkbox'?field.checked:field.type==='number'?Number(field.value):field.value;
    if(field.dataset.setting==='goldColor'||field.dataset.setting==='darkColor')document.documentElement.style.setProperty(field.dataset.setting==='goldColor'?'--gold':'--ink',field.value);
    markSaved();
  });
  document.addEventListener('change',event=>{
    const setting=event.target.closest('[data-setting]');if(setting){settings[setting.dataset.setting]=setting.type==='checkbox'?setting.checked:setting.value;markSaved();return;}
    const color=event.target.closest('[data-color-setting]');if(color){settings[color.dataset.colorSetting]=color.value;color.parentElement.querySelector('code').textContent=color.value;document.documentElement.style.setProperty(color.dataset.colorSetting==='goldColor'?'--gold':'--ink',color.value);markSaved();return;}
    const mediaInput=event.target.closest('[data-brand-image]');if(mediaInput){
      const file=mediaInput.files?.[0];if(!file)return;
      optimizeImage(file).then(image=>{settings[mediaInput.dataset.brandImage]=image;const preview=$('[data-media-preview="'+mediaInput.dataset.brandImage+'"]');if(preview)preview.src=image;markSaved('تم تحديث الصورة في المسودة.');}).catch(()=>notify('تعذر تجهيز الصورة؛ اختر صورة أصغر.'));
    }
  });
  document.addEventListener('click',event=>{
    const reset=event.target.closest('[data-reset-media]');
    if(reset){settings[reset.dataset.resetMedia]=reset.dataset.default;const preview=$('[data-media-preview="'+reset.dataset.resetMedia+'"]');if(preview)preview.src=previewPath(reset.dataset.default);markSaved('تمت استعادة الصورة الأصلية.');return;}
    const remove=event.target.closest('[data-remove-media]');
    if(remove){const row=remove.closest('[data-media-kind]'),kind=row.dataset.mediaKind,list=kind==='videos'?videos:reviews;if(confirm('حذف هذا المحتوى من الموقع؟')){list.splice(Number(row.dataset.mediaIndex),1);markSaved('تم حذف المحتوى.');kind==='videos'?renderVideos():renderReviews();updateStats();}}
  });
  document.addEventListener('input',event=>{
    const field=event.target.closest('[data-media-field]');if(!field)return;
    const row=field.closest('[data-media-kind]'),list=row.dataset.mediaKind==='videos'?videos:reviews,item=list[Number(row.dataset.mediaIndex)];if(!item)return;
    item[field.dataset.mediaField]=field.type==='checkbox'?field.checked:field.value;
    if(field.dataset.mediaField==='poster'||field.dataset.mediaField==='image'){const image=row.querySelector('img');if(image)image.src=previewPath(field.value);}
    markSaved();
  });
  document.addEventListener('change',async event=>{
    const upload=event.target.closest('[data-media-upload]');if(upload){
      const file=upload.files?.[0];if(!file)return;const row=upload.closest('[data-media-kind]'),list=row.dataset.mediaKind==='videos'?videos:reviews,item=list[Number(row.dataset.mediaIndex)];
      try{const image=await optimizeImage(file);item[upload.dataset.mediaUpload]=image;markSaved('تم تجهيز الصورة في المسودة.');if(row.dataset.mediaKind==='videos')renderVideos();else renderReviews();}
      catch{notify('تعذر تجهيز الصورة أو حجمها أكبر من 14 ميجابايت.');}
      return;
    }
    const row=event.target.closest('[data-media-kind]');if(!row)return;
    const kind=row.dataset.mediaKind,list=kind==='videos'?videos:reviews,item=list[Number(row.dataset.mediaIndex)];
    const field=event.target.closest('[data-media-field]');if(field&&field.type==='checkbox'){item[field.dataset.mediaField]=field.checked;markSaved();}
  });
  $('#addVideo').addEventListener('click',()=>{videos.push({title:'فيديو جديد',source:'',poster:'',active:true});renderVideos();markSaved('أُضيف فيديو جديد.');});
  $('#addReview').addEventListener('click',()=>{reviews.push({image:'',caption:'رسالة من عملائنا',alt:'رسالة عميل من سمورة',long:false,active:true});renderReviews();markSaved('أُضيفت رسالة جديدة.');});
  $$('.save-all').forEach(button=>button.addEventListener('click',()=>markSaved('تم حفظ المسودة في هذا المتصفح.')));
  $('#importTrigger').addEventListener('click',()=>$('#importFile').click());$('#publishImport').addEventListener('click',()=>$('#importFile').click());
  $('#importFile').addEventListener('change',event=>{const file=event.target.files?.[0];if(file)importContent(file);event.target.value='';});
  $('#exportTrigger').addEventListener('click',exportContent);$('#publishExport').addEventListener('click',exportContent);
  $('#resetDraft').addEventListener('click',()=>{
    if(!confirm('استعادة محتوى البداية؟ سيتم حذف مسودة هذا المتصفح.'))return;
    localStorage.removeItem(MENU_KEY);localStorage.removeItem(SETTINGS_KEY);localStorage.removeItem(CONTENT_KEY);
    settings={...(original.settings||{})};products=(Array.isArray(original.products)?original.products:window.SAMOURA_INITIAL_ITEMS).map(item=>({...item,active:item.active!==false}));
    categories=[...new Set((Array.isArray(original.categories)?original.categories:products.map(item=>item.category)).filter(Boolean))];videos=(original.videos||[]).map(item=>({...item}));reviews=(original.reviews||[]).map(item=>({...item}));
    renderAll();markSaved('تمت استعادة محتوى البداية.');
  });

  window.addEventListener('beforeunload',()=>{if(markSaved.timer){clearTimeout(markSaved.timer);persistDraft();}});
  renderAll();
  $('#draftState').textContent='مسودة محلية';$('#draftHint').textContent='صدّر المحتوى لنقله إلى الموقع';
})();
