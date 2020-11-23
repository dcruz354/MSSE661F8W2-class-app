/**
 * html structure
 *
 * @example
 * <ul class="orderdetails-list">
 *  <li class="orderdetail-item">
 *    <div class="oderdetail-item-block">
 *      <span class="oderdetail-checkbox"><input type="checkbox"></span>
 *      <span class="oderdetail-customerName">Customer name</span>
 *      <span class="oderdetail-status">pending</span>
 *      <span class="oderdetail-date">date create</span>
 *    </div>
 *  </li>
 * </ul>
 */

// This is an IIFE (Immediately Invoked Function Expression).
// What it does is in the name.
(async () => {
    const orderdetails = await getOrderDetails();
    console.log(orderdetails);
  
    if (orderdetails.length) {
      const div = document.getElementById('orderdetails');
      const loadingDiv = div.childNodes[1];
  
      const ul = document.createElement('ul');
  
      // replace 'loading...' with list
      div.replaceChild(ul, loadingDiv); // <- order is important here!
  
      // create the list
      orderdetails.map((orderdetail) => {
        // building blocks
        const li = document.createElement('li');
        li.className = 'orderdetail-item';
        const block = document.createElement('div');
        block.className = 'orderdetail-item-block';
  
        //   content
        const checkboxSpan = document.createElement('span');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkboxSpan.className = 'orderdetail-checkbox';
        checkboxSpan.appendChild(checkbox);
  
        const nameSpan = document.createElement('span');
        nameSpan.className = 'orderdetail-name';
        nameSpan.innerText = orderdetail.name;
  
        const statusSpan = document.createElement('span');
        statusSpan.className = 'orderdetail-status';
        statusSpan.innerText = orderdetail.status;
  
        const dateSpan = document.createElement('span');
        dateSpan.className = 'orderdetail-date';
        dateSpan.innerText = orderdetail.created_date;
  
        // add list item
        block.appendChild(checkboxSpan);
        block.appendChild(nameSpan);
        block.appendChild(statusSpan);
        block.appendChild(dateSpan);
  
        li.appendChild(block);
        ul.appendChild(li);
      });
    }
  })();