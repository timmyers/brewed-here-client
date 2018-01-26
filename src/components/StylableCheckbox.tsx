import * as React from 'react';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';

interface HolderProps {
    children?: React.ReactChild;
    className?: string;
    checked: boolean;
    onChange: any;
}

const Styled: React.StatelessComponent<HolderProps> = (
    { className, children, checked, onChange }) => (
        <Checkbox className={className} checked={checked} onChange={onChange}>
            {children}
        </Checkbox>
    );

export default Styled;
