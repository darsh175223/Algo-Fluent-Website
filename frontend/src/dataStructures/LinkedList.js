class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
    }

    push_back(value){
        
        const newNode = new Node(value);
        if(this.head==null){
            this.head = newNode;
        }else{
            var currNode = new Node();
            currNode = this.head;
            while(currNode.next != null){
                currNode = currNode.next;
            }
            currNode.next = newNode;
        }

    }

    length(){
        var len = 1;
        if(this.head==null){
            return 0;
        }
        var currentNode = new Node();
        currentNode = this.head;
        while(currentNode.next != null){
            currentNode = currentNode.next;
            len++;
        }
        return len;

    }

}
export default LinkedList;







