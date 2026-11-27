export type PdfSectionIcon =
   'person' | 'registration' | 'placement' | 'permission';
export type PdfRow = {
   label: string;
   value: string;
};
export type PdfSection = {
   icon: PdfSectionIcon;
   rows: PdfRow[];
   title: string;
};
export type ApplicationPdfData = {
   createdAt: string;
   fullName: string;
   photo?: string;
   redTitle: string;
   sections: PdfSection[];
   title: string;
};
