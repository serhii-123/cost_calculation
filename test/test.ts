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