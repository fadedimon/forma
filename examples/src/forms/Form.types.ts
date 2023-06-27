import { FormaEvent } from 'forma-react';

export interface FormProps {
    onSubmit(e: FormaEvent): unknown;
}
