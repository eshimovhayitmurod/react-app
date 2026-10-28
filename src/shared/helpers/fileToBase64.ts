export interface ConvertedBase64File {
   ContentBase64: string;
   Filename: string;
   MimeType: string;
   Size: number;
}
export const fileToBase64 = (file: File): Promise<ConvertedBase64File> => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
         const result = reader.result;
         if (typeof result !== 'string') {
            reject(new Error('File read error: Result is not a string'));
            return;
         }
         const ContentBase64 = result.split(',')[1] ?? '';
         const Filename = file.name || '';
         const MimeType = file.type || '';
         const Size = file.size || 0;
         const jsonFile: ConvertedBase64File = {
            ContentBase64,
            Filename,
            MimeType,
            Size,
         };
         resolve(jsonFile);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
   });
};
export default fileToBase64;
