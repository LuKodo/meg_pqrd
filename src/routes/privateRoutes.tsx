import { Layout } from "@/features/shared/Layout/index";
import { PrivateRoute } from "@/utils/privateRoute.tsx";
import { lazy } from "react";
import { Route } from "wouter";

const Home = lazy(() => import("../features/home/index.tsx"));
const GestorPQRD = lazy(() => import("../features/pqrd/index.tsx"));
const GestorPQRDDetail = lazy(() => import("../features/pqrd/details.tsx"));
const ManagePQRD = lazy(() => import("../features/manage_pqrs/ManagePage.tsx"));
const Historic = lazy(() => import("../features/request/Historic.tsx"));
const Details = lazy(() => import("../features/request/Details.tsx"));
const CreateRequestPQRS = lazy(() => import("../features/request/Single.tsx"));
const CreateRequestMasivePQRS = lazy(() => import("../features/request/Masive.tsx"));

export const privateRoutes = (
    <>
        <Route path="/home">
            <PrivateRoute>
                <Layout>
                    <Home />
                </Layout>
            </PrivateRoute>
        </Route>
        <Route path="/home/gestor">
            <PrivateRoute>
                <Layout>
                    <GestorPQRD />
                </Layout>
            </PrivateRoute>
        </Route>

        <Route path="/home/gestor/:pqrd_id">
            <PrivateRoute>
                <Layout>
                    <GestorPQRDDetail />
                </Layout>
            </PrivateRoute>
        </Route>
        <Route path="/request/historic">
            <PrivateRoute>
                <Layout>
                    <Historic />
                </Layout>
            </PrivateRoute>
        </Route>
        <Route path="/request/manage/:requestId">
            <PrivateRoute>
                <Layout>
                    <Details />
                </Layout>
            </PrivateRoute>
        </Route>
        <Route path="/request/contingency/single">
            <PrivateRoute>
                <Layout>
                    <CreateRequestPQRS />
                </Layout>
            </PrivateRoute>
        </Route>
        <Route path="/request/contingency/masive">
            <PrivateRoute>
                <Layout>
                    <CreateRequestMasivePQRS />
                </Layout>
            </PrivateRoute>
        </Route>
        
        <Route path="/manage/pqrs">
            <PrivateRoute>
                <Layout>
                    <ManagePQRD />
                </Layout>
            </PrivateRoute>
        </Route>
    </>
);