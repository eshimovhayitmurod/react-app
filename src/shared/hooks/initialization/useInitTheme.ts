import { themes } from '@shared/constants/system/themes';
import getUrlSearchParams from '@shared/helpers/getUrlSearchParams';
import { changeTheme } from '@shared/store/ui';
import { themeType } from '@shared/types/system/themes.types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const useInitTheme = (): void => {
   const dispatch = useDispatch();
   useEffect(() => {
      const localTheme = localStorage.getItem('theme') as themeType;
      const isValidLocalTheme = localTheme
         ? themes.includes(localTheme)
         : false;
      const isSystemLight = window.matchMedia(
         '(prefers-color-scheme: light)',
      ).matches;
      const { theme } = getUrlSearchParams(window.location.search, [
         'theme',
      ]) as { theme?: themeType };
      const isValidUrlTheme = theme ? themes.includes(theme) : false;
      const newTheme: themeType =
         isValidUrlTheme && theme
            ? theme
            : isValidLocalTheme && localTheme
              ? localTheme
              : isSystemLight
                ? 'light'
                : 'dark';
      dispatch(changeTheme(newTheme));
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
         document.documentElement.classList.add('dark');
      }
   }, [dispatch]);
};
export default useInitTheme;
