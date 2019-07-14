export const availablePlugins: any;
export const availablePresets: any;
export const buildExternalHelpers: any;
export function disableScriptTags(): void;
export function registerPlugin(name: any, plugin: any): void;
export function registerPlugins(newPlugins: any): void;
export function registerPreset(name: any, preset: any): void;
export function registerPresets(newPresets: any): void;
export function transform(code: any, options: any): any;
export function transformFromAst(ast: any, code: any, options: any): any;
export function transformScriptTags(scriptTags: any): void;
export const version: any;