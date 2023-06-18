import { SiteUiLayout } from '@pubkey-collections/site/ui/layout'
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom'

export function useSiteRoutes({ layout, index, root }: { index: string; layout: RouteObject[]; root: RouteObject[] }) {
  return useRoutes([
    { index: true, element: <Navigate to={index} replace /> },
    {
      element: (
        <SiteUiLayout>
          <Outlet />
        </SiteUiLayout>
      ),
      children: [...layout],
    },
    ...root,
  ])
}
