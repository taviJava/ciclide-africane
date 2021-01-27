"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetsByBuilderName = exports.getProjectTargetOptions = exports.defaultTargetBuilders = void 0;
const schematics_1 = require("@angular-devkit/schematics");
/** Object that maps a CLI target to its default builder name. */
exports.defaultTargetBuilders = {
    build: '@angular-devkit/build-angular:browser',
    test: '@angular-devkit/build-angular:karma',
};
/** Resolves the architect options for the build target of the given project. */
function getProjectTargetOptions(project, buildTarget) {
    var _a, _b;
    const options = (_b = (_a = project.targets) === null || _a === void 0 ? void 0 : _a.get(buildTarget)) === null || _b === void 0 ? void 0 : _b.options;
    if (!options) {
        throw new schematics_1.SchematicsException(`Cannot determine project target configuration for: ${buildTarget}.`);
    }
    return options;
}
exports.getProjectTargetOptions = getProjectTargetOptions;
/** Gets all targets from the given project that match the specified builder name. */
function getTargetsByBuilderName(project, builderName) {
    return Array.from(project.targets.keys())
        .filter(name => { var _a; return ((_a = project.targets.get(name)) === null || _a === void 0 ? void 0 : _a.builder) === builderName; })
        .map(name => project.targets.get(name));
}
exports.getTargetsByBuilderName = getTargetsByBuilderName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC10YXJnZXRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9zY2hlbWF0aWNzL3V0aWxzL3Byb2plY3QtdGFyZ2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFJSCwyREFBK0Q7QUFFL0QsaUVBQWlFO0FBQ3BELFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsS0FBSyxFQUFFLHVDQUF1QztJQUM5QyxJQUFJLEVBQUUscUNBQXFDO0NBQzVDLENBQUM7QUFFRixnRkFBZ0Y7QUFDaEYsU0FBZ0IsdUJBQXVCLENBQUMsT0FBMEIsRUFBRSxXQUFtQjs7SUFFckYsTUFBTSxPQUFPLGVBQUcsT0FBTyxDQUFDLE9BQU8sMENBQUUsR0FBRyxDQUFDLFdBQVcsMkNBQUcsT0FBTyxDQUFDO0lBRTNELElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixNQUFNLElBQUksZ0NBQW1CLENBQzNCLHNEQUFzRCxXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQ3pFO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVZELDBEQVVDO0FBRUQscUZBQXFGO0FBQ3JGLFNBQWdCLHVCQUF1QixDQUNuQyxPQUEwQixFQUFFLFdBQW1CO0lBQ2pELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFDLE9BQUEsT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsMENBQUUsT0FBTyxNQUFLLFdBQVcsQ0FBQSxFQUFBLENBQUM7U0FDbEUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQztBQUMvQyxDQUFDO0FBTEQsMERBS0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQcm9qZWN0RGVmaW5pdGlvbiwgVGFyZ2V0RGVmaW5pdGlvbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUvc3JjL3dvcmtzcGFjZSc7XG5pbXBvcnQge0pzb25WYWx1ZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtTY2hlbWF0aWNzRXhjZXB0aW9ufSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbi8qKiBPYmplY3QgdGhhdCBtYXBzIGEgQ0xJIHRhcmdldCB0byBpdHMgZGVmYXVsdCBidWlsZGVyIG5hbWUuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFRhcmdldEJ1aWxkZXJzID0ge1xuICBidWlsZDogJ0Bhbmd1bGFyLWRldmtpdC9idWlsZC1hbmd1bGFyOmJyb3dzZXInLFxuICB0ZXN0OiAnQGFuZ3VsYXItZGV2a2l0L2J1aWxkLWFuZ3VsYXI6a2FybWEnLFxufTtcblxuLyoqIFJlc29sdmVzIHRoZSBhcmNoaXRlY3Qgb3B0aW9ucyBmb3IgdGhlIGJ1aWxkIHRhcmdldCBvZiB0aGUgZ2l2ZW4gcHJvamVjdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9qZWN0VGFyZ2V0T3B0aW9ucyhwcm9qZWN0OiBQcm9qZWN0RGVmaW5pdGlvbiwgYnVpbGRUYXJnZXQ6IHN0cmluZyk6XG4gIFJlY29yZDxzdHJpbmcsIEpzb25WYWx1ZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBvcHRpb25zID0gcHJvamVjdC50YXJnZXRzPy5nZXQoYnVpbGRUYXJnZXQpPy5vcHRpb25zO1xuXG4gIGlmICghb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKFxuICAgICAgYENhbm5vdCBkZXRlcm1pbmUgcHJvamVjdCB0YXJnZXQgY29uZmlndXJhdGlvbiBmb3I6ICR7YnVpbGRUYXJnZXR9LmApO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKiBHZXRzIGFsbCB0YXJnZXRzIGZyb20gdGhlIGdpdmVuIHByb2plY3QgdGhhdCBtYXRjaCB0aGUgc3BlY2lmaWVkIGJ1aWxkZXIgbmFtZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXRzQnlCdWlsZGVyTmFtZShcbiAgICBwcm9qZWN0OiBQcm9qZWN0RGVmaW5pdGlvbiwgYnVpbGRlck5hbWU6IHN0cmluZyk6IFRhcmdldERlZmluaXRpb25bXSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHByb2plY3QudGFyZ2V0cy5rZXlzKCkpXG4gICAgICAuZmlsdGVyKG5hbWUgPT4gcHJvamVjdC50YXJnZXRzLmdldChuYW1lKT8uYnVpbGRlciA9PT0gYnVpbGRlck5hbWUpXG4gICAgICAubWFwKG5hbWUgPT4gcHJvamVjdC50YXJnZXRzLmdldChuYW1lKSEpO1xufVxuIl19