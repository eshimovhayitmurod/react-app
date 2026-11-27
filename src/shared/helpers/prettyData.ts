import dateFormatter from '@shared/helpers/dateFormatter';
import Big from 'big.js';
type DateValue = string | number | Date | null | undefined;
type PrettyNumberOptions = { scale?: number; split?: boolean };
export const prettyCardNumber = (value?: string | number | null) => {
   if (typeof value === 'number' || typeof value === 'string') {
      const cardNumberText = String(value);
      const parsedNumber =
         cardNumberText.slice(0, 6) + '******' + cardNumberText.slice(12);
      const text = [...parsedNumber].reverse().join('');
      const array = [];
      for (let x = 0; x < text.length; x += 4) {
         array.push([...text.slice(x, x + 4)].reverse().join(''));
      }
      return array.reverse().join().replace(/,/g, ' ');
   } else {
      return '—';
   }
};
export const prettyCardValid = (value?: string | number | null) => {
   const validNumber = String(value || '').replace('/', '');
   return value ? validNumber.slice(0, 2) + '/' + validNumber.slice(2) : '—';
};
export const prettyDate = (value: DateValue = '') => {
   const isValidString = typeof value === 'string' && value;
   const isValidDate = value instanceof Date && !Number.isNaN(value.getTime());
   const isValidNumber = typeof value === 'number' && !Number.isNaN(value);
   const isValid = isValidString || isValidDate || isValidNumber;
   return isValid ? dateFormatter(value).format('DD.MM.YYYY') : '—';
};
export const prettyDateTime = (value: DateValue = '') => {
   const isValidString = typeof value === 'string' && value;
   const isValidDate = value instanceof Date && !Number.isNaN(value.getTime());
   const isValidNumber = typeof value === 'number' && !Number.isNaN(value);
   const isValid = isValidString || isValidDate || isValidNumber;
   return isValid ? dateFormatter(value).format('DD.MM.YYYY HH:mm:ss') : '—';
};
export const prettyFileSize = (
   value: number,
   options?: { si: boolean; dp: number },
) => {
   const { si = false, dp = 1 } = options || {};
   const thresh = si ? 1000 : 1024;
   if (Math.abs(value) < thresh) {
      return value + ' B';
   }
   const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
   let u = -1;
   const r = 10 ** dp;
   do {
      value /= thresh;
      ++u;
   } while (
      Math.round(Math.abs(value) * r) / r >= thresh &&
      u < units.length - 1
   );
   return value.toFixed(dp) + ' ' + units[u];
};
export const prettyPassportNumber = (
   value: string | number | null | undefined = '',
) => {
   const passport = String(value || '');
   return passport ? `${passport.slice(0, 2)} - ${passport.slice(2)}` : '—';
};
export const prettyPhoneNumber = (
   value: string | number | null | undefined = '',
) => {
   const checkedPhone = String(value || '');
   const zero = checkedPhone.slice(0, 4);
   const first = checkedPhone.slice(4, 6);
   const second = checkedPhone.slice(6, 9);
   const third = checkedPhone.slice(9, 11);
   const fourth = checkedPhone.slice(11, 13);
   return value ? `${zero} (${first}) ${second} ${third} ${fourth}` : '—';
};
export const prettyNumber = (
   value: string | number | null | undefined,
   options?: PrettyNumberOptions,
) => {
   const scale = typeof options?.scale === 'number' ? options?.scale : 2;
   const split = typeof options?.split === 'boolean' ? options?.split : true;
   const isValid =
      (typeof value === 'string' && value) || typeof value === 'number';
   if (isValid) {
      try {
         const splittedValue = Big(value).toFixed(scale).split('.');
         const int = splittedValue?.[0];
         const float = splittedValue?.[1];
         const number =
            (split ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : int) +
            (float ? '.' + float : '');
         return number;
      } catch {
         return '—';
      }
   } else {
      return '—';
   }
};
