import { CSSProperties } from 'react';

export const formItemStyles = (deleteHover: boolean): Record<string, CSSProperties> => {
    return {
        'formItemContainer': { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
        'card': { display: 'flex', flexDirection: 'row', alignItems: 'center' },
        'deleteIcon': { color: deleteHover ? 'red' : 'lightgray', marginRight: 10, cursor: 'pointer' },
        'questionIcon': { marginRight: 10 },
        'questionText': { marginBottom: 0, marginLeft: 10, width: '100%' }
    }
}