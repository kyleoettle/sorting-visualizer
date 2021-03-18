import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations, mergeSort, getNewMergeSortAnimation, createArray } from '../../algorithms/mergeSort'

const ANIMATION_SPEED_MS = 50;
const ARRAY_BARS_COUNT = 50;


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

        return createArray(ARRAY_BARS_COUNT);
    }

    function resetValuesArray() {
        setDataArray(generateValuesArray());
    }

    function getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // function mergeSortHandler() {
    //     const sortedArrayAnimations = getMergeSortAnimations(dataArray);
    //     for (let i = 0; i < sortedArrayAnimations.length; i++) {
    //         const arrayBars = document.getElementsByClassName('array-bar');
    //         const isColorChange = i % 3 !== 2;
    //         if (isColorChange) {
    //             const [barOneIdx, barTwoIdx] = sortedArrayAnimations[i];
    //             const barOneStyle = arrayBars[barOneIdx].style;
    //             const barTwoStyle = arrayBars[barTwoIdx].style;
    //             const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //             setTimeout(() => {
    //                 barOneStyle.backgroundColor = color;
    //                 barTwoStyle.backgroundColor = color;
    //             }, i * ANIMATION_SPEED_MS);
    //         } else {
    //             setTimeout(() => {
    //                 const [barOneIdx, newHeight] = sortedArrayAnimations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 barOneStyle.height = `${newHeight}px`;
    //                 arrayBars[barOneIdx].firstChild.textContent = newHeight;
    //             }, i * ANIMATION_SPEED_MS);
    //         }

    //     }
    // }

    function mergeSortHandler() {
        const sortedArrayAnimations = getNewMergeSortAnimation(dataArray).animations;
        for (let i = 0; i < sortedArrayAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = sortedArrayAnimations[i];
            const action = animation.action;

            if (action === 'compareStart') {
                const { leftIdx, rightIdx } = animation;
                const barOneStyle = arrayBars[leftIdx].style;
                const barTwoStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            if (action === 'compareEnd') {
                const { leftIdx, rightIdx } = animation;
                const barOneStyle = arrayBars[leftIdx].style;
                const barTwoStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }

            // if (isColorChange) {
            //     const [barOneIdx, barTwoIdx] = sortedArrayAnimations[i];
            //     const barOneStyle = arrayBars[barOneIdx].style;
            //     const barTwoStyle = arrayBars[barTwoIdx].style;
            //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            //     setTimeout(() => {
            //         barOneStyle.backgroundColor = color;
            //         barTwoStyle.backgroundColor = color;
            //     }, i * ANIMATION_SPEED_MS);
            // } else {
            //     setTimeout(() => {
            //         const [barOneIdx, newHeight] = sortedArrayAnimations[i];
            //         const barOneStyle = arrayBars[barOneIdx].style;
            //         barOneStyle.height = `${newHeight}px`;
            //         arrayBars[barOneIdx].firstChild.textContent = newHeight;
            //     }, i * ANIMATION_SPEED_MS);
            // }

        }
    }

    function testSort() {

        const array = createArray(100);
        const sortedArray = getNewMergeSortAnimation(array.slice());
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

                {dataArray.map((node) => {
                    return (
                        <div className="array-bar" key={node.idx} style={{ height: `${node.value}px` }}>
                            <div className="array-bar-text">{node.value}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SortingVisualizer