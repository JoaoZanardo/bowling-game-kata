class Game {
    private rolls: number[] = [];
    private currentRoll: number = 0;

    manyRolls(int: number, pins: number): void {
        for (let i = 0; i < int; i++) {
            this.roll(pins);
        }
    }

    roll(pins: number): void {
        this.rolls[this.currentRoll++] = pins;
    }

    score() {
        let score: number = 0;
        for (const roll in this.rolls) {
            let scoreForStrike: number = 0;
            if (this.isStrike(roll)) scoreForStrike = this.strikeBonus(roll);

            let scoreForSpare: number = 0;
            if (this.isSpare(roll)) scoreForSpare = this.spareBonus(roll);
            score += this.rolls[roll] + scoreForSpare + scoreForStrike;
        }

        return score;
    }

    private isStrike(roll: string): boolean {
        return this.rolls[Number(roll)] === 10;

    }

    private isSpare(roll: string): boolean {
        return (this.rolls[Number(roll)] + this.rolls[Number(roll) + 1]) === 10
    }

    private strikeBonus(roll: string): number {
        if (this.rolls[Number(roll) + 1] && this.rolls[Number(roll) + 2]) {
            return this.rolls[Number(roll) + 1] + this.rolls[Number(roll) + 2];
        }

        return 20;
    }

    private spareBonus(roll: string): number {
        const scoreForSpare = 10 + this.rolls[Number(roll) + 2];
        this.rolls[Number(roll)] = 0;
        this.rolls[Number(roll) + 1] = 0;
        return scoreForSpare;
    }
}

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
        g.roll(4);
        g.roll(6);
        g.roll(3);
        g.manyRolls(15, 0);
        expect(g.score()).toBe(16);
    });

    it('should return a correct score for a strike', () => {
        g.roll(10);
        g.roll(3);
        g.roll(3);
        g.manyRolls(16, 0);
        expect(g.score()).toBe(22);
    });

    it('should return 300 for a perfect game', () => {
        g.manyRolls(10, 10);
        expect(g.score()).toBe(300);
    });
});