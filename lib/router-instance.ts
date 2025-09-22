import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

let routerInstance: AppRouterInstance | null = null;

export const setRouterInstance = (router: AppRouterInstance) => {
  routerInstance = router;
  (window as any).router = router;
};

export const getRouterInstance = () => routerInstance;