import { CSSProperties } from 'react';

const baseContainerStyles = {
    marginTop: 15,
    width: '100%'
}

export const emptyFormStyles = (isDraggedOver: boolean): Record<string, CSSProperties> => {
    return {
        'container': {
            ...baseContainerStyles,
            border: '10px dashed',
            borderColor: isDraggedOver ? 'grey' : 'lightgrey',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1
        },
        'header': { color: isDraggedOver ? 'grey' : 'lightgrey' } 
    };
}

export const formWithChildrenStyles: Record<string, CSSProperties> = {
    'container': { ...baseContainerStyles, flexGrow: 1 } //this flexGrow is important - it stops caises the div to fill the parent; otherwise the dragLeave event fires immediately
};