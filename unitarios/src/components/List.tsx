import { useState } from 'react'

type ListProps = {
    initialItems: string[]
}

function List({ initialItems }: ListProps) {
    const [list, setList] = useState(initialItems)
    const [newItem, setnewItem] = useState('')
    function addToList() {
        setTimeout(() => { //simulando que é uma chamada api
            setList(state => [...state, newItem])
        }, 500)
    }

    function removeFromList(element: string) {
        setTimeout(() => { //simulando que é uma chamada api
            setList(state => state.filter(item => item != element))
        }, 500)
    }

    return (
        <>
            <input type="text" placeholder='Novo item' value={newItem} onChange={(e) => setnewItem(e.target.value)} />
            <button onClick={addToList}>Adicionar</button>

            <ul>
                {list.map(item => (
                    <li key={item}>
                        {item}
                        <button onClick={() => removeFromList(item)}>Remover</button>

                    </li>
                ))}
            </ul>
        </>
    )
}

export default List
