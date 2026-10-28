export interface ImageDimensions {
   height: number;
   width: number;
}
export const getImageDimensions = (
   file: File | Blob,
): Promise<ImageDimensions> => {
   return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => {
         if (typeof reader.result === 'string') {
            img.src = reader.result;
         } else {
            reject(
               new Error(
                  'Faylni o‘qishda xatolik yuz berdi: Natija string emas',
               ),
            );
         }
      };
      img.onload = () => {
         resolve({ width: img?.width, height: img?.height });
      };
      img.onerror = error => reject(error);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
   });
};
export default getImageDimensions;
