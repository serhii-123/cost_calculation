import { describe, it, expect } from "vitest";
import getExecutionData from '../src/getExecutionData';

describe("testing cost", () => {
    it('should return a 50 hrn cost', () => {
        const result = getExecutionData('ukr', new Date(), 'docx', 999);

        expect(result.cost).toBe(50);
    });

    it('should return a 120 hrn cost', () => {
        const result = getExecutionData('eng', new Date(), 'docx', 999);

        expect(result.cost).toBe(120);
    });

    it('should return a 50 hrn cost', () => {
        const result = getExecutionData('ukr', new Date(), 'docx', 1000);

        expect(result.cost).toBe(50);
    });

    it('should return a 120 hrn cost', () => {
        const result = getExecutionData('eng', new Date(), 'docx', 1000);

        expect(result.cost).toBe(120);
    });

    it('should return a 50.05 hrn cost', () => {
        const result = getExecutionData('ukr', new Date(), 'docx', 1001);

        expect(result.cost).toBe(50.05);
    })

    it('should return a 120.12 hrn cost', () => {
        const result = getExecutionData('eng', new Date(), 'docx', 1001);
        expect(result.cost).toBe(120.12);
    });

    it('should return a 120.06 hrn cost', () => {
        const result = getExecutionData('ukr', new Date(), 'something', 2001);

        expect(result.cost).toBe(120.06);
    });

    it('should return a 288.14 hrn cost', () => {
        const result = getExecutionData('eng', new Date(), 'something', 2001);

        expect(result.cost).toBe(288.14);
    });

    it('should return a 50 hrn cost', () => {
        const result = getExecutionData('ukr', new Date(), 'something', 500);

        expect(result.cost).toBe(50);
    });

    it('should return a 120 hrn cost', () => {
        const result = getExecutionData('eng', new Date(), 'something', 500);

        expect(result.cost).toBe(120);
    });
});

describe('testing exception for symbols count', () => {
    it('should throw an exception due to small symbols count', () => {
        expect(() => getExecutionData('eng', new Date(), 'docx', 99))
            .toThrowError('Invalid symbols count');
    });

    it('should throw an exception due to big symbols count', () => {
        expect(() => getExecutionData('eng', new Date(), 'docx', 100001))
            .toThrowError('Invalid symbols count');
    });
});

describe('testing execution time', () => {
    it('should return a 3597299 ms', () => {
        const result = getExecutionData('ukr', new Date, 'docx', 1332);

        expect(result.executionTime).toBe(3597299);
    });

    it('should return a 3589189 ms', () => {
        const result = getExecutionData('eng', new Date, 'docx', 332);

        expect(result.executionTime).toBe(3589189);
    });

    it('should return a 3600000 ms', () => {
        const result = getExecutionData('ukr', new Date(), 'docx', 1333);

        expect(result.executionTime).toBe(3600000);
    });

    it('should return a 3600000 ms', () => {
        const result = getExecutionData('eng', new Date(), 'docx', 333);

        expect(result.executionTime).toBe(3600000);
    });

    it('should return a 3602701 ms', () => {
        const result = getExecutionData('ukr', new Date(), 'docx', 1334);

        expect(result.executionTime).toBe(3602701);
    });

    it('should return a 3610811 ms', () => {
        const result = getExecutionData('eng', new Date(), 'docx', 334);

        expect(result.executionTime).toBe(3610811);
    });

    it('should return a 6481620 ms', () => {
        const result = getExecutionData('ukr', new Date(), 'something', 2000);

        expect(result.executionTime).toBe(6481620);
    });

    it('should return a 25945946 ms', () => {
        const result = getExecutionData('eng', new Date(), 'something', 2000);

        expect(result.executionTime).toBe(25945946);
    });
});

describe('testing deadline', () => {
    it('should return the 11:30 time', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('ukr', date, 'docx', 1333);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:30:00');
    });

    it('should return the 11:30 time', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('eng', date, 'docx', 333);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:30:00');
    });

    it('should return the 11:42 time', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('ukr', date, 'something', 1333);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:42:00');
    });

    it('should return the 11:42 time', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('eng', date, 'something', 333);
        
        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:42:00');
    });

    it('should return the 10:30 time at next day', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('ukr', date, 'docx', 13330);

        expect(result.deadline.toLocaleString())
            .toBe('29.04.2025, 11:30:00');
    });

    it('should return the 10:30 time at next day', () => {
        const date: Date = new Date('2025-04-28');
        const result = getExecutionData('eng', date, 'docx', 3330);

        expect(result.deadline.toLocaleString())
            .toBe('29.04.2025, 11:30:00');
    });

    it('should return the 10:30 time at monday', () => {
        const symbolsCount: number = 1333 * 9 * 5;
        const date = new Date('2025-04-21');
        const result = getExecutionData('ukr', date, 'docx', symbolsCount);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 10:30:00');
    });

    it('should return the 10:30 time at monday', () => {
        const symbolsCount: number = 333 * 9 * 5;
        const date = new Date('2025-04-21');
        const result = getExecutionData('eng', date, 'docx', symbolsCount);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 10:30:00');
    });

    it('should return the 11:30 time at monday', () => {
        const date: Date = new Date('2025-04-25');
        const result = getExecutionData('ukr', date, 'docx', 13330);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:30:00');
    });

    it('should return the 11:30 time at monday', () => {
        const date: Date = new Date('2025-04-25');
        const result = getExecutionData('eng', date, 'docx', 3330);

        expect(result.deadline.toLocaleString())
            .toBe('28.04.2025, 11:30:00');
    });

    it('should return the _ time at tuesday', () => {
        const symbolsCount = 1333 * 9 * 2;
        const date: Date = new Date('2025-04-25');
        const result = getExecutionData('ukr', date, 'something', symbolsCount);

        expect(result.deadline.toLocaleString())
            .toBe('29.04.2025, 14:06:00');
    });

    it('should return the _ time at tuesday', () => {
        const symbolsCount = 333 * 9 * 2;
        const date: Date = new Date('2025-04-25');
        const result = getExecutionData('eng', date, 'something', symbolsCount);

        expect(result.deadline.toLocaleString())
            .toBe('29.04.2025, 14:06:00');
    });
});

describe('testing exception for date', () => {
    it('should throw an exception because of saturday', () => {
        const date: Date = new Date('2025-04-26');

        expect(() => getExecutionData('eng', date, 'docx', 1333))
            .toThrowError('The start date must not be a weekend');
    });

    it('should throw an excepton because of sunday', () => {
        const date: Date = new Date('2025-04-27');

        expect(() => getExecutionData('ukr', date, 'docx', 1333))
            .toThrowError('The start date must not be a weekend');
    });
});