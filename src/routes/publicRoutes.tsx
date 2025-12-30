import { lazy } from "react";
import { Route } from "wouter";
import { PublicRoute } from "@/utils";

const Login = lazy(() => import("../features/auth/Login.tsx"));

export const publicRoutes = (
  <>
    <Route path="/">
      <PublicRoute>
        <Login />
      </PublicRoute>
    </Route>
    <Route path="/login">
      <PublicRoute>
        <Login />
      </PublicRoute>
    </Route>
  </>
);