# Default Frontend React App

## Umumiy majburiy bo'lgan texnologiyalar, ko'nikmalar va standardlar:

React, TypeScript, Vite, Tailwindcss, Nodejs, Npm, Nvm, git, github, gitlab, ci/cd.

## Kod sifati, arxitektura, umumiy standardlar, toollar, sozlamalar

1. Arxitektura uchun modular arxitekturadan foydalanish va quyidagi strukturadan foydalanish
2. Quyidagi github havoladagidek clean code tavsiyalariga rioya qilish https://github.com/ryanmcdermott/clean-code-javascript
3. Kodni formatlash uchun Prettier ishlatish. ./prettierrc fayldagi konfugratsiya majburiy.
4. Linter uchun Eslint ishlatish. eslint.config.ts fayldagi konfiguratsiya majburiy.
5. Loyihani bir nechta tilda qilish uchun i18next dan foydalanish. Sozlamalari /src/shared/i18n papkasidek bo'ladi. json fayllar /public/locales/ papkasi bo'ladi sayt yuklanish vaqtini oshirish uchun
6. Editor uchun vscode ishlatish. Vscode sozlamalari .vscode papkadagi settings.json sozlamalari o'rnatiladi.
7. Loyiha sozlamalarida vite.config.ts, .gitignore, tsconfig.json, CLAUDE.md va .claude/settings.json sozlamalarini loyihada sozlamalar bilan bir xil qilib o'rnatish
8. Font family tashqi havolalardan yuklamaslik. Font familyni yuklash quyidagi tartibda yuklang: woff2, woff, ttf
9. Rasmlardan png yoki wepb formatda foydalanish, chunki hajmi ancha kichik va browser yaxshi qo'llab quvvatlaydi

## Xavfsizlik talablari

1. Sessiya yoki access/refresh tokenlarni localStorage yoki sessionStorage ichida saqlashdan saqlaning, chunki har qanday XSS ularni o'qiy oladi. Imkon qadar HttpOnly, Secure va SameSite atributlariga ega cookie mexanizmlaridan foydalaning.
2. Content Security Policy meta tegini html head qismi qo'shish. Faqat belgilangan resourcelarga so'rov yuborish va ma'lumot olish.
3. Kutubxonalarni audit qilish:
   1. Zudlik bilan / Doimiy yangilash
      Kichik xavfsizlik teshiklari, tarmoq so'rovlari va sof utillalar. Ularni yangilash juda xavfsiz va tez o'tadi.
      axios, dayjs, dompurify, clsx, big.js, use-debounce, buffer, qrcode, exceljs
   2) Ehtiyotkorlik bilan (Core Stack)
      Loyihaning asosiy infratuzilmasi. Major versiya almashtirishdan oldin hujjatlarni va testlarni tekshirish shart.
      react, react-dom, react-router, @reduxjs/toolkit, react-redux, vite, @tailwindcss/vite, tailwindcss, zod, typescript
   3) Rejali / Funktsional yangilash
      Murakkab biznes-mantiq, matn muharriri va jadval unumdorligiga javob beradigan modullar. UI/UX o'zgarishi mumkin.
      @tiptap/_, @tanstack/react-virtual, @dnd-kit/_, @react-pdf/renderer, i18next, react-i18next
   4) Minimal yangilash (UI Komponentlar)
      Tashqi ko'rinish, formalarni shakllantirish va vizualizatsiya. Faqat bug chiqqanda yangilash ma'qul.
      @floating-ui/react, react-select, recharts, swiper, react-imask, react-dropzone, react-toastify, react-calendar, @pbe/react-yandex-maps
