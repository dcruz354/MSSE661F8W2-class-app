const ORDERS_API = `${BASE_API_URL}/orders`; // http://localhost:3000/api/orders

const getOrders = () => _get(ORDERS_API, OPTIONS_WITH_AUTH);

const addOrder = (formData) =>
    _post(ORDERS_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteOrder = (orderId) =>
    _delete(`${ORDERS_API}/${orderId}`, OPTIONS_WITH_AUTH);
