import { baseAPI } from '@shared/api';
import {
   Fragment,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { defaultFilter } from './constants';
import Container from './Container';
import Menu from './Menu';
import type { SelectFilter, SelectOption, SelectProps } from './types';
import useDropdown, { type SelectOptionListRef } from './useDropdown';
const parseData = (response: unknown) => {
   const data =
      typeof response === 'object' && response !== null && 'data' in response
         ? response.data
         : undefined;
   const results =
      typeof data === 'object' && data !== null && 'results' in data
         ? data.results
         : undefined;
   const next =
      typeof data === 'object' && data !== null && 'next' in data
         ? data.next
         : undefined;
   const hasMore = !!next;
   const options = Array.isArray(results) ? results : [];
   const newOptions = options.map(apiData => ({
      apiData,
      label:
         typeof apiData?.name === 'string' || typeof apiData?.name === 'number'
            ? apiData.name
            : '',
      value:
         typeof apiData?.id === 'string' || typeof apiData?.id === 'number'
            ? apiData.id
            : '',
   }));
   return { options: newOptions as SelectOption[], hasMore };
};
const Select = memo(
   ({
      'data-cy': dataCY,
      NoOptions: CustomNoOptions,
      Option,
      background = '(--color-input-bg-color)',
      className = '',
      clearable = true,
      disabled = false,
      error = '',
      getResponse,
      multiple = false,
      noOptionsMessage,
      onBlur,
      onChange,
      onFocus,
      options = [],
      placeholder,
      renderOptionType = 'default', // default | sign | custom
      searchPlaceholder,
      searchable = true,
      service, // api service
      size = 'md',
      type = 'select', // select | autocomplete
      url,
      value,
   }: SelectProps) => {
      const abortController = useRef<AbortController | null>(null);
      const inputRef = useRef<HTMLInputElement | null>(null);
      const listRef = useRef<SelectOptionListRef>([]);
      const [apiOptions, setApiOptions] = useState<SelectOption[]>([]);
      const [filter, setFilter] = useState(defaultFilter);
      const [hasMore, setHasMore] = useState(false);
      const [loading, setLoading] = useState(false);
      const search = filter?.search;
      const page = filter?.page;
      const memoizedOptions = useMemo(() => {
         const newOptions = Array.isArray(options) ? options : [];
         const filteredOptions = newOptions.filter(option => {
            const label = String(option?.label).toLowerCase().trim();
            const newSearch = String(search).toLowerCase().trim();
            const isMatch = label.includes(newSearch);
            return isMatch;
         });
         const newApiOptions = Array.isArray(apiOptions) ? apiOptions : [];
         const memoizedOptions =
            type === 'select' ? filteredOptions : newApiOptions;
         return memoizedOptions;
      }, [options, apiOptions, type, search]);
      const getData = useCallback(
         async ({ search = '', page = 1 }: SelectFilter) => {
            if (abortController?.current) {
               abortController?.current?.abort();
            }
            abortController.current = new AbortController();
            const signal = abortController?.current?.signal;
            setLoading(true);
            try {
               const isFunction = typeof url === 'function';
               const newSearch = search ? '&search=' + search : '';
               const newPage = page ? '&page=' + page : '';
               const newUrl = isFunction
                  ? url({ search, page })
                  : `${url}?${newSearch}${newPage}`;
               const options = { url: newUrl, signal };
               const apiService =
                  typeof service === 'function' ? service : baseAPI;
               const response = await apiService(options);
               const transformedResponse =
                  typeof getResponse === 'function'
                     ? getResponse(response, { page, search })
                     : parseData(response);
               const hasMore = Boolean(transformedResponse?.hasMore);
               setHasMore(hasMore);
               setApiOptions(apiOptions => {
                  const options = transformedResponse?.options;
                  const newOptions = Array.isArray(options) ? options : [];
                  const newApiOptions =
                     page > 1 ? [...apiOptions, ...newOptions] : newOptions;
                  return newApiOptions;
               });
            } catch (error) {
               const isCanceled =
                  typeof error === 'object' &&
                  error !== null &&
                  'code' in error &&
                  error.code === 'ERR_CANCELED';
               if (!isCanceled) {
                  if (page === 1) {
                     setApiOptions([]);
                  }
                  setHasMore(false);
               }
            } finally {
               if (!signal?.aborted) {
                  setLoading(false);
               }
            }
         },
         [getResponse, url, service],
      );
      const {
         activeIndex,
         context,
         floatingStyles,
         getFloatingProps,
         getItemProps,
         getReferenceProps,
         open,
         refs,
         setActiveIndex,
         setOpen,
      } = useDropdown({
         getData,
         disabled,
         listRef,
         options: memoizedOptions,
         setFilter,
         type,
      });
      useEffect(() => {
         if (page === 1) {
            listRef.current = [];
            listRef.current.null = inputRef.current;
            for (let i = 0; i < memoizedOptions?.length; i++) {
               listRef.current[i] = null;
            }
         }
      }, [memoizedOptions?.length, listRef, inputRef, page]);
      return (
         <Fragment>
            <Container
               background={background}
               className={className}
               clearable={clearable}
               dataCY={dataCY}
               disabled={disabled}
               error={error}
               getReferenceProps={getReferenceProps}
               multiple={multiple}
               onBlur={onBlur}
               onChange={onChange}
               onFocus={onFocus}
               placeholder={placeholder}
               refs={refs}
               setOpen={setOpen}
               size={size}
               value={value}
            />
            <Menu
               CustomNoOptions={CustomNoOptions}
               CustomOption={Option}
               activeIndex={activeIndex}
               context={context}
               dataCY={dataCY}
               filter={filter}
               floatingStyles={floatingStyles}
               getData={getData}
               getFloatingProps={getFloatingProps}
               getItemProps={getItemProps}
               hasMore={hasMore}
               inputRef={inputRef}
               listRef={listRef}
               loading={loading}
               multiple={multiple}
               noOptionsMessage={noOptionsMessage}
               onChange={onChange}
               open={open}
               options={memoizedOptions}
               refs={refs}
               renderOptionType={renderOptionType}
               searchPlaceholder={searchPlaceholder}
               searchable={searchable}
               setActiveIndex={setActiveIndex}
               setFilter={setFilter}
               setOpen={setOpen}
               type={type}
               value={value}
            />
         </Fragment>
      );
   },
);
export default Select;
