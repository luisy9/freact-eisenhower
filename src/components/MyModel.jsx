// App.js
import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Todo from './Todos/Todo';
import './Test.css';

const ItemType = 'ITEM';

const CAIXES = ["Do", "Decide", "Delegate", "Delete"]


const Item = ({ id, name, caixa, setTask, task }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { type: ItemType, name },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const deleteTask = (id) => {
        setTask([...task, task].filter(e => e.id != id))
    }

    return (
        <div
            ref={drag}
            className="border p-4 bg-red-200 mb-4 flex justify-between"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {name}{caixa === 'Delete' ? <button className='bg-red-500 px-3 py-1 border-none border-2
            rounded-lg ' onClick={() => deleteTask(id)}>Delete</button> : <></>}
        </div>
    );
};

const Box = ({ children, title, mouItem }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            // Obtenir el nom del item que s'ha deixat anar
            const itemName = item.name;
            // Obtain el nom de la caixa on es deixa anar
            const containerTitle = title;
            // Moure l'item d'un lloc a l'altre
            mouItem(itemName, containerTitle)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const colors = () => {
        if (title === 'Do') return 'green';
        if (title === 'Decide') return 'yellow';
        if (title === 'Delegate') return 'blue';
    }

    return (
        <div ref={drop} className={`bg-[#292929] p-8 min-h-[400px] border rounded-md 
        ${isOver ? 'bg-blue-500' : ''}${title === 'Delete' ? 'flex justify-center items-center' : ''}`}>
            <h2 className={`text-xl text-center mb-4`}
                style={{ color: colors() }}>{title === 'Delete' ?
                    <img src='/eliminar.png' alt='delete' className='w-12 h-12' />
                    : `${title}`}</h2>
            {children}
        </div>
    );
};

const Test = () => {

    const [items, setItems] = useState([]);
    const [task, setTask] = useState([]);

    // funció que "Mou" un element d'una caixa a l'altra
    const mouItem = (item, caixa) => {
        const nousItems = items.map(it => {
            if (it.nom === item) {
                it.caixa = caixa;
            }
            return it;
        })
        setItems(nousItems)
    }

    useEffect(() => {
        setItems([...task, task]);
    }, [task])

    const addTodo = (valueInput, valueSelect) => {
        setTask([...task, { ['id']: getIdRandom(), ['nom']: valueInput, ['caixa']: valueSelect }]);
    }

    const getIdRandom = () => {
        return Math.random() * 1000;
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center">
                <Todo addTodo={addTodo} CAIXES={CAIXES} setTask={setTask} task={task} />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {
                    CAIXES.map(caixa => (
                        <Box key={caixa} title={caixa} mouItem={mouItem}  >
                            {
                                items.filter(e => e.caixa == caixa)
                                    .map(e => <Item id={e.id} key={e.nom}
                                        name={e.nom} caixa={caixa} setTask={setTask} task={task} />)
                            }
                        </Box>
                    ))
                }
            </div>
        </DndProvider>
    );
};

export default Test;
