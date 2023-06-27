import React from 'react';

export interface FormaEvent extends React.ChangeEvent<HTMLFormElement> {
    json: Record<string, unknown>;
}
