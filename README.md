# متجر VOLTIX الإلكتروني - ربط الصفحات بـ HTML / CSS / JS

تم ربط وتكامل جميع صفحات المتجر الإلكتروني **VOLTIX** بنجاح لتشكل موقعاً متكاملاً وسريع الاستجابة مع سلة مشتريات جانبية تفاعلية (Slide-over Cart Drawer)، ونظام إشعارات فورية (Toasts)، وإمكانية التبديل بين الوضع الفاتح والوضع الليلي (Light / Dark Mode)، وصفحة دفع مخصصة (Checkout).

---

## 🗂️ خريطة الصفحات والروابط (Site Map)

| الصفحة | الملف | الوصف |
| :--- | :--- | :--- |
| **الرئيسية (فاتح)** | [`index.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/index.html) | الواجهة الرئيسية لعرض الأجهزة الرائدة، الأقسام، وعروض السرعة الخاطفة. |
| **الكتالوج والمنتجات** | [`catalog.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/catalog.html) | تصفح الحواسيب المحمولة مع فلاتر المواصفات، الفرز، وتغيير طريقة العرض (Grid / List). |
| **تفاصيل المنتج** | [`product.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/product.html) | صفحة سماعات SoundPulse Pro مع معرض صور تفاعلي، معاينة 360 درجة، ومحدد الكمية. |
| **إتمام الطلب والدفع** | [`checkout.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/checkout.html) | مراجعة السلة، ملء عنوان الشحن، واختيار طريقة الدفع (Apple Pay / بطاقة ائتمان / إلخ) مع تأكيد الطلب. |
| **الرئيسية (ليلي)** | [`index-dark.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/index-dark.html) | الواجهة الرئيسية بالنمط الداكن (Obsidian Kinetic Theme). |
| **الكتالوج (ليلي)** | [`catalog-dark.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/catalog-dark.html) | كتالوج الأجهزة بالنمط الداكن. |
| **تفاصيل المنتج (ليلي)** | [`product-dark.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/product-dark.html) | صفحة المنتج بالنمط الداكن. |
| **إصدار الجيمينج** | [`gaming.html`](file:///c:/Users/CLICK/Desktop/mmmmmm/gaming.html) | واجهة مخصصة لعشاق الألعاب مع تأثيرات جزيئات ضوئية تفاعلية. |

---

## ⚡ المميزات التفاعلية المضافة (JavaScript & CSS)

1. **سلة مشتريات جانبية منبثقة (Slide-over Cart Drawer):**
   - متاحة ومدمجة في كل الصفحات عند الضغط على أيقونة السلة في الـ Header.
   - إمكانية زيادة ونقصان الكمية (`+` / `-`)، وحذف العناصر مع إعادة حساب الإجمالي فورياً.
   - شريط تقدم ذكي للشحن المجاني (Free Express Shipping Bar).
   - تخزين محتويات السلة محلياً في المتصفح (`localStorage`) حتى لا تفقد البيانات أثناء التنقل بين الصفحات.

2. **الإضافة السريعة للسلة (Quick Add):**
   - الضغط على أي زر "Quick Add" أو "Add to Cart" يضيف المنتج فوراً ويظهر إشعاراً عائماً (Toast Notification) أنيقاً ويفتح السلة.

3. **تبديل الثيم بنقرة واحدة (Theme Toggle):**
   - زر مدمج في الـ Header للتبديل السلس بين النمط الفاتح (Light) والنمط الداكن (Dark).

4. **تفعيل الروابط ومسارات التنقل:**
   - شعار **VOLTIX** ينقلك دائماً إلى الصفحة الرئيسية.
   - أقسام التنقل (Laptops & Computing، Audio & Headphones، Gaming Gear) تقود للكتالوج وصفحة السماعات المخصصة.
   - فتات الخبز (Breadcrumbs) تتيح العودة بسهولة للصفحات السابقة.
   - شريط البحث ينقل إلى صفحة الكتالوج مع تمرير كلمة البحث.
