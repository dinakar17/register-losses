"use client";

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

interface Item {
    value: number;
    label: string;
}

const Dropdown = () => {
    const [data, setData] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<any>(null)
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setData(json.map((item: {id: number, title: string}) => ({ value: item.id, label: item.title })));
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (inputValue: string, actionMeta: any) => {
        if (actionMeta.action === 'input-change') {
            setInputValue(inputValue);
        }
    }

    const handleAdd = () => {
        // Simulate sending the new item to the database
        axios.post('https://jsonplaceholder.typicode.com/posts', { title: inputValue })
            .then(response => {
                setData([...data, { value: response.data.id, label: response.data.title }]);
                setInputValue('');
            });
    }

    // const customStyles = {
    //     control: () => ({
    //         display: 'flex',
    //         alignItems: 'center',
    //         flexWrap: 'wrap',
    //         gap: '10px'
    //     })
    // }

    return (
        <div className="flex w-full mx-auto">
            <Select
                isLoading={isLoading}
                isClearable
                // styles={customStyles}
                onInputChange={handleInputChange}
                options={data}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Search..."
            />
            {data.every(option => option.label !== inputValue) && inputValue && (
                <button className="bg-blue-500 text-white p-2 my-2" onClick={handleAdd}>Add Item</button>
            )}
        </div>
    );
}

export default Dropdown;
