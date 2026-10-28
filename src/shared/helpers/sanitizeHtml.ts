import DOMPurify, { type Config } from 'dompurify';
const sanitizeConfig: Config = {
   USE_PROFILES: { html: true },
   KEEP_CONTENT: true,
   SANITIZE_DOM: true,
   ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.-]|$))/i,
   FORBID_TAGS: ['script', 'style'],
   FORBID_ATTR: ['onerror', 'onclick'],
};
const sanitizeHtml = (html: string = ''): string =>
   DOMPurify.sanitize(html, sanitizeConfig);
export default sanitizeHtml;
