import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import { dropdownMenuClass } from '../classNames';
import Next from '../Icons/Next';
import Prev from '../Icons/Prev';
import type { FormInputProps } from '../types';
import type useDropdown from './useDropdown';
type MenuProps = Pick<
   ReturnType<typeof useDropdown>,
   'context' | 'floatingStyles' | 'getFloatingProps' | 'open' | 'refs'
> & {
   calendar: Date;
   max?: Date;
   min?: Date;
   onChange?: FormInputProps<HTMLInputElement>['onChange'];
   setCalendar: Dispatch<SetStateAction<Date>>;
   setOpen: Dispatch<SetStateAction<boolean>>;
};
const locales = {
   ru: {
      days: ['Во', 'По', 'Вт', 'Ср', 'Че', 'Пя', 'Су'],
      months: [
         'Январь',
         'Февраль',
         'Март',
         'Апреля',
         'Май',
         'Июнь',
         'Июль',
         'Август',
         'Сентябрь',
         'Октябрь',
         'Ноябрь',
         'Декабрь',
      ],
   },
   uz: {
      days: ['Ya', 'Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh'],
      months: [
         'Yanvar',
         'Fevral',
         'Mart',
         'Aprel',
         'May',
         'Iyun',
         'Iyul',
         'Avgust',
         'Sentyabr',
         'Oktyabr',
         'Noyabr',
         'Dekabr',
      ],
   },
   en: {
      days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December',
      ],
   },
};
const Menu = ({
   calendar,
   context,
   floatingStyles,
   getFloatingProps,
   max,
   min,
   onChange,
   open = false,
   refs,
   setCalendar,
   setOpen,
}: MenuProps) => {
   const language = 'en';
   const days = useMemo(() => {
      const days = locales?.[language]?.days ?? [];
      return days;
   }, [language]);
   const months = useMemo(() => {
      const months = locales?.[language]?.months ?? [];
      return months;
   }, [language]);
   return (
      open && (
         <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
            <FloatingFocusManager
               context={context}
               initialFocus={-1}
               modal={false}
            >
               <div
                  {...getFloatingProps()}
                  className={dropdownMenuClass()}
                  ref={node => refs?.setFloating(node)}
                  style={floatingStyles}
               >
                  <div className='rounded-[14px] p-3'>
                     <div className='calendar-wrapper'>
                        <Calendar
                           formatMonth={(_: string | undefined, date: Date) =>
                              months[date.getMonth()]
                           }
                           maxDate={max}
                           minDate={min}
                           next2Label={null}
                           nextLabel={<Next />}
                           prev2Label={null}
                           prevLabel={<Prev />}
                           showNeighboringMonth={false}
                           value={calendar}
                           formatShortWeekday={(
                              _: string | undefined,
                              date: Date,
                           ) => {
                              const weekDay = days[date.getDay()];
                              return weekDay;
                           }}
                           navigationLabel={({
                              view,
                              label,
                              date,
                           }: {
                              date: Date;
                              label: string;
                              view: string;
                           }) => {
                              const month = months[date.getMonth()];
                              const newDate = date.getFullYear();
                              const monthLabel = `${month} ${newDate}`;
                              const isMonth = view === 'month';
                              const newLabel = isMonth ? monthLabel : label;
                              return newLabel;
                           }}
                           onChange={calendarValue => {
                              if (!(calendarValue instanceof Date)) return;
                              const calendar = calendarValue;
                              const date = String(
                                 calendar.getDate() || '',
                              ).padStart(2, '0');
                              const month = String(
                                 calendar.getMonth() + 1 || '',
                              ).padStart(2, '0');
                              const year = String(
                                 calendar.getFullYear() || '',
                              ).padStart(2, '0');
                              const value = `${year}-${month}-${date}`;
                              setCalendar(calendar);
                              setOpen(false);
                              onChange?.(value);
                           }}
                        />
                     </div>
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
