"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackResourceLoader = void 0;
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: fix typings.
// tslint:disable-next-line:no-global-tslint-disable
// tslint:disable:no-any
const path = require("path");
const vm = require("vm");
const webpack_sources_1 = require("webpack-sources");
const paths_1 = require("./ivy/paths");
const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
class WebpackResourceLoader {
    constructor() {
        this._context = '';
        this._fileDependencies = new Map();
        this._reverseDependencies = new Map();
        this._cachedSources = new Map();
        this._cachedEvaluatedSources = new Map();
    }
    update(parentCompilation, changedFiles) {
        this._parentCompilation = parentCompilation;
        this._context = parentCompilation.context;
        // Update changed file list
        this.changedFiles = changedFiles;
    }
    getModifiedResourceFiles() {
        const modifiedResources = new Set();
        if (!this.changedFiles) {
            return modifiedResources;
        }
        for (const changedFile of this.changedFiles) {
            this.getAffectedResources(changedFile).forEach((affected) => modifiedResources.add(affected));
        }
        return modifiedResources;
    }
    getResourceDependencies(filePath) {
        return this._fileDependencies.get(filePath) || [];
    }
    getAffectedResources(file) {
        return this._reverseDependencies.get(file) || [];
    }
    setAffectedResources(file, resources) {
        this._reverseDependencies.set(file, new Set(resources));
    }
    async _compile(filePath) {
        if (!this._parentCompilation) {
            throw new Error('WebpackResourceLoader cannot be used without parentCompilation');
        }
        // Simple sanity check.
        if (filePath.match(/\.[jt]s$/)) {
            return Promise.reject(`Cannot use a JavaScript or TypeScript file (${filePath}) in a component's styleUrls or templateUrl.`);
        }
        const outputOptions = { filename: filePath };
        const relativePath = path.relative(this._context || '', filePath);
        const childCompiler = this._parentCompilation.createChildCompiler(relativePath, outputOptions);
        childCompiler.context = this._context;
        new NodeTemplatePlugin(outputOptions).apply(childCompiler);
        new NodeTargetPlugin().apply(childCompiler);
        new SingleEntryPlugin(this._context, filePath).apply(childCompiler);
        new LibraryTemplatePlugin('resource', 'var').apply(childCompiler);
        childCompiler.hooks.thisCompilation.tap('ngtools-webpack', (compilation) => {
            compilation.hooks.additionalAssets.tapAsync('ngtools-webpack', (callback) => {
                if (this._cachedEvaluatedSources.has(compilation.fullHash)) {
                    const cachedEvaluatedSource = this._cachedEvaluatedSources.get(compilation.fullHash);
                    compilation.assets[filePath] = cachedEvaluatedSource;
                    callback();
                    return;
                }
                const asset = compilation.assets[filePath];
                if (asset) {
                    this._evaluate({ outputName: filePath, source: asset.source() })
                        .then(output => {
                        const evaluatedSource = new webpack_sources_1.RawSource(output);
                        this._cachedEvaluatedSources.set(compilation.fullHash, evaluatedSource);
                        compilation.assets[filePath] = evaluatedSource;
                        callback();
                    })
                        .catch(err => callback(err));
                }
                else {
                    callback();
                }
            });
        });
        // Compile and return a promise
        const childCompilation = await new Promise((resolve, reject) => {
            childCompiler.compile((err, childCompilation) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(childCompilation);
                }
            });
        });
        // Propagate warnings to parent compilation.
        const { warnings, errors } = childCompilation;
        if (warnings && warnings.length) {
            this._parentCompilation.warnings.push(...warnings);
        }
        if (errors && errors.length) {
            this._parentCompilation.errors.push(...errors);
        }
        Object.keys(childCompilation.assets).forEach(assetName => {
            // Add all new assets to the parent compilation, with the exception of
            // the file we're loading and its sourcemap.
            if (assetName !== filePath
                && assetName !== `${filePath}.map`
                && this._parentCompilation.assets[assetName] == undefined) {
                this._parentCompilation.assets[assetName] = childCompilation.assets[assetName];
            }
        });
        // Save the dependencies for this resource.
        this._fileDependencies.set(filePath, new Set(childCompilation.fileDependencies));
        for (const file of childCompilation.fileDependencies) {
            const resolvedFile = paths_1.normalizePath(file);
            const entry = this._reverseDependencies.get(resolvedFile);
            if (entry) {
                entry.add(filePath);
            }
            else {
                this._reverseDependencies.set(resolvedFile, new Set([filePath]));
            }
        }
        const compilationHash = childCompilation.fullHash;
        const maybeSource = this._cachedSources.get(compilationHash);
        if (maybeSource) {
            return { outputName: filePath, source: maybeSource };
        }
        else {
            const source = childCompilation.assets[filePath].source();
            this._cachedSources.set(compilationHash, source);
            return { outputName: filePath, source };
        }
    }
    async _evaluate({ outputName, source }) {
        var _a;
        // Evaluate code
        const context = {};
        vm.runInNewContext(source, context, { filename: outputName });
        if (typeof context.resource === 'string') {
            return context.resource;
        }
        else if (typeof ((_a = context.resource) === null || _a === void 0 ? void 0 : _a.default) === 'string') {
            return context.resource.default;
        }
        throw new Error(`The loader "${outputName}" didn't return a string.`);
    }
    get(filePath) {
        return this._compile(filePath)
            .then((result) => result.source);
    }
}
exports.WebpackResourceLoader = WebpackResourceLoader;
