import * as React from 'react';
import {FC, memo, ReactElement} from 'react';
import classnames from 'classnames';

interface PanelInterface {
    children: ReactElement,
    className?: string
}
const PanelComp: FC<PanelInterface> = ({children, className}) => {
    return (
        <div className={classnames("panel", className)}>
            {children}
        </div>
    )
};

export const Panel = memo(PanelComp);