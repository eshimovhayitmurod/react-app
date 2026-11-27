import tinosBold from '@assets/fonts/Tinos/Tinos-Bold.ttf?url';
import tinosRegular from '@assets/fonts/Tinos/Tinos-Regular.ttf?url';
import {
   Document,
   Font,
   Image,
   Page,
   StyleSheet,
   Text,
   View,
} from '@react-pdf/renderer';
import type { ApplicationPdfData } from '../types';
Font.register({
   family: 'Tinos',
   fonts: [
      { fontWeight: 400, src: tinosRegular },
      { fontWeight: 700, src: tinosBold },
   ],
});
Font.registerHyphenationCallback(word => [word]);
const styles = StyleSheet.create({
   page: {
      color: '#000000',
      fontFamily: 'Tinos',
      fontSize: 11,
      paddingBottom: 40,
      paddingHorizontal: 40,
      paddingTop: 36,
   },
   header: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'space-between',
   },
   headerText: {
      flex: 1,
      gap: 10,
   },
   redText: {
      color: '#DC2626',
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.4,
      textTransform: 'uppercase',
   },
   fullName: {
      fontSize: 17,
      fontWeight: 700,
      lineHeight: 1.3,
      textTransform: 'uppercase',
   },
   photo: {
      border: '1pt solid #CBD5E1',
      height: 130,
      objectFit: 'cover',
      width: 100,
   },
   title: {
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 6,
      marginTop: 22,
      textAlign: 'center',
   },
   section: {
      marginTop: 18,
   },
   sectionHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      marginBottom: 6,
   },
   sectionIcon: {
      alignItems: 'center',
      backgroundColor: '#E8EEFB',
      borderRadius: 11,
      height: 22,
      justifyContent: 'center',
      width: 22,
   },
   sectionTitle: {
      color: '#2F5BB7',
      fontSize: 16,
      fontWeight: 700,
   },
   row: {
      borderBottom: '1pt solid #000000',
      flexDirection: 'row',
      fontSize: 15,
      fontWeight: 700,
      gap: 16,
      justifyContent: 'space-between',
      paddingBottom: 3,
      paddingTop: 6,
   },
   value: {
      flex: 1,
      textAlign: 'right',
   },
   footer: {
      bottom: 16,
      color: '#475569',
      fontSize: 9,
      left: 40,
      position: 'absolute',
      right: 40,
      textAlign: 'center',
   },
});
const ApplicationPdf = ({
   createdAt,
   fullName,
   photo,
   redTitle,
   sections,
   title,
}: ApplicationPdfData) => (
   <Document title={title}>
      <Page size='A4' style={styles.page}>
         <View style={styles.header}>
            <View style={styles.headerText}>
               <Text style={styles.redText}>{redTitle}</Text>
               <Text style={styles.fullName}>{fullName}</Text>
            </View>
            {photo && <Image src={photo} style={styles.photo} />}
         </View>
         <Text style={styles.title}>{title}</Text>
         {sections.map(section => (
            <View key={section.icon} style={styles.section} wrap={false}>
               <View minPresenceAhead={60} style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
               </View>
               {section.rows.map(row => (
                  <View key={row.label} style={styles.row}>
                     <Text>{row.label}:</Text>
                     <Text style={styles.value}>{row.value}</Text>
                  </View>
               ))}
            </View>
         ))}
         <Text fixed style={styles.footer}>
            {createdAt}
         </Text>
      </Page>
   </Document>
);
export default ApplicationPdf;
