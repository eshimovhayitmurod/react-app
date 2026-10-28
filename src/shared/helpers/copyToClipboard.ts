const copyToClipboard = async (text: string): Promise<boolean> => {
   const windowWithClipboard = window as unknown as {
      clipboardData?: { setData: (format: string, data: string) => boolean };
   };
   if (
      windowWithClipboard.clipboardData &&
      windowWithClipboard.clipboardData.setData
   ) {
      return windowWithClipboard.clipboardData.setData('Text', text);
   }
   if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
         await navigator.clipboard.writeText(text);
         return true;
      } catch {
         return false;
      }
   }
   try {
      const textarea = document.createElement('textarea');
      textarea.style.left = '0';
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
   } catch {
      return false;
   }
};
export default copyToClipboard;
