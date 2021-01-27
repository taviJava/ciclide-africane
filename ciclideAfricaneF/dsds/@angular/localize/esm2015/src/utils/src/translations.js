/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BLOCK_MARKER } from './constants';
import { parseMessage } from './messages';
export class MissingTranslationError extends Error {
    constructor(parsedMessage) {
        super(`No translation found for ${describeMessage(parsedMessage)}.`);
        this.parsedMessage = parsedMessage;
        this.type = 'MissingTranslationError';
    }
}
export function isMissingTranslationError(e) {
    return e.type === 'MissingTranslationError';
}
/**
 * Translate the text of the `$localize` tagged-string (i.e. `messageParts` and
 * `substitutions`) using the given `translations`.
 *
 * The tagged-string is parsed to extract its `messageId` which is used to find an appropriate
 * `ParsedTranslation`. If this doesn't match and there are legacy ids then try matching a
 * translation using those.
 *
 * If one is found then it is used to translate the message into a new set of `messageParts` and
 * `substitutions`.
 * The translation may reorder (or remove) substitutions as appropriate.
 *
 * If there is no translation with a matching message id then an error is thrown.
 * If a translation contains a placeholder that is not found in the message being translated then an
 * error is thrown.
 */
export function translate(translations, messageParts, substitutions) {
    const message = parseMessage(messageParts, substitutions);
    // Look up the translation using the messageId, and then the legacyId if available.
    let translation = translations[message.id];
    // If the messageId did not match a translation, try matching the legacy ids instead
    if (message.legacyIds !== undefined) {
        for (let i = 0; i < message.legacyIds.length && translation === undefined; i++) {
            translation = translations[message.legacyIds[i]];
        }
    }
    if (translation === undefined) {
        throw new MissingTranslationError(message);
    }
    return [
        translation.messageParts, translation.placeholderNames.map(placeholder => {
            if (message.substitutions.hasOwnProperty(placeholder)) {
                return message.substitutions[placeholder];
            }
            else {
                throw new Error(`There is a placeholder name mismatch with the translation provided for the message ${describeMessage(message)}.\n` +
                    `The translation contains a placeholder with name ${placeholder}, which does not exist in the message.`);
            }
        })
    ];
}
/**
 * Parse the `messageParts` and `placeholderNames` out of a target `message`.
 *
 * Used by `loadTranslations()` to convert target message strings into a structure that is more
 * appropriate for doing translation.
 *
 * @param message the message to be parsed.
 */
export function parseTranslation(messageString) {
    const parts = messageString.split(/{\$([^}]*)}/);
    const messageParts = [parts[0]];
    const placeholderNames = [];
    for (let i = 1; i < parts.length - 1; i += 2) {
        placeholderNames.push(parts[i]);
        messageParts.push(`${parts[i + 1]}`);
    }
    const rawMessageParts = messageParts.map(part => part.charAt(0) === BLOCK_MARKER ? '\\' + part : part);
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, rawMessageParts),
        placeholderNames,
    };
}
/**
 * Create a `ParsedTranslation` from a set of `messageParts` and `placeholderNames`.
 *
 * @param messageParts The message parts to appear in the ParsedTranslation.
 * @param placeholderNames The names of the placeholders to intersperse between the `messageParts`.
 */
export function makeParsedTranslation(messageParts, placeholderNames = []) {
    let messageString = messageParts[0];
    for (let i = 0; i < placeholderNames.length; i++) {
        messageString += `{$${placeholderNames[i]}}${messageParts[i + 1]}`;
    }
    return {
        text: messageString,
        messageParts: makeTemplateObject(messageParts, messageParts),
        placeholderNames
    };
}
/**
 * Create the specialized array that is passed to tagged-string tag functions.
 *
 * @param cooked The message parts with their escape codes processed.
 * @param raw The message parts with their escaped codes as-is.
 */
