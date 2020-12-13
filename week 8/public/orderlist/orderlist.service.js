/**
 * @class OrderList
 *
 * Creates a list of orders and updates a list
 */

class OrderList {
  orders = [];
  ordersService;

  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  init() {
    this.render();
  }

  /**
   * DOM renderer for building the list row item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteOrder(e, index)">X</button>
   *   <span>Order name</span>
   *   <span>pending</span>
   *   <span>date create</span>
   * </li>
   */
  _renderListRowItem = (order) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `order-${order.order_number}`; // order-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(order.order_number));
    deleteBtn.appendChild(deleteBtnTxt);

    const orderNameSpan = document.createElement('span');
    const orderName = document.createTextNode(order.order_name);
    orderNameSpan.appendChild(orderName);

    const orderStatusSpan = document.createElement('span');
    const orderStatus = document.createTextNode(order.status);
    orderStatusSpan.append(orderStatus);

    const orderDateSpan = document.createElement('span');
    const orderDate = document.createTextNode(order.created_date);
    orderDateSpan.append(orderDate);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(orderNameSpan);
    listGroupItem.append(orderStatusSpan);
    listGroupItem.append(orderDateSpan);

    return listGroupItem;
  
  };

 /**
   * DOM renderer for assembling the list items then mounting them to a parent node.
   */
  _renderList = () => {
    // get the "Loading..." text node from parent element
    const ordersDiv = document.getElementById('orders');
    const loadingDiv = ordersDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'orders-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.orders.map((order) => {
      const listGroupRowItem = this._renderListRowItem(order);

      // add entire list item
      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    ordersDiv.replaceChild(fragment, loadingDiv);
  };

 /**
   * DOM renderer for displaying a default message when a user has an empty list.
   */
  _renderMsg = () => {
    const ordersDiv = document.getElementById('orders');
    const loadingDiv = ordersDiv.childNodes[0];
    const listParent = document.getElementById('orders-list');
    const msgDiv = this._createMsgElement('Create some new orders!');

    if (ordersDiv) {
      ordersDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      ordersDiv.replaceChild(msgDiv, listParent);
    }
  };

  /**
   * Pure function for adding a order.
   *
   * @param {Object} newOrder - form's values as an object
   */
  addOrder = async (newOrder) => {
    try {
      const { order_name, status } = newOrder;
      await this.ordersService.addOrder({ order_name, status }); // we just want the name and status
      this.orders.push(newOrder); // push order with all it parts
    } catch (err) {
      console.log(err);
      alert('Unable to add order. Please try again later.');
    }
  };


/**
   * DOM Event handler helper for adding an order to the DOM.
   *
   * @param {number} orderNumber - number of the order to delete
   */
  _addOrderEventHandler = () => {
    const orderInput = document.getElementById('formInputOrderName');
    const order_name = orderInput.value;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    // validation checks
    if (!order_name) {
      alert('Please enter a order name.');
      return;
    }

    const order = { order_name, status }; // assemble the new order parts
    const { newOrder, newOrderEl } = this._createNewOrderEl(order); // add order to list

    this.addOrder(newOrder);

    const listParent = document.getElementById('orders-list');

    if (listParent) {
      listParent.appendChild(newOrderEl);
    } else {
      this._renderList();
    }
    orderInput.value = ''; // clear form text input
  };

 /**
   * Create the DOM element for the new order with all its parts.
   *
   * @param {Object} order - { order_name, status } partial status object
   */
  _createNewOrderEl = (order) => {
    const order_number = this.orders.length;
    const created_date = new Date().toISOString();
    const newOrder = { ...order, order_number, created_date };
    const newOrderEl = this._renderListRowItem(newOrder);

    return { newOrder, newOrderEl };
  };

 /**
   * Pure function for deleting a order.
   *
   * @param {number} orderNumber - number for the order to be deleted
   */
  deleteOrder = async (orderNumber) => {
    try {
      const res = await this.ordersService.deleteOrder(orderNumber);
      this.orders = this.orders.filter((order) => order.order_number !== orderNumber);

      if (res !== null) {
        alert('Order deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete order. Please try again later.');
    }
  };


   /**
   * DOM Event handler helper for deleting a order from the DOM.
   * This relies on a pre-existing in the list of orders.
   *
   * @param {number} orderNumber - number of the order to delete
   */
  _deleteEventHandler = (orderNumber) => () => {
    const order = document.getElementById(`order-${orderNumber}`);
    order.remove();

    this.deleteOrder(orderNumber).then(() => {
      if (!this.orders.length) {
        this._renderMsg();
      }
    });
  };

  /**
   * Creates a message div block.
   *
   * @param {string} msg - custom message to display
   */
  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const orders = await this.ordersService.getOrders();

    try {
      if (orders.length) {
        this.orders = orders;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
}
