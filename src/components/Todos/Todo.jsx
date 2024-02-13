import { useState } from "react"

const Todo = ({ addTodo, CAIXES }) => {
    const [valueInput, setValueInput] = useState('');
    const [valueSelect, setValueSelect] = useState('Do');

    function onChangeInput() {
        setValueInput(event.target.value)
    }

    function onChangeSelect() {
        setValueSelect(event.target.value);
    }

    return (
        <div className="p-10 border-solid border-2 bg-[#FECACA] 
        rounded-lg mb-10">
            <input type="text" value={valueInput} id="" className="border-2 
            border-solid rounded-lg"
                onChange={onChangeInput} />
            <select name="" id="" key='select' onChange={onChangeSelect}>
                {CAIXES.map((e, index) => {
                    return (
                        <>
                            <option value={e} key={index}>{e}</option>
                        </>
                    )
                })}
            </select>

            <button className="ml-2 px-3 py-1 rounded-lg 
            border-2 border-solid hover:bg-red-500"
                onClick={() => addTodo(valueInput, valueSelect)}>Añadir</button>
        </div>
    )
}

export default Todo
