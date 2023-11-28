import { lazy, Suspense } from "react";
import { type RouteObject } from "react-router-dom";

const Index = lazy(() => import("@/pages/index"));
const MouseFollower = lazy(() => import("@/pages/mouse-follower"));
const PoemMaker = lazy(() => import("@/pages/poem-maker"));
const Notfound = lazy(() => import("@/pages/404"));

export const routes: Array<RouteObject> = [
  {
    index: true,
    element: (
      <Suspense>
        <Index />
      </Suspense>
    ),
  },
  {
    path: "/mouse-follower",
    element: (
      <Suspense>
        <MouseFollower />
      </Suspense>
    ),
  },
  {
    path: "/poem-maker",
    element: (
      <Suspense>
        <PoemMaker />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense>
        <Notfound />
      </Suspense>
    ),
  },
];

export default routes;
