/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StaticSymbol } from '../aot/static_symbol';
import { escapeIdentifier } from '../output/abstract_emitter';
import * as o from '../output/output_ast';
/**
 * Convert an object map with `Expression` values into a `LiteralMapExpr`.
 */
export function mapToMapExpression(map) {
    const result = Object.keys(map).map(key => ({
        key,
        // The assertion here is because really TypeScript doesn't allow us to express that if the
        // key is present, it will have a value, but this is true in reality.
        value: map[key],
        quoted: false,
    }));
    return o.literalMap(result);
}
/**
 * Convert metadata into an `Expression` in the given `OutputContext`.
 *
 * This operation will handle arrays, references to symbols, or literal `null` or `undefined`.
 */
export function convertMetaToOutput(meta, ctx) {
    if (Array.isArray(meta)) {
        return o.literalArr(meta.map(entry => convertMetaToOutput(entry, ctx)));
    }
    if (meta instanceof StaticSymbol) {
        return ctx.importExpr(meta);
    }
    if (meta == null) {
        return o.literal(meta);
    }
    throw new Error(`Internal error: Unsupported or unknown metadata: ${meta}`);
}
export function typeWithParameters(type, numParams) {
    if (numParams === 0) {
        return o.expressionType(type);
    }
    const params = [];
    for (let i = 0; i < numParams; i++) {
        params.push(o.DYNAMIC_TYPE);
    }
    return o.expressionType(type, undefined, params);
}
const ANIMATE_SYMBOL_PREFIX = '@';
export function prepareSyntheticPropertyName(name) {
    return `${ANIMATE_SYMBOL_PREFIX}${name}`;
}
export function prepareSyntheticListenerName(name, phase) {
    return `${ANIMATE_SYMBOL_PREFIX}${name}.${phase}`;
}
export function isSyntheticPropertyOrListener(name) {
    return name.charAt(0) == ANIMATE_SYMBOL_PREFIX;
}
export function getSyntheticPropertyName(name) {
    // this will strip out listener phase values...
    // @foo.start => @foo
    const i = name.indexOf('.');
    name = i > 0 ? name.substring(0, i) : name;
    if (name.charAt(0) !== ANIMATE_SYMBOL_PREFIX) {
        name = ANIMATE_SYMBOL_PREFIX + name;
    }
    return name;
}
export function getSafePropertyAccessString(accessor, name) {
    const escapedName = escapeIdentifier(name, false, false);
    return escapedName !== name ? `${accessor}[${escapedName}]` : `${accessor}.${name}`;
}
export function prepareSyntheticListenerFunctionName(name, phase) {
    return `animation_${name}_${phase}`;
}
export function jitOnlyGuardedExpression(expr) {
    return guardedExpression('ngJitMode', expr);
}
export function devOnlyGuardedExpression(expr) {
    return guardedExpression('ngDevMode', expr);
}
export function guardedExpression(guard, expr) {
    const guardExpr = new o.ExternalExpr({ name: guard, moduleName: null });
    const guardNotDefined = new o.BinaryOperatorExpr(o.BinaryOperator.Identical, new o.TypeofExpr(guardExpr), o.literal('undefined'));
    const guardUndefinedOrTrue = new o.BinaryOperatorExpr(o.BinaryOperator.Or, guardNotDefined, guardExpr, /* type */ undefined, 
    /* sourceSpan */ undefined, true);
    return new o.BinaryOperatorExpr(o.BinaryOperator.And, guardUndefinedOrTrue, expr);
}
export function wrapReference(value) {
    const wrapped = new o.WrappedNodeExpr(value);
    return { value: wrapped, type: wrapped };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHMUM7O0dBRUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsR0FBNEM7SUFDN0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQy9CLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNOLEdBQUc7UUFDSCwwRkFBMEY7UUFDMUYscUVBQXFFO1FBQ3JFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFFO1FBQ2hCLE1BQU0sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDUixPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsSUFBUyxFQUFFLEdBQWtCO0lBQy9ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekU7SUFDRCxJQUFJLElBQUksWUFBWSxZQUFZLEVBQUU7UUFDaEMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCO0lBQ0Qs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QUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDdEUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQzVDLENBQUMsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDckYsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FDakQsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUztJQUNyRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRixDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxLQUFVO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxPQUFPLEVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi4vYW90L3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0IHtlc2NhcGVJZGVudGlmaWVyfSBmcm9tICcuLi9vdXRwdXQvYWJzdHJhY3RfZW1pdHRlcic7XG5pbXBvcnQgKiBhcyBvIGZyb20gJy4uL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7T3V0cHV0Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQ29udmVydCBhbiBvYmplY3QgbWFwIHdpdGggYEV4cHJlc3Npb25gIHZhbHVlcyBpbnRvIGEgYExpdGVyYWxNYXBFeHByYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvTWFwRXhwcmVzc2lvbihtYXA6IHtba2V5OiBzdHJpbmddOiBvLkV4cHJlc3Npb258dW5kZWZpbmVkfSk6IG8uTGl0ZXJhbE1hcEV4cHIge1xuICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhtYXApLm1hcChcbiAgICAgIGtleSA9PiAoe1xuICAgICAgICBrZXksXG4gICAgICAgIC8vIFRoZSBhc3NlcnRpb24gaGVyZSBpcyBiZWNhdXNlIHJlYWxseSBUeXBlU2NyaXB0IGRvZXNuJ3QgYWxsb3cgdXMgdG8gZXhwcmVzcyB0aGF0IGlmIHRoZVxuICAgICAgICAvLyBrZXkgaXMgcHJlc2VudCwgaXQgd2lsbCBoYXZlIGEgdmFsdWUsIGJ1dCB0aGlzIGlzIHRydWUgaW4gcmVhbGl0eS5cbiAgICAgICAgdmFsdWU6IG1hcFtrZXldISxcbiAgICAgICAgcXVvdGVkOiBmYWxzZSxcbiAgICAgIH0pKTtcbiAgcmV0dXJuIG8ubGl0ZXJhbE1hcChyZXN1bHQpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgbWV0YWRhdGEgaW50byBhbiBgRXhwcmVzc2lvbmAgaW4gdGhlIGdpdmVuIGBPdXRwdXRDb250ZXh0YC5cbiAqXG4gKiBUaGlzIG9wZXJhdGlvbiB3aWxsIGhhbmRsZSBhcnJheXMsIHJlZmVyZW5jZXMgdG8gc3ltYm9scywgb3IgbGl0ZXJhbCBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TWV0YVRvT3V0cHV0KG1ldGE6IGFueSwgY3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWV0YSkpIHtcbiAgICByZXR1cm4gby5saXRlcmFsQXJyKG1ldGEubWFwKGVudHJ5ID0+IGNvbnZlcnRNZXRhVG9PdXRwdXQoZW50cnksIGN0eCkpKTtcbiAgfVxuICBpZiAobWV0YSBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCkge1xuICAgIHJldHVybiBjdHguaW1wb3J0RXhwcihtZXRhKTtcbiAgfVxuICBpZiAobWV0YSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbChtZXRhKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3I6IFVuc3VwcG9ydGVkIG9yIHVua25vd24gbWV0YWRhdGE6ICR7bWV0YX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVXaXRoUGFyYW1ldGVycyh0eXBlOiBvLkV4cHJlc3Npb24sIG51bVBhcmFtczogbnVtYmVyKTogby5FeHByZXNzaW9uVHlwZSB7XG4gIGlmIChudW1QYXJhbXMgPT09IDApIHtcbiAgICByZXR1cm4gby5leHByZXNzaW9uVHlwZSh0eXBlKTtcbiAgfVxuICBjb25zdCBwYXJhbXM6IG8uVHlwZVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGFyYW1zOyBpKyspIHtcbiAgICBwYXJhbXMucHVzaChvLkRZTkFNSUNfVFlQRSk7XG4gIH1cbiAgcmV0dXJuIG8uZXhwcmVzc2lvblR5cGUodHlwZSwgdW5kZWZpbmVkLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzUmVmZXJlbmNlIHtcbiAgdmFsdWU6IG8uRXhwcmVzc2lvbjtcbiAgdHlwZTogby5FeHByZXNzaW9uO1xufVxuXG5jb25zdCBBTklNQVRFX1NZTUJPTF9QUkVGSVggPSAnQCc7XG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZVN5bnRoZXRpY1Byb3BlcnR5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGAke0FOSU1BVEVfU1lNQk9MX1BSRUZJWH0ke25hbWV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVTeW50aGV0aWNMaXN0ZW5lck5hbWUobmFtZTogc3RyaW5nLCBwaGFzZTogc3RyaW5nKSB7XG4gIHJldHVybiBgJHtBTklNQVRFX1NZTUJPTF9QUkVGSVh9JHtuYW1lfS4ke3BoYXNlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bnRoZXRpY1Byb3BlcnR5T3JMaXN0ZW5lcihuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIG5hbWUuY2hhckF0KDApID09IEFOSU1BVEVfU1lNQk9MX1BSRUZJWDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN5bnRoZXRpY1Byb3BlcnR5TmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgLy8gdGhpcyB3aWxsIHN0cmlwIG91dCBsaXN0ZW5lciBwaGFzZSB2YWx1ZXMuLi5cbiAgLy8gQGZvby5zdGFydCA9PiBAZm9vXG4gIGNvbnN0IGkgPSBuYW1lLmluZGV4T2YoJy4nKTtcbiAgbmFtZSA9IGkgPiAwID8gbmFtZS5zdWJzdHJpbmcoMCwgaSkgOiBuYW1lO1xuICBpZiAobmFtZS5jaGFyQXQoMCkgIT09IEFOSU1BVEVfU1lNQk9MX1BSRUZJWCkge1xuICAgIG5hbWUgPSBBTklNQVRFX1NZTUJPTF9QUkVGSVggKyBuYW1lO1xuICB9XG4gIHJldHVybiBuYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2FmZVByb3BlcnR5QWNjZXNzU3RyaW5nKGFjY2Vzc29yOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGVzY2FwZWROYW1lID0gZXNjYXBlSWRlbnRpZmllcihuYW1lLCBmYWxzZSwgZmFsc2UpO1xuICByZXR1cm4gZXNjYXBlZE5hbWUgIT09IG5hbWUgPyBgJHthY2Nlc3Nvcn1bJHtlc2NhcGVkTmFtZX1dYCA6IGAke2FjY2Vzc29yfS4ke25hbWV9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVTeW50aGV0aWNMaXN0ZW5lckZ1bmN0aW9uTmFtZShuYW1lOiBzdHJpbmcsIHBoYXNlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGBhbmltYXRpb25fJHtuYW1lfV8ke3BoYXNlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqaXRPbmx5R3VhcmRlZEV4cHJlc3Npb24oZXhwcjogby5FeHByZXNzaW9uKTogby5FeHByZXNzaW9uIHtcbiAgcmV0dXJuIGd1YXJkZWRFeHByZXNzaW9uKCduZ0ppdE1vZGUnLCBleHByKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldk9ubHlHdWFyZGVkRXhwcmVzc2lvbihleHByOiBvLkV4cHJlc3Npb24pOiBvLkV4cHJlc3Npb24ge1xuICByZXR1cm4gZ3VhcmRlZEV4cHJlc3Npb24oJ25nRGV2TW9kZScsIGV4cHIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmRlZEV4cHJlc3Npb24oZ3VhcmQ6IHN0cmluZywgZXhwcjogby5FeHByZXNzaW9uKTogby5FeHByZXNzaW9uIHtcbiAgY29uc3QgZ3VhcmRFeHByID0gbmV3IG8uRXh0ZXJuYWxFeHByKHtuYW1lOiBndWFyZCwgbW9kdWxlTmFtZTogbnVsbH0pO1xuICBjb25zdCBndWFyZE5vdERlZmluZWQgPSBuZXcgby5CaW5hcnlPcGVyYXRvckV4cHIoXG4gICAgICBvLkJpbmFyeU9wZXJhdG9yLklkZW50aWNhbCwgbmV3IG8uVHlwZW9mRXhwcihndWFyZEV4cHIpLCBvLmxpdGVyYWwoJ3VuZGVmaW5lZCcpKTtcbiAgY29uc3QgZ3VhcmRVbmRlZmluZWRPclRydWUgPSBuZXcgby5CaW5hcnlPcGVyYXRvckV4cHIoXG4gICAgICBvLkJpbmFyeU9wZXJhdG9yLk9yLCBndWFyZE5vdERlZmluZWQsIGd1YXJkRXhwciwgLyogdHlwZSAqLyB1bmRlZmluZWQsXG4gICAgICAvKiBzb3VyY2VTcGFuICovIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIHJldHVybiBuZXcgby5CaW5hcnlPcGVyYXRvckV4cHIoby5CaW5hcnlPcGVyYXRvci5BbmQsIGd1YXJkVW5kZWZpbmVkT3JUcnVlLCBleHByKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBSZWZlcmVuY2UodmFsdWU6IGFueSk6IFIzUmVmZXJlbmNlIHtcbiAgY29uc3Qgd3JhcHBlZCA9IG5ldyBvLldyYXBwZWROb2RlRXhwcih2YWx1ZSk7XG4gIHJldHVybiB7dmFsdWU6IHdyYXBwZWQsIHR5cGU6IHdyYXBwZWR9O1xufVxuIl19