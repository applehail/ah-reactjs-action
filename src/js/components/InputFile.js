import React from 'react';

const InputFile = ( props) => {

    const { value, onChange, accept, required, className, type, name } = props;

    const accept1 = props.accept ? props.accept : '';
    const required1 = props.required ? props.required : 'none';
    const cl = 'file-upload' + (props.error ? ' is-invalid' : '');
    const clAdd = 'file-upload__fn';
    const idAdd = props.name + '_';
    const name1 = name + '_';

    const onChange1 = (e) => {

        const target = document.getElementById(e.target.getAttribute('data-target'));
        let value = '';
        if (e.target.files.length) {
            value = e.target.files[0].name;
        }
        //target.value = value;
        //target.setAttribute('value', value);
        //console.log(target.getAttribute('onChange'));
        onChange(value);
    }

    return (
        <div className={cl}>
            <label>
                <input data-target={name} onChange={onChange1} id={name1} name={name1} type="file" accept={accept} />
                <span>Выбрать файл</span>
                <input onChange={onChange} id={name} name={name} className={clAdd} type="text" readOnly="1" value={value} />
            </label>
        </div>
    )
}

export default InputFile;