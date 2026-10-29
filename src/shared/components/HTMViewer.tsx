import sanitizeHtml from '@shared/helpers/sanitizeHtml';
import { RootStateType } from '@shared/store';
import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
type HTMLViewerProps = { html?: string };
const HTMLViewer = memo(({ html = '' }: HTMLViewerProps) => {
   const iframeRef = useRef<HTMLIFrameElement>(null);
   const theme = useSelector((state: RootStateType) => state.ui.theme);
   useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      const cleanHTML = sanitizeHtml(html);
      const color = theme === 'light' ? '#292b32' : '#e1e1e1';
      const style = `<style> * { color: ${color} !important; } </style>`;
      const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
      if (!doc) return;
      doc.open();
      doc.write(`${cleanHTML} ${style}`);
      doc.close();
      iframe.style.height = `${doc.body.scrollHeight}px`;
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
