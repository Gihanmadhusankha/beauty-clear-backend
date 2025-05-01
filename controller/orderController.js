import Order from "../models/order.js";

export async function createOrder(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const body = req.body;

  const orderData = {
    orderId: "",
    email: req.user.email,
    name: body.name,
    address: body.address,
    phoneNumber: body.phoneNumber,
    billItems: body.billItems || [],
    total: 0,
  };

  // Calculate total
  orderData.total = orderData.billItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  try {
    const lastBills = await Order.find().sort({ date: -1 }).limit(1);

    if (lastBills.length === 0) {
      orderData.orderId = "ORD0001";
    } else {
      const lastOrderId = lastBills[0].orderId;
      const lastOrderNumber = parseInt(lastOrderId.replace("ORD", ""), 10);
      const newOrderNumber = lastOrderNumber + 1;
      orderData.orderId = "ORD" + newOrderNumber.toString().padStart(4, "0");
    }

    const order = new Order(orderData);
    await order.save();

    res.json({
      message: "Order saved successfully",
      orderId: orderData.orderId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order not saved" });
  }
}

export function getOrders(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role === "admin") {
    Order.find()
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.status(500).json({ message: "Orders not found" });
      });
  } else {
    Order.find({ email: req.user.email })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.status(500).json({ message: "Orders not found" });
      });
  }
}
