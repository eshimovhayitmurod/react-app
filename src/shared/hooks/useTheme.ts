import { Themes, ThemeType } from '@shared/constants/themes';
import { changeTheme } from '@shared/store/ui';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const useTheme = (): void => {
   const dispatch = useDispatch();
   useEffect(() => {
      const localTheme = localStorage.getItem('theme') as ThemeType;
      const isValidLocalTheme = localTheme
         ? Themes.includes(localTheme)
         : false;
      const isSystemLight = window.matchMedia(
         '(prefers-color-scheme: light)',
      ).matches;
      const newTheme: ThemeType =
         isValidLocalTheme && localTheme
            ? localTheme
            : isSystemLight
              ? 'light'
              : 'dark';
      dispatch(changeTheme(newTheme));
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
         document.documentElement.classList.add('dark');
      }
   }, []);
};
export default useTheme;
