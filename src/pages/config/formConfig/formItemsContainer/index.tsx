import React, { useState } from "react";
import { H1 } from '@blueprintjs/core';
import { emptyFormStyles, formWithChildrenStyles } from './styles';

interface IFormContainerProps {
    readonly children: JSX.Element[];
    readonly onDragEnterHandler: () => void;
    readonly onDropEventHandler: () => void;
    readonly onDragLeaveHandler: () => void;
}

const FormItemsContainer = ({ onDragEnterHandler, onDropEventHandler, onDragLeaveHandler, children }: IFormContainerProps): JSX.Element => {
    const [isDraggedOver, setIsDraggedOver] = useState(false);
        const onDragEnter = () => {
            setIsDraggedOver(true);
            onDragEnterHandler();
        };
        const onDrop = () => {
            setIsDraggedOver(false);
            onDropEventHandler();
        }
        const onDragLeave = () => {
            setIsDraggedOver(false);
            onDragLeaveHandler();
        };
    if (children.length) {
        return (
            <div
                style={formWithChildrenStyles.container}
                onDragEnter={onDragEnter}
                onDragOver={e => e.preventDefault()}
                onDrop={onDrop}
                onDragLeave={onDragLeave}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            style={emptyFormStyles(isDraggedOver).container}
            onDragEnter={onDragEnter}
        >
            <H1 style={emptyFormStyles(isDraggedOver).header}>Drag cards here to start building a form...</H1>
        </div>
    );
}

export default FormItemsContainer;
