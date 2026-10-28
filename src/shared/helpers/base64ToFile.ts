interface Base64ToFileParams {
   ContentBase64?: string;
   Filename?: string;
   MimeType?: string;
}
const base64ToFile = ({
   ContentBase64 = '',
   Filename = '',
   MimeType = '',
}: Base64ToFileParams): File => {
   const byteString = atob(ContentBase64);
   const byteNumbers = new Array(byteString.length);
   for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
   }
   const byteArray = new Uint8Array(byteNumbers);
   const file = new File([byteArray], Filename, { type: MimeType });
   return file;
};
export default base64ToFile;
