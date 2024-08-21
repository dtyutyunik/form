import { type ReactNode } from "react"

type HintBoxProps = {
    mode: 'hint',
    children: ReactNode;
}

export type WarningBoxProps = {
    mode: 'warning';
    warningType: 'low' | 'medium' | 'high',
    children: ReactNode
}

//the reason we broke it up is so warningType has to be selected otherwise warningType if optional could be overlooked
type InfoBoxProps = HintBoxProps | WarningBoxProps;


// type InfoBoxProps = {
//     mode: "hint" | "warning",
//     children: ReactNode
//     warningType: 'low' | 'medium' | 'high'
// }
export const InfoBox = (props: InfoBoxProps) => {

    const { children, mode } = props

    if (mode === "hint") {
        return (
            <aside className="infobox infobox-hint">
                <p>{children}</p>
            </aside>
        )
    }
    // we can destructre it here, based on the understanding that if its not hint then it will account for warningType
    const { warningType } = props;
    return (

        <aside className={`infobox infobox-warning warning--${warningType}`}>
            <h2>Warning</h2>
            <p>{children}</p>
        </aside>
    )


}