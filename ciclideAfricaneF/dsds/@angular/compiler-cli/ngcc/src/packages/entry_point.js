(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/ngcc/src/packages/entry_point", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/ngcc/src/host/umd_host", "@angular/compiler-cli/ngcc/src/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEntryPointFormat = exports.isEntryPoint = exports.getEntryPointInfo = exports.INCOMPATIBLE_ENTRY_POINT = exports.IGNORED_ENTRY_POINT = exports.NO_ENTRY_POINT = exports.SUPPORTED_FORMAT_PROPERTIES = void 0;
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var umd_host_1 = require("@angular/compiler-cli/ngcc/src/host/umd_host");
    var utils_1 = require("@angular/compiler-cli/ngcc/src/utils");
    // We need to keep the elements of this const and the `EntryPointJsonProperty` type in sync.
    exports.SUPPORTED_FORMAT_PROPERTIES = ['fesm2015', 'fesm5', 'es2015', 'esm2015', 'esm5', 'main', 'module', 'browser'];
    /**
     * The path does not represent an entry-point, i.e. there is no package.json at the path and there
     * is no config to force an entry-point.
     */
    exports.NO_ENTRY_POINT = 'no-entry-point';
    /**
     * The path represents an entry-point that is `ignored` by an ngcc config.
     */
    exports.IGNORED_ENTRY_POINT = 'ignored-entry-point';
    /**
     * The path has a package.json, but it is not a valid entry-point for ngcc processing.
     */
    exports.INCOMPATIBLE_ENTRY_POINT = 'incompatible-entry-point';
    /**
     * Try to create an entry-point from the given paths and properties.
     *
     * @param packagePath the absolute path to the containing npm package
     * @param entryPointPath the absolute path to the potential entry-point.
     * @returns
     * - An entry-point if it is valid and not ignored.
     * - `NO_ENTRY_POINT` when there is no package.json at the path and there is no config to force an
     *   entry-point,
     * - `IGNORED_ENTRY_POINT` when the entry-point is ignored by an ngcc config.
     * - `INCOMPATIBLE_ENTRY_POINT` when there is a package.json but it is not a valid Angular compiled
     *   entry-point.
     */
    function getEntryPointInfo(fs, config, logger, packagePath, entryPointPath) {
        var packagePackageJsonPath = fs.resolve(packagePath, 'package.json');
        var entryPointPackageJsonPath = fs.resolve(entryPointPath, 'package.json');
        var loadedPackagePackageJson = loadPackageJson(fs, packagePackageJsonPath);
        var loadedEntryPointPackageJson = (packagePackageJsonPath === entryPointPackageJsonPath) ?
            loadedPackagePackageJson :
            loadPackageJson(fs, entryPointPackageJsonPath);
        var _a = getPackageNameAndVersion(fs, packagePath, loadedPackagePackageJson, loadedEntryPointPackageJson), packageName = _a.packageName, packageVersion = _a.packageVersion;
        var packageConfig = config.getPackageConfig(packageName, packagePath, packageVersion);
        var entryPointConfig = packageConfig.entryPoints.get(entryPointPath);
        var entryPointPackageJson;
        if (entryPointConfig === undefined) {
            if (!fs.exists(entryPointPackageJsonPath)) {
                // No `package.json` and no config.
                return exports.NO_ENTRY_POINT;
            }
            else if (loadedEntryPointPackageJson === null) {
                // `package.json` exists but could not be parsed and there is no redeeming config.
                logger.warn("Failed to read entry point info from invalid 'package.json' file: " + entryPointPackageJsonPath);
                return exports.INCOMPATIBLE_ENTRY_POINT;
            }
            else {
                entryPointPackageJson = loadedEntryPointPackageJson;
            }
        }
        else if (entryPointConfig.ignore === true) {
            // Explicitly ignored entry-point.
            return exports.IGNORED_ENTRY_POINT;
        }
        else {
            entryPointPackageJson = mergeConfigAndPackageJson(fs, loadedEntryPointPackageJson, entryPointConfig, packagePath, entryPointPath);
        }
        var typings = entryPointPackageJson.typings || entryPointPackageJson.types ||
            guessTypingsFromPackageJson(fs, entryPointPath, entryPointPackageJson);
        if (typeof typings !== 'string') {
            // Missing the required `typings` property
            return exports.INCOMPATIBLE_ENTRY_POINT;
        }
        // An entry-point is assumed to be compiled by Angular if there is either:
        // * a `metadata.json` file next to the typings entry-point
        // * a custom config for this entry-point
        var metadataPath = fs.resolve(entryPointPath, typings.replace(/\.d\.ts$/, '') + '.metadata.json');
        var compiledByAngular = entryPointConfig !== undefined || fs.exists(metadataPath);
        var entryPointInfo = {
            name: entryPointPackageJson.name,
            path: entryPointPath,
            packageName: packageName,
            packagePath: packagePath,
            packageJson: entryPointPackageJson,
            typings: fs.resolve(entryPointPath, typings),
            compiledByAngular: compiledByAngular,
            ignoreMissingDependencies: entryPointConfig !== undefined ? !!entryPointConfig.ignoreMissingDependencies : false,
            generateDeepReexports: entryPointConfig !== undefined ? !!entryPointConfig.generateDeepReexports : false,
        };
        return entryPointInfo;
    }
    exports.getEntryPointInfo = getEntryPointInfo;
    function isEntryPoint(result) {
        return result !== exports.NO_ENTRY_POINT && result !== exports.INCOMPATIBLE_ENTRY_POINT &&
            result !== exports.IGNORED_ENTRY_POINT;
    }
    exports.isEntryPoint = isEntryPoint;
    /**
     * Convert a package.json property into an entry-point format.
     *
     * @param property The property to convert to a format.
     * @returns An entry-point format or `undefined` if none match the given property.
     */
    function getEntryPointFormat(fs, entryPoint, property) {
        switch (property) {
            case 'fesm2015':
                return 'esm2015';
            case 'fesm5':
                return 'esm5';
            case 'es2015':
                return 'esm2015';
            case 'esm2015':
                return 'esm2015';
            case 'esm5':
                return 'esm5';
            case 'browser':
                var browserFile = entryPoint.packageJson['browser'];
                if (typeof browserFile !== 'string') {
                    return undefined;
                }
                return sniffModuleFormat(fs, fs.join(entryPoint.path, browserFile));
            case 'main':
                var mainFile = entryPoint.packageJson['main'];
                if (mainFile === undefined) {
                    return undefined;
                }
                return sniffModuleFormat(fs, fs.join(entryPoint.path, mainFile));
            case 'module':
                var moduleFilePath = entryPoint.packageJson['module'];
                // As of version 10, the `module` property in `package.json` should point to
                // the ESM2015 format output as per Angular Package format specification. This
                // means that the `module` property captures multiple formats, as old libraries
                // built with the old APF can still be processed. We detect the format by checking
                // the paths that should be used as per APF specification.
                if (typeof moduleFilePath === 'string' && moduleFilePath.includes('esm2015')) {
                    return "esm2015";
                }
                return 'esm5';
            default:
                return undefined;
        }
    }
    exports.getEntryPointFormat = getEntryPointFormat;
    /**
     * Parse the JSON from a `package.json` file.
     * @param packageJsonPath the absolute path to the `package.json` file.
     * @returns JSON from the `package.json` file if it is valid, `null` otherwise.
     */
    function loadPackageJson(fs, packageJsonPath) {
        try {
            return JSON.parse(fs.readFile(packageJsonPath));
        }
        catch (_a) {
            return null;
        }
    }
    function sniffModuleFormat(fs, sourceFilePath) {
        var resolvedPath = utils_1.resolveFileWithPostfixes(fs, sourceFilePath, ['', '.js', '/index.js']);
        if (resolvedPath === null) {
            return undefined;
        }
        var sourceFile = ts.createSourceFile(sourceFilePath, fs.readFile(resolvedPath), ts.ScriptTarget.ES5);
        if (sourceFile.statements.length === 0) {
            return undefined;
        }
        if (ts.isExternalModule(sourceFile)) {
            return 'esm5';
        }
        else if (umd_host_1.parseStatementForUmdModule(sourceFile.statements[0]) !== null) {
            return 'umd';
        }
        else {
            return 'commonjs';
        }
    }
    function mergeConfigAndPackageJson(fs, entryPointPackageJson, entryPointConfig, packagePath, entryPointPath) {
        if (entryPointPackageJson !== null) {
            return tslib_1.__assign(tslib_1.__assign({}, entryPointPackageJson), entryPointConfig.override);
        }
        else {
            var name = fs.basename(packagePath) + "/" + fs.relative(packagePath, entryPointPath);
            return tslib_1.__assign({ name: name }, entryPointConfig.override);
        }
    }
    function guessTypingsFromPackageJson(fs, entryPointPath, entryPointPackageJson) {
        var e_1, _a;
        try {
            for (var SUPPORTED_FORMAT_PROPERTIES_1 = tslib_1.__values(exports.SUPPORTED_FORMAT_PROPERTIES), SUPPORTED_FORMAT_PROPERTIES_1_1 = SUPPORTED_FORMAT_PROPERTIES_1.next(); !SUPPORTED_FORMAT_PROPERTIES_1_1.done; SUPPORTED_FORMAT_PROPERTIES_1_1 = SUPPORTED_FORMAT_PROPERTIES_1.next()) {
                var prop = SUPPORTED_FORMAT_PROPERTIES_1_1.value;
                var field = entryPointPackageJson[prop];
                if (typeof field !== 'string') {
                    // Some crazy packages have things like arrays in these fields!
                    continue;
                }
                var relativeTypingsPath = field.replace(/\.js$/, '.d.ts');
                var typingsPath = fs.resolve(entryPointPath, relativeTypingsPath);
                if (fs.exists(typingsPath)) {
                    return typingsPath;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (SUPPORTED_FORMAT_PROPERTIES_1_1 && !SUPPORTED_FORMAT_PROPERTIES_1_1.done && (_a = SUPPORTED_FORMAT_PROPERTIES_1.return)) _a.call(SUPPORTED_FORMAT_PROPERTIES_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    }
    /**
     * Find or infer the name and version of a package.
     *
     * - The name is computed based on the `name` property of the package's or the entry-point's
     *   `package.json` file (if available) or inferred from the package's path.
     * - The version is read off of the `version` property of the package's `package.json` file (if
     *   available).
     *
     * @param fs The file-system to use for processing `packagePath`.
     * @param packagePath the absolute path to the package.
     * @param packagePackageJson the parsed `package.json` of the package (if available).
     * @param entryPointPackageJson the parsed `package.json` of an entry-point (if available).
     * @returns the computed name and version of the package.
     */
    function getPackageNameAndVersion(fs, packagePath, packagePackageJson, entryPointPackageJson) {
        var _a;
        var packageName;
        if (packagePackageJson !== null) {
            // We have a valid `package.json` for the package: Get the package name from that.
            packageName = packagePackageJson.name;
        }
        else if (entryPointPackageJson !== null) {
            // We have a valid `package.json` for the entry-point: Get the package name from that.
            // This might be a secondary entry-point, so make sure we only keep the main package's name
            // (e.g. only keep `@angular/common` from `@angular/common/http`).
            packageName = /^(?:@[^/]+\/)?[^/]*/.exec(entryPointPackageJson.name)[0];
        }
        else {
            // We don't have a valid `package.json`: Infer the package name from the package's path.
            var lastSegment = fs.basename(packagePath);
            var secondLastSegment = fs.basename(fs.dirname(packagePath));
            packageName =
                secondLastSegment.startsWith('@') ? secondLastSegment + "/" + lastSegment : lastSegment;
        }
        return {
            packageName: packageName,
            packageVersion: (_a = packagePackageJson === null || packagePackageJson === void 0 ? void 0 : packagePackageJson.version) !== null && _a !== void 0 ? _a : null,
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvbmdjYy9zcmMvcGFja2FnZXMvZW50cnlfcG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUlqQyx5RUFBNEQ7SUFDNUQsOERBQWtEO0lBc0VsRCw0RkFBNEY7SUFDL0UsUUFBQSwyQkFBMkIsR0FDcEMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFHcEY7OztPQUdHO0lBQ1UsUUFBQSxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFFL0M7O09BRUc7SUFDVSxRQUFBLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBRXpEOztPQUVHO0lBQ1UsUUFBQSx3QkFBd0IsR0FBRywwQkFBMEIsQ0FBQztJQWVuRTs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxTQUFnQixpQkFBaUIsQ0FDN0IsRUFBc0IsRUFBRSxNQUF5QixFQUFFLE1BQWMsRUFBRSxXQUEyQixFQUM5RixjQUE4QjtRQUNoQyxJQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZFLElBQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDN0UsSUFBTSx3QkFBd0IsR0FBRyxlQUFlLENBQUMsRUFBRSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDN0UsSUFBTSwyQkFBMkIsR0FBRyxDQUFDLHNCQUFzQixLQUFLLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUN4Rix3QkFBd0IsQ0FBQyxDQUFDO1lBQzFCLGVBQWUsQ0FBQyxFQUFFLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUM3QyxJQUFBLEtBQWdDLHdCQUF3QixDQUMxRCxFQUFFLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLDJCQUEyQixDQUFDLEVBRHBFLFdBQVcsaUJBQUEsRUFBRSxjQUFjLG9CQUN5QyxDQUFDO1FBRTVFLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3hGLElBQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkUsSUFBSSxxQkFBNEMsQ0FBQztRQUVqRCxJQUFJLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtZQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUN6QyxtQ0FBbUM7Z0JBQ25DLE9BQU8sc0JBQWMsQ0FBQzthQUN2QjtpQkFBTSxJQUFJLDJCQUEyQixLQUFLLElBQUksRUFBRTtnQkFDL0Msa0ZBQWtGO2dCQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDLHVFQUNSLHlCQUEyQixDQUFDLENBQUM7Z0JBRWpDLE9BQU8sZ0NBQXdCLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wscUJBQXFCLEdBQUcsMkJBQTJCLENBQUM7YUFDckQ7U0FDRjthQUFNLElBQUksZ0JBQWdCLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUMzQyxrQ0FBa0M7WUFDbEMsT0FBTywyQkFBbUIsQ0FBQztTQUM1QjthQUFNO1lBQ0wscUJBQXFCLEdBQUcseUJBQXlCLENBQzdDLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDckY7UUFFRCxJQUFNLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLElBQUkscUJBQXFCLENBQUMsS0FBSztZQUN4RSwyQkFBMkIsQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDM0UsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsMENBQTBDO1lBQzFDLE9BQU8sZ0NBQXdCLENBQUM7U0FDakM7UUFFRCwwRUFBMEU7UUFDMUUsMkRBQTJEO1FBQzNELHlDQUF5QztRQUN6QyxJQUFNLFlBQVksR0FDZCxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25GLElBQU0saUJBQWlCLEdBQUcsZ0JBQWdCLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFcEYsSUFBTSxjQUFjLEdBQWU7WUFDakMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLElBQUk7WUFDaEMsSUFBSSxFQUFFLGNBQWM7WUFDcEIsV0FBVyxhQUFBO1lBQ1gsV0FBVyxhQUFBO1lBQ1gsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO1lBQzVDLGlCQUFpQixtQkFBQTtZQUNqQix5QkFBeUIsRUFDckIsZ0JBQWdCLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDekYscUJBQXFCLEVBQ2pCLGdCQUFnQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ3RGLENBQUM7UUFFRixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBbEVELDhDQWtFQztJQUVELFNBQWdCLFlBQVksQ0FBQyxNQUEyQjtRQUN0RCxPQUFPLE1BQU0sS0FBSyxzQkFBYyxJQUFJLE1BQU0sS0FBSyxnQ0FBd0I7WUFDbkUsTUFBTSxLQUFLLDJCQUFtQixDQUFDO0lBQ3JDLENBQUM7SUFIRCxvQ0FHQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBZ0IsbUJBQW1CLENBQy9CLEVBQXNCLEVBQUUsVUFBc0IsRUFDOUMsUUFBZ0M7UUFDbEMsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxVQUFVO2dCQUNiLE9BQU8sU0FBUyxDQUFDO1lBQ25CLEtBQUssT0FBTztnQkFDVixPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxTQUFTLENBQUM7WUFDbkIsS0FBSyxTQUFTO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ25CLEtBQUssTUFBTTtnQkFDVCxPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLFNBQVM7Z0JBQ1osSUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ25DLE9BQU8sU0FBUyxDQUFDO2lCQUNsQjtnQkFDRCxPQUFPLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0RSxLQUFLLE1BQU07Z0JBQ1QsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMxQixPQUFPLFNBQVMsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkUsS0FBSyxRQUFRO2dCQUNYLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hELDRFQUE0RTtnQkFDNUUsOEVBQThFO2dCQUM5RSwrRUFBK0U7Z0JBQy9FLGtGQUFrRjtnQkFDbEYsMERBQTBEO2dCQUMxRCxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUM1RSxPQUFPLFNBQVMsQ0FBQztpQkFDbEI7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEI7Z0JBQ0UsT0FBTyxTQUFTLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBeENELGtEQXdDQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLGVBQWUsQ0FDcEIsRUFBc0IsRUFBRSxlQUErQjtRQUN6RCxJQUFJO1lBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztTQUNqRDtRQUFDLFdBQU07WUFDTixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELFNBQVMsaUJBQWlCLENBQ3RCLEVBQXNCLEVBQUUsY0FBOEI7UUFDeEQsSUFBTSxZQUFZLEdBQUcsZ0NBQXdCLENBQUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1RixJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxJQUFNLFVBQVUsR0FDWixFQUFFLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN0QyxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLHFDQUEwQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDeEUsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsT0FBTyxVQUFVLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsU0FBUyx5QkFBeUIsQ0FDOUIsRUFBb0IsRUFBRSxxQkFBaUQsRUFDdkUsZ0JBQXNDLEVBQUUsV0FBMkIsRUFDbkUsY0FBOEI7UUFDaEMsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7WUFDbEMsNkNBQVcscUJBQXFCLEdBQUssZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1NBQ2pFO2FBQU07WUFDTCxJQUFNLElBQUksR0FBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBRyxDQUFDO1lBQ3ZGLDBCQUFRLElBQUksTUFBQSxJQUFLLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtTQUM3QztJQUNILENBQUM7SUFFRCxTQUFTLDJCQUEyQixDQUNoQyxFQUFzQixFQUFFLGNBQThCLEVBQ3RELHFCQUE0Qzs7O1lBQzlDLEtBQW1CLElBQUEsZ0NBQUEsaUJBQUEsbUNBQTJCLENBQUEsd0VBQUEsaUhBQUU7Z0JBQTNDLElBQU0sSUFBSSx3Q0FBQTtnQkFDYixJQUFNLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQzdCLCtEQUErRDtvQkFDL0QsU0FBUztpQkFDVjtnQkFDRCxJQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQzFCLE9BQU8sV0FBVyxDQUFDO2lCQUNwQjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsU0FBUyx3QkFBd0IsQ0FDN0IsRUFBb0IsRUFBRSxXQUEyQixFQUNqRCxrQkFBOEMsRUFDOUMscUJBQ0k7O1FBQ04sSUFBSSxXQUFtQixDQUFDO1FBRXhCLElBQUksa0JBQWtCLEtBQUssSUFBSSxFQUFFO1lBQy9CLGtGQUFrRjtZQUNsRixXQUFXLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7WUFDekMsc0ZBQXNGO1lBQ3RGLDJGQUEyRjtZQUMzRixrRUFBa0U7WUFDbEUsV0FBVyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRTthQUFNO1lBQ0wsd0ZBQXdGO1lBQ3hGLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUUvRCxXQUFXO2dCQUNQLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUksaUJBQWlCLFNBQUksV0FBYSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDN0Y7UUFFRCxPQUFPO1lBQ0wsV0FBVyxhQUFBO1lBQ1gsY0FBYyxRQUFFLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLE9BQU8sbUNBQUksSUFBSTtTQUNwRCxDQUFDO0lBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7QWJzb2x1dGVGc1BhdGgsIFBhdGhNYW5pcHVsYXRpb24sIFJlYWRvbmx5RmlsZVN5c3RlbX0gZnJvbSAnLi4vLi4vLi4vc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcbmltcG9ydCB7TG9nZ2VyfSBmcm9tICcuLi8uLi8uLi9zcmMvbmd0c2MvbG9nZ2luZyc7XG5pbXBvcnQge3BhcnNlU3RhdGVtZW50Rm9yVW1kTW9kdWxlfSBmcm9tICcuLi9ob3N0L3VtZF9ob3N0JztcbmltcG9ydCB7cmVzb2x2ZUZpbGVXaXRoUG9zdGZpeGVzfSBmcm9tICcuLi91dGlscyc7XG5cbmltcG9ydCB7TmdjY0NvbmZpZ3VyYXRpb24sIE5nY2NFbnRyeVBvaW50Q29uZmlnfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuXG4vKipcbiAqIFRoZSBwb3NzaWJsZSB2YWx1ZXMgZm9yIHRoZSBmb3JtYXQgb2YgYW4gZW50cnktcG9pbnQuXG4gKi9cbmV4cG9ydCB0eXBlIEVudHJ5UG9pbnRGb3JtYXQgPSAnZXNtNSd8J2VzbTIwMTUnfCd1bWQnfCdjb21tb25qcyc7XG5cbi8qKlxuICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgYW4gZW50cnktcG9pbnQsIGluY2x1ZGluZyBwYXRoc1xuICogdG8gZWFjaCBvZiB0aGUgcG9zc2libGUgZW50cnktcG9pbnQgZm9ybWF0cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRyeVBvaW50IGV4dGVuZHMgSnNvbk9iamVjdCB7XG4gIC8qKiBUaGUgbmFtZSBvZiB0aGUgZW50cnktcG9pbnQgKGUuZy4gYEBhbmd1bGFyL2NvcmVgIG9yIGBAYW5ndWxhci9jb21tb24vaHR0cGApLiAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKiBUaGUgcGF0aCB0byB0aGlzIGVudHJ5IHBvaW50LiAqL1xuICBwYXRoOiBBYnNvbHV0ZUZzUGF0aDtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRoYXQgY29udGFpbnMgdGhpcyBlbnRyeS1wb2ludCAoZS5nLiBgQGFuZ3VsYXIvY29yZWAgb3JcbiAgICogYEBhbmd1bGFyL2NvbW1vbmApLlxuICAgKi9cbiAgcGFja2FnZU5hbWU6IHN0cmluZztcbiAgLyoqIFRoZSBwYXRoIHRvIHRoZSBwYWNrYWdlIHRoYXQgY29udGFpbnMgdGhpcyBlbnRyeS1wb2ludC4gKi9cbiAgcGFja2FnZVBhdGg6IEFic29sdXRlRnNQYXRoO1xuICAvKiogVGhlIHBhcnNlZCBwYWNrYWdlLmpzb24gZmlsZSBmb3IgdGhpcyBlbnRyeS1wb2ludC4gKi9cbiAgcGFja2FnZUpzb246IEVudHJ5UG9pbnRQYWNrYWdlSnNvbjtcbiAgLyoqIFRoZSBwYXRoIHRvIGEgdHlwaW5ncyAoLmQudHMpIGZpbGUgZm9yIHRoaXMgZW50cnktcG9pbnQuICovXG4gIHR5cGluZ3M6IEFic29sdXRlRnNQYXRoO1xuICAvKiogSXMgdGhpcyBFbnRyeVBvaW50IGNvbXBpbGVkIHdpdGggdGhlIEFuZ3VsYXIgVmlldyBFbmdpbmUgY29tcGlsZXI/ICovXG4gIGNvbXBpbGVkQnlBbmd1bGFyOiBib29sZWFuO1xuICAvKiogU2hvdWxkIG5nY2MgaWdub3JlIG1pc3NpbmcgZGVwZW5kZW5jaWVzIGFuZCBwcm9jZXNzIHRoaXMgZW50cnlwb2ludCBhbnl3YXk/ICovXG4gIGlnbm9yZU1pc3NpbmdEZXBlbmRlbmNpZXM6IGJvb2xlYW47XG4gIC8qKiBTaG91bGQgbmdjYyBnZW5lcmF0ZSBkZWVwIHJlLWV4cG9ydHMgZm9yIHRoaXMgZW50cnlwb2ludD8gKi9cbiAgZ2VuZXJhdGVEZWVwUmVleHBvcnRzOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBKc29uUHJpbWl0aXZlID0gc3RyaW5nfG51bWJlcnxib29sZWFufG51bGw7XG5leHBvcnQgdHlwZSBKc29uVmFsdWUgPSBKc29uUHJpbWl0aXZlfEpzb25BcnJheXxKc29uT2JqZWN0fHVuZGVmaW5lZDtcbmV4cG9ydCBpbnRlcmZhY2UgSnNvbkFycmF5IGV4dGVuZHMgQXJyYXk8SnNvblZhbHVlPiB7fVxuZXhwb3J0IGludGVyZmFjZSBKc29uT2JqZWN0IHtcbiAgW2tleTogc3RyaW5nXTogSnNvblZhbHVlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhY2thZ2VKc29uRm9ybWF0UHJvcGVydGllc01hcCB7XG4gIGJyb3dzZXI/OiBzdHJpbmc7XG4gIGZlc20yMDE1Pzogc3RyaW5nO1xuICBmZXNtNT86IHN0cmluZztcbiAgZXMyMDE1Pzogc3RyaW5nOyAgLy8gaWYgZXhpc3RzIHRoZW4gaXQgaXMgYWN0dWFsbHkgRkVTTTIwMTVcbiAgZXNtMjAxNT86IHN0cmluZztcbiAgZXNtNT86IHN0cmluZztcbiAgbWFpbj86IHN0cmluZzsgICAgIC8vIFVNRFxuICBtb2R1bGU/OiBzdHJpbmc7ICAgLy8gaWYgZXhpc3RzIHRoZW4gaXQgaXMgYWN0dWFsbHkgRkVTTTVcbiAgdHlwZXM/OiBzdHJpbmc7ICAgIC8vIFN5bm9ueW1vdXMgdG8gYHR5cGluZ3NgIHByb3BlcnR5IC0gc2VlIGh0dHBzOi8vYml0Lmx5LzJPZ1dwMkhcbiAgdHlwaW5ncz86IHN0cmluZzsgIC8vIFR5cGVTY3JpcHQgLmQudHMgZmlsZXNcbn1cblxuZXhwb3J0IHR5cGUgUGFja2FnZUpzb25Gb3JtYXRQcm9wZXJ0aWVzID0ga2V5b2YgUGFja2FnZUpzb25Gb3JtYXRQcm9wZXJ0aWVzTWFwO1xuXG4vKipcbiAqIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbWF5IGJlIGxvYWRlZCBmcm9tIHRoZSBgcGFja2FnZS5qc29uYCBmaWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEVudHJ5UG9pbnRQYWNrYWdlSnNvbiBleHRlbmRzIEpzb25PYmplY3QsIFBhY2thZ2VKc29uRm9ybWF0UHJvcGVydGllc01hcCB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmVyc2lvbj86IHN0cmluZztcbiAgc2NyaXB0cz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIF9fcHJvY2Vzc2VkX2J5X2l2eV9uZ2NjX18/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG5leHBvcnQgdHlwZSBFbnRyeVBvaW50SnNvblByb3BlcnR5ID0gRXhjbHVkZTxQYWNrYWdlSnNvbkZvcm1hdFByb3BlcnRpZXMsICd0eXBlcyd8J3R5cGluZ3MnPjtcbi8vIFdlIG5lZWQgdG8ga2VlcCB0aGUgZWxlbWVudHMgb2YgdGhpcyBjb25zdCBhbmQgdGhlIGBFbnRyeVBvaW50SnNvblByb3BlcnR5YCB0eXBlIGluIHN5bmMuXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX0ZPUk1BVF9QUk9QRVJUSUVTOiBFbnRyeVBvaW50SnNvblByb3BlcnR5W10gPVxuICAgIFsnZmVzbTIwMTUnLCAnZmVzbTUnLCAnZXMyMDE1JywgJ2VzbTIwMTUnLCAnZXNtNScsICdtYWluJywgJ21vZHVsZScsICdicm93c2VyJ107XG5cblxuLyoqXG4gKiBUaGUgcGF0aCBkb2VzIG5vdCByZXByZXNlbnQgYW4gZW50cnktcG9pbnQsIGkuZS4gdGhlcmUgaXMgbm8gcGFja2FnZS5qc29uIGF0IHRoZSBwYXRoIGFuZCB0aGVyZVxuICogaXMgbm8gY29uZmlnIHRvIGZvcmNlIGFuIGVudHJ5LXBvaW50LlxuICovXG5leHBvcnQgY29uc3QgTk9fRU5UUllfUE9JTlQgPSAnbm8tZW50cnktcG9pbnQnO1xuXG4vKipcbiAqIFRoZSBwYXRoIHJlcHJlc2VudHMgYW4gZW50cnktcG9pbnQgdGhhdCBpcyBgaWdub3JlZGAgYnkgYW4gbmdjYyBjb25maWcuXG4gKi9cbmV4cG9ydCBjb25zdCBJR05PUkVEX0VOVFJZX1BPSU5UID0gJ2lnbm9yZWQtZW50cnktcG9pbnQnO1xuXG4vKipcbiAqIFRoZSBwYXRoIGhhcyBhIHBhY2thZ2UuanNvbiwgYnV0IGl0IGlzIG5vdCBhIHZhbGlkIGVudHJ5LXBvaW50IGZvciBuZ2NjIHByb2Nlc3NpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBJTkNPTVBBVElCTEVfRU5UUllfUE9JTlQgPSAnaW5jb21wYXRpYmxlLWVudHJ5LXBvaW50JztcblxuLyoqXG4gKiBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgYGdldEVudHJ5UG9pbnRJbmZvKClgLlxuICpcbiAqIFRoaXMgd2lsbCBiZSBhbiBgRW50cnlQb2ludGAgb2JqZWN0IGlmIGFuIEFuZ3VsYXIgZW50cnktcG9pbnQgd2FzIGlkZW50aWZpZWQ7XG4gKiBPdGhlcndpc2UgaXQgd2lsbCBiZSBhIGZsYWcgaW5kaWNhdGluZyBvbmUgb2Y6XG4gKiAqIE5PX0VOVFJZX1BPSU5UIC0gdGhlIHBhdGggaXMgbm90IGFuIGVudHJ5LXBvaW50IG9yIG5nY2MgaXMgY29uZmlndXJlZCB0byBpZ25vcmUgaXRcbiAqICogSU5DT01QQVRJQkxFX0VOVFJZX1BPSU5UIC0gdGhlIHBhdGggd2FzIGEgbm9uLXByb2Nlc3NhYmxlIGVudHJ5LXBvaW50IHRoYXQgc2hvdWxkIGJlIHNlYXJjaGVkXG4gKiBmb3Igc3ViLWVudHJ5LXBvaW50c1xuICovXG5leHBvcnQgdHlwZSBHZXRFbnRyeVBvaW50UmVzdWx0ID1cbiAgICBFbnRyeVBvaW50fHR5cGVvZiBJR05PUkVEX0VOVFJZX1BPSU5UfHR5cGVvZiBJTkNPTVBBVElCTEVfRU5UUllfUE9JTlR8dHlwZW9mIE5PX0VOVFJZX1BPSU5UO1xuXG5cbi8qKlxuICogVHJ5IHRvIGNyZWF0ZSBhbiBlbnRyeS1wb2ludCBmcm9tIHRoZSBnaXZlbiBwYXRocyBhbmQgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0gcGFja2FnZVBhdGggdGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGNvbnRhaW5pbmcgbnBtIHBhY2thZ2VcbiAqIEBwYXJhbSBlbnRyeVBvaW50UGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgcG90ZW50aWFsIGVudHJ5LXBvaW50LlxuICogQHJldHVybnNcbiAqIC0gQW4gZW50cnktcG9pbnQgaWYgaXQgaXMgdmFsaWQgYW5kIG5vdCBpZ25vcmVkLlxuICogLSBgTk9fRU5UUllfUE9JTlRgIHdoZW4gdGhlcmUgaXMgbm8gcGFja2FnZS5qc29uIGF0IHRoZSBwYXRoIGFuZCB0aGVyZSBpcyBubyBjb25maWcgdG8gZm9yY2UgYW5cbiAqICAgZW50cnktcG9pbnQsXG4gKiAtIGBJR05PUkVEX0VOVFJZX1BPSU5UYCB3aGVuIHRoZSBlbnRyeS1wb2ludCBpcyBpZ25vcmVkIGJ5IGFuIG5nY2MgY29uZmlnLlxuICogLSBgSU5DT01QQVRJQkxFX0VOVFJZX1BPSU5UYCB3aGVuIHRoZXJlIGlzIGEgcGFja2FnZS5qc29uIGJ1dCBpdCBpcyBub3QgYSB2YWxpZCBBbmd1bGFyIGNvbXBpbGVkXG4gKiAgIGVudHJ5LXBvaW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlQb2ludEluZm8oXG4gICAgZnM6IFJlYWRvbmx5RmlsZVN5c3RlbSwgY29uZmlnOiBOZ2NjQ29uZmlndXJhdGlvbiwgbG9nZ2VyOiBMb2dnZXIsIHBhY2thZ2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCxcbiAgICBlbnRyeVBvaW50UGF0aDogQWJzb2x1dGVGc1BhdGgpOiBHZXRFbnRyeVBvaW50UmVzdWx0IHtcbiAgY29uc3QgcGFja2FnZVBhY2thZ2VKc29uUGF0aCA9IGZzLnJlc29sdmUocGFja2FnZVBhdGgsICdwYWNrYWdlLmpzb24nKTtcbiAgY29uc3QgZW50cnlQb2ludFBhY2thZ2VKc29uUGF0aCA9IGZzLnJlc29sdmUoZW50cnlQb2ludFBhdGgsICdwYWNrYWdlLmpzb24nKTtcbiAgY29uc3QgbG9hZGVkUGFja2FnZVBhY2thZ2VKc29uID0gbG9hZFBhY2thZ2VKc29uKGZzLCBwYWNrYWdlUGFja2FnZUpzb25QYXRoKTtcbiAgY29uc3QgbG9hZGVkRW50cnlQb2ludFBhY2thZ2VKc29uID0gKHBhY2thZ2VQYWNrYWdlSnNvblBhdGggPT09IGVudHJ5UG9pbnRQYWNrYWdlSnNvblBhdGgpID9cbiAgICAgIGxvYWRlZFBhY2thZ2VQYWNrYWdlSnNvbiA6XG4gICAgICBsb2FkUGFja2FnZUpzb24oZnMsIGVudHJ5UG9pbnRQYWNrYWdlSnNvblBhdGgpO1xuICBjb25zdCB7cGFja2FnZU5hbWUsIHBhY2thZ2VWZXJzaW9ufSA9IGdldFBhY2thZ2VOYW1lQW5kVmVyc2lvbihcbiAgICAgIGZzLCBwYWNrYWdlUGF0aCwgbG9hZGVkUGFja2FnZVBhY2thZ2VKc29uLCBsb2FkZWRFbnRyeVBvaW50UGFja2FnZUpzb24pO1xuXG4gIGNvbnN0IHBhY2thZ2VDb25maWcgPSBjb25maWcuZ2V0UGFja2FnZUNvbmZpZyhwYWNrYWdlTmFtZSwgcGFja2FnZVBhdGgsIHBhY2thZ2VWZXJzaW9uKTtcbiAgY29uc3QgZW50cnlQb2ludENvbmZpZyA9IHBhY2thZ2VDb25maWcuZW50cnlQb2ludHMuZ2V0KGVudHJ5UG9pbnRQYXRoKTtcbiAgbGV0IGVudHJ5UG9pbnRQYWNrYWdlSnNvbjogRW50cnlQb2ludFBhY2thZ2VKc29uO1xuXG4gIGlmIChlbnRyeVBvaW50Q29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoIWZzLmV4aXN0cyhlbnRyeVBvaW50UGFja2FnZUpzb25QYXRoKSkge1xuICAgICAgLy8gTm8gYHBhY2thZ2UuanNvbmAgYW5kIG5vIGNvbmZpZy5cbiAgICAgIHJldHVybiBOT19FTlRSWV9QT0lOVDtcbiAgICB9IGVsc2UgaWYgKGxvYWRlZEVudHJ5UG9pbnRQYWNrYWdlSnNvbiA9PT0gbnVsbCkge1xuICAgICAgLy8gYHBhY2thZ2UuanNvbmAgZXhpc3RzIGJ1dCBjb3VsZCBub3QgYmUgcGFyc2VkIGFuZCB0aGVyZSBpcyBubyByZWRlZW1pbmcgY29uZmlnLlxuICAgICAgbG9nZ2VyLndhcm4oYEZhaWxlZCB0byByZWFkIGVudHJ5IHBvaW50IGluZm8gZnJvbSBpbnZhbGlkICdwYWNrYWdlLmpzb24nIGZpbGU6ICR7XG4gICAgICAgICAgZW50cnlQb2ludFBhY2thZ2VKc29uUGF0aH1gKTtcblxuICAgICAgcmV0dXJuIElOQ09NUEFUSUJMRV9FTlRSWV9QT0lOVDtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50cnlQb2ludFBhY2thZ2VKc29uID0gbG9hZGVkRW50cnlQb2ludFBhY2thZ2VKc29uO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlbnRyeVBvaW50Q29uZmlnLmlnbm9yZSA9PT0gdHJ1ZSkge1xuICAgIC8vIEV4cGxpY2l0bHkgaWdub3JlZCBlbnRyeS1wb2ludC5cbiAgICByZXR1cm4gSUdOT1JFRF9FTlRSWV9QT0lOVDtcbiAgfSBlbHNlIHtcbiAgICBlbnRyeVBvaW50UGFja2FnZUpzb24gPSBtZXJnZUNvbmZpZ0FuZFBhY2thZ2VKc29uKFxuICAgICAgICBmcywgbG9hZGVkRW50cnlQb2ludFBhY2thZ2VKc29uLCBlbnRyeVBvaW50Q29uZmlnLCBwYWNrYWdlUGF0aCwgZW50cnlQb2ludFBhdGgpO1xuICB9XG5cbiAgY29uc3QgdHlwaW5ncyA9IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi50eXBpbmdzIHx8IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi50eXBlcyB8fFxuICAgICAgZ3Vlc3NUeXBpbmdzRnJvbVBhY2thZ2VKc29uKGZzLCBlbnRyeVBvaW50UGF0aCwgZW50cnlQb2ludFBhY2thZ2VKc29uKTtcbiAgaWYgKHR5cGVvZiB0eXBpbmdzICE9PSAnc3RyaW5nJykge1xuICAgIC8vIE1pc3NpbmcgdGhlIHJlcXVpcmVkIGB0eXBpbmdzYCBwcm9wZXJ0eVxuICAgIHJldHVybiBJTkNPTVBBVElCTEVfRU5UUllfUE9JTlQ7XG4gIH1cblxuICAvLyBBbiBlbnRyeS1wb2ludCBpcyBhc3N1bWVkIHRvIGJlIGNvbXBpbGVkIGJ5IEFuZ3VsYXIgaWYgdGhlcmUgaXMgZWl0aGVyOlxuICAvLyAqIGEgYG1ldGFkYXRhLmpzb25gIGZpbGUgbmV4dCB0byB0aGUgdHlwaW5ncyBlbnRyeS1wb2ludFxuICAvLyAqIGEgY3VzdG9tIGNvbmZpZyBmb3IgdGhpcyBlbnRyeS1wb2ludFxuICBjb25zdCBtZXRhZGF0YVBhdGggPVxuICAgICAgZnMucmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgdHlwaW5ncy5yZXBsYWNlKC9cXC5kXFwudHMkLywgJycpICsgJy5tZXRhZGF0YS5qc29uJyk7XG4gIGNvbnN0IGNvbXBpbGVkQnlBbmd1bGFyID0gZW50cnlQb2ludENvbmZpZyAhPT0gdW5kZWZpbmVkIHx8IGZzLmV4aXN0cyhtZXRhZGF0YVBhdGgpO1xuXG4gIGNvbnN0IGVudHJ5UG9pbnRJbmZvOiBFbnRyeVBvaW50ID0ge1xuICAgIG5hbWU6IGVudHJ5UG9pbnRQYWNrYWdlSnNvbi5uYW1lLFxuICAgIHBhdGg6IGVudHJ5UG9pbnRQYXRoLFxuICAgIHBhY2thZ2VOYW1lLFxuICAgIHBhY2thZ2VQYXRoLFxuICAgIHBhY2thZ2VKc29uOiBlbnRyeVBvaW50UGFja2FnZUpzb24sXG4gICAgdHlwaW5nczogZnMucmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgdHlwaW5ncyksXG4gICAgY29tcGlsZWRCeUFuZ3VsYXIsXG4gICAgaWdub3JlTWlzc2luZ0RlcGVuZGVuY2llczpcbiAgICAgICAgZW50cnlQb2ludENvbmZpZyAhPT0gdW5kZWZpbmVkID8gISFlbnRyeVBvaW50Q29uZmlnLmlnbm9yZU1pc3NpbmdEZXBlbmRlbmNpZXMgOiBmYWxzZSxcbiAgICBnZW5lcmF0ZURlZXBSZWV4cG9ydHM6XG4gICAgICAgIGVudHJ5UG9pbnRDb25maWcgIT09IHVuZGVmaW5lZCA/ICEhZW50cnlQb2ludENvbmZpZy5nZW5lcmF0ZURlZXBSZWV4cG9ydHMgOiBmYWxzZSxcbiAgfTtcblxuICByZXR1cm4gZW50cnlQb2ludEluZm87XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudHJ5UG9pbnQocmVzdWx0OiBHZXRFbnRyeVBvaW50UmVzdWx0KTogcmVzdWx0IGlzIEVudHJ5UG9pbnQge1xuICByZXR1cm4gcmVzdWx0ICE9PSBOT19FTlRSWV9QT0lOVCAmJiByZXN1bHQgIT09IElOQ09NUEFUSUJMRV9FTlRSWV9QT0lOVCAmJlxuICAgICAgcmVzdWx0ICE9PSBJR05PUkVEX0VOVFJZX1BPSU5UO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBwYWNrYWdlLmpzb24gcHJvcGVydHkgaW50byBhbiBlbnRyeS1wb2ludCBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHByb3BlcnR5IFRoZSBwcm9wZXJ0eSB0byBjb252ZXJ0IHRvIGEgZm9ybWF0LlxuICogQHJldHVybnMgQW4gZW50cnktcG9pbnQgZm9ybWF0IG9yIGB1bmRlZmluZWRgIGlmIG5vbmUgbWF0Y2ggdGhlIGdpdmVuIHByb3BlcnR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlQb2ludEZvcm1hdChcbiAgICBmczogUmVhZG9ubHlGaWxlU3lzdGVtLCBlbnRyeVBvaW50OiBFbnRyeVBvaW50LFxuICAgIHByb3BlcnR5OiBFbnRyeVBvaW50SnNvblByb3BlcnR5KTogRW50cnlQb2ludEZvcm1hdHx1bmRlZmluZWQge1xuICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgY2FzZSAnZmVzbTIwMTUnOlxuICAgICAgcmV0dXJuICdlc20yMDE1JztcbiAgICBjYXNlICdmZXNtNSc6XG4gICAgICByZXR1cm4gJ2VzbTUnO1xuICAgIGNhc2UgJ2VzMjAxNSc6XG4gICAgICByZXR1cm4gJ2VzbTIwMTUnO1xuICAgIGNhc2UgJ2VzbTIwMTUnOlxuICAgICAgcmV0dXJuICdlc20yMDE1JztcbiAgICBjYXNlICdlc201JzpcbiAgICAgIHJldHVybiAnZXNtNSc7XG4gICAgY2FzZSAnYnJvd3Nlcic6XG4gICAgICBjb25zdCBicm93c2VyRmlsZSA9IGVudHJ5UG9pbnQucGFja2FnZUpzb25bJ2Jyb3dzZXInXTtcbiAgICAgIGlmICh0eXBlb2YgYnJvd3NlckZpbGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gc25pZmZNb2R1bGVGb3JtYXQoZnMsIGZzLmpvaW4oZW50cnlQb2ludC5wYXRoLCBicm93c2VyRmlsZSkpO1xuICAgIGNhc2UgJ21haW4nOlxuICAgICAgY29uc3QgbWFpbkZpbGUgPSBlbnRyeVBvaW50LnBhY2thZ2VKc29uWydtYWluJ107XG4gICAgICBpZiAobWFpbkZpbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNuaWZmTW9kdWxlRm9ybWF0KGZzLCBmcy5qb2luKGVudHJ5UG9pbnQucGF0aCwgbWFpbkZpbGUpKTtcbiAgICBjYXNlICdtb2R1bGUnOlxuICAgICAgY29uc3QgbW9kdWxlRmlsZVBhdGggPSBlbnRyeVBvaW50LnBhY2thZ2VKc29uWydtb2R1bGUnXTtcbiAgICAgIC8vIEFzIG9mIHZlcnNpb24gMTAsIHRoZSBgbW9kdWxlYCBwcm9wZXJ0eSBpbiBgcGFja2FnZS5qc29uYCBzaG91bGQgcG9pbnQgdG9cbiAgICAgIC8vIHRoZSBFU00yMDE1IGZvcm1hdCBvdXRwdXQgYXMgcGVyIEFuZ3VsYXIgUGFja2FnZSBmb3JtYXQgc3BlY2lmaWNhdGlvbi4gVGhpc1xuICAgICAgLy8gbWVhbnMgdGhhdCB0aGUgYG1vZHVsZWAgcHJvcGVydHkgY2FwdHVyZXMgbXVsdGlwbGUgZm9ybWF0cywgYXMgb2xkIGxpYnJhcmllc1xuICAgICAgLy8gYnVpbHQgd2l0aCB0aGUgb2xkIEFQRiBjYW4gc3RpbGwgYmUgcHJvY2Vzc2VkLiBXZSBkZXRlY3QgdGhlIGZvcm1hdCBieSBjaGVja2luZ1xuICAgICAgLy8gdGhlIHBhdGhzIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgcGVyIEFQRiBzcGVjaWZpY2F0aW9uLlxuICAgICAgaWYgKHR5cGVvZiBtb2R1bGVGaWxlUGF0aCA9PT0gJ3N0cmluZycgJiYgbW9kdWxlRmlsZVBhdGguaW5jbHVkZXMoJ2VzbTIwMTUnKSkge1xuICAgICAgICByZXR1cm4gYGVzbTIwMTVgO1xuICAgICAgfVxuICAgICAgcmV0dXJuICdlc201JztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBKU09OIGZyb20gYSBgcGFja2FnZS5qc29uYCBmaWxlLlxuICogQHBhcmFtIHBhY2thZ2VKc29uUGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgYHBhY2thZ2UuanNvbmAgZmlsZS5cbiAqIEByZXR1cm5zIEpTT04gZnJvbSB0aGUgYHBhY2thZ2UuanNvbmAgZmlsZSBpZiBpdCBpcyB2YWxpZCwgYG51bGxgIG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gbG9hZFBhY2thZ2VKc29uKFxuICAgIGZzOiBSZWFkb25seUZpbGVTeXN0ZW0sIHBhY2thZ2VKc29uUGF0aDogQWJzb2x1dGVGc1BhdGgpOiBFbnRyeVBvaW50UGFja2FnZUpzb258bnVsbCB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGUocGFja2FnZUpzb25QYXRoKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNuaWZmTW9kdWxlRm9ybWF0KFxuICAgIGZzOiBSZWFkb25seUZpbGVTeXN0ZW0sIHNvdXJjZUZpbGVQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IEVudHJ5UG9pbnRGb3JtYXR8dW5kZWZpbmVkIHtcbiAgY29uc3QgcmVzb2x2ZWRQYXRoID0gcmVzb2x2ZUZpbGVXaXRoUG9zdGZpeGVzKGZzLCBzb3VyY2VGaWxlUGF0aCwgWycnLCAnLmpzJywgJy9pbmRleC5qcyddKTtcbiAgaWYgKHJlc29sdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBzb3VyY2VGaWxlID1cbiAgICAgIHRzLmNyZWF0ZVNvdXJjZUZpbGUoc291cmNlRmlsZVBhdGgsIGZzLnJlYWRGaWxlKHJlc29sdmVkUGF0aCksIHRzLlNjcmlwdFRhcmdldC5FUzUpO1xuICBpZiAoc291cmNlRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKHRzLmlzRXh0ZXJuYWxNb2R1bGUoc291cmNlRmlsZSkpIHtcbiAgICByZXR1cm4gJ2VzbTUnO1xuICB9IGVsc2UgaWYgKHBhcnNlU3RhdGVtZW50Rm9yVW1kTW9kdWxlKHNvdXJjZUZpbGUuc3RhdGVtZW50c1swXSkgIT09IG51bGwpIHtcbiAgICByZXR1cm4gJ3VtZCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdjb21tb25qcyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VDb25maWdBbmRQYWNrYWdlSnNvbihcbiAgICBmczogUGF0aE1hbmlwdWxhdGlvbiwgZW50cnlQb2ludFBhY2thZ2VKc29uOiBFbnRyeVBvaW50UGFja2FnZUpzb258bnVsbCxcbiAgICBlbnRyeVBvaW50Q29uZmlnOiBOZ2NjRW50cnlQb2ludENvbmZpZywgcGFja2FnZVBhdGg6IEFic29sdXRlRnNQYXRoLFxuICAgIGVudHJ5UG9pbnRQYXRoOiBBYnNvbHV0ZUZzUGF0aCk6IEVudHJ5UG9pbnRQYWNrYWdlSnNvbiB7XG4gIGlmIChlbnRyeVBvaW50UGFja2FnZUpzb24gIT09IG51bGwpIHtcbiAgICByZXR1cm4gey4uLmVudHJ5UG9pbnRQYWNrYWdlSnNvbiwgLi4uZW50cnlQb2ludENvbmZpZy5vdmVycmlkZX07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbmFtZSA9IGAke2ZzLmJhc2VuYW1lKHBhY2thZ2VQYXRoKX0vJHtmcy5yZWxhdGl2ZShwYWNrYWdlUGF0aCwgZW50cnlQb2ludFBhdGgpfWA7XG4gICAgcmV0dXJuIHtuYW1lLCAuLi5lbnRyeVBvaW50Q29uZmlnLm92ZXJyaWRlfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBndWVzc1R5cGluZ3NGcm9tUGFja2FnZUpzb24oXG4gICAgZnM6IFJlYWRvbmx5RmlsZVN5c3RlbSwgZW50cnlQb2ludFBhdGg6IEFic29sdXRlRnNQYXRoLFxuICAgIGVudHJ5UG9pbnRQYWNrYWdlSnNvbjogRW50cnlQb2ludFBhY2thZ2VKc29uKTogQWJzb2x1dGVGc1BhdGh8bnVsbCB7XG4gIGZvciAoY29uc3QgcHJvcCBvZiBTVVBQT1JURURfRk9STUFUX1BST1BFUlRJRVMpIHtcbiAgICBjb25zdCBmaWVsZCA9IGVudHJ5UG9pbnRQYWNrYWdlSnNvbltwcm9wXTtcbiAgICBpZiAodHlwZW9mIGZpZWxkICE9PSAnc3RyaW5nJykge1xuICAgICAgLy8gU29tZSBjcmF6eSBwYWNrYWdlcyBoYXZlIHRoaW5ncyBsaWtlIGFycmF5cyBpbiB0aGVzZSBmaWVsZHMhXG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3QgcmVsYXRpdmVUeXBpbmdzUGF0aCA9IGZpZWxkLnJlcGxhY2UoL1xcLmpzJC8sICcuZC50cycpO1xuICAgIGNvbnN0IHR5cGluZ3NQYXRoID0gZnMucmVzb2x2ZShlbnRyeVBvaW50UGF0aCwgcmVsYXRpdmVUeXBpbmdzUGF0aCk7XG4gICAgaWYgKGZzLmV4aXN0cyh0eXBpbmdzUGF0aCkpIHtcbiAgICAgIHJldHVybiB0eXBpbmdzUGF0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogRmluZCBvciBpbmZlciB0aGUgbmFtZSBhbmQgdmVyc2lvbiBvZiBhIHBhY2thZ2UuXG4gKlxuICogLSBUaGUgbmFtZSBpcyBjb21wdXRlZCBiYXNlZCBvbiB0aGUgYG5hbWVgIHByb3BlcnR5IG9mIHRoZSBwYWNrYWdlJ3Mgb3IgdGhlIGVudHJ5LXBvaW50J3NcbiAqICAgYHBhY2thZ2UuanNvbmAgZmlsZSAoaWYgYXZhaWxhYmxlKSBvciBpbmZlcnJlZCBmcm9tIHRoZSBwYWNrYWdlJ3MgcGF0aC5cbiAqIC0gVGhlIHZlcnNpb24gaXMgcmVhZCBvZmYgb2YgdGhlIGB2ZXJzaW9uYCBwcm9wZXJ0eSBvZiB0aGUgcGFja2FnZSdzIGBwYWNrYWdlLmpzb25gIGZpbGUgKGlmXG4gKiAgIGF2YWlsYWJsZSkuXG4gKlxuICogQHBhcmFtIGZzIFRoZSBmaWxlLXN5c3RlbSB0byB1c2UgZm9yIHByb2Nlc3NpbmcgYHBhY2thZ2VQYXRoYC5cbiAqIEBwYXJhbSBwYWNrYWdlUGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgcGFja2FnZS5cbiAqIEBwYXJhbSBwYWNrYWdlUGFja2FnZUpzb24gdGhlIHBhcnNlZCBgcGFja2FnZS5qc29uYCBvZiB0aGUgcGFja2FnZSAoaWYgYXZhaWxhYmxlKS5cbiAqIEBwYXJhbSBlbnRyeVBvaW50UGFja2FnZUpzb24gdGhlIHBhcnNlZCBgcGFja2FnZS5qc29uYCBvZiBhbiBlbnRyeS1wb2ludCAoaWYgYXZhaWxhYmxlKS5cbiAqIEByZXR1cm5zIHRoZSBjb21wdXRlZCBuYW1lIGFuZCB2ZXJzaW9uIG9mIHRoZSBwYWNrYWdlLlxuICovXG5mdW5jdGlvbiBnZXRQYWNrYWdlTmFtZUFuZFZlcnNpb24oXG4gICAgZnM6IFBhdGhNYW5pcHVsYXRpb24sIHBhY2thZ2VQYXRoOiBBYnNvbHV0ZUZzUGF0aCxcbiAgICBwYWNrYWdlUGFja2FnZUpzb246IEVudHJ5UG9pbnRQYWNrYWdlSnNvbnxudWxsLFxuICAgIGVudHJ5UG9pbnRQYWNrYWdlSnNvbjogRW50cnlQb2ludFBhY2thZ2VKc29ufFxuICAgIG51bGwpOiB7cGFja2FnZU5hbWU6IHN0cmluZywgcGFja2FnZVZlcnNpb246IHN0cmluZ3xudWxsfSB7XG4gIGxldCBwYWNrYWdlTmFtZTogc3RyaW5nO1xuXG4gIGlmIChwYWNrYWdlUGFja2FnZUpzb24gIT09IG51bGwpIHtcbiAgICAvLyBXZSBoYXZlIGEgdmFsaWQgYHBhY2thZ2UuanNvbmAgZm9yIHRoZSBwYWNrYWdlOiBHZXQgdGhlIHBhY2thZ2UgbmFtZSBmcm9tIHRoYXQuXG4gICAgcGFja2FnZU5hbWUgPSBwYWNrYWdlUGFja2FnZUpzb24ubmFtZTtcbiAgfSBlbHNlIGlmIChlbnRyeVBvaW50UGFja2FnZUpzb24gIT09IG51bGwpIHtcbiAgICAvLyBXZSBoYXZlIGEgdmFsaWQgYHBhY2thZ2UuanNvbmAgZm9yIHRoZSBlbnRyeS1wb2ludDogR2V0IHRoZSBwYWNrYWdlIG5hbWUgZnJvbSB0aGF0LlxuICAgIC8vIFRoaXMgbWlnaHQgYmUgYSBzZWNvbmRhcnkgZW50cnktcG9pbnQsIHNvIG1ha2Ugc3VyZSB3ZSBvbmx5IGtlZXAgdGhlIG1haW4gcGFja2FnZSdzIG5hbWVcbiAgICAvLyAoZS5nLiBvbmx5IGtlZXAgYEBhbmd1bGFyL2NvbW1vbmAgZnJvbSBgQGFuZ3VsYXIvY29tbW9uL2h0dHBgKS5cbiAgICBwYWNrYWdlTmFtZSA9IC9eKD86QFteL10rXFwvKT9bXi9dKi8uZXhlYyhlbnRyeVBvaW50UGFja2FnZUpzb24ubmFtZSkhWzBdO1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIGRvbid0IGhhdmUgYSB2YWxpZCBgcGFja2FnZS5qc29uYDogSW5mZXIgdGhlIHBhY2thZ2UgbmFtZSBmcm9tIHRoZSBwYWNrYWdlJ3MgcGF0aC5cbiAgICBjb25zdCBsYXN0U2VnbWVudCA9IGZzLmJhc2VuYW1lKHBhY2thZ2VQYXRoKTtcbiAgICBjb25zdCBzZWNvbmRMYXN0U2VnbWVudCA9IGZzLmJhc2VuYW1lKGZzLmRpcm5hbWUocGFja2FnZVBhdGgpKTtcblxuICAgIHBhY2thZ2VOYW1lID1cbiAgICAgICAgc2Vjb25kTGFzdFNlZ21lbnQuc3RhcnRzV2l0aCgnQCcpID8gYCR7c2Vjb25kTGFzdFNlZ21lbnR9LyR7bGFzdFNlZ21lbnR9YCA6IGxhc3RTZWdtZW50O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYWNrYWdlTmFtZSxcbiAgICBwYWNrYWdlVmVyc2lvbjogcGFja2FnZVBhY2thZ2VKc29uPy52ZXJzaW9uID8/IG51bGwsXG4gIH07XG59XG4iXX0=