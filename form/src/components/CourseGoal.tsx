import react, { type PropsWithChildren, FC } from 'react';

//OR
//  type CourseGoalProps = {
//     title: string
//     description: string
//     children: ReactNode //ReactNode is the type,  is used to import info in between the component
// }
// OR

type CourseGoalProps = PropsWithChildren<{ title: string, description: string, onDelete: (id: number) => void; id: number }>

//can add FC which indicated a functional component or 
export const CourseGoal: FC<CourseGoalProps> = ({ title, description, onDelete, id, children }) => {

    return (
        <article>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <p>{children}</p>
            <button onClick={() => onDelete(id)}>Delete</button>
        </article>
    )
}
