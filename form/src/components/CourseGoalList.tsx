import { CourseGoal } from "./CourseGoal";
import { type GoalTypes as GT } from "../App";

type GoalTypesProps = {
    goals: GT[];
    onDeleteGoal: (id: number) => void;
};


export const CourseGoalList = ({ goals, onDeleteGoal }: GoalTypesProps) => {

    return (
        <ul>
            {goals && goals.map((goal) => {
                return (
                    <li key={goal.id}>
                        <CourseGoal title={goal.title} description={goal.description} id={goal.id} onDelete={onDeleteGoal} />
                    </li>
                )
            })}
        </ul>
    )
}