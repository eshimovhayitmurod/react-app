export const getUrlSearchParams = <T extends string>(
   search?: string,
   params?: T[],
): Record<T, string> => {
   const newSearch = new URLSearchParams(search || window.location.search);
   if (!Array.isArray(params)) {
      return {} as Record<T, string>;
   }
   return params.reduce(
      (total, param) => {
         total[param] = newSearch.get(param) || '';
         return total;
      },
      {} as Record<T, string>,
   );
};
export default getUrlSearchParams;
