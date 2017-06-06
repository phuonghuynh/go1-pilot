import { add } from '../src/app';

describe('string calculator', () => {
    it('should return 0 if input is empty string', () => {
        expect(add('')).toBe(0);
    });

    it('should return 1 if input is "1"', () => {
        expect(add('1')).toBe(1);
    });

    it('should return 3 if input is "1,2"', () => {
        expect(add('1,2')).toBe(3);
    });

    it('should throw error if input has invalid number', () => {
        const errorMessage = 'Input is invalid';
        expect(() => add('a')).toThrowError(errorMessage);
        expect(() => add('1,a')).toThrowError(errorMessage);
        expect(() => add('1,,2')).toThrowError(errorMessage);
    });

    it('should support unknown amount of numbers', () => {
        expect(add('1,2,3,4')).toBe(10);
        expect(add('1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4')).toBe(40);
    });

    it('should support new line as separator', () => {
        expect(add('1\n2,3')).toBe(6);
        expect(() => add('1,\n')).toThrowError();
    });

    it('should support different delimiters', () => {
        expect(add('//;\n1;2')).toBe(3);
        expect(add('//.\n1.2')).toBe(3);
        expect(() => add('//.1.2;3')).toThrowError('Invalid separator line format');
        expect(() => add('//\n.1')).toThrowError('Invalid separator line format');
        expect(() => add('//..\n1')).toThrowError('Invalid separator line format');
    });

    it('should throw error if input has negative number', () => {
        expect(() => add('-1')).toThrowError('Negatives not allowed: -1');
        expect(() => add('-1,-2')).toThrowError('Negatives not allowed: -1,-2');
    });

    it('should ignore numbers which value is bigger than 1000', () => {
        expect(add('2,1001')).toBe(2);
        expect(add('2,11010')).toBe(2);
    });

    it('should support delimiter with any length', () => {
        expect(() => add('//[]\n.1')).toThrowError('Invalid separator line format');
        expect(() => add('//[,\n.1')).toThrowError('Invalid separator line format');
        expect(add('//[***]\n1***2***3')).toBe(6);
    });

    it('should support multiple delimiters', () => {
        expect(() => add('//[*],[%]\n1*2%3')).toThrowError('Invalid separator line format');
        expect(() => add('//[*][%\n1*2%3')).toThrowError('Invalid separator line format');
        expect(() => add('//[*]%]\n1*2%3')).toThrowError('Invalid separator line format');
        expect(add('//[*][%]\n1*2%3')).toBe(6);
        expect(add('//[***][%]\n1***2%3')).toBe(6);
    });
});