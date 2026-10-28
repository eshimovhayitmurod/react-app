export const getTextContent = (html: unknown): string => {
   if (html && typeof html === 'string') {
      const div = window.document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
   }
   return '';
};
export default getTextContent;
