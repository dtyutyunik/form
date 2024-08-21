import react, { type FormEvent, useRef } from "react";

type NewGoalProps = {
    onAddGoal: (goal: string, summary: string) => void
}

export const NewGoal = ({ onAddGoal }: NewGoalProps) => {
    const goal = useRef<HTMLInputElement>(null);
    const summary = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //by adding current! it garauntees it will work or otherwise it will crash
        const enteredGoal = goal.current!.value;
        const enteredSummary = summary.current!.value;

        //built in method to reset the form and clear the inputs
        e.currentTarget.reset();
        onAddGoal(enteredGoal, enteredSummary);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="goal">Your Goal</label>
                <input id="goal" type="text" required ref={goal} />
            </p>
            <p>
                <label htmlFor="summary">Short Summary</label>
                <input id="summary" type="text" required ref={summary} />
            </p>
            <button>Add Goal</button>
        </form>
    )
}

