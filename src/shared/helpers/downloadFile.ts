export interface DownloadFileParams {
   fileExtension: string;
   fileName?: string;
   href: string;
}
export const downloadFile = ({
   fileExtension,
   fileName = 'Документ',
   href,
}: DownloadFileParams): void => {
   const a = document.createElement('a');
   a.setAttribute('type', 'hidden');
   a.download = `${fileName}.${fileExtension}`;
   a.href = href;
   document.body.appendChild(a);
   a.click();
   a.remove();
};
export default downloadFile;
