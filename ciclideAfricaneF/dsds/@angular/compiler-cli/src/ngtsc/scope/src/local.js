/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/scope/src/local", ["require", "exports", "tslib", "@angular/compiler", "typescript", "@angular/compiler-cli/src/ngtsc/diagnostics", "@angular/compiler-cli/src/ngtsc/util/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalModuleScopeRegistry = void 0;
    var tslib_1 = require("tslib");
    var compiler_1 = require("@angular/compiler");
    var ts = require("typescript");
    var diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
    var typescript_1 = require("@angular/compiler-cli/src/ngtsc/util/src/typescript");
    /**
     * A registry which collects information about NgModules, Directives, Components, and Pipes which
     * are local (declared in the ts.Program being compiled), and can produce `LocalModuleScope`s
     * which summarize the compilation scope of a component.
     *
     * This class implements the logic of NgModule declarations, imports, and exports and can produce,
     * for a given component, the set of directives and pipes which are "visible" in that component's
     * template.
     *
     * The `LocalModuleScopeRegistry` has two "modes" of operation. During analysis, data for each
     * individual NgModule, Directive, Component, and Pipe is added to the registry. No attempt is made
     * to traverse or validate the NgModule graph (imports, exports, etc). After analysis, one of
     * `getScopeOfModule` or `getScopeForComponent` can be called, which traverses the NgModule graph
     * and applies the NgModule logic to generate a `LocalModuleScope`, the full scope for the given
     * module or component.
     *
     * The `LocalModuleScopeRegistry` is also capable of producing `ts.Diagnostic` errors when Angular
     * semantics are violated.
     */
    var LocalModuleScopeRegistry = /** @class */ (function () {
        function LocalModuleScopeRegistry(localReader, dependencyScopeReader, refEmitter, aliasingHost) {
            this.localReader = localReader;
            this.dependencyScopeReader = dependencyScopeReader;
            this.refEmitter = refEmitter;
            this.aliasingHost = aliasingHost;
            /**
             * Tracks whether the registry has been asked to produce scopes for a module or component. Once
             * this is true, the registry cannot accept registrations of new directives/pipes/modules as it
             * would invalidate the cached scope data.
             */
            this.sealed = false;
            /**
             * A map of components from the current compilation unit to the NgModule which declared them.
             *
             * As components and directives are not distinguished at the NgModule level, this map may also
             * contain directives. This doesn't cause any problems but isn't useful as there is no concept of
             * a directive's compilation scope.
             */
            this.declarationToModule = new Map();
            /**
             * This maps from the directive/pipe class to a map of data for each NgModule that declares the
             * directive/pipe. This data is needed to produce an error for the given class.
             */
            this.duplicateDeclarations = new Map();
            this.moduleToRef = new Map();
            /**
             * A cache of calculated `LocalModuleScope`s for each NgModule declared in the current program.
          
             */
            this.cache = new Map();
            /**
             * Tracks the `RemoteScope` for components requiring "remote scoping".
             *
             * Remote scoping is when the set of directives which apply to a given component is set in the
             * NgModule's file instead of directly on the component def (which is sometimes needed to get
             * around cyclic import issues). This is not used in calculation of `LocalModuleScope`s, but is
             * tracked here for convenience.
             */
            this.remoteScoping = new Map();
            /**
             * Tracks errors accumulated in the processing of scopes for each module declaration.
             */
            this.scopeErrors = new Map();
            /**
             * Tracks which NgModules have directives/pipes that are declared in more than one module.
             */
            this.modulesWithStructuralErrors = new Set();
        }
        /**
         * Add an NgModule's data to the registry.
         */
        LocalModuleScopeRegistry.prototype.registerNgModuleMetadata = function (data) {
            var e_1, _a;
            this.assertCollecting();
            var ngModule = data.ref.node;
            this.moduleToRef.set(data.ref.node, data.ref);
            try {
                // Iterate over the module's declarations, and add them to declarationToModule. If duplicates
                // are found, they're instead tracked in duplicateDeclarations.
                for (var _b = tslib_1.__values(data.declarations), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var decl = _c.value;
                    this.registerDeclarationOfModule(ngModule, decl, data.rawDeclarations);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        LocalModuleScopeRegistry.prototype.registerDirectiveMetadata = function (directive) { };
        LocalModuleScopeRegistry.prototype.registerPipeMetadata = function (pipe) { };
        LocalModuleScopeRegistry.prototype.getScopeForComponent = function (clazz) {
            var scope = !this.declarationToModule.has(clazz) ?
                null :
                this.getScopeOfModule(this.declarationToModule.get(clazz).ngModule);
            return scope;
        };
        /**
         * If `node` is declared in more than one NgModule (duplicate declaration), then get the
         * `DeclarationData` for each offending declaration.
         *
         * Ordinarily a class is only declared in one NgModule, in which case this function returns
         * `null`.
         */
        LocalModuleScopeRegistry.prototype.getDuplicateDeclarations = function (node) {
            if (!this.duplicateDeclarations.has(node)) {
                return null;
            }
            return Array.from(this.duplicateDeclarations.get(node).values());
        };
        /**
         * Collects registered data for a module and its directives/pipes and convert it into a full
         * `LocalModuleScope`.
         *
         * This method implements the logic of NgModule imports and exports. It returns the
         * `LocalModuleScope` for the given NgModule if one can be produced, `null` if no scope was ever
         * defined, or the string `'error'` if the scope contained errors.
         */
        LocalModuleScopeRegistry.prototype.getScopeOfModule = function (clazz) {
            return this.moduleToRef.has(clazz) ?
                this.getScopeOfModuleReference(this.moduleToRef.get(clazz)) :
                null;
        };
        /**
         * Retrieves any `ts.Diagnostic`s produced during the calculation of the `LocalModuleScope` for
         * the given NgModule, or `null` if no errors were present.
         */
        LocalModuleScopeRegistry.prototype.getDiagnosticsOfModule = function (clazz) {
            // Required to ensure the errors are populated for the given class. If it has been processed
            // before, this will be a no-op due to the scope cache.
            this.getScopeOfModule(clazz);
            if (this.scopeErrors.has(clazz)) {
                return this.scopeErrors.get(clazz);
            }
            else {
                return null;
            }
        };
        /**
         * Returns a collection of the compilation scope for each registered declaration.
         */
        LocalModuleScopeRegistry.prototype.getCompilationScopes = function () {
            var _this = this;
            var scopes = [];
            this.declarationToModule.forEach(function (declData, declaration) {
                var scope = _this.getScopeOfModule(declData.ngModule);
                if (scope !== null) {
                    scopes.push(tslib_1.__assign({ declaration: declaration, ngModule: declData.ngModule }, scope.compilation));
                }
            });
            return scopes;
        };
        LocalModuleScopeRegistry.prototype.registerDeclarationOfModule = function (ngModule, decl, rawDeclarations) {
            var declData = {
                ngModule: ngModule,
                ref: decl,
                rawDeclarations: rawDeclarations,
            };
            // First, check for duplicate declarations of the same directive/pipe.
            if (this.duplicateDeclarations.has(decl.node)) {
                // This directive/pipe has already been identified as being duplicated. Add this module to the
                // map of modules for which a duplicate declaration exists.
                this.duplicateDeclarations.get(decl.node).set(ngModule, declData);
            }
            else if (this.declarationToModule.has(decl.node) &&
                this.declarationToModule.get(decl.node).ngModule !== ngModule) {
                // This directive/pipe is already registered as declared in another module. Mark it as a
                // duplicate instead.
                var duplicateDeclMap = new Map();
                var firstDeclData = this.declarationToModule.get(decl.node);
                // Mark both modules as having duplicate declarations.
                this.modulesWithStructuralErrors.add(firstDeclData.ngModule);
                this.modulesWithStructuralErrors.add(ngModule);
                // Being detected as a duplicate means there are two NgModules (for now) which declare this
                // directive/pipe. Add both of them to the duplicate tracking map.
                duplicateDeclMap.set(firstDeclData.ngModule, firstDeclData);
                duplicateDeclMap.set(ngModule, declData);
                this.duplicateDeclarations.set(decl.node, duplicateDeclMap);
                // Remove the directive/pipe from `declarationToModule` as it's a duplicate declaration, and
                // therefore not valid.
                this.declarationToModule.delete(decl.node);
            }
            else {
                // This is the first declaration of this directive/pipe, so map it.
                this.declarationToModule.set(decl.node, declData);
            }
        };
        /**
         * Implementation of `getScopeOfModule` which accepts a reference to a class.
         */
        LocalModuleScopeRegistry.prototype.getScopeOfModuleReference = function (ref) {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e, e_7, _f, e_8, _g, e_9, _h, e_10, _j;
            if (this.cache.has(ref.node)) {
                return this.cache.get(ref.node);
            }
            // Seal the registry to protect the integrity of the `LocalModuleScope` cache.
            this.sealed = true;
            // `ref` should be an NgModule previously added to the registry. If not, a scope for it
            // cannot be produced.
            var ngModule = this.localReader.getNgModuleMetadata(ref);
            if (ngModule === null) {
                this.cache.set(ref.node, null);
                return null;
            }
            // Modules which contributed to the compilation scope of this module.
            var compilationModules = new Set([ngModule.ref.node]);
            // Modules which contributed to the export scope of this module.
            var exportedModules = new Set([ngModule.ref.node]);
            // Errors produced during computation of the scope are recorded here. At the end, if this array
            // isn't empty then `undefined` will be cached and returned to indicate this scope is invalid.
            var diagnostics = [];
            // At this point, the goal is to produce two distinct transitive sets:
            // - the directives and pipes which are visible to components declared in the NgModule.
            // - the directives and pipes which are exported to any NgModules which import this one.
            // Directives and pipes in the compilation scope.
            var compilationDirectives = new Map();
            var compilationPipes = new Map();
            var declared = new Set();
            // Directives and pipes exported to any importing NgModules.
            var exportDirectives = new Map();
            var exportPipes = new Map();
            // The algorithm is as follows:
            // 1) Add all of the directives/pipes from each NgModule imported into the current one to the
            //    compilation scope.
            // 2) Add directives/pipes declared in the NgModule to the compilation scope. At this point, the
            //    compilation scope is complete.
            // 3) For each entry in the NgModule's exports:
            //    a) Attempt to resolve it as an NgModule with its own exported directives/pipes. If it is
            //       one, add them to the export scope of this NgModule.
            //    b) Otherwise, it should be a class in the compilation scope of this NgModule. If it is,
            //       add it to the export scope.
            //    c) If it's neither an NgModule nor a directive/pipe in the compilation scope, then this
            //       is an error.
            //
            var isPoisoned = false;
            if (this.modulesWithStructuralErrors.has(ngModule.ref.node)) {
                // If the module contains declarations that are duplicates, then it's considered poisoned.
                isPoisoned = true;
            }
            try {
                // 1) process imports.
                for (var _k = tslib_1.__values(ngModule.imports), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var decl = _l.value;
                    var importScope = this.getExportedScope(decl, diagnostics, ref.node, 'import');
                    if (importScope === null) {
                        // An import wasn't an NgModule, so record an error.
                        diagnostics.push(invalidRef(ref.node, decl, 'import'));
                        isPoisoned = true;
                        continue;
                    }
                    else if (importScope === 'invalid' || importScope.exported.isPoisoned) {
                        // An import was an NgModule but contained errors of its own. Record this as an error too,
                        // because this scope is always going to be incorrect if one of its imports could not be
                        // read.
                        diagnostics.push(invalidTransitiveNgModuleRef(ref.node, decl, 'import'));
                        isPoisoned = true;
                        if (importScope === 'invalid') {
                            continue;
                        }
                    }
                    try {
                        for (var _m = (e_3 = void 0, tslib_1.__values(importScope.exported.directives)), _o = _m.next(); !_o.done; _o = _m.next()) {
                            var directive = _o.value;
                            compilationDirectives.set(directive.ref.node, directive);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_o && !_o.done && (_b = _m.return)) _b.call(_m);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    try {
                        for (var _p = (e_4 = void 0, tslib_1.__values(importScope.exported.pipes)), _q = _p.next(); !_q.done; _q = _p.next()) {
                            var pipe = _q.value;
                            compilationPipes.set(pipe.ref.node, pipe);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_q && !_q.done && (_c = _p.return)) _c.call(_p);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    try {
                        for (var _r = (e_5 = void 0, tslib_1.__values(importScope.exported.ngModules)), _s = _r.next(); !_s.done; _s = _r.next()) {
                            var importedModule = _s.value;
                            compilationModules.add(importedModule);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_s && !_s.done && (_d = _r.return)) _d.call(_r);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_a = _k.return)) _a.call(_k);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                // 2) add declarations.
                for (var _t = tslib_1.__values(ngModule.declarations), _u = _t.next(); !_u.done; _u = _t.next()) {
                    var decl = _u.value;
                    var directive = this.localReader.getDirectiveMetadata(decl);
                    var pipe = this.localReader.getPipeMetadata(decl);
                    if (directive !== null) {
                        compilationDirectives.set(decl.node, tslib_1.__assign(tslib_1.__assign({}, directive), { ref: decl }));
                        if (directive.isPoisoned) {
                            isPoisoned = true;
                        }
                    }
                    else if (pipe !== null) {
                        compilationPipes.set(decl.node, tslib_1.__assign(tslib_1.__assign({}, pipe), { ref: decl }));
                    }
                    else {
                        var errorNode = decl.getOriginForDiagnostics(ngModule.rawDeclarations);
                        diagnostics.push(diagnostics_1.makeDiagnostic(diagnostics_1.ErrorCode.NGMODULE_INVALID_DECLARATION, errorNode, "The class '" + decl.node.name.text + "' is listed in the declarations " +
                            ("of the NgModule '" + ngModule.ref.node.name
                                .text + "', but is not a directive, a component, or a pipe. ") +
                            "Either remove it from the NgModule's declarations, or add an appropriate Angular decorator.", [diagnostics_1.makeRelatedInformation(decl.node.name, "'" + decl.node.name.text + "' is declared here.")]));
                        isPoisoned = true;
                        continue;
                    }
                    declared.add(decl.node);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_u && !_u.done && (_e = _t.return)) _e.call(_t);
                }
                finally { if (e_6) throw e_6.error; }
            }
            try {
                // 3) process exports.
                // Exports can contain modules, components, or directives. They're processed differently.
                // Modules are straightforward. Directives and pipes from exported modules are added to the
                // export maps. Directives/pipes are different - they might be exports of declared types or
                // imported types.
                for (var _v = tslib_1.__values(ngModule.exports), _w = _v.next(); !_w.done; _w = _v.next()) {
                    var decl = _w.value;
                    // Attempt to resolve decl as an NgModule.
                    var exportScope = this.getExportedScope(decl, diagnostics, ref.node, 'export');
                    if (exportScope === 'invalid' || (exportScope !== null && exportScope.exported.isPoisoned)) {
                        // An export was an NgModule but contained errors of its own. Record this as an error too,
                        // because this scope is always going to be incorrect if one of its exports could not be
                        // read.
                        diagnostics.push(invalidTransitiveNgModuleRef(ref.node, decl, 'export'));
                        isPoisoned = true;
                        if (exportScope === 'invalid') {
                            continue;
                        }
                    }
                    else if (exportScope !== null) {
                        try {
                            // decl is an NgModule.
                            for (var _x = (e_8 = void 0, tslib_1.__values(exportScope.exported.directives)), _y = _x.next(); !_y.done; _y = _x.next()) {
                                var directive = _y.value;
                                exportDirectives.set(directive.ref.node, directive);
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_y && !_y.done && (_g = _x.return)) _g.call(_x);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                        try {
                            for (var _z = (e_9 = void 0, tslib_1.__values(exportScope.exported.pipes)), _0 = _z.next(); !_0.done; _0 = _z.next()) {
                                var pipe = _0.value;
                                exportPipes.set(pipe.ref.node, pipe);
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (_0 && !_0.done && (_h = _z.return)) _h.call(_z);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                        try {
                            for (var _1 = (e_10 = void 0, tslib_1.__values(exportScope.exported.ngModules)), _2 = _1.next(); !_2.done; _2 = _1.next()) {
                                var exportedModule = _2.value;
                                exportedModules.add(exportedModule);
                            }
                        }
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (_2 && !_2.done && (_j = _1.return)) _j.call(_1);
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                    else if (compilationDirectives.has(decl.node)) {
                        // decl is a directive or component in the compilation scope of this NgModule.
                        var directive = compilationDirectives.get(decl.node);
                        exportDirectives.set(decl.node, directive);
                    }
                    else if (compilationPipes.has(decl.node)) {
                        // decl is a pipe in the compilation scope of this NgModule.
                        var pipe = compilationPipes.get(decl.node);
                        exportPipes.set(decl.node, pipe);
                    }
                    else {
                        // decl is an unknown export.
                        if (this.localReader.getDirectiveMetadata(decl) !== null ||
                            this.localReader.getPipeMetadata(decl) !== null) {
                            diagnostics.push(invalidReexport(ref.node, decl));
                        }
                        else {
                            diagnostics.push(invalidRef(ref.node, decl, 'export'));
                        }
                        isPoisoned = true;
                        continue;
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_w && !_w.done && (_f = _v.return)) _f.call(_v);
                }
                finally { if (e_7) throw e_7.error; }
            }
            var exported = {
                directives: Array.from(exportDirectives.values()),
                pipes: Array.from(exportPipes.values()),
                ngModules: Array.from(exportedModules),
                isPoisoned: isPoisoned,
            };
            var reexports = this.getReexports(ngModule, ref, declared, exported, diagnostics);
            // Finally, produce the `LocalModuleScope` with both the compilation and export scopes.
            var scope = {
                ngModule: ngModule.ref.node,
                compilation: {
                    directives: Array.from(compilationDirectives.values()),
                    pipes: Array.from(compilationPipes.values()),
                    ngModules: Array.from(compilationModules),
                    isPoisoned: isPoisoned,
                },
                exported: exported,
                reexports: reexports,
                schemas: ngModule.schemas,
            };
            // Check if this scope had any errors during production.
            if (diagnostics.length > 0) {
                // Save the errors for retrieval.
                this.scopeErrors.set(ref.node, diagnostics);
                // Mark this module as being tainted.
                this.modulesWithStructuralErrors.add(ref.node);
            }
            this.cache.set(ref.node, scope);
            return scope;
        };
        /**
         * Check whether a component requires remote scoping.
         */
        LocalModuleScopeRegistry.prototype.getRemoteScope = function (node) {
            return this.remoteScoping.has(node) ? this.remoteScoping.get(node) : null;
        };
        /**
         * Set a component as requiring remote scoping, with the given directives and pipes to be
         * registered remotely.
         */
        LocalModuleScopeRegistry.prototype.setComponentRemoteScope = function (node, directives, pipes) {
            this.remoteScoping.set(node, { directives: directives, pipes: pipes });
        };
        /**
         * Look up the `ExportScope` of a given `Reference` to an NgModule.
         *
         * The NgModule in question may be declared locally in the current ts.Program, or it may be
         * declared in a .d.ts file.
         *
         * @returns `null` if no scope could be found, or `'invalid'` if the `Reference` is not a valid
         *     NgModule.
         *
         * May also contribute diagnostics of its own by adding to the given `diagnostics`
         * array parameter.
         */
        LocalModuleScopeRegistry.prototype.getExportedScope = function (ref, diagnostics, ownerForErrors, type) {
            if (ref.node.getSourceFile().isDeclarationFile) {
                // The NgModule is declared in a .d.ts file. Resolve it with the `DependencyScopeReader`.
                if (!ts.isClassDeclaration(ref.node)) {
                    // The NgModule is in a .d.ts file but is not declared as a ts.ClassDeclaration. This is an
                    // error in the .d.ts metadata.
                    var code = type === 'import' ? diagnostics_1.ErrorCode.NGMODULE_INVALID_IMPORT :
                        diagnostics_1.ErrorCode.NGMODULE_INVALID_EXPORT;
                    diagnostics.push(diagnostics_1.makeDiagnostic(code, typescript_1.identifierOfNode(ref.node) || ref.node, "Appears in the NgModule." + type + "s of " + typescript_1.nodeNameForError(ownerForErrors) + ", but could not be resolved to an NgModule"));
                    return 'invalid';
                }
                return this.dependencyScopeReader.resolve(ref);
            }
            else {
                // The NgModule is declared locally in the current program. Resolve it from the registry.
                return this.getScopeOfModuleReference(ref);
            }
        };
        LocalModuleScopeRegistry.prototype.getReexports = function (ngModule, ref, declared, exported, diagnostics) {
            var e_11, _a, e_12, _b;
            var _this = this;
            var reexports = null;
            var sourceFile = ref.node.getSourceFile();
            if (this.aliasingHost === null) {
                return null;
            }
            reexports = [];
            // Track re-exports by symbol name, to produce diagnostics if two alias re-exports would share
            // the same name.
            var reexportMap = new Map();
            // Alias ngModuleRef added for readability below.
            var ngModuleRef = ref;
            var addReexport = function (exportRef) {
                if (exportRef.node.getSourceFile() === sourceFile) {
                    return;
                }
                var isReExport = !declared.has(exportRef.node);
                var exportName = _this.aliasingHost.maybeAliasSymbolAs(exportRef, sourceFile, ngModule.ref.node.name.text, isReExport);
                if (exportName === null) {
                    return;
                }
                if (!reexportMap.has(exportName)) {
                    if (exportRef.alias && exportRef.alias instanceof compiler_1.ExternalExpr) {
                        reexports.push({
                            fromModule: exportRef.alias.value.moduleName,
                            symbolName: exportRef.alias.value.name,
                            asAlias: exportName,
                        });
                    }
                    else {
                        var expr = _this.refEmitter.emit(exportRef.cloneWithNoIdentifiers(), sourceFile);
                        if (!(expr instanceof compiler_1.ExternalExpr) || expr.value.moduleName === null ||
                            expr.value.name === null) {
                            throw new Error('Expected ExternalExpr');
                        }
                        reexports.push({
                            fromModule: expr.value.moduleName,
                            symbolName: expr.value.name,
                            asAlias: exportName,
                        });
                    }
                    reexportMap.set(exportName, exportRef);
                }
                else {
                    // Another re-export already used this name. Produce a diagnostic.
                    var prevRef = reexportMap.get(exportName);
                    diagnostics.push(reexportCollision(ngModuleRef.node, prevRef, exportRef));
                }
            };
            try {
                for (var _c = tslib_1.__values(exported.directives), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var ref_1 = _d.value.ref;
                    addReexport(ref_1);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_11) throw e_11.error; }
            }
            try {
                for (var _e = tslib_1.__values(exported.pipes), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var ref_2 = _f.value.ref;
                    addReexport(ref_2);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_12) throw e_12.error; }
            }
            return reexports;
        };
        LocalModuleScopeRegistry.prototype.assertCollecting = function () {
            if (this.sealed) {
                throw new Error("Assertion: LocalModuleScopeRegistry is not COLLECTING");
            }
        };
        return LocalModuleScopeRegistry;
    }());
    exports.LocalModuleScopeRegistry = LocalModuleScopeRegistry;
    /**
     * Produce a `ts.Diagnostic` for an invalid import or export from an NgModule.
     */
    function invalidRef(clazz, decl, type) {
        var code = type === 'import' ? diagnostics_1.ErrorCode.NGMODULE_INVALID_IMPORT : diagnostics_1.ErrorCode.NGMODULE_INVALID_EXPORT;
        var resolveTarget = type === 'import' ? 'NgModule' : 'NgModule, Component, Directive, or Pipe';
        var message = "Appears in the NgModule." + type + "s of " + typescript_1.nodeNameForError(clazz) + ", but could not be resolved to an " + resolveTarget + " class." +
            '\n\n';
        var library = decl.ownedByModuleGuess !== null ? " (" + decl.ownedByModuleGuess + ")" : '';
        var sf = decl.node.getSourceFile();
        // Provide extra context to the error for the user.
        if (!sf.isDeclarationFile) {
            // This is a file in the user's program.
            var annotationType = type === 'import' ? '@NgModule' : 'Angular';
            message += "Is it missing an " + annotationType + " annotation?";
        }
        else if (sf.fileName.indexOf('node_modules') !== -1) {
            // This file comes from a third-party library in node_modules.
            message +=
                "This likely means that the library" + library + " which declares " + decl.debugName + " has not " +
                    'been processed correctly by ngcc, or is not compatible with Angular Ivy. Check if a ' +
                    'newer version of the library is available, and update if so. Also consider checking ' +
                    'with the library\'s authors to see if the library is expected to be compatible with Ivy.';
        }
        else {
            // This is a monorepo style local dependency. Unfortunately these are too different to really
            // offer much more advice than this.
            message += "This likely means that the dependency" + library + " which declares " + decl.debugName + " has not been processed correctly by ngcc.";
        }
        return diagnostics_1.makeDiagnostic(code, typescript_1.identifierOfNode(decl.node) || decl.node, message);
    }
    /**
     * Produce a `ts.Diagnostic` for an import or export which itself has errors.
     */
    function invalidTransitiveNgModuleRef(clazz, decl, type) {
        var code = type === 'import' ? diagnostics_1.ErrorCode.NGMODULE_INVALID_IMPORT : diagnostics_1.ErrorCode.NGMODULE_INVALID_EXPORT;
        return diagnostics_1.makeDiagnostic(code, typescript_1.identifierOfNode(decl.node) || decl.node, "Appears in the NgModule." + type + "s of " + typescript_1.nodeNameForError(clazz) + ", but itself has errors");
    }
    /**
     * Produce a `ts.Diagnostic` for an exported directive or pipe which was not declared or imported
     * by the NgModule in question.
     */
    function invalidReexport(clazz, decl) {
        return diagnostics_1.makeDiagnostic(diagnostics_1.ErrorCode.NGMODULE_INVALID_REEXPORT, typescript_1.identifierOfNode(decl.node) || decl.node, "Present in the NgModule.exports of " + typescript_1.nodeNameForError(clazz) + " but neither declared nor imported");
    }
    /**
     * Produce a `ts.Diagnostic` for a collision in re-export names between two directives/pipes.
     */
    function reexportCollision(module, refA, refB) {
        var childMessageText = "This directive/pipe is part of the exports of '" + module.name.text + "' and shares the same name as another exported directive/pipe.";
        return diagnostics_1.makeDiagnostic(diagnostics_1.ErrorCode.NGMODULE_REEXPORT_NAME_COLLISION, module.name, ("\n    There was a name collision between two classes named '" + refA.node.name.text + "', which are both part of the exports of '" + module.name.text + "'.\n\n    Angular generates re-exports of an NgModule's exported directives/pipes from the module's source file in certain cases, using the declared name of the class. If two classes of the same name are exported, this automatic naming does not work.\n\n    To fix this problem please re-export one or both classes directly from this file.\n  ").trim(), [
            diagnostics_1.makeRelatedInformation(refA.node.name, childMessageText),
            diagnostics_1.makeRelatedInformation(refB.node.name, childMessageText),
        ]);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25ndHNjL3Njb3BlL3NyYy9sb2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7O0lBRUgsOENBQStEO0lBQy9ELCtCQUFpQztJQUVqQywyRUFBb0Y7SUFJcEYsa0ZBQTZFO0lBNkI3RTs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0g7UUFvREUsa0NBQ1ksV0FBMkIsRUFBVSxxQkFBNkMsRUFDbEYsVUFBNEIsRUFBVSxZQUErQjtZQURyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7WUFBVSwwQkFBcUIsR0FBckIscUJBQXFCLENBQXdCO1lBQ2xGLGVBQVUsR0FBVixVQUFVLENBQWtCO1lBQVUsaUJBQVksR0FBWixZQUFZLENBQW1CO1lBckRqRjs7OztlQUlHO1lBQ0ssV0FBTSxHQUFHLEtBQUssQ0FBQztZQUV2Qjs7Ozs7O2VBTUc7WUFDSyx3QkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFBcUMsQ0FBQztZQUUzRTs7O2VBR0c7WUFDSywwQkFBcUIsR0FDekIsSUFBSSxHQUFHLEVBQTRELENBQUM7WUFFaEUsZ0JBQVcsR0FBRyxJQUFJLEdBQUcsRUFBaUQsQ0FBQztZQUUvRTs7O2VBR0c7WUFDSyxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQTJDLENBQUM7WUFFbkU7Ozs7Ozs7ZUFPRztZQUNLLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWlDLENBQUM7WUFFakU7O2VBRUc7WUFDSyxnQkFBVyxHQUFHLElBQUksR0FBRyxFQUFxQyxDQUFDO1lBRW5FOztlQUVHO1lBQ0ssZ0NBQTJCLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFJa0IsQ0FBQztRQUVyRjs7V0FFRztRQUNILDJEQUF3QixHQUF4QixVQUF5QixJQUFrQjs7WUFDekMsSUFBSSxDQUFDLGdC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dkUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FDdEIsTUFBd0IsRUFBRSxJQUFpQyxFQUMzRCxJQUFpQztRQUNuQyxJQUFNLGdCQUFnQixHQUFHLG9EQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUVBQWdFLENBQUM7UUFDckYsT0FBTyw0QkFBYyxDQUNqQix1QkFBUyxDQUFDLGdDQUFnQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQ3ZELENBQUEsaUVBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxrREFBNkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDRWQUt2RixDQUFBLENBQUMsSUFBSSxFQUFFLEVBQ0o7WUFDRSxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztZQUN4RCxvQ0FBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQztTQUN6RCxDQUFDLENBQUM7SUFDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RXh0ZXJuYWxFeHByLCBTY2hlbWFNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7RXJyb3JDb2RlLCBtYWtlRGlhZ25vc3RpYywgbWFrZVJlbGF0ZWRJbmZvcm1hdGlvbn0gZnJvbSAnLi4vLi4vZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHtBbGlhc2luZ0hvc3QsIFJlZXhwb3J0LCBSZWZlcmVuY2UsIFJlZmVyZW5jZUVtaXR0ZXJ9IGZyb20gJy4uLy4uL2ltcG9ydHMnO1xuaW1wb3J0IHtEaXJlY3RpdmVNZXRhLCBNZXRhZGF0YVJlYWRlciwgTWV0YWRhdGFSZWdpc3RyeSwgTmdNb2R1bGVNZXRhLCBQaXBlTWV0YX0gZnJvbSAnLi4vLi4vbWV0YWRhdGEnO1xuaW1wb3J0IHtDbGFzc0RlY2xhcmF0aW9uLCBEZWNsYXJhdGlvbk5vZGV9IGZyb20gJy4uLy4uL3JlZmxlY3Rpb24nO1xuaW1wb3J0IHtpZGVudGlmaWVyT2ZOb2RlLCBub2RlTmFtZUZvckVycm9yfSBmcm9tICcuLi8uLi91dGlsL3NyYy90eXBlc2NyaXB0JztcblxuaW1wb3J0IHtFeHBvcnRTY29wZSwgUmVtb3RlU2NvcGUsIFNjb3BlRGF0YX0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHtDb21wb25lbnRTY29wZVJlYWRlcn0gZnJvbSAnLi9jb21wb25lbnRfc2NvcGUnO1xuaW1wb3J0IHtEdHNNb2R1bGVTY29wZVJlc29sdmVyfSBmcm9tICcuL2RlcGVuZGVuY3knO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsTmdNb2R1bGVEYXRhIHtcbiAgZGVjbGFyYXRpb25zOiBSZWZlcmVuY2U8Q2xhc3NEZWNsYXJhdGlvbj5bXTtcbiAgaW1wb3J0czogUmVmZXJlbmNlPENsYXNzRGVjbGFyYXRpb24+W107XG4gIGV4cG9ydHM6IFJlZmVyZW5jZTxDbGFzc0RlY2xhcmF0aW9uPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsTW9kdWxlU2NvcGUgZXh0ZW5kcyBFeHBvcnRTY29wZSB7XG4gIG5nTW9kdWxlOiBDbGFzc0RlY2xhcmF0aW9uO1xuICBjb21waWxhdGlvbjogU2NvcGVEYXRhO1xuICByZWV4cG9ydHM6IFJlZXhwb3J0W118bnVsbDtcbiAgc2NoZW1hczogU2NoZW1hTWV0YWRhdGFbXTtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgY29tcGlsYXRpb24gc2NvcGUgb2YgYSByZWdpc3RlcmVkIGRlY2xhcmF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGF0aW9uU2NvcGUgZXh0ZW5kcyBTY29wZURhdGEge1xuICAvKiogVGhlIGRlY2xhcmF0aW9uIHdob3NlIGNvbXBpbGF0aW9uIHNjb3BlIGlzIGRlc2NyaWJlZCBoZXJlLiAqL1xuICBkZWNsYXJhdGlvbjogQ2xhc3NEZWNsYXJhdGlvbjtcbiAgLyoqIFRoZSBkZWNsYXJhdGlvbiBvZiB0aGUgTmdNb2R1bGUgdGhhdCBkZWNsYXJlcyB0aGlzIGBkZWNsYXJhdGlvbmAuICovXG4gIG5nTW9kdWxlOiBDbGFzc0RlY2xhcmF0aW9uO1xufVxuXG4vKipcbiAqIEEgcmVnaXN0cnkgd2hpY2ggY29sbGVjdHMgaW5mb3JtYXRpb24gYWJvdXQgTmdNb2R1bGVzLCBEaXJlY3RpdmVzLCBDb21wb25lbnRzLCBhbmQgUGlwZXMgd2hpY2hcbiAqIGFyZSBsb2NhbCAoZGVjbGFyZWQgaW4gdGhlIHRzLlByb2dyYW0gYmVpbmcgY29tcGlsZWQpLCBhbmQgY2FuIHByb2R1Y2UgYExvY2FsTW9kdWxlU2NvcGVgc1xuICogd2hpY2ggc3VtbWFyaXplIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZiBhIGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGNsYXNzIGltcGxlbWVudHMgdGhlIGxvZ2ljIG9mIE5nTW9kdWxlIGRlY2xhcmF0aW9ucywgaW1wb3J0cywgYW5kIGV4cG9ydHMgYW5kIGNhbiBwcm9kdWNlLFxuICogZm9yIGEgZ2l2ZW4gY29tcG9uZW50LCB0aGUgc2V0IG9mIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIHdoaWNoIGFyZSBcInZpc2libGVcIiBpbiB0aGF0IGNvbXBvbmVudCdzXG4gKiB0ZW1wbGF0ZS5cbiAqXG4gKiBUaGUgYExvY2FsTW9kdWxlU2NvcGVSZWdpc3RyeWAgaGFzIHR3byBcIm1vZGVzXCIgb2Ygb3BlcmF0aW9uLiBEdXJpbmcgYW5hbHlzaXMsIGRhdGEgZm9yIGVhY2hcbiAqIGluZGl2aWR1YWwgTmdNb2R1bGUsIERpcmVjdGl2ZSwgQ29tcG9uZW50LCBhbmQgUGlwZSBpcyBhZGRlZCB0byB0aGUgcmVnaXN0cnkuIE5vIGF0dGVtcHQgaXMgbWFkZVxuICogdG8gdHJhdmVyc2Ugb3IgdmFsaWRhdGUgdGhlIE5nTW9kdWxlIGdyYXBoIChpbXBvcnRzLCBleHBvcnRzLCBldGMpLiBBZnRlciBhbmFseXNpcywgb25lIG9mXG4gKiBgZ2V0U2NvcGVPZk1vZHVsZWAgb3IgYGdldFNjb3BlRm9yQ29tcG9uZW50YCBjYW4gYmUgY2FsbGVkLCB3aGljaCB0cmF2ZXJzZXMgdGhlIE5nTW9kdWxlIGdyYXBoXG4gKiBhbmQgYXBwbGllcyB0aGUgTmdNb2R1bGUgbG9naWMgdG8gZ2VuZXJhdGUgYSBgTG9jYWxNb2R1bGVTY29wZWAsIHRoZSBmdWxsIHNjb3BlIGZvciB0aGUgZ2l2ZW5cbiAqIG1vZHVsZSBvciBjb21wb25lbnQuXG4gKlxuICogVGhlIGBMb2NhbE1vZHVsZVNjb3BlUmVnaXN0cnlgIGlzIGFsc28gY2FwYWJsZSBvZiBwcm9kdWNpbmcgYHRzLkRpYWdub3N0aWNgIGVycm9ycyB3aGVuIEFuZ3VsYXJcbiAqIHNlbWFudGljcyBhcmUgdmlvbGF0ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2NhbE1vZHVsZVNjb3BlUmVnaXN0cnkgaW1wbGVtZW50cyBNZXRhZGF0YVJlZ2lzdHJ5LCBDb21wb25lbnRTY29wZVJlYWRlciB7XG4gIC8qKlxuICAgKiBUcmFja3Mgd2hldGhlciB0aGUgcmVnaXN0cnkgaGFzIGJlZW4gYXNrZWQgdG8gcHJvZHVjZSBzY29wZXMgZm9yIGEgbW9kdWxlIG9yIGNvbXBvbmVudC4gT25jZVxuICAgKiB0aGlzIGlzIHRydWUsIHRoZSByZWdpc3RyeSBjYW5ub3QgYWNjZXB0IHJlZ2lzdHJhdGlvbnMgb2YgbmV3IGRpcmVjdGl2ZXMvcGlwZXMvbW9kdWxlcyBhcyBpdFxuICAgKiB3b3VsZCBpbnZhbGlkYXRlIHRoZSBjYWNoZWQgc2NvcGUgZGF0YS5cbiAgICovXG4gIHByaXZhdGUgc2VhbGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIGNvbXBvbmVudHMgZnJvbSB0aGUgY3VycmVudCBjb21waWxhdGlvbiB1bml0IHRvIHRoZSBOZ01vZHVsZSB3aGljaCBkZWNsYXJlZCB0aGVtLlxuICAgKlxuICAgKiBBcyBjb21wb25lbnRzIGFuZCBkaXJlY3RpdmVzIGFyZSBub3QgZGlzdGluZ3Vpc2hlZCBhdCB0aGUgTmdNb2R1bGUgbGV2ZWwsIHRoaXMgbWFwIG1heSBhbHNvXG4gICAqIGNvbnRhaW4gZGlyZWN0aXZlcy4gVGhpcyBkb2Vzbid0IGNhdXNlIGFueSBwcm9ibGVtcyBidXQgaXNuJ3QgdXNlZnVsIGFzIHRoZXJlIGlzIG5vIGNvbmNlcHQgb2ZcbiAgICogYSBkaXJlY3RpdmUncyBjb21waWxhdGlvbiBzY29wZS5cbiAgICovXG4gIHByaXZhdGUgZGVjbGFyYXRpb25Ub01vZHVsZSA9IG5ldyBNYXA8Q2xhc3NEZWNsYXJhdGlvbiwgRGVjbGFyYXRpb25EYXRhPigpO1xuXG4gIC8qKlxuICAgKiBUaGlzIG1hcHMgZnJvbSB0aGUgZGlyZWN0aXZlL3BpcGUgY2xhc3MgdG8gYSBtYXAgb2YgZGF0YSBmb3IgZWFjaCBOZ01vZHVsZSB0aGF0IGRlY2xhcmVzIHRoZVxuICAgKiBkaXJlY3RpdmUvcGlwZS4gVGhpcyBkYXRhIGlzIG5lZWRlZCB0byBwcm9kdWNlIGFuIGVycm9yIGZvciB0aGUgZ2l2ZW4gY2xhc3MuXG4gICAqL1xuICBwcml2YXRlIGR1cGxpY2F0ZURlY2xhcmF0aW9ucyA9XG4gICAgICBuZXcgTWFwPENsYXNzRGVjbGFyYXRpb24sIE1hcDxDbGFzc0RlY2xhcmF0aW9uLCBEZWNsYXJhdGlvbkRhdGE+PigpO1xuXG4gIHByaXZhdGUgbW9kdWxlVG9SZWYgPSBuZXcgTWFwPENsYXNzRGVjbGFyYXRpb24sIFJlZmVyZW5jZTxDbGFzc0RlY2xhcmF0aW9uPj4oKTtcblxuICAvKipcbiAgICogQSBjYWNoZSBvZiBjYWxjdWxhdGVkIGBMb2NhbE1vZHVsZVNjb3BlYHMgZm9yIGVhY2ggTmdNb2R1bGUgZGVjbGFyZWQgaW4gdGhlIGN1cnJlbnQgcHJvZ3JhbS5cblxuICAgKi9cbiAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8Q2xhc3NEZWNsYXJhdGlvbiwgTG9jYWxNb2R1bGVTY29wZXxudWxsPigpO1xuXG4gIC8qKlxuICAgKiBUcmFja3MgdGhlIGBSZW1vdGVTY29wZWAgZm9yIGNvbXBvbmVudHMgcmVxdWlyaW5nIFwicmVtb3RlIHNjb3BpbmdcIi5cbiAgICpcbiAgICogUmVtb3RlIHNjb3BpbmcgaXMgd2hlbiB0aGUgc2V0IG9mIGRpcmVjdGl2ZXMgd2hpY2ggYXBwbHkgdG8gYSBnaXZlbiBjb21wb25lbnQgaXMgc2V0IGluIHRoZVxuICAgKiBOZ01vZHVsZSdzIGZpbGUgaW5zdGVhZCBvZiBkaXJlY3RseSBvbiB0aGUgY29tcG9uZW50IGRlZiAod2hpY2ggaXMgc29tZXRpbWVzIG5lZWRlZCB0byBnZXRcbiAgICogYXJvdW5kIGN5Y2xpYyBpbXBvcnQgaXNzdWVzKS4gVGhpcyBpcyBub3QgdXNlZCBpbiBjYWxjdWxhdGlvbiBvZiBgTG9jYWxNb2R1bGVTY29wZWBzLCBidXQgaXNcbiAgICogdHJhY2tlZCBoZXJlIGZvciBjb252ZW5pZW5jZS5cbiAgICovXG4gIHByaXZhdGUgcmVtb3RlU2NvcGluZyA9IG5ldyBNYXA8Q2xhc3NEZWNsYXJhdGlvbiwgUmVtb3RlU2NvcGU+KCk7XG5cbiAgLyoqXG4gICAqIFRyYWNrcyBlcnJvcnMgYWNjdW11bGF0ZWQgaW4gdGhlIHByb2Nlc3Npbmcgb2Ygc2NvcGVzIGZvciBlYWNoIG1vZHVsZSBkZWNsYXJhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgc2NvcGVFcnJvcnMgPSBuZXcgTWFwPENsYXNzRGVjbGFyYXRpb24sIHRzLkRpYWdub3N0aWNbXT4oKTtcblxuICAvKipcbiAgICogVHJhY2tzIHdoaWNoIE5nTW9kdWxlcyBoYXZlIGRpcmVjdGl2ZXMvcGlwZXMgdGhhdCBhcmUgZGVjbGFyZWQgaW4gbW9yZSB0aGFuIG9uZSBtb2R1bGUuXG4gICAqL1xuICBwcml2YXRlIG1vZHVsZXNXaXRoU3RydWN0dXJhbEVycm9ycyA9IG5ldyBTZXQ8Q2xhc3NEZWNsYXJhdGlvbj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgbG9jYWxSZWFkZXI6IE1ldGFkYXRhUmVhZGVyLCBwcml2YXRlIGRlcGVuZGVuY3lTY29wZVJlYWRlcjogRHRzTW9kdWxlU2NvcGVSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgcmVmRW1pdHRlcjogUmVmZXJlbmNlRW1pdHRlciwgcHJpdmF0ZSBhbGlhc2luZ0hvc3Q6IEFsaWFzaW5nSG9zdHxudWxsKSB7fVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gTmdNb2R1bGUncyBkYXRhIHRvIHRoZSByZWdpc3RyeS5cbiAgICovXG4gIHJlZ2lzdGVyTmdNb2R1bGVNZXRhZGF0YShkYXRhOiBOZ01vZHVsZU1ldGEpOiB2b2lkIHtcbiAgICB0aGlzLmFzc2VydENvbGxlY3RpbmcoKTtcbiAgICBjb25zdCBuZ01vZHVsZSA9IGRhdGEucmVmLm5vZGU7XG4gICAgdGhpcy5tb2R1bGVUb1JlZi5zZXQoZGF0YS5yZWYubm9kZSwgZGF0YS5yZWYpO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgbW9kdWxlJ3MgZGVjbGFyYXRpb25zLCBhbmQgYWRkIHRoZW0gdG8gZGVjbGFyYXRpb25Ub01vZHVsZS4gSWYgZHVwbGljYXRlc1xuICAgIC8vIGFyZSBmb3VuZCwgdGhleSdyZSBpbnN0ZWFkIHRyYWNrZWQgaW4gZHVwbGljYXRlRGVjbGFyYXRpb25zLlxuICAgIGZvciAoY29uc3QgZGVjbCBvZiBkYXRhLmRlY2xhcmF0aW9ucykge1xuICAgICAgdGhpcy5yZWdpc3RlckRlY2xhcmF0aW9uT2ZNb2R1bGUobmdNb2R1bGUsIGRlY2wsIGRhdGEucmF3RGVjbGFyYXRpb25zKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlckRpcmVjdGl2ZU1ldGFkYXRhKGRpcmVjdGl2ZTogRGlyZWN0aXZlTWV0YSk6IHZvaWQge31cblxuICByZWdpc3RlclBpcGVNZXRhZGF0YShwaXBlOiBQaXBlTWV0YSk6IHZvaWQge31cblxuICBnZXRTY29wZUZvckNvbXBvbmVudChjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IExvY2FsTW9kdWxlU2NvcGV8bnVsbCB7XG4gICAgY29uc3Qgc2NvcGUgPSAhdGhpcy5kZWNsYXJhdGlvblRvTW9kdWxlLmhhcyhjbGF6eikgP1xuICAgICAgICBudWxsIDpcbiAgICAgICAgdGhpcy5nZXRTY29wZU9mTW9kdWxlKHRoaXMuZGVjbGFyYXRpb25Ub01vZHVsZS5nZXQoY2xhenopIS5uZ01vZHVsZSk7XG4gICAgcmV0dXJuIHNjb3BlO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGBub2RlYCBpcyBkZWNsYXJlZCBpbiBtb3JlIHRoYW4gb25lIE5nTW9kdWxlIChkdXBsaWNhdGUgZGVjbGFyYXRpb24pLCB0aGVuIGdldCB0aGVcbiAgICogYERlY2xhcmF0aW9uRGF0YWAgZm9yIGVhY2ggb2ZmZW5kaW5nIGRlY2xhcmF0aW9uLlxuICAgKlxuICAgKiBPcmRpbmFyaWx5IGEgY2xhc3MgaXMgb25seSBkZWNsYXJlZCBpbiBvbmUgTmdNb2R1bGUsIGluIHdoaWNoIGNhc2UgdGhpcyBmdW5jdGlvbiByZXR1cm5zXG4gICAqIGBudWxsYC5cbiAgICovXG4gIGdldER1cGxpY2F0ZURlY2xhcmF0aW9ucyhub2RlOiBDbGFzc0RlY2xhcmF0aW9uKTogRGVjbGFyYXRpb25EYXRhW118bnVsbCB7XG4gICAgaWYgKCF0aGlzLmR1cGxpY2F0ZURlY2xhcmF0aW9ucy5oYXMobm9kZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZHVwbGljYXRlRGVjbGFyYXRpb25zLmdldChub2RlKSEudmFsdWVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3RzIHJlZ2lzdGVyZWQgZGF0YSBmb3IgYSBtb2R1bGUgYW5kIGl0cyBkaXJlY3RpdmVzL3BpcGVzIGFuZCBjb252ZXJ0IGl0IGludG8gYSBmdWxsXG4gICAqIGBMb2NhbE1vZHVsZVNjb3BlYC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgbG9naWMgb2YgTmdNb2R1bGUgaW1wb3J0cyBhbmQgZXhwb3J0cy4gSXQgcmV0dXJucyB0aGVcbiAgICogYExvY2FsTW9kdWxlU2NvcGVgIGZvciB0aGUgZ2l2ZW4gTmdNb2R1bGUgaWYgb25lIGNhbiBiZSBwcm9kdWNlZCwgYG51bGxgIGlmIG5vIHNjb3BlIHdhcyBldmVyXG4gICAqIGRlZmluZWQsIG9yIHRoZSBzdHJpbmcgYCdlcnJvcidgIGlmIHRoZSBzY29wZSBjb250YWluZWQgZXJyb3JzLlxuICAgKi9cbiAgZ2V0U2NvcGVPZk1vZHVsZShjbGF6ejogQ2xhc3NEZWNsYXJhdGlvbik6IExvY2FsTW9kdWxlU2NvcGV8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubW9kdWxlVG9SZWYuaGFzKGNsYXp6KSA/XG4gICAgICAgIHRoaXMuZ2V0U2NvcGVPZk1vZHVsZVJlZmVyZW5jZSh0aGlzLm1vZHVsZVRvUmVmLmdldChjbGF6eikhKSA6XG4gICAgICAgIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIGFueSBgdHMuRGlhZ25vc3RpY2BzIHByb2R1Y2VkIGR1cmluZyB0aGUgY2FsY3VsYXRpb24gb2YgdGhlIGBMb2NhbE1vZHVsZVNjb3BlYCBmb3JcbiAgICogdGhlIGdpdmVuIE5nTW9kdWxlLCBvciBgbnVsbGAgaWYgbm8gZXJyb3JzIHdlcmUgcHJlc2VudC5cbiAgICovXG4gIGdldERpYWdub3N0aWNzT2ZNb2R1bGUoY2xheno6IENsYXNzRGVjbGFyYXRpb24pOiB0cy5EaWFnbm9zdGljW118bnVsbCB7XG4gICAgLy8gUmVxdWlyZWQgdG8gZW5zdXJlIHRoZSBlcnJvcnMgYXJlIHBvcHVsYXRlZCBmb3IgdGhlIGdpdmVuIGNsYXNzLiBJZiBpdCBoYXMgYmVlbiBwcm9jZXNzZWRcbiAgICAvLyBiZWZvcmUsIHRoaXMgd2lsbCBiZSBhIG5vLW9wIGR1ZSB0byB0aGUgc2NvcGUgY2FjaGUuXG4gICAgdGhpcy5nZXRTY29wZU9mTW9kdWxlKGNsYXp6KTtcblxuICAgIGlmICh0aGlzLnNjb3BlRXJyb3JzLmhhcyhjbGF6eikpIHtcbiAgICAgIHJldHVybiB0aGlzLnNjb3BlRXJyb3JzLmdldChjbGF6eikhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGNvbGxlY3Rpb24gb2YgdGhlIGNvbXBpbGF0aW9uIHNjb3BlIGZvciBlYWNoIHJlZ2lzdGVyZWQgZGVjbGFyYXRpb24uXG4gICAqL1xuICBnZXRDb21waWxhdGlvblNjb3BlcygpOiBDb21waWxhdGlvblNjb3BlW10ge1xuICAgIGNvbnN0IHNjb3BlczogQ29tcGlsYXRpb25TY29wZVtdID0gW107XG4gICAgdGhpcy5kZWNsYXJhdGlvblRvTW9kdWxlLmZvckVhY2goKGRlY2xEYXRhLCBkZWNsYXJhdGlvbikgPT4ge1xuICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLmdldFNjb3BlT2ZNb2R1bGUoZGVjbERhdGEubmdNb2R1bGUpO1xuICAgICAgaWYgKHNjb3BlICE9PSBudWxsKSB7XG4gICAgICAgIHNjb3Blcy5wdXNoKHtkZWNsYXJhdGlvbiwgbmdNb2R1bGU6IGRlY2xEYXRhLm5nTW9kdWxlLCAuLi5zY29wZS5jb21waWxhdGlvbn0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzY29wZXM7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyRGVjbGFyYXRpb25PZk1vZHVsZShcbiAgICAgIG5nTW9kdWxlOiBDbGFzc0RlY2xhcmF0aW9uLCBkZWNsOiBSZWZlcmVuY2U8Q2xhc3NEZWNsYXJhdGlvbj4sXG4gICAgICByYXdEZWNsYXJhdGlvbnM6IHRzLkV4cHJlc3Npb258bnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IGRlY2xEYXRhOiBEZWNsYXJhdGlvbkRhdGEgPSB7XG4gICAgICBuZ01vZHVsZSxcbiAgICAgIHJlZjogZGVjbCxcbiAgICAgIHJhd0RlY2xhcmF0aW9ucyxcbiAgICB9O1xuXG4gICAgLy8gRmlyc3QsIGNoZWNrIGZvciBkdXBsaWNhdGUgZGVjbGFyYXRpb25zIG9mIHRoZSBzYW1lIGRpcmVjdGl2ZS9waXBlLlxuICAgIGlmICh0aGlzLmR1cGxpY2F0ZURlY2xhcmF0aW9ucy5oYXMoZGVjbC5ub2RlKSkge1xuICAgICAgLy8gVGhpcyBkaXJlY3RpdmUvcGlwZSBoYXMgYWxyZWFkeSBiZWVuIGlkZW50aWZpZWQgYXMgYmVpbmcgZHVwbGljYXRlZC4gQWRkIHRoaXMgbW9kdWxlIHRvIHRoZVxuICAgICAgLy8gbWFwIG9mIG1vZHVsZXMgZm9yIHdoaWNoIGEgZHVwbGljYXRlIGRlY2xhcmF0aW9uIGV4aXN0cy5cbiAgICAgIHRoaXMuZHVwbGljYXRlRGVjbGFyYXRpb25zLmdldChkZWNsLm5vZGUpIS5zZXQobmdNb2R1bGUsIGRlY2xEYXRhKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLmRlY2xhcmF0aW9uVG9Nb2R1bGUuaGFzKGRlY2wubm9kZSkgJiZcbiAgICAgICAgdGhpcy5kZWNsYXJhdGlvblRvTW9kdWxlLmdldChkZWNsLm5vZGUpIS5uZ01vZHVsZSAhPT0gbmdNb2R1bGUpIHtcbiAgICAgIC8vIFRoaXMgZGlyZWN0aXZlL3BpcGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkIGFzIGRlY2xhcmVkIGluIGFub3RoZXIgbW9kdWxlLiBNYXJrIGl0IGFzIGFcbiAgICAgIC8vIGR1cGxpY2F0ZSBpbnN0ZWFkLlxuICAgICAgY29uc3QgZHVwbGljYXRlRGVjbE1hcCA9IG5ldyBNYXA8Q2xhc3NEZWNsYXJhdGlvbiwgRGVjbGFyYXRpb25EYXRhPigpO1xuICAgICAgY29uc3QgZmlyc3REZWNsRGF0YSA9IHRoaXMuZGVjbGFyYXRpb25Ub01vZHVsZS5nZXQoZGVjbC5ub2RlKSE7XG5cbiAgICAgIC8vIE1hcmsgYm90aCBtb2R1bGVzIGFzIGhhdmluZyBkdXBsaWNhdGUgZGVjbGFyYXRpb25zLlxuICAgICAgdGhpcy5tb2R1bGVzV2l0aFN0cnVjdHVyYWxFcnJvcnMuYWRkKGZpcnN0RGVjbERhdGEubmdNb2R1bGUpO1xuICAgICAgdGhpcy5tb2R1bGVzV2l0aFN0cnVjdHVyYWxFcnJvcnMuYWRkKG5nTW9kdWxlKTtcblxuICAgICAgLy8gQmVpbmcgZGV0ZWN0ZWQgYXMgYSBkdXBsaWNhdGUgbWVhbnMgdGhlcmUgYXJlIHR3byBOZ01vZHVsZXMgKGZvciBub3cpIHdoaWNoIGRlY2xhcmUgdGhpc1xuICAgICAgLy8gZGlyZWN0aXZlL3BpcGUuIEFkZCBib3RoIG9mIHRoZW0gdG8gdGhlIGR1cGxpY2F0ZSB0cmFja2luZyBtYXAuXG4gICAgICBkdXBsaWNhdGVEZWNsTWFwLnNldChmaXJzdERlY2xEYXRhLm5nTW9kdWxlLCBmaXJzdERlY2xEYXRhKTtcbiAgICAgIGR1cGxpY2F0ZURlY2xNYXAuc2V0KG5nTW9kdWxlLCBkZWNsRGF0YSk7XG4gICAgICB0aGlzLmR1cGxpY2F0ZURlY2xhcmF0aW9ucy5zZXQoZGVjbC5ub2RlLCBkdXBsaWNhdGVEZWNsTWFwKTtcblxuICAgICAgLy8gUmVtb3ZlIHRoZSBkaXJlY3RpdmUvcGlwZSBmcm9tIGBkZWNsYXJhdGlvblRvTW9kdWxlYCBhcyBpdCdzIGEgZHVwbGljYXRlIGRlY2xhcmF0aW9uLCBhbmRcbiAgICAgIC8vIHRoZXJlZm9yZSBub3QgdmFsaWQuXG4gICAgICB0aGlzLmRlY2xhcmF0aW9uVG9Nb2R1bGUuZGVsZXRlKGRlY2wubm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGRlY2xhcmF0aW9uIG9mIHRoaXMgZGlyZWN0aXZlL3BpcGUsIHNvIG1hcCBpdC5cbiAgICAgIHRoaXMuZGVjbGFyYXRpb25Ub01vZHVsZS5zZXQoZGVjbC5ub2RlLCBkZWNsRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIGBnZXRTY29wZU9mTW9kdWxlYCB3aGljaCBhY2NlcHRzIGEgcmVmZXJlbmNlIHRvIGEgY2xhc3MuXG4gICAqL1xuICBwcml2YXRlIGdldFNjb3BlT2ZNb2R1bGVSZWZlcmVuY2UocmVmOiBSZWZlcmVuY2U8Q2xhc3NEZWNsYXJhdGlvbj4pOiBMb2NhbE1vZHVsZVNjb3BlfG51bGwge1xuICAgIGlmICh0aGlzLmNhY2hlLmhhcyhyZWYubm9kZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChyZWYubm9kZSkhO1xuICAgIH1cblxuICAgIC8vIFNlYWwgdGhlIHJlZ2lzdHJ5IHRvIHByb3RlY3QgdGhlIGludGVncml0eSBvZiB0aGUgYExvY2FsTW9kdWxlU2NvcGVgIGNhY2hlLlxuICAgIHRoaXMuc2VhbGVkID0gdHJ1ZTtcblxuICAgIC8vIGByZWZgIHNob3VsZCBiZSBhbiBOZ01vZHVsZSBwcmV2aW91c2x5IGFkZGVkIHRvIHRoZSByZWdpc3RyeS4gSWYgbm90LCBhIHNjb3BlIGZvciBpdFxuICAgIC8vIGNhbm5vdCBiZSBwcm9kdWNlZC5cbiAgICBjb25zdCBuZ01vZHVsZSA9IHRoaXMubG9jYWxSZWFkZXIuZ2V0TmdNb2R1bGVNZXRhZGF0YShyZWYpO1xuICAgIGlmIChuZ01vZHVsZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5jYWNoZS5zZXQocmVmLm5vZGUsIG51bGwpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gTW9kdWxlcyB3aGljaCBjb250cmlidXRlZCB0byB0aGUgY29tcGlsYXRpb24gc2NvcGUgb2YgdGhpcyBtb2R1bGUuXG4gICAgY29uc3QgY29tcGlsYXRpb25Nb2R1bGVzID0gbmV3IFNldDxDbGFzc0RlY2xhcmF0aW9uPihbbmdNb2R1bGUucmVmLm5vZGVdKTtcbiAgICAvLyBNb2R1bGVzIHdoaWNoIGNvbnRyaWJ1dGVkIHRvIHRoZSBleHBvcnQgc2NvcGUgb2YgdGhpcyBtb2R1bGUuXG4gICAgY29uc3QgZXhwb3J0ZWRNb2R1bGVzID0gbmV3IFNldDxDbGFzc0RlY2xhcmF0aW9uPihbbmdNb2R1bGUucmVmLm5vZGVdKTtcblxuICAgIC8vIEVycm9ycyBwcm9kdWNlZCBkdXJpbmcgY29tcHV0YXRpb24gb2YgdGhlIHNjb3BlIGFyZSByZWNvcmRlZCBoZXJlLiBBdCB0aGUgZW5kLCBpZiB0aGlzIGFycmF5XG4gICAgLy8gaXNuJ3QgZW1wdHkgdGhlbiBgdW5kZWZpbmVkYCB3aWxsIGJlIGNhY2hlZCBhbmQgcmV0dXJuZWQgdG8gaW5kaWNhdGUgdGhpcyBzY29wZSBpcyBpbnZhbGlkLlxuICAgIGNvbnN0IGRpYWdub3N0aWNzOiB0cy5EaWFnbm9zdGljW10gPSBbXTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSBnb2FsIGlzIHRvIHByb2R1Y2UgdHdvIGRpc3RpbmN0IHRyYW5zaXRpdmUgc2V0czpcbiAgICAvLyAtIHRoZSBkaXJlY3RpdmVzIGFuZCBwaXBlcyB3aGljaCBhcmUgdmlzaWJsZSB0byBjb21wb25lbnRzIGRlY2xhcmVkIGluIHRoZSBOZ01vZHVsZS5cbiAgICAvLyAtIHRoZSBkaXJlY3RpdmVzIGFuZCBwaXBlcyB3aGljaCBhcmUgZXhwb3J0ZWQgdG8gYW55IE5nTW9kdWxlcyB3aGljaCBpbXBvcnQgdGhpcyBvbmUuXG5cbiAgICAvLyBEaXJlY3RpdmVzIGFuZCBwaXBlcyBpbiB0aGUgY29tcGlsYXRpb24gc2NvcGUuXG4gICAgY29uc3QgY29tcGlsYXRpb25EaXJlY3RpdmVzID0gbmV3IE1hcDxEZWNsYXJhdGlvbk5vZGUsIERpcmVjdGl2ZU1ldGE+KCk7XG4gICAgY29uc3QgY29tcGlsYXRpb25QaXBlcyA9IG5ldyBNYXA8RGVjbGFyYXRpb25Ob2RlLCBQaXBlTWV0YT4oKTtcblxuICAgIGNvbnN0IGRlY2xhcmVkID0gbmV3IFNldDxEZWNsYXJhdGlvbk5vZGU+KCk7XG5cbiAgICAvLyBEaXJlY3RpdmVzIGFuZCBwaXBlcyBleHBvcnRlZCB0byBhbnkgaW1wb3J0aW5nIE5nTW9kdWxlcy5cbiAgICBjb25zdCBleHBvcnREaXJlY3RpdmVzID0gbmV3IE1hcDxEZWNsYXJhdGlvbk5vZGUsIERpcmVjdGl2ZU1ldGE+KCk7XG4gICAgY29uc3QgZXhwb3J0UGlwZXMgPSBuZXcgTWFwPERlY2xhcmF0aW9uTm9kZSwgUGlwZU1ldGE+KCk7XG5cbiAgICAvLyBUaGUgYWxnb3JpdGhtIGlzIGFzIGZvbGxvd3M6XG4gICAgLy8gMSkgQWRkIGFsbCBvZiB0aGUgZGlyZWN0aXZlcy9waXBlcyBmcm9tIGVhY2ggTmdNb2R1bGUgaW1wb3J0ZWQgaW50byB0aGUgY3VycmVudCBvbmUgdG8gdGhlXG4gICAgLy8gICAgY29tcGlsYXRpb24gc2NvcGUuXG4gICAgLy8gMikgQWRkIGRpcmVjdGl2ZXMvcGlwZXMgZGVjbGFyZWQgaW4gdGhlIE5nTW9kdWxlIHRvIHRoZSBjb21waWxhdGlvbiBzY29wZS4gQXQgdGhpcyBwb2ludCwgdGhlXG4gICAgLy8gICAgY29tcGlsYXRpb24gc2NvcGUgaXMgY29tcGxldGUuXG4gICAgLy8gMykgRm9yIGVhY2ggZW50cnkgaW4gdGhlIE5nTW9kdWxlJ3MgZXhwb3J0czpcbiAgICAvLyAgICBhKSBBdHRlbXB0IHRvIHJlc29sdmUgaXQgYXMgYW4gTmdNb2R1bGUgd2l0aCBpdHMgb3duIGV4cG9ydGVkIGRpcmVjdGl2ZXMvcGlwZXMuIElmIGl0IGlzXG4gICAgLy8gICAgICAgb25lLCBhZGQgdGhlbSB0byB0aGUgZXhwb3J0IHNjb3BlIG9mIHRoaXMgTmdNb2R1bGUuXG4gICAgLy8gICAgYikgT3RoZXJ3aXNlLCBpdCBzaG91bGQgYmUgYSBjbGFzcyBpbiB0aGUgY29tcGlsYXRpb24gc2NvcGUgb2YgdGhpcyBOZ01vZHVsZS4gSWYgaXQgaXMsXG4gICAgLy8gICAgICAgYWRkIGl0IHRvIHRoZSBleHBvcnQgc2NvcGUuXG4gICAgLy8gICAgYykgSWYgaXQncyBuZWl0aGVyIGFuIE5nTW9kdWxlIG5vciBhIGRpcmVjdGl2ZS9waXBlIGluIHRoZSBjb21waWxhdGlvbiBzY29wZSwgdGhlbiB0aGlzXG4gICAgLy8gICAgICAgaXMgYW4gZXJyb3IuXG5cbiAgICAvL1xuICAgIGxldCBpc1BvaXNvbmVkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubW9kdWxlc1dpdGhTdHJ1Y3R1cmFsRXJyb3JzLmhhcyhuZ01vZHVsZS5yZWYubm9kZSkpIHtcbiAgICAgIC8vIElmIHRoZSBtb2R1bGUgY29udGFpbnMgZGVjbGFyYXRpb25zIHRoYXQgYXJlIGR1cGxpY2F0ZXMsIHRoZW4gaXQncyBjb25zaWRlcmVkIHBvaXNvbmVkLlxuICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gMSkgcHJvY2VzcyBpbXBvcnRzLlxuICAgIGZvciAoY29uc3QgZGVjbCBvZiBuZ01vZHVsZS5pbXBvcnRzKSB7XG4gICAgICBjb25zdCBpbXBvcnRTY29wZSA9IHRoaXMuZ2V0RXhwb3J0ZWRTY29wZShkZWNsLCBkaWFnbm9zdGljcywgcmVmLm5vZGUsICdpbXBvcnQnKTtcbiAgICAgIGlmIChpbXBvcnRTY29wZSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBBbiBpbXBvcnQgd2Fzbid0IGFuIE5nTW9kdWxlLCBzbyByZWNvcmQgYW4gZXJyb3IuXG4gICAgICAgIGRpYWdub3N0aWNzLnB1c2goaW52YWxpZFJlZihyZWYubm9kZSwgZGVjbCwgJ2ltcG9ydCcpKTtcbiAgICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChpbXBvcnRTY29wZSA9PT0gJ2ludmFsaWQnIHx8IGltcG9ydFNjb3BlLmV4cG9ydGVkLmlzUG9pc29uZWQpIHtcbiAgICAgICAgLy8gQW4gaW1wb3J0IHdhcyBhbiBOZ01vZHVsZSBidXQgY29udGFpbmVkIGVycm9ycyBvZiBpdHMgb3duLiBSZWNvcmQgdGhpcyBhcyBhbiBlcnJvciB0b28sXG4gICAgICAgIC8vIGJlY2F1c2UgdGhpcyBzY29wZSBpcyBhbHdheXMgZ29pbmcgdG8gYmUgaW5jb3JyZWN0IGlmIG9uZSBvZiBpdHMgaW1wb3J0cyBjb3VsZCBub3QgYmVcbiAgICAgICAgLy8gcmVhZC5cbiAgICAgICAgZGlhZ25vc3RpY3MucHVzaChpbnZhbGlkVHJhbnNpdGl2ZU5nTW9kdWxlUmVmKHJlZi5ub2RlLCBkZWNsLCAnaW1wb3J0JykpO1xuICAgICAgICBpc1BvaXNvbmVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoaW1wb3J0U2NvcGUgPT09ICdpbnZhbGlkJykge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgZGlyZWN0aXZlIG9mIGltcG9ydFNjb3BlLmV4cG9ydGVkLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgY29tcGlsYXRpb25EaXJlY3RpdmVzLnNldChkaXJlY3RpdmUucmVmLm5vZGUsIGRpcmVjdGl2ZSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IHBpcGUgb2YgaW1wb3J0U2NvcGUuZXhwb3J0ZWQucGlwZXMpIHtcbiAgICAgICAgY29tcGlsYXRpb25QaXBlcy5zZXQocGlwZS5yZWYubm9kZSwgcGlwZSk7XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGltcG9ydGVkTW9kdWxlIG9mIGltcG9ydFNjb3BlLmV4cG9ydGVkLm5nTW9kdWxlcykge1xuICAgICAgICBjb21waWxhdGlvbk1vZHVsZXMuYWRkKGltcG9ydGVkTW9kdWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyKSBhZGQgZGVjbGFyYXRpb25zLlxuICAgIGZvciAoY29uc3QgZGVjbCBvZiBuZ01vZHVsZS5kZWNsYXJhdGlvbnMpIHtcbiAgICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHRoaXMubG9jYWxSZWFkZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGVjbCk7XG4gICAgICBjb25zdCBwaXBlID0gdGhpcy5sb2NhbFJlYWRlci5nZXRQaXBlTWV0YWRhdGEoZGVjbCk7XG4gICAgICBpZiAoZGlyZWN0aXZlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbXBpbGF0aW9uRGlyZWN0aXZlcy5zZXQoZGVjbC5ub2RlLCB7Li4uZGlyZWN0aXZlLCByZWY6IGRlY2x9KTtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZS5pc1BvaXNvbmVkKSB7XG4gICAgICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGlwZSAhPT0gbnVsbCkge1xuICAgICAgICBjb21waWxhdGlvblBpcGVzLnNldChkZWNsLm5vZGUsIHsuLi5waXBlLCByZWY6IGRlY2x9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yTm9kZSA9IGRlY2wuZ2V0T3JpZ2luRm9yRGlhZ25vc3RpY3MobmdNb2R1bGUucmF3RGVjbGFyYXRpb25zISk7XG4gICAgICAgIGRpYWdub3N0aWNzLnB1c2gobWFrZURpYWdub3N0aWMoXG4gICAgICAgICAgICBFcnJvckNvZGUuTkdNT0RVTEVfSU5WQUxJRF9ERUNMQVJBVElPTiwgZXJyb3JOb2RlLFxuICAgICAgICAgICAgYFRoZSBjbGFzcyAnJHtkZWNsLm5vZGUubmFtZS50ZXh0fScgaXMgbGlzdGVkIGluIHRoZSBkZWNsYXJhdGlvbnMgYCArXG4gICAgICAgICAgICAgICAgYG9mIHRoZSBOZ01vZHVsZSAnJHtcbiAgICAgICAgICAgICAgICAgICAgbmdNb2R1bGUucmVmLm5vZGUubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRleHR9JywgYnV0IGlzIG5vdCBhIGRpcmVjdGl2ZSwgYSBjb21wb25lbnQsIG9yIGEgcGlwZS4gYCArXG4gICAgICAgICAgICAgICAgYEVpdGhlciByZW1vdmUgaXQgZnJvbSB0aGUgTmdNb2R1bGUncyBkZWNsYXJhdGlvbnMsIG9yIGFkZCBhbiBhcHByb3ByaWF0ZSBBbmd1bGFyIGRlY29yYXRvci5gLFxuICAgICAgICAgICAgW21ha2VSZWxhdGVkSW5mb3JtYXRpb24oXG4gICAgICAgICAgICAgICAgZGVjbC5ub2RlLm5hbWUsIGAnJHtkZWNsLm5vZGUubmFtZS50ZXh0fScgaXMgZGVjbGFyZWQgaGVyZS5gKV0pKTtcbiAgICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBkZWNsYXJlZC5hZGQoZGVjbC5ub2RlKTtcbiAgICB9XG5cbiAgICAvLyAzKSBwcm9jZXNzIGV4cG9ydHMuXG4gICAgLy8gRXhwb3J0cyBjYW4gY29udGFpbiBtb2R1bGVzLCBjb21wb25lbnRzLCBvciBkaXJlY3RpdmVzLiBUaGV5J3JlIHByb2Nlc3NlZCBkaWZmZXJlbnRseS5cbiAgICAvLyBNb2R1bGVzIGFyZSBzdHJhaWdodGZvcndhcmQuIERpcmVjdGl2ZXMgYW5kIHBpcGVzIGZyb20gZXhwb3J0ZWQgbW9kdWxlcyBhcmUgYWRkZWQgdG8gdGhlXG4gICAgLy8gZXhwb3J0IG1hcHMuIERpcmVjdGl2ZXMvcGlwZXMgYXJlIGRpZmZlcmVudCAtIHRoZXkgbWlnaHQgYmUgZXhwb3J0cyBvZiBkZWNsYXJlZCB0eXBlcyBvclxuICAgIC8vIGltcG9ydGVkIHR5cGVzLlxuICAgIGZvciAoY29uc3QgZGVjbCBvZiBuZ01vZHVsZS5leHBvcnRzKSB7XG4gICAgICAvLyBBdHRlbXB0IHRvIHJlc29sdmUgZGVjbCBhcyBhbiBOZ01vZHVsZS5cbiAgICAgIGNvbnN0IGV4cG9ydFNjb3BlID0gdGhpcy5nZXRFeHBvcnRlZFNjb3BlKGRlY2wsIGRpYWdub3N0aWNzLCByZWYubm9kZSwgJ2V4cG9ydCcpO1xuICAgICAgaWYgKGV4cG9ydFNjb3BlID09PSAnaW52YWxpZCcgfHwgKGV4cG9ydFNjb3BlICE9PSBudWxsICYmIGV4cG9ydFNjb3BlLmV4cG9ydGVkLmlzUG9pc29uZWQpKSB7XG4gICAgICAgIC8vIEFuIGV4cG9ydCB3YXMgYW4gTmdNb2R1bGUgYnV0IGNvbnRhaW5lZCBlcnJvcnMgb2YgaXRzIG93bi4gUmVjb3JkIHRoaXMgYXMgYW4gZXJyb3IgdG9vLFxuICAgICAgICAvLyBiZWNhdXNlIHRoaXMgc2NvcGUgaXMgYWx3YXlzIGdvaW5nIHRvIGJlIGluY29ycmVjdCBpZiBvbmUgb2YgaXRzIGV4cG9ydHMgY291bGQgbm90IGJlXG4gICAgICAgIC8vIHJlYWQuXG4gICAgICAgIGRpYWdub3N0aWNzLnB1c2goaW52YWxpZFRyYW5zaXRpdmVOZ01vZHVsZVJlZihyZWYubm9kZSwgZGVjbCwgJ2V4cG9ydCcpKTtcbiAgICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGV4cG9ydFNjb3BlID09PSAnaW52YWxpZCcpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChleHBvcnRTY29wZSAhPT0gbnVsbCkge1xuICAgICAgICAvLyBkZWNsIGlzIGFuIE5nTW9kdWxlLlxuICAgICAgICBmb3IgKGNvbnN0IGRpcmVjdGl2ZSBvZiBleHBvcnRTY29wZS5leHBvcnRlZC5kaXJlY3RpdmVzKSB7XG4gICAgICAgICAgZXhwb3J0RGlyZWN0aXZlcy5zZXQoZGlyZWN0aXZlLnJlZi5ub2RlLCBkaXJlY3RpdmUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgcGlwZSBvZiBleHBvcnRTY29wZS5leHBvcnRlZC5waXBlcykge1xuICAgICAgICAgIGV4cG9ydFBpcGVzLnNldChwaXBlLnJlZi5ub2RlLCBwaXBlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGV4cG9ydGVkTW9kdWxlIG9mIGV4cG9ydFNjb3BlLmV4cG9ydGVkLm5nTW9kdWxlcykge1xuICAgICAgICAgIGV4cG9ydGVkTW9kdWxlcy5hZGQoZXhwb3J0ZWRNb2R1bGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNvbXBpbGF0aW9uRGlyZWN0aXZlcy5oYXMoZGVjbC5ub2RlKSkge1xuICAgICAgICAvLyBkZWNsIGlzIGEgZGlyZWN0aXZlIG9yIGNvbXBvbmVudCBpbiB0aGUgY29tcGlsYXRpb24gc2NvcGUgb2YgdGhpcyBOZ01vZHVsZS5cbiAgICAgICAgY29uc3QgZGlyZWN0aXZlID0gY29tcGlsYXRpb25EaXJlY3RpdmVzLmdldChkZWNsLm5vZGUpITtcbiAgICAgICAgZXhwb3J0RGlyZWN0aXZlcy5zZXQoZGVjbC5ub2RlLCBkaXJlY3RpdmUpO1xuICAgICAgfSBlbHNlIGlmIChjb21waWxhdGlvblBpcGVzLmhhcyhkZWNsLm5vZGUpKSB7XG4gICAgICAgIC8vIGRlY2wgaXMgYSBwaXBlIGluIHRoZSBjb21waWxhdGlvbiBzY29wZSBvZiB0aGlzIE5nTW9kdWxlLlxuICAgICAgICBjb25zdCBwaXBlID0gY29tcGlsYXRpb25QaXBlcy5nZXQoZGVjbC5ub2RlKSE7XG4gICAgICAgIGV4cG9ydFBpcGVzLnNldChkZWNsLm5vZGUsIHBpcGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVjbCBpcyBhbiB1bmtub3duIGV4cG9ydC5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxSZWFkZXIuZ2V0RGlyZWN0aXZlTWV0YWRhdGEoZGVjbCkgIT09IG51bGwgfHxcbiAgICAgICAgICAgIHRoaXMubG9jYWxSZWFkZXIuZ2V0UGlwZU1ldGFkYXRhKGRlY2wpICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlhZ25vc3RpY3MucHVzaChpbnZhbGlkUmVleHBvcnQocmVmLm5vZGUsIGRlY2wpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaWFnbm9zdGljcy5wdXNoKGludmFsaWRSZWYocmVmLm5vZGUsIGRlY2wsICdleHBvcnQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaXNQb2lzb25lZCA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGV4cG9ydGVkOiBTY29wZURhdGEgPSB7XG4gICAgICBkaXJlY3RpdmVzOiBBcnJheS5mcm9tKGV4cG9ydERpcmVjdGl2ZXMudmFsdWVzKCkpLFxuICAgICAgcGlwZXM6IEFycmF5LmZyb20oZXhwb3J0UGlwZXMudmFsdWVzKCkpLFxuICAgICAgbmdNb2R1bGVzOiBBcnJheS5mcm9tKGV4cG9ydGVkTW9kdWxlcyksXG4gICAgICBpc1BvaXNvbmVkLFxuICAgIH07XG5cbiAgICBjb25zdCByZWV4cG9ydHMgPSB0aGlzLmdldFJlZXhwb3J0cyhuZ01vZHVsZSwgcmVmLCBkZWNsYXJlZCwgZXhwb3J0ZWQsIGRpYWdub3N0aWNzKTtcblxuXG4gICAgLy8gRmluYWxseSwgcHJvZHVjZSB0aGUgYExvY2FsTW9kdWxlU2NvcGVgIHdpdGggYm90aCB0aGUgY29tcGlsYXRpb24gYW5kIGV4cG9ydCBzY29wZXMuXG4gICAgY29uc3Qgc2NvcGU6IExvY2FsTW9kdWxlU2NvcGUgPSB7XG4gICAgICBuZ01vZHVsZTogbmdNb2R1bGUucmVmLm5vZGUsXG4gICAgICBjb21waWxhdGlvbjoge1xuICAgICAgICBkaXJlY3RpdmVzOiBBcnJheS5mcm9tKGNvbXBpbGF0aW9uRGlyZWN0aXZlcy52YWx1ZXMoKSksXG4gICAgICAgIHBpcGVzOiBBcnJheS5mcm9tKGNvbXBpbGF0aW9uUGlwZXMudmFsdWVzKCkpLFxuICAgICAgICBuZ01vZHVsZXM6IEFycmF5LmZyb20oY29tcGlsYXRpb25Nb2R1bGVzKSxcbiAgICAgICAgaXNQb2lzb25lZCxcbiAgICAgIH0sXG4gICAgICBleHBvcnRlZCxcbiAgICAgIHJlZXhwb3J0cyxcbiAgICAgIHNjaGVtYXM6IG5nTW9kdWxlLnNjaGVtYXMsXG4gICAgfTtcblxuICAgIC8vIENoZWNrIGlmIHRoaXMgc2NvcGUgaGFkIGFueSBlcnJvcnMgZHVyaW5nIHByb2R1Y3Rpb24uXG4gICAgaWYgKGRpYWdub3N0aWNzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFNhdmUgdGhlIGVycm9ycyBmb3IgcmV0cmlldmFsLlxuICAgICAgdGhpcy5zY29wZUVycm9ycy5zZXQocmVmLm5vZGUsIGRpYWdub3N0aWNzKTtcblxuICAgICAgLy8gTWFyayB0aGlzIG1vZHVsZSBhcyBiZWluZyB0YWludGVkLlxuICAgICAgdGhpcy5tb2R1bGVzV2l0aFN0cnVjdHVyYWxFcnJvcnMuYWRkKHJlZi5ub2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNhY2hlLnNldChyZWYubm9kZSwgc2NvcGUpO1xuICAgIHJldHVybiBzY29wZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGEgY29tcG9uZW50IHJlcXVpcmVzIHJlbW90ZSBzY29waW5nLlxuICAgKi9cbiAgZ2V0UmVtb3RlU2NvcGUobm9kZTogQ2xhc3NEZWNsYXJhdGlvbik6IFJlbW90ZVNjb3BlfG51bGwge1xuICAgIHJldHVybiB0aGlzLnJlbW90ZVNjb3BpbmcuaGFzKG5vZGUpID8gdGhpcy5yZW1vdGVTY29waW5nLmdldChub2RlKSEgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIGNvbXBvbmVudCBhcyByZXF1aXJpbmcgcmVtb3RlIHNjb3BpbmcsIHdpdGggdGhlIGdpdmVuIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIHRvIGJlXG4gICAqIHJlZ2lzdGVyZWQgcmVtb3RlbHkuXG4gICAqL1xuICBzZXRDb21wb25lbnRSZW1vdGVTY29wZShub2RlOiBDbGFzc0RlY2xhcmF0aW9uLCBkaXJlY3RpdmVzOiBSZWZlcmVuY2VbXSwgcGlwZXM6IFJlZmVyZW5jZVtdKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMucmVtb3RlU2NvcGluZy5zZXQobm9kZSwge2RpcmVjdGl2ZXMsIHBpcGVzfSk7XG4gIH1cblxuICAvKipcbiAgICogTG9vayB1cCB0aGUgYEV4cG9ydFNjb3BlYCBvZiBhIGdpdmVuIGBSZWZlcmVuY2VgIHRvIGFuIE5nTW9kdWxlLlxuICAgKlxuICAgKiBUaGUgTmdNb2R1bGUgaW4gcXVlc3Rpb24gbWF5IGJlIGRlY2xhcmVkIGxvY2FsbHkgaW4gdGhlIGN1cnJlbnQgdHMuUHJvZ3JhbSwgb3IgaXQgbWF5IGJlXG4gICAqIGRlY2xhcmVkIGluIGEgLmQudHMgZmlsZS5cbiAgICpcbiAgICogQHJldHVybnMgYG51bGxgIGlmIG5vIHNjb3BlIGNvdWxkIGJlIGZvdW5kLCBvciBgJ2ludmFsaWQnYCBpZiB0aGUgYFJlZmVyZW5jZWAgaXMgbm90IGEgdmFsaWRcbiAgICogICAgIE5nTW9kdWxlLlxuICAgKlxuICAgKiBNYXkgYWxzbyBjb250cmlidXRlIGRpYWdub3N0aWNzIG9mIGl0cyBvd24gYnkgYWRkaW5nIHRvIHRoZSBnaXZlbiBgZGlhZ25vc3RpY3NgXG4gICAqIGFycmF5IHBhcmFtZXRlci5cbiAgICovXG4gIHByaXZhdGUgZ2V0RXhwb3J0ZWRTY29wZShcbiAgICAgIHJlZjogUmVmZXJlbmNlPENsYXNzRGVjbGFyYXRpb24+LCBkaWFnbm9zdGljczogdHMuRGlhZ25vc3RpY1tdLFxuICAgICAgb3duZXJGb3JFcnJvcnM6IERlY2xhcmF0aW9uTm9kZSwgdHlwZTogJ2ltcG9ydCd8J2V4cG9ydCcpOiBFeHBvcnRTY29wZXxudWxsfCdpbnZhbGlkJyB7XG4gICAgaWYgKHJlZi5ub2RlLmdldFNvdXJjZUZpbGUoKS5pc0RlY2xhcmF0aW9uRmlsZSkge1xuICAgICAgLy8gVGhlIE5nTW9kdWxlIGlzIGRlY2xhcmVkIGluIGEgLmQudHMgZmlsZS4gUmVzb2x2ZSBpdCB3aXRoIHRoZSBgRGVwZW5kZW5jeVNjb3BlUmVhZGVyYC5cbiAgICAgIGlmICghdHMuaXNDbGFzc0RlY2xhcmF0aW9uKHJlZi5ub2RlKSkge1xuICAgICAgICAvLyBUaGUgTmdNb2R1bGUgaXMgaW4gYSAuZC50cyBmaWxlIGJ1dCBpcyBub3QgZGVjbGFyZWQgYXMgYSB0cy5DbGFzc0RlY2xhcmF0aW9uLiBUaGlzIGlzIGFuXG4gICAgICAgIC8vIGVycm9yIGluIHRoZSAuZC50cyBtZXRhZGF0YS5cbiAgICAgICAgY29uc3QgY29kZSA9IHR5cGUgPT09ICdpbXBvcnQnID8gRXJyb3JDb2RlLk5HTU9EVUxFX0lOVkFMSURfSU1QT1JUIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRXJyb3JDb2RlLk5HTU9EVUxFX0lOVkFMSURfRVhQT1JUO1xuICAgICAgICBkaWFnbm9zdGljcy5wdXNoKG1ha2VEaWFnbm9zdGljKFxuICAgICAgICAgICAgY29kZSwgaWRlbnRpZmllck9mTm9kZShyZWYubm9kZSkgfHwgcmVmLm5vZGUsXG4gICAgICAgICAgICBgQXBwZWFycyBpbiB0aGUgTmdNb2R1bGUuJHt0eXBlfXMgb2YgJHtcbiAgICAgICAgICAgICAgICBub2RlTmFtZUZvckVycm9yKG93bmVyRm9yRXJyb3JzKX0sIGJ1dCBjb3VsZCBub3QgYmUgcmVzb2x2ZWQgdG8gYW4gTmdNb2R1bGVgKSk7XG4gICAgICAgIHJldHVybiAnaW52YWxpZCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5U2NvcGVSZWFkZXIucmVzb2x2ZShyZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgTmdNb2R1bGUgaXMgZGVjbGFyZWQgbG9jYWxseSBpbiB0aGUgY3VycmVudCBwcm9ncmFtLiBSZXNvbHZlIGl0IGZyb20gdGhlIHJlZ2lzdHJ5LlxuICAgICAgcmV0dXJuIHRoaXMuZ2V0U2NvcGVPZk1vZHVsZVJlZmVyZW5jZShyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVleHBvcnRzKFxuICAgICAgbmdNb2R1bGU6IE5nTW9kdWxlTWV0YSwgcmVmOiBSZWZlcmVuY2U8Q2xhc3NEZWNsYXJhdGlvbj4sIGRlY2xhcmVkOiBTZXQ8RGVjbGFyYXRpb25Ob2RlPixcbiAgICAgIGV4cG9ydGVkOiB7ZGlyZWN0aXZlczogRGlyZWN0aXZlTWV0YVtdLCBwaXBlczogUGlwZU1ldGFbXX0sXG4gICAgICBkaWFnbm9zdGljczogdHMuRGlhZ25vc3RpY1tdKTogUmVleHBvcnRbXXxudWxsIHtcbiAgICBsZXQgcmVleHBvcnRzOiBSZWV4cG9ydFtdfG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSByZWYubm9kZS5nZXRTb3VyY2VGaWxlKCk7XG4gICAgaWYgKHRoaXMuYWxpYXNpbmdIb3N0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVleHBvcnRzID0gW107XG4gICAgLy8gVHJhY2sgcmUtZXhwb3J0cyBieSBzeW1ib2wgbmFtZSwgdG8gcHJvZHVjZSBkaWFnbm9zdGljcyBpZiB0d28gYWxpYXMgcmUtZXhwb3J0cyB3b3VsZCBzaGFyZVxuICAgIC8vIHRoZSBzYW1lIG5hbWUuXG4gICAgY29uc3QgcmVleHBvcnRNYXAgPSBuZXcgTWFwPHN0cmluZywgUmVmZXJlbmNlPENsYXNzRGVjbGFyYXRpb24+PigpO1xuICAgIC8vIEFsaWFzIG5nTW9kdWxlUmVmIGFkZGVkIGZvciByZWFkYWJpbGl0eSBiZWxvdy5cbiAgICBjb25zdCBuZ01vZHVsZVJlZiA9IHJlZjtcbiAgICBjb25zdCBhZGRSZWV4cG9ydCA9IChleHBvcnRSZWY6IFJlZmVyZW5jZTxDbGFzc0RlY2xhcmF0aW9uPikgPT4ge1xuICAgICAgaWYgKGV4cG9ydFJlZi5ub2RlLmdldFNvdXJjZUZpbGUoKSA9PT0gc291cmNlRmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBpc1JlRXhwb3J0ID0gIWRlY2xhcmVkLmhhcyhleHBvcnRSZWYubm9kZSk7XG4gICAgICBjb25zdCBleHBvcnROYW1lID0gdGhpcy5hbGlhc2luZ0hvc3QhLm1heWJlQWxpYXNTeW1ib2xBcyhcbiAgICAgICAgICBleHBvcnRSZWYsIHNvdXJjZUZpbGUsIG5nTW9kdWxlLnJlZi5ub2RlLm5hbWUudGV4dCwgaXNSZUV4cG9ydCk7XG4gICAgICBpZiAoZXhwb3J0TmFtZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXJlZXhwb3J0TWFwLmhhcyhleHBvcnROYW1lKSkge1xuICAgICAgICBpZiAoZXhwb3J0UmVmLmFsaWFzICYmIGV4cG9ydFJlZi5hbGlhcyBpbnN0YW5jZW9mIEV4dGVybmFsRXhwcikge1xuICAgICAgICAgIHJlZXhwb3J0cyEucHVzaCh7XG4gICAgICAgICAgICBmcm9tTW9kdWxlOiBleHBvcnRSZWYuYWxpYXMudmFsdWUubW9kdWxlTmFtZSEsXG4gICAgICAgICAgICBzeW1ib2xOYW1lOiBleHBvcnRSZWYuYWxpYXMudmFsdWUubmFtZSEsXG4gICAgICAgICAgICBhc0FsaWFzOiBleHBvcnROYW1lLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGV4cHIgPSB0aGlzLnJlZkVtaXR0ZXIuZW1pdChleHBvcnRSZWYuY2xvbmVXaXRoTm9JZGVudGlmaWVycygpLCBzb3VyY2VGaWxlKTtcbiAgICAgICAgICBpZiAoIShleHByIGluc3RhbmNlb2YgRXh0ZXJuYWxFeHByKSB8fCBleHByLnZhbHVlLm1vZHVsZU5hbWUgPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgZXhwci52YWx1ZS5uYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIEV4dGVybmFsRXhwcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWV4cG9ydHMhLnB1c2goe1xuICAgICAgICAgICAgZnJvbU1vZHVsZTogZXhwci52YWx1ZS5tb2R1bGVOYW1lLFxuICAgICAgICAgICAgc3ltYm9sTmFtZTogZXhwci52YWx1ZS5uYW1lLFxuICAgICAgICAgICAgYXNBbGlhczogZXhwb3J0TmFtZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZWV4cG9ydE1hcC5zZXQoZXhwb3J0TmFtZSwgZXhwb3J0UmVmKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFub3RoZXIgcmUtZXhwb3J0IGFscmVhZHkgdXNlZCB0aGlzIG5hbWUuIFByb2R1Y2UgYSBkaWFnbm9zdGljLlxuICAgICAgICBjb25zdCBwcmV2UmVmID0gcmVleHBvcnRNYXAuZ2V0KGV4cG9ydE5hbWUpITtcbiAgICAgICAgZGlhZ25vc3RpY3MucHVzaChyZWV4cG9ydENvbGxpc2lvbihuZ01vZHVsZVJlZi5ub2RlLCBwcmV2UmVmLCBleHBvcnRSZWYpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZvciAoY29uc3Qge3JlZn0gb2YgZXhwb3J0ZWQuZGlyZWN0aXZlcykge1xuICAgICAgYWRkUmVleHBvcnQocmVmKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCB7cmVmfSBvZiBleHBvcnRlZC5waXBlcykge1xuICAgICAgYWRkUmVleHBvcnQocmVmKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZXhwb3J0cztcbiAgfVxuXG4gIHByaXZhdGUgYXNzZXJ0Q29sbGVjdGluZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWFsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQXNzZXJ0aW9uOiBMb2NhbE1vZHVsZVNjb3BlUmVnaXN0cnkgaXMgbm90IENPTExFQ1RJTkdgKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBQcm9kdWNlIGEgYHRzLkRpYWdub3N0aWNgIGZvciBhbiBpbnZhbGlkIGltcG9ydCBvciBleHBvcnQgZnJvbSBhbiBOZ01vZHVsZS5cbiAqL1xuZnVuY3Rpb24gaW52YWxpZFJlZihcbiAgICBjbGF6ejogRGVjbGFyYXRpb25Ob2RlLCBkZWNsOiBSZWZlcmVuY2U8RGVjbGFyYXRpb25Ob2RlPixcbiAgICB0eXBlOiAnaW1wb3J0J3wnZXhwb3J0Jyk6IHRzLkRpYWdub3N0aWMge1xuICBjb25zdCBjb2RlID1cbiAgICAgIHR5cGUgPT09ICdpbXBvcnQnID8gRXJyb3JDb2RlLk5HTU9EVUxFX0lOVkFMSURfSU1QT1JUIDogRXJyb3JDb2RlLk5HTU9EVUxFX0lOVkFMSURfRVhQT1JUO1xuICBjb25zdCByZXNvbHZlVGFyZ2V0ID0gdHlwZSA9PT0gJ2ltcG9ydCcgPyAnTmdNb2R1bGUnIDogJ05nTW9kdWxlLCBDb21wb25lbnQsIERpcmVjdGl2ZSwgb3IgUGlwZSc7XG4gIGxldCBtZXNzYWdlID1cbiAgICAgIGBBcHBlYXJzIGluIHRoZSBOZ01vZHVsZS4ke3R5cGV9cyBvZiAke1xuICAgICAgICAgIG5vZGVOYW1lRm9yRXJyb3IoY2xhenopfSwgYnV0IGNvdWxkIG5vdCBiZSByZXNvbHZlZCB0byBhbiAke3Jlc29sdmVUYXJnZXR9IGNsYXNzLmAgK1xuICAgICAgJ1xcblxcbic7XG4gIGNvbnN0IGxpYnJhcnkgPSBkZWNsLm93bmVkQnlNb2R1bGVHdWVzcyAhPT0gbnVsbCA/IGAgKCR7ZGVjbC5vd25lZEJ5TW9kdWxlR3Vlc3N9KWAgOiAnJztcbiAgY29uc3Qgc2YgPSBkZWNsLm5vZGUuZ2V0U291cmNlRmlsZSgpO1xuXG4gIC8vIFByb3ZpZGUgZXh0cmEgY29udGV4dCB0byB0aGUgZXJyb3IgZm9yIHRoZSB1c2VyLlxuICBpZiAoIXNmLmlzRGVjbGFyYXRpb25GaWxlKSB7XG4gICAgLy8gVGhpcyBpcyBhIGZpbGUgaW4gdGhlIHVzZXIncyBwcm9ncmFtLlxuICAgIGNvbnN0IGFubm90YXRpb25UeXBlID0gdHlwZSA9PT0gJ2ltcG9ydCcgPyAnQE5nTW9kdWxlJyA6ICdBbmd1bGFyJztcbiAgICBtZXNzYWdlICs9IGBJcyBpdCBtaXNzaW5nIGFuICR7YW5ub3RhdGlvblR5cGV9IGFubm90YXRpb24/YDtcbiAgfSBlbHNlIGlmIChzZi5maWxlTmFtZS5pbmRleE9mKCdub2RlX21vZHVsZXMnKSAhPT0gLTEpIHtcbiAgICAvLyBUaGlzIGZpbGUgY29tZXMgZnJvbSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgaW4gbm9kZV9tb2R1bGVzLlxuICAgIG1lc3NhZ2UgKz1cbiAgICAgICAgYFRoaXMgbGlrZWx5IG1lYW5zIHRoYXQgdGhlIGxpYnJhcnkke2xpYnJhcnl9IHdoaWNoIGRlY2xhcmVzICR7ZGVjbC5kZWJ1Z05hbWV9IGhhcyBub3QgYCArXG4gICAgICAgICdiZWVuIHByb2Nlc3NlZCBjb3JyZWN0bHkgYnkgbmdjYywgb3IgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBBbmd1bGFyIEl2eS4gQ2hlY2sgaWYgYSAnICtcbiAgICAgICAgJ25ld2VyIHZlcnNpb24gb2YgdGhlIGxpYnJhcnkgaXMgYXZhaWxhYmxlLCBhbmQgdXBkYXRlIGlmIHNvLiBBbHNvIGNvbnNpZGVyIGNoZWNraW5nICcgK1xuICAgICAgICAnd2l0aCB0aGUgbGlicmFyeVxcJ3MgYXV0aG9ycyB0byBzZWUgaWYgdGhlIGxpYnJhcnkgaXMgZXhwZWN0ZWQgdG8gYmUgY29tcGF0aWJsZSB3aXRoIEl2eS4nO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgaXMgYSBtb25vcmVwbyBzdHlsZSBsb2NhbCBkZXBlbmRlbmN5LiBVbmZvcnR1bmF0ZWx5IHRoZXNlIGFyZSB0b28gZGlmZmVyZW50IHRvIHJlYWxseVxuICAgIC8vIG9mZmVyIG11Y2ggbW9yZcKgYWR2aWNlIHRoYW4gdGhpcy5cbiAgICBtZXNzYWdlICs9IGBUaGlzIGxpa2VseSBtZWFucyB0aGF0IHRoZSBkZXBlbmRlbmN5JHtsaWJyYXJ5fSB3aGljaCBkZWNsYXJlcyAke1xuICAgICAgICBkZWNsLmRlYnVnTmFtZX0gaGFzIG5vdCBiZWVuIHByb2Nlc3NlZCBjb3JyZWN0bHkgYnkgbmdjYy5gO1xuICB9XG5cbiAgcmV0dXJuIG1ha2VEaWFnbm9zdGljKGNvZGUsIGlkZW50aWZpZXJPZk5vZGUoZGVjbC5ub2RlKSB8fCBkZWNsLm5vZGUsIG1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIFByb2R1Y2UgYSBgdHMuRGlhZ25vc3RpY2AgZm9yIGFuIGltcG9ydCBvciBleHBvcnQgd2hpY2ggaXRzZWxmIGhhcyBlcnJvcnMuXG4gKi9cbmZ1bmN0aW9uIGludmFsaWRUcmFuc2l0aXZlTmdNb2R1bGVSZWYoXG4gICAgY2xheno6IERlY2xhcmF0aW9uTm9kZSwgZGVjbDogUmVmZXJlbmNlPERlY2xhcmF0aW9uTm9kZT4sXG4gICAgdHlwZTogJ2ltcG9ydCd8J2V4cG9ydCcpOiB0cy5EaWFnbm9zdGljIHtcbiAgY29uc3QgY29kZSA9XG4gICAgICB0eXBlID09PSAnaW1wb3J0JyA/IEVycm9yQ29kZS5OR01PRFVMRV9JTlZBTElEX0lNUE9SVCA6IEVycm9yQ29kZS5OR01PRFVMRV9JTlZBTElEX0VYUE9SVDtcbiAgcmV0dXJuIG1ha2VEaWFnbm9zdGljKFxuICAgICAgY29kZSwgaWRlbnRpZmllck9mTm9kZShkZWNsLm5vZGUpIHx8IGRlY2wubm9kZSxcbiAgICAgIGBBcHBlYXJzIGluIHRoZSBOZ01vZHVsZS4ke3R5cGV9cyBvZiAke25vZGVOYW1lRm9yRXJyb3IoY2xhenopfSwgYnV0IGl0c2VsZiBoYXMgZXJyb3JzYCk7XG59XG5cbi8qKlxuICogUHJvZHVjZSBhIGB0cy5EaWFnbm9zdGljYCBmb3IgYW4gZXhwb3J0ZWQgZGlyZWN0aXZlIG9yIHBpcGUgd2hpY2ggd2FzIG5vdCBkZWNsYXJlZCBvciBpbXBvcnRlZFxuICogYnkgdGhlIE5nTW9kdWxlIGluIHF1ZXN0aW9uLlxuICovXG5mdW5jdGlvbiBpbnZhbGlkUmVleHBvcnQoY2xheno6IERlY2xhcmF0aW9uTm9kZSwgZGVjbDogUmVmZXJlbmNlPERlY2xhcmF0aW9uTm9kZT4pOiB0cy5EaWFnbm9zdGljIHtcbiAgcmV0dXJuIG1ha2VEaWFnbm9zdGljKFxuICAgICAgRXJyb3JDb2RlLk5HTU9EVUxFX0lOVkFMSURfUkVFWFBPUlQsIGlkZW50aWZpZXJPZk5vZGUoZGVjbC5ub2RlKSB8fCBkZWNsLm5vZGUsXG4gICAgICBgUHJlc2VudCBpbiB0aGUgTmdNb2R1bGUuZXhwb3J0cyBvZiAke1xuICAgICAgICAgIG5vZGVOYW1lRm9yRXJyb3IoY2xhenopfSBidXQgbmVpdGhlciBkZWNsYXJlZCBub3IgaW1wb3J0ZWRgKTtcbn1cblxuLyoqXG4gKiBQcm9kdWNlIGEgYHRzLkRpYWdub3N0aWNgIGZvciBhIGNvbGxpc2lvbiBpbiByZS1leHBvcnQgbmFtZXMgYmV0d2VlbiB0d28gZGlyZWN0aXZlcy9waXBlcy5cbiAqL1xuZnVuY3Rpb24gcmVleHBvcnRDb2xsaXNpb24oXG4gICAgbW9kdWxlOiBDbGFzc0RlY2xhcmF0aW9uLCByZWZBOiBSZWZlcmVuY2U8Q2xhc3NEZWNsYXJhdGlvbj4sXG4gICAgcmVmQjogUmVmZXJlbmNlPENsYXNzRGVjbGFyYXRpb24+KTogdHMuRGlhZ25vc3RpYyB7XG4gIGNvbnN0IGNoaWxkTWVzc2FnZVRleHQgPSBgVGhpcyBkaXJlY3RpdmUvcGlwZSBpcyBwYXJ0IG9mIHRoZSBleHBvcnRzIG9mICcke1xuICAgICAgbW9kdWxlLm5hbWUudGV4dH0nIGFuZCBzaGFyZXMgdGhlIHNhbWUgbmFtZSBhcyBhbm90aGVyIGV4cG9ydGVkIGRpcmVjdGl2ZS9waXBlLmA7XG4gIHJldHVybiBtYWtlRGlhZ25vc3RpYyhcbiAgICAgIEVycm9yQ29kZS5OR01PRFVMRV9SRUVYUE9SVF9OQU1FX0NPTExJU0lPTiwgbW9kdWxlLm5hbWUsXG4gICAgICBgXG4gICAgVGhlcmUgd2FzIGEgbmFtZSBjb2xsaXNpb24gYmV0d2VlbiB0d28gY2xhc3NlcyBuYW1lZCAnJHtcbiAgICAgICAgICByZWZBLm5vZGUubmFtZS50ZXh0fScsIHdoaWNoIGFyZSBib3RoIHBhcnQgb2YgdGhlIGV4cG9ydHMgb2YgJyR7bW9kdWxlLm5hbWUudGV4dH0nLlxuXG4gICAgQW5ndWxhciBnZW5lcmF0ZXMgcmUtZXhwb3J0cyBvZiBhbiBOZ01vZHVsZSdzIGV4cG9ydGVkIGRpcmVjdGl2ZXMvcGlwZXMgZnJvbSB0aGUgbW9kdWxlJ3Mgc291cmNlIGZpbGUgaW4gY2VydGFpbiBjYXNlcywgdXNpbmcgdGhlIGRlY2xhcmVkIG5hbWUgb2YgdGhlIGNsYXNzLiBJZiB0d28gY2xhc3NlcyBvZiB0aGUgc2FtZSBuYW1lIGFyZSBleHBvcnRlZCwgdGhpcyBhdXRvbWF0aWMgbmFtaW5nIGRvZXMgbm90IHdvcmsuXG5cbiAgICBUbyBmaXggdGhpcyBwcm9ibGVtIHBsZWFzZSByZS1leHBvcnQgb25lIG9yIGJvdGggY2xhc3NlcyBkaXJlY3RseSBmcm9tIHRoaXMgZmlsZS5cbiAgYC50cmltKCksXG4gICAgICBbXG4gICAgICAgIG1ha2VSZWxhdGVkSW5mb3JtYXRpb24ocmVmQS5ub2RlLm5hbWUsIGNoaWxkTWVzc2FnZVRleHQpLFxuICAgICAgICBtYWtlUmVsYXRlZEluZm9ybWF0aW9uKHJlZkIubm9kZS5uYW1lLCBjaGlsZE1lc3NhZ2VUZXh0KSxcbiAgICAgIF0pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlY2xhcmF0aW9uRGF0YSB7XG4gIG5nTW9kdWxlOiBDbGFzc0RlY2xhcmF0aW9uO1xuICByZWY6IFJlZmVyZW5jZTtcbiAgcmF3RGVjbGFyYXRpb25zOiB0cy5FeHByZXNzaW9ufG51bGw7XG59XG4iXX0=