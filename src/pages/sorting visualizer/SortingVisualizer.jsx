import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimation, createArray } from '../../algorithms/mergeSort'

const ANIMATION_SPEED_MS = 15;
const ARRAY_BARS_COUNT = 150;


const PRIMARY_COLOR = 'turquoise';
const COMPARE_COLOR = 'red';
// const STAY_COLOR = 'green';
const SHIFT_COLOR = 'yellow';

// const SECONDARY_COLOR = 'red';

/*

TODO:
cleanup code comments
Add additional sorting algorithms
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

    function mergeSortHandler() {
        const sortedArrayAnimations = getMergeSortAnimation(dataArray).animations;
        for (let i = 0; i < sortedArrayAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = sortedArrayAnimations[i];
            const action = animation.action;

            if (action === 'compareStart') {
                const { leftIdx, rightIdx } = animation;
                const barOneStyle = arrayBars[leftIdx].style;
                const barTwoStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    if (animation.shift) {
                        barOneStyle.backgroundColor = SHIFT_COLOR;
                        barTwoStyle.backgroundColor = SHIFT_COLOR;
                    } else {
                        barOneStyle.backgroundColor = COMPARE_COLOR;
                        barTwoStyle.backgroundColor = COMPARE_COLOR;
                    }

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

            if (action === 'stayStart') {
                const { leftIdx, rightIdx } = animation;
                const barOneStyle = arrayBars[leftIdx].style;
                const barTwoStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SHIFT_COLOR;
                    barTwoStyle.backgroundColor = SHIFT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            if (action === 'stayEnd') {
                const { leftIdx, rightIdx } = animation;
                const barOneStyle = arrayBars[leftIdx].style;
                const barTwoStyle = arrayBars[rightIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            //shift start should highlite that there needs to be a shift, that's all
            //shift end should move the lower node in to the correct position and remove it from it's old position
            if (action === 'shiftStart') {

                const { oldIdx, newIdx } = animation;
                const barOneStyle = arrayBars[oldIdx].style;
                const barTwoStyle = arrayBars[newIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SHIFT_COLOR;
                    barTwoStyle.backgroundColor = SHIFT_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
            if (action === 'shiftEnd') {
                const { oldIdx, newIdx } = animation;

                setTimeout(() => {
                    const oldBar = arrayBars[oldIdx];
                    const newBar = arrayBars[newIdx];
                    arrayBars[oldIdx].remove();
                    newBar.parentNode.insertBefore(oldBar, newBar);
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    function testSort() {

        // const array = createArray(100);
        // const sortedArray = getNewMergeSortAnimation(array.slice());
    }

    function quickSort() {

    }

    function heapSort() {

    }

    function bubbleSort() {

    }

    function insertionSort() {

    }

    // function arraysAreEqual(arr1, arr2) {
    //     if (arr1.length !== arr2.length) {
    //         console.log(`lengths are not the same ${arr1.length} - ${arr2.length}`)
    //         return false;
    //     }

    //     for (let i = 0; i < arr1.length; i++) {
    //         if (arr1[i] !== arr2[i]) {
    //             console.log(`values are not the same ${i} -  ${arr1[i]} - ${arr2[i]}`)
    //             return false;
    //         }
    //     }
    //     return true;
    // }

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
                            {/* <div className="array-bar-text">{node.value}</div> */}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SortingVisualizer