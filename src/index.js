// LRU-cache implementation

// Things that we want to achieve:
/*
  1. get operation should be supported and lookup complexity to be O(1)
  2. put or operation should be supported for updating the value or adding a new value, desired time O(1)
  3. delete operation will remove an item with O(1) time
*/

// We will do it using a double linked list backed by a hash table

// class based solution

class Node {
  constructor(content, prev, next) {
    this.prev = prev || null;
    this.next = next || null;
    this.content = content;
  }
}

class DLL {
  constructor(node) {
    this.head = node;
    this.tail = node;
    this.length = 0;
  }

  prepend(node) {
    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.length++;
  }

  pop() {
    if (this.head) {
      let node = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      return node;
    }
  }
}

// implementation with public store, like wise it can be implemented with private store as well

export default class LRU {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.store = {};
    this.dll = new DLL();
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    if (this.store[key]) {
      // update your cache in O(1) time
      // this.store[key].value = value;
    } else {
      // make a new entry O(1) time
      // new node will be {prev: null, next: null, content: {key: k, value: v}}
      this.store[key] = new Node({ key, value });

      this.dll.prepend(this.store[key]);
      if (this.dll.length > this.maxSize) {
        this.evict();
      }
    }
  }

  delete(key) {
    // delete an entry in O(1) time
    if (this.store[key]) {
      // item is in the front
      if (!this.store[key].prev) {
        this.dll.head = this.dll.head.next;
        this.dll.head.prev = null;
      }
      // item is at the back
      else if (!this.store[key].next) {
        this.dll.pop();
      }
      // item is in the middle
      else {
        this.store[key].prev.next = this.store[key].next;
        this.store[key].next.prev = this.store[key].prev;
      }

      // free memory
      delete this.store[key];
    }
  }

  evict() {
    // O(1) LRU eviction policy means remove the last item of the DLL-cache with O(1) time
    if (this.dll.tail) {
      this.delete(this.dll.tail.content.key);
    }
  }
}
