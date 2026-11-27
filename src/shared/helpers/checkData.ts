export const isObject = (value: unknown) => {
   const isObject = value !== null && typeof value === 'object';
   return isObject;
};
