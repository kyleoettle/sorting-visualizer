import React from 'react';
import './SortingVisualizer.css'
import { mergeSort } from '../../algorithms/mergeSort'
const SortingVisualizer = () => {

    const [dataArray, setDataArray] = React.useState(generateValuesArray);

    function generateValuesArray() {
        const array = [];
        for (let index = 0; index < 310; index++) {
            array.push(getRandomValue(5, 730));
        }
        return array;
    }

    function resetValuesArray() {
        setDataArray(generateValuesArray());
    }

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function mergeSortHandler() {
        const jsSort = dataArray.slice().sort((a, b) => a - b);
        const sortedArray = mergeSort(dataArray);
        console.log(arraysAreEqual(jsSort, sortedArray));
        console.log(sortedArray);
        console.log(jsSort);

    }

    function quickSort() {

    }

    function heapSort() {

    }

    function bubbleSort() {

    }

    function insertionSort() {

    }

    function arraysAreEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            console.log(`lengths are not the same ${arr1.length} - ${arr2.length}`)
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                console.log(`values are not the same ${i} -  ${arr1[i]} - ${arr2[i]}`)
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <button onClick={() => resetValuesArray()}>Generate New Array</button>
            <button onClick={() => mergeSortHandler()}>Merge Sort</button>
            <button onClick={() => quickSort()}>Quick Sort</button>
            <button onClick={() => heapSort()}>Heap Sort</button>
            <button onClick={() => bubbleSort()}>Bubble Sort</button>
            <button onClick={() => insertionSort()}>Insertion Sort</button>

            <div className="array-container">

                {dataArray.map((value, idx) => {
                    return (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
                    );
                })}
            </div>
        </>
    );
}

export default SortingVisualizer