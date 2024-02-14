// App.js
import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Todo from './Todos/Todo';
import './Test.css';

const ItemType = 'ITEM';

const CAIXES = ["Do", "Decide", "Delegate", "Delete"]


const Item = ({ id, name, caixa, setTask, task, items, setItems }) => {

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { type: ItemType, id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const deleteTask = (id) => {
        const deleteTask = task.filter(e => e.id !== id);
        setTask(deleteTask);
    }

    // const changeLocalStorage = (caixa, id) => {
    //    console.log(caixa, id);
    // }

    // changeLocalStorage();

    const colorTask = () => {
        if (caixa === 'Do') return 'bg-green-300';
        if (caixa === 'Decide') return 'bg-yellow-300';
        if (caixa === 'Delegate') return 'bg-sky-400';
    }

    return (
        <div
            ref={drag}
            className={`border p-4 mb-4 flex justify-between active:border-[#A68AFA] ${colorTask()} text-white rounded-lg cursor-grab`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {name}{caixa === 'Delete' && deleteTask(id)}
        </div>
    );
};

const Box = ({ children, title, mouItem }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item, monitor) => {
            // Obtenir el nom del item que s'ha deixat anar
            const itemName = item.id;
            // Obtain el nom de la caixa on es deixa anar
            const containerTitle = title;
            // Moure l'item d'un lloc a l'altre
            mouItem(itemName, containerTitle)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });

    //No me gusta pero funciona
    const colors = () => {
        if (title === 'Do') return 'green';
        if (title === 'Decide') return 'yellow';
        if (title === 'Delegate') return 'blue';
    }

    return (
        <div ref={drop} className={`bg-[#292929] p-8 min-h-[400px] border rounded-md 
        ${isOver ? 'bg-gray-700' : ''}${title === 'Delete' ? 'grid place-content-center' : ''} ${title === 'Delete' && isOver && 'bg-red-600 bg-opacity-15 border-red-600'}`}>
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
    const [valueInput, setValueInput] = useState('');

    // funció que "Mou" un element d'una caixa a l'altra
    const mouItem = (item, caixa) => {
        const nousItems = items.map(it => {
            if (it.id === item) {
                it.caixa = caixa;
            }
            return it;
        })
        setItems(nousItems)
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        setTask(JSON.parse(storedTasks));
    }, []);

    //Reset Input
    useEffect(() => {
        setValueInput('');
    }, [items])

    //Add item
    useEffect(() => {
        //Hacer el localStorage
        // const storedTasks = localStorage.getItem('tasks');
        // console.log(storedTasks)

        localStorage.setItem('tasks', JSON.stringify(task));
        setItems(task);
    }, [task]);

    const addTodo = (valueInput, valueSelect) => {
        //seteamos el objeto de tasks en el useStore de tasks
        setTask([...task, {
            ['id']: getIdRandom(), ['nom']:
                valueInput, ['caixa']: valueSelect
        }]);
    }

    const getIdRandom = () => {
        return Math.random() * 1000;
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center">
                <Todo addTodo={addTodo} CAIXES={CAIXES} setTask={setTask} task={task}
                    setValueInput={setValueInput} valueInput={valueInput} />
            </div>
            <div className="grid grid-cols-2 gap-6">
                {
                    CAIXES.map(caixa => (
                        <Box key={caixa} title={caixa} mouItem={mouItem}  >
                            {
                                items.filter(e => e.caixa == caixa)
                                    .map(e => <Item id={e.id} key={e.nom}
                                        name={e.nom} caixa={caixa} setTask={setTask}
                                        task={task} items={items} setItems={setItems} />)
                            }
                        </Box>
                    ))
                }
            </div>
        </DndProvider>
    );
};

export default Test;
