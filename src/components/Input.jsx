import React from 'react';

export default function Input(props) {
    return (
        <div className='input'>
            <label className='inputLabel' htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} value={props.value} onChange={e => props.handleValue(e.target.value)} required={props.required} readOnly={props.readOnly} />
        </div>
    )
}
