import type { ElementType, ReactNode, RefCallback } from 'react';
import { Component, createElement } from 'react';
type InfiniteScrollProps = {
   children?: ReactNode;
   element?: ElementType;
   getScrollParent?: () => HTMLElement | null;
   hasMore?: boolean;
   initialLoad?: boolean;
   isReverse?: boolean;
   loadMore: (page: number) => void;
   loader?: ReactNode;
   pageStart?: number;
   ref?: RefCallback<HTMLElement>;
   threshold?: number;
   useCapture?: boolean;
   useWindow?: boolean;
   [key: string]: unknown;
};
export default class InfiniteScroll extends Component<InfiniteScrollProps> {
   static defaultProps = {
      element: 'div',
      hasMore: false,
      initialLoad: true,
      pageStart: 0,
      ref: null,
      threshold: 250,
      useWindow: true,
      isReverse: false,
      useCapture: false,
      loader: null,
      getScrollParent: null,
   };
   private scrollComponent: HTMLElement | null = null;
   private options: boolean | AddEventListenerOptions | undefined;
   private pageLoaded = 0;
   private beforeScrollHeight = 0;
   private beforeScrollTop = 0;
   private loadMore = false;
   private defaultLoader: ReactNode = null;
   constructor(props: InfiniteScrollProps) {
      super(props);
      this.scrollListener = this.scrollListener.bind(this);
      this.eventListenerOptions = this.eventListenerOptions.bind(this);
      this.mousewheelListener = this.mousewheelListener.bind(this);
   }
   componentDidMount() {
      this.pageLoaded = this.props.pageStart ?? 0;
      this.options = this.eventListenerOptions();
      this.attachScrollListener();
   }
   componentDidUpdate() {
      if (this.props.isReverse && this.loadMore) {
         const parentElement = this.getParentElement(this.scrollComponent);
         if (!parentElement) return;
         parentElement.scrollTop =
            parentElement.scrollHeight -
            this.beforeScrollHeight +
            this.beforeScrollTop;
         this.loadMore = false;
      }
      this.attachScrollListener();
   }
   componentWillUnmount() {
      this.detachScrollListener();
      this.detachMousewheelListener();
   }
   isPassiveSupported(): boolean {
      let passive = false;
      const testOptions: AddEventListenerOptions = {
         get passive() {
            passive = true;
            return false;
         },
      };
      try {
         const listener = () => undefined;
         document.addEventListener('test', listener, testOptions);
         document.removeEventListener('test', listener, false);
      } catch (e) {
         // ignore
      }
      return passive;
   }
   eventListenerOptions(): boolean | AddEventListenerOptions {
      let options: boolean | AddEventListenerOptions = !!this.props.useCapture;
      if (this.isPassiveSupported()) {
         options = {
            capture: !!this.props.useCapture,
            passive: true,
         };
      } else {
         options = {
            capture: !!this.props.useCapture,
            passive: false,
         };
      }
      return options;
   }
   setDefaultLoader(loader: ReactNode): void {
      this.defaultLoader = loader;
   }
   detachMousewheelListener(): void {
      const el = this.scrollComponent;
      if (!el) return;
      let scrollEl: Window | HTMLElement = window;
      if (this.props.useWindow === false) {
         const parent = this.getParentElement(el);
         if (!parent) return;
         scrollEl = parent;
      }
      scrollEl.removeEventListener(
         'mousewheel',
         this.mousewheelListener,
         this.options ?? this.props.useCapture ?? false,
      );
   }
   detachScrollListener(): void {
      const el = this.scrollComponent;
      if (!el) return;
      let scrollEl: Window | HTMLElement = window;
      if (this.props.useWindow === false) {
         const parent = this.getParentElement(el);
         if (!parent) return;
         scrollEl = parent;
      }
      scrollEl.removeEventListener(
         'scroll',
         this.scrollListener,
         this.options ?? this.props.useCapture ?? false,
      );
      scrollEl.removeEventListener(
         'resize',
         this.scrollListener,
         this.options ?? this.props.useCapture ?? false,
      );
   }
   getParentElement(el: HTMLElement | null): HTMLElement | null {
      const scrollParent = this.props.getScrollParent?.();
      if (scrollParent) {
         return scrollParent;
      }
      return el?.parentElement ?? null;
   }
   filterProps(props: InfiniteScrollProps): InfiniteScrollProps {
      return props;
   }
   attachScrollListener(): void {
      const el = this.scrollComponent;
      const parentElement = this.getParentElement(el);
      if (!this.props.hasMore || !parentElement || !el) {
         return;
      }
      let scrollEl: Window | HTMLElement = window;
      if (this.props.useWindow === false) {
         scrollEl = parentElement;
      }
      scrollEl.addEventListener(
         'mousewheel',
         this.mousewheelListener,
         this.options ?? this.props.useCapture ?? false,
      );
      scrollEl.addEventListener(
         'scroll',
         this.scrollListener,
         this.options ?? this.props.useCapture ?? false,
      );
      scrollEl.addEventListener(
         'resize',
         this.scrollListener,
         this.options ?? this.props.useCapture ?? false,
      );
      if (this.props.initialLoad) {
         this.scrollListener();
      }
   }
   mousewheelListener(e: Event): void {
      if (
         e instanceof WheelEvent &&
         e.deltaY === 1 &&
         !this.isPassiveSupported()
      ) {
         e.preventDefault();
      }
   }
   scrollListener(): void {
      const el = this.scrollComponent;
      if (!el) return;
      const scrollEl = window;
      const parentNode = this.getParentElement(el);
      if (!parentNode) return;
      let offset = 0;
      if (this.props.useWindow) {
         const doc =
            document.documentElement ||
            document.body.parentNode ||
            document.body;
         const scrollTop =
            scrollEl.pageYOffset !== undefined
               ? scrollEl.pageYOffset
               : doc.scrollTop;
         if (this.props.isReverse) {
            offset = scrollTop;
         } else {
            offset = this.calculateOffset(el, scrollTop);
         }
      } else if (this.props.isReverse) {
         offset = parentNode.scrollTop;
      } else {
         offset =
            el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      }
      if (
         offset < Number(this.props.threshold ?? 250) &&
         el &&
         el.offsetParent !== null
      ) {
         this.detachScrollListener();
         this.beforeScrollHeight = parentNode.scrollHeight;
         this.beforeScrollTop = parentNode.scrollTop;
         if (typeof this.props.loadMore === 'function') {
            this.props.loadMore((this.pageLoaded += 1));
            this.loadMore = true;
         }
      }
   }
   calculateOffset(el: HTMLElement, scrollTop: number): number {
      if (!el) {
         return 0;
      }
      return (
         this.calculateTopPosition(el) +
         (el.offsetHeight - scrollTop - window.innerHeight)
      );
   }
   calculateTopPosition(el: HTMLElement | null): number {
      if (!el) {
         return 0;
      }
      return (
         el.offsetTop +
         this.calculateTopPosition(el.offsetParent as HTMLElement | null)
      );
   }
   render() {
      const renderProps = this.filterProps(this.props);
      const {
         children,
         element,
         hasMore,
         initialLoad,
         isReverse,
         loader,
         loadMore,
         pageStart,
         ref,
         threshold,
         useCapture,
         useWindow,
         getScrollParent,
         ...props
      } = renderProps;
      props.ref = (node: HTMLElement | null) => {
         this.scrollComponent = node;
         if (ref) {
            ref(node);
         }
      };
      const childrenArray: ReactNode[] = [children];
      if (hasMore) {
         if (loader) {
            isReverse
               ? childrenArray.unshift(loader)
               : childrenArray.push(loader);
         } else if (this.defaultLoader) {
            isReverse
               ? childrenArray.unshift(this.defaultLoader)
               : childrenArray.push(this.defaultLoader);
         }
      }
      return createElement(element ?? 'div', props, childrenArray);
   }
}
