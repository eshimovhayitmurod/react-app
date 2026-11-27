import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import type { KeyboardEvent, RefObject } from 'react';
import { useCallback, useMemo } from 'react';
import InfiniteScroller from './InfiniteScroller';
import Loading from './Loading';
import LoadingMore from './LoadingMore';
import MenuHeader from './MenuHeader';
import NoOptions from './NoOptions';
import Option from './Option';
import { defaultFilter } from './constants';
import type {
   SelectFilter,
   SelectOption,
   SelectProps,
   SelectValue,
} from './types';
import type useDropdown from './useDropdown';
type MenuProps = Pick<
   ReturnType<typeof useDropdown>,
   | 'activeIndex'
   | 'context'
   | 'floatingStyles'
   | 'getFloatingProps'
   | 'getItemProps'
   | 'open'
   | 'refs'
   | 'setActiveIndex'
   | 'setOpen'
> & {
   CustomNoOptions?: SelectProps['NoOptions'];
   CustomOption?: SelectProps['Option'];
   dataCY?: string;
   filter: SelectFilter;
   getData: (filter: SelectFilter) => Promise<void>;
   hasMore?: boolean;
   inputRef: RefObject<HTMLInputElement | null>;
   multiple?: boolean;
   searchable?: boolean;
   listRef: ReturnType<typeof useDropdown>['listRef'];
   loading?: boolean;
   noOptionsMessage?: string;
   onChange?: (value: SelectValue) => void;
   options: SelectOption[];
   renderOptionType?: SelectProps['renderOptionType'];
   searchPlaceholder?: string;
   setFilter: (filter: SelectFilter) => void;
   type?: SelectProps['type'];
   value?: SelectValue;
};
const Menu = ({
   CustomOption,
   activeIndex,
   context,
   dataCY = '',
   filter,
   floatingStyles,
   getData,
   getFloatingProps,
   getItemProps,
   hasMore = false,
   inputRef,
   multiple = false,
   searchable = true,
   listRef,
   loading = false,
   noOptionsMessage,
   CustomNoOptions,
   onChange,
   open = false,
   options,
   refs,
   renderOptionType,
   searchPlaceholder,
   setActiveIndex,
   setFilter,
   setOpen,
   type = 'select', // select | autocomplete
   value,
}: MenuProps) => {
   const hasData = useMemo(() => options?.length > 0, [options]);
   const search = filter?.search;
   const page = filter?.page;
   const memoizedSearchable = useMemo(() => {
      const memoizedSearchable = type === 'select' ? !!searchable : true;
      return memoizedSearchable;
   }, [searchable, type]);
   const maxHeight = useMemo(() => {
      const length = options?.length;
      const searchHeight = searchable ? 47 : 0;
      const optionsCount =
         (loading && page === 1) || length === 0 ? 1 : length < 5 ? length : 5;
      const height =
         renderOptionType === 'default'
            ? CustomNoOptions && !hasData
               ? 80
               : 44
            : renderOptionType === 'sign'
              ? 74
              : 44;
      const optionsHeight = height * optionsCount;
      const padding = 14;
      const maxHeight = searchHeight + optionsHeight + padding;
      return maxHeight;
   }, [
      CustomNoOptions,
      hasData,
      loading,
      options,
      page,
      renderOptionType,
      searchable,
   ]);
   const isLoading = useMemo(() => {
      const isLoading = loading && page === 1;
      return isLoading;
   }, [loading, page]);
   const HasMore = useMemo(
      () => !!hasMore && type === 'autocomplete',
      [hasMore, type],
   );
   const loadMore = useCallback(() => {
      if (!loading && hasMore) {
         const newFilter = { search, page: page + 1 };
         getData(newFilter);
         setFilter(newFilter);
      }
   }, [page, getData, loading, search, setFilter, hasMore]);
   const onSelect = useCallback(
      (index: number) => {
         setOpen(false);
         setActiveIndex(null);
         const valueList = Array.isArray(value) ? value : [];
         const foundValue = options.find((_, order = 0) => order === index);
         if (!foundValue) return;
         const isSelected = valueList.some(
            value => value?.value === foundValue?.value,
         );
         const addedList = [...valueList, foundValue];
         const removedList = valueList.filter(
            value => value?.value !== foundValue?.value,
         );
         const multiValue = isSelected ? removedList : addedList;
         const newValue = multiple ? multiValue : foundValue;
         onChange?.(newValue);
         setFilter(defaultFilter);
         if (type === 'autocomplete') {
            getData(defaultFilter);
         }
      },
      [
         getData,
         multiple,
         onChange,
         options,
         setActiveIndex,
         setFilter,
         setOpen,
         type,
         value,
      ],
   );
   return (
      open && (
         <FloatingPortal id={import.meta.env.VITE_FLOATING_UI_PORTAL_ID}>
            <FloatingFocusManager context={context} modal={false}>
               <div
                  {...getFloatingProps({
                     onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
                        if (e.key === 'Enter' && activeIndex !== null) {
                           onSelect(activeIndex);
                        }
                     },
                  })}
                  className='bg-(--dropdown-menu-bg-color)! rounded-xl border border-(--select-border-color) outline-none! overflow-hidden pb-1.5 shadow-(--dropdown-menu-shadow)'
                  ref={refs?.setFloating}
                  tabIndex={-1}
                  style={{
                     ...floatingStyles,
                     height: `${maxHeight}px`,
                     maxHeight: `${maxHeight}px`,
                  }}
               >
                  {memoizedSearchable && (
                     <MenuHeader
                        getData={getData}
                        inputRef={inputRef}
                        search={search}
                        searchPlaceholder={searchPlaceholder}
                        setActiveIndex={setActiveIndex}
                        setFilter={setFilter}
                        type={type}
                     />
                  )}
                  <div
                     className='pt-1.5'
                     style={{
                        height: searchable ? 'calc(100% - 47px)' : '100%',
                     }}
                  >
                     <div className='h-full overflow-auto px-1.5'>
                        {isLoading ? (
                           <Loading />
                        ) : hasData ? (
                           <InfiniteScroller
                              className='relative w-full overflow-hidden rounded-[7px] outline-none'
                              hasMore={HasMore}
                              initialLoad={false}
                              loadMore={loadMore}
                              pageStart={1}
                              tabIndex={0}
                              threshold={150}
                              useWindow={false}
                           >
                              {options.map((option, index = 0) => (
                                 <Option
                                    CustomOption={CustomOption}
                                    activeIndex={activeIndex}
                                    dataCY={dataCY}
                                    getItemProps={getItemProps}
                                    index={index}
                                    key={`${option?.value}_$${option?.label}_${index}`}
                                    listRef={listRef}
                                    multiple={multiple}
                                    onSelect={onSelect}
                                    option={option}
                                    renderOptionType={renderOptionType}
                                    setActiveIndex={setActiveIndex}
                                    value={value}
                                 />
                              ))}
                              {hasMore && <LoadingMore key={options?.length} />}
                           </InfiniteScroller>
                        ) : (
                           <NoOptions
                              searchValue={search}
                              noOptionsMessage={noOptionsMessage}
                              CustomNoOptions={CustomNoOptions}
                           />
                        )}
                     </div>
                  </div>
               </div>
            </FloatingFocusManager>
         </FloatingPortal>
      )
   );
};
export default Menu;
