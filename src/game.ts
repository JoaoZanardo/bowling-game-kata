import { Console } from "console";

export class Game {
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
            this.currentRoll = Number(roll);
            if (this.isStrike()) score += this.strikeBonus();
            if (this.isSpare()) score += this.spareBonus();
            score += this.rolls[roll];
        }

        return score = score;
    }

    private isStrike(): boolean {
        return this.rolls[this.currentRoll] === 10;

    }

    private isSpare() {
        return (this.rolls[this.currentRoll] + this.rolls[this.currentRoll + 1]) === 10
    }

    private strikeBonus(): number {
        if (
            this.rolls[this.currentRoll + 1] === undefined
            || this.rolls[this.currentRoll + 2] === undefined
            || this.rolls[this.currentRoll + 3] === undefined
        ) return 0;
        return this.rolls[this.currentRoll + 1] + this.rolls[this.currentRoll + 2];
    }

    private spareBonus(): number {
        if (!this.rolls[this.currentRoll + 2]) return 0;
        const scoreForSpare = 10 + this.rolls[this.currentRoll + 2];
        this.rolls[this.currentRoll] = 0;
        this.rolls[this.currentRoll + 1] = 0;
        return scoreForSpare;
    }
}