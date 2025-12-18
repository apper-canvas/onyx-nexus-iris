import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/organisms/Layout";

const Dashboard = lazy(() => import("@/components/pages/Dashboard"));
const Contacts = lazy(() => import("@/components/pages/Contacts"));
const Companies = lazy(() => import("@/components/pages/Companies"));
const Deals = lazy(() => import("@/components/pages/Deals"));
const Reports = lazy(() => import("@/components/pages/Reports"));
const Settings = lazy(() => import("@/components/pages/Settings"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center space-y-4">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

const mainRoutes = [
  {
    index: true,
    path: "",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: "contacts",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Contacts />
      </Suspense>
    )
  },
  {
    path: "companies",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Companies />
      </Suspense>
    )
  },
  {
    path: "deals",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Deals />
      </Suspense>
    )
  },
  {
    path: "reports",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Reports />
      </Suspense>
    )
  },
  {
    path: "settings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Settings />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    )
  }
];

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: mainRoutes
  }
];

export const router = createBrowserRouter(routes);