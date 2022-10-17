import { Game } from "./game";

describe('Bowling game', () => {
    let g: Game;
    beforeEach(() => {
        g = new Game();
    });


    it('should score 0 for gutter game', () => {
        g.manyRolls(10, 0)
        expect(g.score()).toBe(0);
    });

    it('should return a correct score for a spare', () => {
        rollSpare();
        g.roll(3);
        g.manyRolls(15, 0);
        expect(g.score()).toBe(16);
    });

    it('should return a correct score for a strike', () => {
        rollStrike();
        g.roll(3);
        g.roll(3);
        g.manyRolls(17, 0);
        expect(g.score()).toBe(22);
    });

    it('should return 300 for a perfect game', () => {
        g.manyRolls(12, 10);
        expect(g.score()).toBe(300);
    });

    function rollStrike(): void {
        g.roll(10);
    }

    function rollSpare(): void {
        g.roll(5);
        g.roll(5);
    }
});