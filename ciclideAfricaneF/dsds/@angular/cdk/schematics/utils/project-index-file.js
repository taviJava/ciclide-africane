"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectIndexFiles = void 0;
const project_targets_1 = require("./project-targets");
/** Gets the path of the index file in the given project. */
function getProjectIndexFiles(project) {
    const paths = project_targets_1.getTargetsByBuilderName(project, project_targets_1.defaultTargetBuilders.build)
        .filter(t => { var _a; return (_a = t.options) === null || _a === void 0 ? void 0 : _a.index; })
        .map(t => t.options.index);
    // Use a set to remove duplicate index files referenced in multiple build targets of a project.
    return Array.from(new Set(paths));
}
exports.getProjectIndexFiles = getProjectIndexFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1pbmRleC1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay9zY2hlbWF0aWNzL3V0aWxzL3Byb2plY3QtaW5kZXgtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFJSCx1REFBaUY7QUFFakYsNERBQTREO0FBQzVELFNBQWdCLG9CQUFvQixDQUFDLE9BQTBCO0lBQzdELE1BQU0sS0FBSyxHQUFHLHlDQUF1QixDQUFDLE9BQU8sRUFBRSx1Q0FBcUIsQ0FBQyxLQUFLLENBQUM7U0FDeEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLHdCQUFDLENBQUMsQ0FBQyxPQUFPLDBDQUFFLEtBQUssR0FBQSxDQUFDO1NBQzdCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFRLENBQUMsS0FBYSxDQUFDLENBQUM7SUFFdEMsK0ZBQStGO0lBQy9GLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFQRCxvREFPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BhdGh9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7UHJvamVjdERlZmluaXRpb259IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL3NyYy93b3Jrc3BhY2UnO1xuaW1wb3J0IHtkZWZhdWx0VGFyZ2V0QnVpbGRlcnMsIGdldFRhcmdldHNCeUJ1aWxkZXJOYW1lfSBmcm9tICcuL3Byb2plY3QtdGFyZ2V0cyc7XG5cbi8qKiBHZXRzIHRoZSBwYXRoIG9mIHRoZSBpbmRleCBmaWxlIGluIHRoZSBnaXZlbiBwcm9qZWN0LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2plY3RJbmRleEZpbGVzKHByb2plY3Q6IFByb2plY3REZWZpbml0aW9uKTogUGF0aFtdIHtcbiAgY29uc3QgcGF0aHMgPSBnZXRUYXJnZXRzQnlCdWlsZGVyTmFtZShwcm9qZWN0LCBkZWZhdWx0VGFyZ2V0QnVpbGRlcnMuYnVpbGQpXG4gICAgLmZpbHRlcih0ID0+IHQub3B0aW9ucz8uaW5kZXgpXG4gICAgLm1hcCh0ID0+IHQub3B0aW9ucyEuaW5kZXggYXMgUGF0aCk7XG5cbiAgLy8gVXNlIGEgc2V0IHRvIHJlbW92ZSBkdXBsaWNhdGUgaW5kZXggZmlsZXMgcmVmZXJlbmNlZCBpbiBtdWx0aXBsZSBidWlsZCB0YXJnZXRzIG9mIGEgcHJvamVjdC5cbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChwYXRocykpO1xufVxuIl19