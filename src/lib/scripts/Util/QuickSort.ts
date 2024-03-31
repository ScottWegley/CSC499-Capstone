// Helper function to swap two elements in an array
function swap(items: any[], leftIndex: number, rightIndex: number): void {
	const temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}

// Helper function to find the partition position
function partition(
	array: number[],
	altArray?: Array<Array<any>>,
	left: number = 0,
	right: number = array.length - 1
): number {
	const pivot = array[Math.floor((right + left) / 2)]; // middle element
	let i = left; // left pointer
	let j = right; // right pointer
	while (i <= j) {
		while (array[i] < pivot) {
			i++;
		}
		while (array[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(array, i, j); // swap two elements
			if (altArray !== undefined) {
				for (let k = 0; k < altArray.length; k++) {
					swap(altArray[k], i, j);
				}
			}
			i++;
			j--;
		}
	}
	return i;
}
/** Function to perform quicksort on multiple arrays based on the ordering of the first array. */
export function basedQuickSort(
	array: number[],
	altArrays?: Array<Array<any>>,
	left: number = 0,
	right: number = array.length - 1
): number[] {
	if (array.length > 1) {
		const index = partition(array, altArrays, left, right);
		if (left < index - 1) {
			basedQuickSort(array, altArrays, left, index - 1);
		}
		if (index < right) {
			basedQuickSort(array, altArrays, index, right);
		}
	}
	return array;
}
