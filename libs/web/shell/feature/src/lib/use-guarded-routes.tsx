import { UiLayout } from '@pubkey-collections/web/ui/layout'
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom'

export function useGuardedRoutes({
  layout,
  index,
  root,
}: {
  index: string
  layout: RouteObject[]
  root: RouteObject[]
}) {
  return useRoutes([
    { index: true, element: <Navigate to={index} replace /> },
    {
      // This adds the main layout to the routes
      element: (
        <UiLayout>
          <Outlet />
        </UiLayout>
      ),
      children: [...layout],
    },
    ...root,
  ])
}
