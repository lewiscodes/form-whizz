import { Card, EditableText, H1 } from '@blueprintjs/core';
import { useState } from 'react';
import FormItemsContainer from '../formItemsContainer';
import FormItem, { IFormItem } from '../formItem';
import { IDragItem } from '..';
import { formStyle } from './styles';

interface IFormProps {
    readonly dragItem: IDragItem | undefined;
}

const Form = ({ dragItem }: IFormProps) => {
    const [formTitle, setFormTitle] = useState<string>();
    const [formDescription, setFormDescription] = useState<string>();
    const [formItems, setFormItems] = useState<IFormItem[]>([]);
    const addFormItem = () => {
        setFormItems(formItems => {
            return [
                ...formItems,
                {
                    ...dragItem!,
                    isTemp:  true
                }
            ]
        });
    };
    const commitFormItem = () => {
        setFormItems(formItems => formItems.map(formItem => {
            if (formItem.id === dragItem?.id) {
                return {
                    ...formItem,
                    isTemp: false
                }
            }

            return formItem;
        }));
    }
    const removeFormItem = (itemId?: string) => {
        if (itemId) {
            setFormItems(formItems => formItems.filter(formItem => formItem.id !== itemId))
        }

        setFormItems(formItems => formItems.filter(formItem => formItem.id !== dragItem?.id));
    }
    return (
        <Card style={formStyle.card}>
            <H1>
                <EditableText value={formTitle} placeholder='Form Name...' onChange={setFormTitle} />
            </H1>
            <EditableText value={formDescription} placeholder='form description...' onChange={setFormDescription} />
            <FormItemsContainer onDragEnterHandler={addFormItem} onDropEventHandler={commitFormItem} onDragLeaveHandler={removeFormItem}>
                {formItems.map(formItem => <FormItem removeFormItem={removeFormItem} key={formItem.id} {...formItem} />)}
            </FormItemsContainer>
        </Card>
    )
};

export default Form;
