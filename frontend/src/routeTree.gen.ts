/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as MeImagesImport } from './routes/me/images'
import { Route as authSignupImport } from './routes/(auth)/signup'
import { Route as authLoginImport } from './routes/(auth)/login'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MeImagesRoute = MeImagesImport.update({
  path: '/me/images',
  getParentRoute: () => rootRoute,
} as any)

const authSignupRoute = authSignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupImport
      parentRoute: typeof rootRoute
    }
    '/me/images': {
      id: '/me/images'
      path: '/me/images'
      fullPath: '/me/images'
      preLoaderRoute: typeof MeImagesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/me/images': typeof MeImagesRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/me/images': typeof MeImagesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/me/images': typeof MeImagesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/login' | '/signup' | '/me/images'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/signup' | '/me/images'
  id: '__root__' | '/' | '/login' | '/signup' | '/me/images'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  authLoginRoute: typeof authLoginRoute
  authSignupRoute: typeof authSignupRoute
  MeImagesRoute: typeof MeImagesRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  authLoginRoute: authLoginRoute,
  authSignupRoute: authSignupRoute,
  MeImagesRoute: MeImagesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/signup",
        "/me/images"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/signup": {
      "filePath": "(auth)/signup.tsx"
    },
    "/me/images": {
      "filePath": "me/images.tsx"
    }
  }
}
ROUTE_MANIFEST_END */