import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { HexAlphaColorPicker } from 'react-colorful';
import { dropdownMenuClass } from '../classNames';
import type { FormInputProps } from '../types';
import type useDropdown from './useDropdown';
type MenuProps = Pick<
   ReturnType<typeof useDropdown>,
   'context' | 'floatingStyles' | 'getFloatingProps' | 'open' | 'refs'
> & {
   onChange?: FormInputProps<HTMLInputElement>['onChange'];
   value?: string;
};
const Menu = ({
   context,
   floatingStyles,
   getFloatingProps,
   onChange,
   open,
   refs,
   value,
}: MenuProps) => {
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
                     <HexAlphaColorPicker
                        color={value}
                        onChange={(value: string) => onChange?.(value)}
                     />
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