4. Frontend nginx sozlamalarini html head qismida Content Security Policy meta tegi bilan mos ravishda sozlash
5. XSS (Cross-Site Scripting) hujumlaridan himoyalanish. Foydalanuvchi kiritgan yoki tashqi manbadan kelgan ma'lumotlarni HTML/DOM ichiga tekshirmasdan joylashtirmang. Zararli skriptlar bajarilishining oldini olish uchun matnlarni to'g'ri escape qiling, xavfli metodlardan (innerHTML, dangerouslySetInnerHTML, eval, new Function) ehtiyotkorlik bilan foydalaning va zarurat tug'ilganda DOMPurify kabi kutubxonalar bilan sanitize qiling.
6. CSRF (Cross-Site Request Forgery) himoyasi. Agar autentifikatsiya cookie orqali amalga oshirilsa, so'rovlarning haqiqatan ham sizning saytingizdan yuborilganiga ishonch hosil qiling. SameSite=Lax yoki SameSite=Strict atributlari hamda CSRF token mexanizmlaridan foydalaning.
7. Barcha kiruvchi ma'lumotlar va URL'larni tekshirish (Validation & Sanitization). Forma maydonlari, fayl yuklash va ayniqsa dinamik havolalarni (href, src, redirect parametrlari) tekshiring. javascript: yoki data: kabi xavfli sxemalarga yo'l qo'ymang va open redirect zaifliklarini bartaraf eting.
8. Maxfiy ma'lumotlarni (secrets) frontend kodiga qo'shmaslik. API kalitlari, xususiy tokenlar, ichki servis manzillari yoki maxfiy sozlamalarni frontend bundle'ga (VITE*\*, NEXT_PUBLIC*\* va boshqalar) joylashtirmang. Brauzerga yuborilgan har qanday kod va o'zgaruvchi foydalanuvchiga ochiq hisoblanadi.
9. HTTPS va xavfsiz transport/sarlavha sozlamalari. Barcha trafikni faqat HTTPS orqali yuriting, HSTS (HTTP Strict Transport Security), X-Content-Type-Options: nosniff va Referrer-Policy kabi himoya sarlavhalarini qo'llab-quvvatlang.
10.   Clickjacking dan himoyalanish. Sahifangiz boshqa saytlar ichida yashirin iframe ko'rinishida ochilib, foydalanuvchini aldab tugma bosishga majburlashining oldini oling. Buning uchun X-Frame-Options: DENY (yoki SAMEORIGIN) va CSP frame-ancestors direktivasidan foydalaning.
11.   Xatoliklarni to'g'ri boshqarish va ma'lumotlarni sizdirmaslik. Foydalanuvchiga tizimning ichki tuzilmasi, stack trace yoki server xatolik tafsilotlarini ko'rsatmang. Xatoliklarni foydalanuvchi uchun tushunarli va umumiy xabar ko'rinishida chiqaring, batafsil loglarni esa xavfsiz monitoring tizimiga yuboring.
12.   Css va javascript kutubxonalarni tashqi havolalardan yuklamaslik. Chunki tashqi havoladagi servis ishlamay qolsa bizni sayt ham ishlamay qolishi mumkin
13.   Loyihada environment fayllardan faqat .env.local fayl ilova papkasida bo'ladi, qolgan environment fayllar loyiha papkasi, github, gitlab, bitbucket repositorylardan saqlanmaydi va .gitignore faylga kiritib qo'yish kerak barcha environment fayllarni. Api hostlar, api keylar, portlar, NODE_ENV, konfiguratsiya o'zgaruvchilari hammasi environment faylda bo'lishi kerak kod ichiga yozmaslik kerak.

## Browser(tools, lighthouse, console, network, performance monitor), editor(settings, extensions, debug), swagger, postman

## Git, Branching va CI/CD

Git workflow: Branch naming (feat/..., fix/..., chore/...), PR hajmi, code review checklist va merge qoidalari (squash, rebase).

Commit standardlari: Conventional Commits (feat: ..., fix: ...) va commit message talablari.

Pre-commit / pre-push hooklar: Husky + lint-staged + typecheck (tsc --noEmit) — xato kod va formatlanmagan fayllar repoga tushmasligi uchun.

CI/CD pipeline: Build tekshiruvi, lint/typecheck, testlar va avtomatik deploy bosqichlari.

## Testlash

1. Unit va Component testlar: Vitest / Jest + React Testing Library (murakkab helperlar, hooklar va kritik form/UI holatlar uchun).
2. E2E (End-to-End) testlar: Playwright yoki Cypress (login, asosiy oqimlar, kritik foydalanuvchi ssenariylari).
3. Mocklash: MSW (Mock Service Worker) — backend hali tayyor bo'lmaganda yoki test muhitida API javoblarini izchil simulyatsiya qilish uchun.
4. QA muhandislari uchun taglarga data-cy attributelarini unikal berish

## Build, Bundle Optimization va Performance

1. Code splitting va lazy loading: Route va og'ir modullarni dinamik yuklash (React.lazy, dynamic import).
2. Bundle tahlili: Bundle hajmini nazorat qilish, og'ir kutubxonalarni tekshirish va keraksiz dependency'larni cheklash.
3. Core Web Vitals: LCP, INP va CLS bo'yicha amaliy tavsiyalar (rasm o'lchamlari, layout shift'ning oldini olish, render blocking skriptlar).
4. Browser Performance monitor react-doctor kabi toollardan foydalanish

