import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations } from '../../algorithms/mergeSort'

const ANIMATION_SPEED_MS = 5;
const ARRAY_BARS_COUNT = 310;
const ARRAY_MAX_VALUE = 730;
const ARRAY_MIN_VALUE = 5;

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

/*

TODO:
Add additional sorting algorithms
Improve comparison and replace coloring
Slider to specify array size
Slider to increase / decrease speed

*/

const SortingVisualizer = () => {

    const [dataArray, setDataArray] = React.useState(generateValuesArray);

    function generateValuesArray() {
        const array = [];
        for (let index = 0; index < ARRAY_BARS_COUNT; index++) {
            array.push(getRandomValue(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
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
        const sortedArrayAnimations = getMergeSortAnimations(dataArray);
        for (let i = 0; i < sortedArrayAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = sortedArrayAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = sortedArrayAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;

                }, i * ANIMATION_SPEED_MS);
            }

        }
    }

    function testSort() {

        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = getRandomValue(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE);
            for (let j = 0; j < length; j++) {
                array.push(getRandomValue(-1000, 1000))
            }
            const jsSort = array.slice().sort((a, b) => a - b);
            const sortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(jsSort, sortedArray));
        }
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
            <button onClick={() => testSort()}>Test Sort</button>

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