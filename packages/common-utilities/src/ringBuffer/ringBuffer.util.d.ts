/**
 * Generic container for an ordered list of the last n inserted items.
 */
export declare class RingBuffer<T = any> {
    readonly size: number;
    private buffer;
    private ringIndex;
    constructor(size: number);
    /**
     * Inserts an item at the end of this buffer. If the buffer is full during this insert, then the least recently added item is removed.
     * Performed in O(1) runtime.
     * @param item
     */
    push(item: T): void;
    /**
     * Get the item at the provided index. Valid indices can be in the range of [-n, n-1] where n is the max size of this buffer. If the
     * index is negative, then indexing starts from the most-recently added element (i.e at(-1) will return the last element in the
     * buffer, at(-2) will return second to last element, etc.)
     * @param index
     */
    at(index: number): T;
    /**
     * Returns an array of all elements in this buffer.
     */
    toArray(): T[];
    /**
     * Gets the current number of items stored in this buffer.
     */
    get length(): number;
}