## Accessibility (A11y) va UX Standardlari

1. Semantik HTML va klaviatura navigatsiyasi: button, label, aria-\* atributlari, modal/dropdown'larda focus management va Esc bilan yopish.
2. Kontrast va o'qilishi: Matn kontrasti, focus ring'larni o'chirib qo'ymaslik (yoki aniq custom focus berish), screen reader mosligi.
3. Empty / Loading / Error / Offline holatlar: Har bir sahifa va ma'lumot oqimi uchun skeleton/spinner, bo'sh holat, xato xabari va qayta urinish (retry) standardlari.

## Design Tokens, Mavzular (Theme) va UI Komponentlar

1. Design tokens: Ranglar, spacing, radius, shadow va typography'ni CSS variables / Tailwind tokenlari orqali markazlashgan boshqarish.
2. Dark / Light mode va high-contrast: Tema almashish logikasi, flicker'siz initial load (masalan, head ichida inline script orqali) va tizim sozlamasiga (prefers-color-scheme) moslash.
3. UI kit / Primitive qatlam: Modal, Drawer, Toast/Notification, Table, Tabs kabi umumiy komponentlarning yagona API bo'lishi.

## Xatolar bilan ishlash (Error Handling) va Monitoring

1. Error Boundary: Komponent darajasidagi render xatolarini ushlash va foydalanuvchiga tushunarli fallback ko'rsatish.
2. Global API / Runtime xatolar: 401/403/404/500 va tarmoq xatolarini markazlashgan qayta ishlash, foydalanuvchiga aniq xabar chiqarish.
3. Error tracking va analytics: Sentry (yoki muqobil monitoring) va mahsulot event'larini xavfsiz yuborish qoidalari.
4. Browser Performance monitor react-doctor kabi toollardan foydalanish

## Dependency(kutubxonalar va package.json) Boshqaruvi va Versiyalash

1. Yangi paket qo'shish qoidasi: Yangi kutubxona ulashdan oldin tekshiriladigan mezonlar (oxirgi commit/maintenance holati, bundle hajmi, TypeScript qo'llab-quvvatlovi, litsenziya, mavjud paket bilan dublikat emasligi). Umumiy tarzda quyidagi kutubxonalar tavsiya etiladi:
   1. Carousel uchun: swiper ishlatish
   2. Input masking uchun: imask ishlatish
   3. Virtualizatsiya uchun: tanstack/virtual (bunga alternative react-window yoki react-virtualized kabi kutubxonalar bor lekin ular katta resource oladi va nudle size juda katta)
   4. Sana va vaqt bilan ishlash uchun: dayjs. Alternative bo'lgan momentjs bor lekin u qo'llab quvvatlash to'xtatilgan va katta resource talab qiladi dayjs qaraganda va bundle size juda katta
   5. Katta qiymatdagi raqamlar bilan ishlash uchun: bigjs yoki decimaljs. Qiymatlardan string formatda foydalanish afzal. Chunki javascriptda raqam max safe integer dan oshsa aniqlik yo'qoladi
   6. Rich html editor: tiptap. tinymce tavsiya etilmaydi pullik, katta resource talab qiladi, customizatsiya juda qiyin
   7. Http so'rovlar va api servislar uchun: axios. Umumiy api servicedan foydalanish loyihadagi /src/shared/api/index.ts fayldagidek. Har bir modul uchun alohida service class yozish va umumiy api class extend olish
   8. Overlay componentlar uchun: floating ui. Modal, Tooltip, Drawer, Dropdown va Selectlar uchun yagona kutubxonadan foydalanish
   9. Excel faylga export va import uchun: exceljs xlsx
   10.   Ma'lumotlarni pdfga export qilish, visual ko'rish uchun: @react-pdf/renderer
   11.   Form va data validatsiyalar uchun zod ishlatish. Bunga alternative yup, joi kabi kutubxonalar bor lekin eng maquli aynan zod. Murakkab data va form validatsiyalar uchun zod eng yaxshisi
   12.   State management uchun redux, zustand, react-query ishlatish

2. Lockfile va versiya siyosati: package-lock.json / pnpm-lock.yaml intizomi, engines (node, npm), packageManager versiylari va .nvmrc / .node-version mosligi.
