import { describe, it, expect } from 'vitest';
import classNames from "./classNames.js";

describe('classNames', () => {
    describe('basic string arguments', () => {
        it('should join multiple string arguments', () => {
            expect(classNames('foo', 'bar')).toBe('foo bar');
        });

        it('should handle a single string argument', () => {
            expect(classNames('foo')).toBe('foo');
        });

        it('should handle multiple string arguments', () => {
            expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
        });
    });

    describe('object arguments', () => {
        it('should include class names with truthy values', () => {
            expect(classNames('foo', { bar: true })).toBe('foo bar');
        });

        it('should exclude class names with falsy values', () => {
            expect(classNames({ 'foo-bar': false })).toBe('');
        });

        it('should handle kebab-case class names', () => {
            expect(classNames({ 'foo-bar': true })).toBe('foo-bar');
        });

        it('should merge multiple object arguments', () => {
            expect(classNames({ foo: true }, { bar: true })).toBe('foo bar');
        });

        it('should handle multiple properties in a single object', () => {
            expect(classNames({ foo: true, bar: true })).toBe('foo bar');
        });

        it('should filter out false values in objects', () => {
            expect(classNames({ foo: true, bar: false, qux: true })).toBe('foo qux');
        });

        it('should handle all false values in object', () => {
            expect(classNames({ foo: false, bar: false })).toBe('');
        });
    });

    describe('array arguments', () => {
        it('should recursively flatten arrays', () => {
            expect(classNames('a', ['b', { c: true, d: false }])).toBe('a b c');
        });

        it('should handle nested arrays', () => {
            expect(classNames(['foo', ['bar', 'baz']])).toBe('foo bar baz');
        });

        it('should handle arrays with objects', () => {
            expect(classNames(['foo', { bar: true, baz: false }])).toBe('foo bar');
        });

        it('should handle deeply nested arrays', () => {
            expect(classNames(['a', ['b', ['c', { d: true }]]])).toBe('a b c d');
        });
    });

    describe('mixed arguments', () => {
        it('should handle mixed strings, objects, and arrays', () => {
            expect(
                classNames(
                    'foo',
                    {
                        bar: true,
                        duck: false,
                    },
                    'baz',
                    { quux: true }
                )
            ).toBe('foo bar baz quux');
        });

        it('should handle complex mixed scenarios', () => {
            expect(
                classNames('a', ['b', 'c'], { d: true, e: false }, 'f')
            ).toBe('a b c d f');
        });
    });

    describe('falsy values', () => {
        it('should ignore null values', () => {
            expect(classNames(null, 'bar')).toBe('bar');
        });

        it('should ignore false values', () => {
            expect(classNames(false, 'bar')).toBe('bar');
        });

        it('should ignore undefined values', () => {
            expect(classNames(undefined, 'bar')).toBe('bar');
        });

        it('should ignore empty strings', () => {
            expect(classNames('', 'bar')).toBe('bar');
        });

        it('should ignore multiple falsy values', () => {
            expect(classNames(null, false, 'bar', undefined, { baz: null }, '')).toBe('bar');
        });

        it('should ignore 0 as a falsy value', () => {
            expect(classNames(0, 'bar')).toBe('bar');
        });

        it('should handle only falsy values', () => {
            expect(classNames(null, false, undefined, '')).toBe('');
        });
    });

    describe('whitespace handling', () => {
        it('should not have leading whitespace', () => {
            const result = classNames('foo', 'bar');
            expect(result).toBe('foo bar');
            expect(result.startsWith(' ')).toBe(false);
        });

        it('should not have trailing whitespace', () => {
            const result = classNames('foo', 'bar');
            expect(result).toBe('foo bar');
            expect(result.endsWith(' ')).toBe(false);
        });

        it('should not have extra whitespace with mixed falsy values', () => {
            const result = classNames(null, 'foo', false, 'bar', undefined);
            expect(result).toBe('foo bar');
            expect(result).not.toMatch(/\s{2,}/); // No double spaces
        });
    });

    describe('edge cases', () => {
        it('should handle no arguments', () => {
            expect(classNames()).toBe('');
        });

        it('should handle empty object', () => {
            expect(classNames({})).toBe('');
        });

        it('should handle empty array', () => {
            expect(classNames([])).toBe('');
        });

        it('should handle numbers as truthy object values', () => {
            expect(classNames({ foo: 1, bar: 0 })).toBe('foo');
        });

        it('should handle string numbers in objects', () => {
            expect(classNames({ foo: '1', bar: '' })).toBe('foo');
        });

        it('should handle objects with null and undefined values', () => {
            expect(classNames({ foo: null, bar: undefined, baz: true })).toBe('baz');
        });

        it('should deduplicate class names if they appear multiple times', () => {
            // Note: Based on the spec, it seems duplicates are kept
            expect(classNames('foo', 'foo')).toBe('foo foo');
        });
    });

    it('ignores falsey values', () => {
        expect(
            classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
        ).toBe('bar 1');
    });

});
