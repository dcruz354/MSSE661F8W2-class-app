/**
 * AJAX add new orders to order list on save.
 */
const doAddOrder = async (e) => {
    e.preventDefault();
  
    const orderInput = document.getElementById('formInputOrderName');
    const order_name = orderInput.value;
    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;
  
    if (!order_name) {
      alert('Please enter an order name.');
      return;
    }
  
    const res = await addOrder({ order_name, status });
  
    if (res !== null) {
      inst.generateOrders();
    }
    orderInput.value = '';
  };
  