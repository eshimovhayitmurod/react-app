import sanitizeHtml from '@shared/helpers/sanitizeHtml';
import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
const HTMLViewer = memo(({ html = '' }) => {
   const iframeRef = useRef(null);
   const theme = useSelector(state => state?.ui?.theme);
   useEffect(() => {
      if (iframeRef.current) {
         const cleanHTML = sanitizeHtml(html);
         const color = theme === 'light' ? '#292b32' : '#e1e1e1';
         const style = `<style> * { color: ${color} !important; } </style>`;
         const doc =
            iframeRef.current.contentDocument ||
            iframeRef.current.contentWindow.document;
         doc.open();
         doc.write(`${cleanHTML} ${style}`);
         doc.close();
         const resize = () => {
            iframeRef.current.style.height = doc.body.scrollHeight + 'px';
         };
         resize();
      }
   }, [html, theme]);
   return (
      <iframe
         ref={iframeRef}
         style={{ width: '100%', border: 'none' }}
         title='Text preview'
      />
   );
});
export default HTMLViewer;
