import React from 'react';

export interface FormaEvent<T extends Record<string, unknown> = Record<string, unknown>>
    extends React.ChangeEvent<HTMLFormElement> {
    data: T;
}
