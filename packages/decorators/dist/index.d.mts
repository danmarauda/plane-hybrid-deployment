import { RequestHandler, Router } from "express";

//#region src/controller.d.ts
type HttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "ws";
type ControllerInstance = {
  [key: string]: any;
};
type ControllerConstructor = {
  new (...args: any[]): ControllerInstance;
  prototype: ControllerInstance;
};
declare function registerController(router: Router, Controller: ControllerConstructor, dependencies?: unknown[]): void;
//#endregion
//#region src/rest.d.ts
/**
 * Controller decorator
 * @param baseRoute
 * @returns
 */
declare function Controller(baseRoute?: string): ClassDecorator;
declare const Get: (route: string) => MethodDecorator;
declare const Post: (route: string) => MethodDecorator;
declare const Put: (route: string) => MethodDecorator;
declare const Patch: (route: string) => MethodDecorator;
declare const Delete: (route: string) => MethodDecorator;
/**
 * Middleware decorator
 * @param middleware
 * @returns
 */
declare function Middleware(middleware: RequestHandler): MethodDecorator;
//#endregion
//#region src/websocket.d.ts
/**
 * WebSocket method decorator
 * @param route
 * @returns
 */
declare function WebSocket(route: string): MethodDecorator;
//#endregion
export { Controller, ControllerConstructor, Delete, Get, HttpMethod, Middleware, Patch, Post, Put, WebSocket, registerController };
//# sourceMappingURL=index.d.mts.map