export function makeTemplateObject(cooked, raw) {
    Object.defineProperty(cooked, 'raw', { value: raw });
    return cooked;
}
function describeMessage(message) {
    const meaningString = message.meaning && ` - "${message.meaning}"`;
    const legacy = message.legacyIds && message.legacyIds.length > 0 ?
        ` [${message.legacyIds.map(l => `"${l}"`).join(', ')}]` :
        '';
    return `"${message.id}"${legacy} ("${message.text}"${meaningString})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3V0aWxzL3NyYy90cmFuc2xhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQTRDLFlBQVksRUFBZ0IsTUFBTSxZQUFZLENBQUM7QUFnQmxHLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxLQUFLO0lBRWhELFlBQXFCLGFBQTRCO1FBQy9DLEtBQUssQ0FBQyw0QkFBNEIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQURsRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQURoQyxTQUFJLEdBQUcseUJBQXlCLENBQUM7SUFHbEQsQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLENBQU07SUFDOUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDO0FBQzlDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUNyQixZQUErQyxFQUFFLFlBQWtDLEVBQ25GLGFBQTZCO0lBQy9CLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUQsbUZBQW1GO0lBQ25GLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0Msb0ZBQW9GO0lBQ3BGLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFD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QUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUM7SUFDbkUsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDO0lBQ1AsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLElBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQyxJQUFJLElBQUksYUFBYSxHQUFHLENBQUM7QUFDeEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtCTE9DS19NQVJLRVJ9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7TWVzc2FnZUlkLCBNZXNzYWdlTWV0YWRhdGEsIFBhcnNlZE1lc3NhZ2UsIHBhcnNlTWVzc2FnZSwgVGFyZ2V0TWVzc2FnZX0gZnJvbSAnLi9tZXNzYWdlcyc7XG5cblxuLyoqXG4gKiBBIHRyYW5zbGF0aW9uIG1lc3NhZ2UgdGhhdCBoYXMgYmVlbiBwcm9jZXNzZWQgdG8gZXh0cmFjdCB0aGUgbWVzc2FnZSBwYXJ0cyBhbmQgcGxhY2Vob2xkZXJzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZFRyYW5zbGF0aW9uIGV4dGVuZHMgTWVzc2FnZU1ldGFkYXRhIHtcbiAgbWVzc2FnZVBhcnRzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheTtcbiAgcGxhY2Vob2xkZXJOYW1lczogc3RyaW5nW107XG59XG5cbi8qKlxuICogVGhlIGludGVybmFsIHN0cnVjdHVyZSB1c2VkIGJ5IHRoZSBydW50aW1lIGxvY2FsaXphdGlvbiB0byB0cmFuc2xhdGUgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCB0eXBlIFBhcnNlZFRyYW5zbGF0aW9ucyA9IFJlY29yZDxNZXNzYWdlSWQsIFBhcnNlZFRyYW5zbGF0aW9uPjtcblxuZXhwb3J0IGNsYXNzIE1pc3NpbmdUcmFuc2xhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwcml2YXRlIHJlYWRvbmx5IHR5cGUgPSAnTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3InO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBwYXJzZWRNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKSB7XG4gICAgc3VwZXIoYE5vIHRyYW5zbGF0aW9uIGZvdW5kIGZvciAke2Rlc2NyaWJlTWVzc2FnZShwYXJzZWRNZXNzYWdlKX0uYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTWlzc2luZ1RyYW5zbGF0aW9uRXJyb3IoZTogYW55KTogZSBpcyBNaXNzaW5nVHJhbnNsYXRpb25FcnJvciB7XG4gIHJldHVybiBlLnR5cGUgPT09ICdNaXNzaW5nVHJhbnNsYXRpb25FcnJvcic7XG59XG5cbi8qKlxuICogVHJhbnNsYXRlIHRoZSB0ZXh0IG9mIHRoZSBgJGxvY2FsaXplYCB0YWdnZWQtc3RyaW5nIChpLmUuIGBtZXNzYWdlUGFydHNgIGFuZFxuICogYHN1YnN0aXR1dGlvbnNgKSB1c2luZyB0aGUgZ2l2ZW4gYHRyYW5zbGF0aW9uc2AuXG4gKlxuICogVGhlIHRhZ2dlZC1zdHJpbmcgaXMgcGFyc2VkIHRvIGV4dHJhY3QgaXRzIGBtZXNzYWdlSWRgIHdoaWNoIGlzIHVzZWQgdG8gZmluZCBhbiBhcHByb3ByaWF0ZVxuICogYFBhcnNlZFRyYW5zbGF0aW9uYC4gSWYgdGhpcyBkb2Vzbid0IG1hdGNoIGFuZCB0aGVyZSBhcmUgbGVnYWN5IGlkcyB0aGVuIHRyeSBtYXRjaGluZyBhXG4gKiB0cmFuc2xhdGlvbiB1c2luZyB0aG9zZS5cbiAqXG4gKiBJZiBvbmUgaXMgZm91bmQgdGhlbiBpdCBpcyB1c2VkIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgbmV3IHNldCBvZiBgbWVzc2FnZVBhcnRzYCBhbmRcbiAqIGBzdWJzdGl0dXRpb25zYC5cbiAqIFRoZSB0cmFuc2xhdGlvbiBtYXkgcmVvcmRlciAob3IgcmVtb3ZlKSBzdWJzdGl0dXRpb25zIGFzIGFwcHJvcHJpYXRlLlxuICpcbiAqIElmIHRoZXJlIGlzIG5vIHRyYW5zbGF0aW9uIHdpdGggYSBtYXRjaGluZyBtZXNzYWdlIGlkIHRoZW4gYW4gZXJyb3IgaXMgdGhyb3duLlxuICogSWYgYSB0cmFuc2xhdGlvbiBjb250YWlucyBhIHBsYWNlaG9sZGVyIHRoYXQgaXMgbm90IGZvdW5kIGluIHRoZSBtZXNzYWdlIGJlaW5nIHRyYW5zbGF0ZWQgdGhlbiBhblxuICogZXJyb3IgaXMgdGhyb3duLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKFxuICAgIHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgUGFyc2VkVHJhbnNsYXRpb24+LCBtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIHN1YnN0aXR1dGlvbnM6IHJlYWRvbmx5IGFueVtdKTogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCByZWFkb25seSBhbnlbXV0ge1xuICBjb25zdCBtZXNzYWdlID0gcGFyc2VNZXNzYWdlKG1lc3NhZ2VQYXJ0cywgc3Vic3RpdHV0aW9ucyk7XG4gIC8vIExvb2sgdXAgdGhlIHRyYW5zbGF0aW9uIHVzaW5nIHRoZSBtZXNzYWdlSWQsIGFuZCB0aGVuIHRoZSBsZWdhY3lJZCBpZiBhdmFpbGFibGUuXG4gIGxldCB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uc1ttZXNzYWdlLmlkXTtcbiAgLy8gSWYgdGhlIG1lc3NhZ2VJZCBkaWQgbm90IG1hdGNoIGEgdHJhbnNsYXRpb24sIHRyeSBtYXRjaGluZyB0aGUgbGVnYWN5IGlkcyBpbnN0ZWFkXG4gIGlmIChtZXNzYWdlLmxlZ2FjeUlkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlLmxlZ2FjeUlkcy5sZW5ndGggJiYgdHJhbnNsYXRpb24gPT09IHVuZGVmaW5lZDsgaSsrKSB7XG4gICAgICB0cmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uc1ttZXNzYWdlLmxlZ2FjeUlkc1tpXV07XG4gICAgfVxuICB9XG4gIGlmICh0cmFuc2xhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IE1pc3NpbmdUcmFuc2xhdGlvbkVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIHJldHVybiBbXG4gICAgdHJhbnNsYXRpb24ubWVzc2FnZVBhcnRzLCB0cmFuc2xhdGlvbi5wbGFjZWhvbGRlck5hbWVzLm1hcChwbGFjZWhvbGRlciA9PiB7XG4gICAgICBpZiAobWVzc2FnZS5zdWJzdGl0dXRpb25zLmhhc093blByb3BlcnR5KHBsYWNlaG9sZGVyKSkge1xuICAgICAgICByZXR1cm4gbWVzc2FnZS5zdWJzdGl0dXRpb25zW3BsYWNlaG9sZGVyXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBUaGVyZSBpcyBhIHBsYWNlaG9sZGVyIG5hbWUgbWlzbWF0Y2ggd2l0aCB0aGUgdHJhbnNsYXRpb24gcHJvdmlkZWQgZm9yIHRoZSBtZXNzYWdlICR7XG4gICAgICAgICAgICAgICAgZGVzY3JpYmVNZXNzYWdlKG1lc3NhZ2UpfS5cXG5gICtcbiAgICAgICAgICAgIGBUaGUgdHJhbnNsYXRpb24gY29udGFpbnMgYSBwbGFjZWhvbGRlciB3aXRoIG5hbWUgJHtcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcn0sIHdoaWNoIGRvZXMgbm90IGV4aXN0IGluIHRoZSBtZXNzYWdlLmApO1xuICAgICAgfVxuICAgIH0pXG4gIF07XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIGBtZXNzYWdlUGFydHNgIGFuZCBgcGxhY2Vob2xkZXJOYW1lc2Agb3V0IG9mIGEgdGFyZ2V0IGBtZXNzYWdlYC5cbiAqXG4gKiBVc2VkIGJ5IGBsb2FkVHJhbnNsYXRpb25zKClgIHRvIGNvbnZlcnQgdGFyZ2V0IG1lc3NhZ2Ugc3RyaW5ncyBpbnRvIGEgc3RydWN0dXJlIHRoYXQgaXMgbW9yZVxuICogYXBwcm9wcmlhdGUgZm9yIGRvaW5nIHRyYW5zbGF0aW9uLlxuICpcbiAqIEBwYXJhbSBtZXNzYWdlIHRoZSBtZXNzYWdlIHRvIGJlIHBhcnNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJhbnNsYXRpb24obWVzc2FnZVN0cmluZzogVGFyZ2V0TWVzc2FnZSk6IFBhcnNlZFRyYW5zbGF0aW9uIHtcbiAgY29uc3QgcGFydHMgPSBtZXNzYWdlU3RyaW5nLnNwbGl0KC97XFwkKFtefV0qKX0vKTtcbiAgY29uc3QgbWVzc2FnZVBhcnRzID0gW3BhcnRzWzBdXTtcbiAgY29uc3QgcGxhY2Vob2xkZXJOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXJ0cy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICBwbGFjZWhvbGRlck5hbWVzLnB1c2gocGFydHNbaV0pO1xuICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGAke3BhcnRzW2kgKyAxXX1gKTtcbiAgfVxuICBjb25zdCByYXdNZXNzYWdlUGFydHMgPVxuICAgICAgbWVzc2FnZVBhcnRzLm1hcChwYXJ0ID0+IHBhcnQuY2hhckF0KDApID09PSBCTE9DS19NQVJLRVIgPyAnXFxcXCcgKyBwYXJ0IDogcGFydCk7XG4gIHJldHVybiB7XG4gICAgdGV4dDogbWVzc2FnZVN0cmluZyxcbiAgICBtZXNzYWdlUGFydHM6IG1ha2VUZW1wbGF0ZU9iamVjdChtZXNzYWdlUGFydHMsIHJhd01lc3NhZ2VQYXJ0cyksXG4gICAgcGxhY2Vob2xkZXJOYW1lcyxcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgUGFyc2VkVHJhbnNsYXRpb25gIGZyb20gYSBzZXQgb2YgYG1lc3NhZ2VQYXJ0c2AgYW5kIGBwbGFjZWhvbGRlck5hbWVzYC5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZVBhcnRzIFRoZSBtZXNzYWdlIHBhcnRzIHRvIGFwcGVhciBpbiB0aGUgUGFyc2VkVHJhbnNsYXRpb24uXG4gKiBAcGFyYW0gcGxhY2Vob2xkZXJOYW1lcyBUaGUgbmFtZXMgb2YgdGhlIHBsYWNlaG9sZGVycyB0byBpbnRlcnNwZXJzZSBiZXR3ZWVuIHRoZSBgbWVzc2FnZVBhcnRzYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQYXJzZWRUcmFuc2xhdGlvbihcbiAgICBtZXNzYWdlUGFydHM6IHN0cmluZ1tdLCBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXSA9IFtdKTogUGFyc2VkVHJhbnNsYXRpb24ge1xuICBsZXQgbWVzc2FnZVN0cmluZyA9IG1lc3NhZ2VQYXJ0c1swXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZWhvbGRlck5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbWVzc2FnZVN0cmluZyArPSBgeyQke3BsYWNlaG9sZGVyTmFtZXNbaV19fSR7bWVzc2FnZVBhcnRzW2kgKyAxXX1gO1xuICB9XG4gIHJldHVybiB7XG4gICAgdGV4dDogbWVzc2FnZVN0cmluZyxcbiAgICBtZXNzYWdlUGFydHM6IG1ha2VUZW1wbGF0ZU9iamVjdChtZXNzYWdlUGFydHMsIG1lc3NhZ2VQYXJ0cyksXG4gICAgcGxhY2Vob2xkZXJOYW1lc1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3BlY2lhbGl6ZWQgYXJyYXkgdGhhdCBpcyBwYXNzZWQgdG8gdGFnZ2VkLXN0cmluZyB0YWcgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSBjb29rZWQgVGhlIG1lc3NhZ2UgcGFydHMgd2l0aCB0aGVpciBlc2NhcGUgY29kZXMgcHJvY2Vzc2VkLlxuICogQHBhcmFtIHJhdyBUaGUgbWVzc2FnZSBwYXJ0cyB3aXRoIHRoZWlyIGVzY2FwZWQgY29kZXMgYXMtaXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVGVtcGxhdGVPYmplY3QoY29va2VkOiBzdHJpbmdbXSwgcmF3OiBzdHJpbmdbXSk6IFRlbXBsYXRlU3RyaW5nc0FycmF5IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgJ3JhdycsIHt2YWx1ZTogcmF3fSk7XG4gIHJldHVybiBjb29rZWQgYXMgYW55O1xufVxuXG5cbmZ1bmN0aW9uIGRlc2NyaWJlTWVzc2FnZShtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogc3RyaW5nIHtcbiAgY29uc3QgbWVhbmluZ1N0cmluZyA9IG1lc3NhZ2UubWVhbmluZyAmJiBgIC0gXCIke21lc3NhZ2UubWVhbmluZ31cImA7XG4gIGNvbnN0IGxlZ2FjeSA9IG1lc3NhZ2UubGVnYWN5SWRzICYmIG1lc3NhZ2UubGVnYWN5SWRzLmxlbmd0aCA+IDAgP1xuICAgICAgYCBbJHttZXNzYWdlLmxlZ2FjeUlkcy5tYXAobCA9PiBgXCIke2x9XCJgKS5qb2luKCcsICcpfV1gIDpcbiAgICAgICcnO1xuICByZXR1cm4gYFwiJHttZXNzYWdlLmlkfVwiJHtsZWdhY3l9IChcIiR7bWVzc2FnZS50ZXh0fVwiJHttZWFuaW5nU3RyaW5nfSlgO1xufVxuIl19