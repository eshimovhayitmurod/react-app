import type { ComponentType } from 'react';
import { memo, useMemo } from 'react';
import type {
   SelectOption,
   SelectOptionComponentProps,
   SelectProps,
} from '../types';
import type useDropdown from '../useDropdown';
import DefaultOption from './DefaultOption';
import SignOption from './SignOption';
type OptionProps = {
   CustomOption?: ComponentType<SelectOptionComponentProps>;
   activeIndex: number | null;
   dataCY?: string;
   getItemProps: ReturnType<typeof useDropdown>['getItemProps'];
   index: number;
   multiple?: boolean;
   listRef: ReturnType<typeof useDropdown>['listRef'];
   onSelect: (index: number) => void;
   option: SelectOption;
   renderOptionType?: SelectProps['renderOptionType'];
   setActiveIndex: (index: number | null) => void;
   value?: SelectOptionComponentProps['value'];
};
const Option = memo(
   ({
      CustomOption,
      activeIndex = 0,
      dataCY = '',
      getItemProps,
      index = 0,
      multiple = false,
      listRef,
      onSelect,
      option,
      renderOptionType,
      setActiveIndex,
      value,
   }: OptionProps) => {
      const disabled = option?.disabled;
      const memoizedDisabled = useMemo(() => !!disabled, [disabled]);
      const isFocused = useMemo(
         () => activeIndex === index && !memoizedDisabled,
         [activeIndex, index, memoizedDisabled],
      );
      const isSelected = useMemo(() => {
         const newValue = Array.isArray(value) ? value : [];
         const some = newValue.some(value => value?.value === option?.value);
         const singleValue = Array.isArray(value) ? undefined : value;
         const isSelected = multiple
            ? some
            : singleValue?.value === option?.value;
         return isSelected;
      }, [multiple, value, option]);
      const innerRef = {
         ...getItemProps({
            onClick: () => {
               if (!memoizedDisabled) {
                  onSelect(index);
               }
            },
            onPointerMove: () => {
               if (index !== activeIndex) {
                  setActiveIndex(index);
               }
            },
         }),
         'aria-disabled': memoizedDisabled,
         'aria-selected': isSelected,
         'data-cy': dataCY ? `${dataCY}-${String(option?.value)}` : undefined,
         ref: (node: HTMLElement | null) => {
            listRef.current[index] = node;
         },
         role: 'option',
         tabIndex: -1,
      };
      const OptionComponent = useMemo(() => {
         const OptionComponent: ComponentType<SelectOptionComponentProps> =
            renderOptionType === 'default'
               ? DefaultOption
               : renderOptionType === 'sign'
                 ? SignOption
                 : renderOptionType === 'custom' && CustomOption
                   ? CustomOption
                   : DefaultOption;
         return OptionComponent;
      }, [renderOptionType, CustomOption]);
      return (
         <OptionComponent
            activeIndex={activeIndex}
            index={index}
            innerRef={innerRef}
            isFocused={isFocused}
            multiple={multiple}
            isSelected={isSelected}
            option={option}
            value={value}
         />
      );
   },
);
export default Option;
