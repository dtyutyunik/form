import { CourseGoal } from "./CourseGoal";
import { type GoalTypes as GT } from "../App";
import { InfoBox, WarningBoxProps } from "./InfoBox";
import { type ReactNode } from "react";

type GoalTypesProps = {
    goals: GT[];
    onDeleteGoal: (id: number) => void;
};

type WarningType = WarningBoxProps['warningType'];

export const CourseGoalList = ({ goals, onDeleteGoal }: GoalTypesProps) => {

    const goalLevelWarning = (goalLength: number): WarningType => {
        if (goalLength >= 4 && goalLength < 6) {
            return 'low'
        } else if (goalLength > 6 && goalLength < 8) {
            return 'medium'
        } else {
            return 'high'
        }
    }

    if (goals.length === 0) {
        return <InfoBox mode="hint">YOu have no course goals yet. Start adding some</InfoBox>
    }
    let warningBox: ReactNode;
    const goalSeverity = goalLevelWarning(goals.length)

    if (goals.length >= 4) {
        warningBox = (<InfoBox mode="warning" warningType={goalSeverity}> You're collecting a lot of goals. Don't put too much on your plate</InfoBox>)
    }

    return (
        <>
            {warningBox}
            <ul>
                {goals && goals.map((goal) => {
                    return (
                        <li key={goal.id}>
                            <CourseGoal title={goal.title} description={goal.description} id={goal.id} onDelete={onDeleteGoal} />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}