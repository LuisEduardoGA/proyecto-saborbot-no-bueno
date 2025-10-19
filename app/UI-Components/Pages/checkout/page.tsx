"use client";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type CartItem = {
    Id: string;
    title: string;
    price: string;
    review: string;
    qty?: number;
    image: string;
}

export default function Checkout() {
    const [deliveryOption, setDeliveryOption] = useState<"ship" | "pickup">("ship");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const saveCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(saveCart);
    }, []);

    const handlePlaceOrder = () => {
        toast.success("Order Placed Success!");
    };

    //Calculate totals
    const totalPrice = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace("$", "")) || 0;
        const quantity = item.qty ?? 1;
        return acc + price * quantity;
    }, 0);

    const estimatedTax = (totalPrice * 0.1).toFixed(2);

    return (
        <>
            <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
                <div className="flex justify-between items-center">
                    <h2 className="Unbounded text-2xl">Checkout!</h2>
                    <div className="flex">
                        <Link href="/" className="text-2xl Unbounded">
                             &nbsp; 
                        </Link>
                        <h2 className="Unbounded text-2xl text-[var(--prim-color)]"> &nbsp; Home! </h2>
                    </div>
                </div>
            </div>

            <div className="px-[8%] lg:px-[12%] py-10">
                <div className="grid gap-4 lg:grid-cols-12">
                    {/* Left: Checkout Form */}
                    <div className="lg:col-span-7">
                        <h5 className="mb-2 Unbounded text-2xl">Contact</h5>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full p-2 mb-3"
                            placeholder="Email or Mobile Phone Number" />
                        <div className="mb-4 cursor-pointer">
                            <input type="checkbox" id="newsCheck" className="me-2" />
                            <label htmlFor="newsCheck">Email me with news and offers</label>
                        </div>
                        <h5 className="mb-2 Unbounded text-2xl">Delivery</h5>
                        <div className="mb-3 flex gap-4">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="deliveryoption"
                                    checked={deliveryOption === "ship"}
                                    onChange={() => setDeliveryOption("ship")}
                                />
                                Ship
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="deliveryoption"
                                    checked={deliveryOption === "pickup"}
                                    onChange={() => setDeliveryOption("pickup")}
                                />
                                pickup in store
                            </label>
                        </div>

                        {deliveryOption === "ship" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <select className="form-select border-gray-300 rounded appearance-none px-2 py-2 md:col-span-2">
                                    <option>Mexico</option>
                                    <option>CDMX</option>
                                </select>
                                <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="First Name (optional)" />
                                <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="Last Name" />
                            </div>
                        )}

                        {deliveryOption === "pickup" && (
                            <div className="my-4 p-3 border rounded bg-red-50 text-red-700">
                                <strong>No Storage Available with your item</strong>
                                <div>
                                    <Link href="#" className="underline">
                                        Ship to adrress
                                    </Link> {" "}
                                    instead
                                </div>
                            </div>
                        )}
                        <input type="text" className="border border-gray-300 rounded w-full p-2 mb-3" placeholder="Address" />
                        <input type="text" className="border border-gray-300 rounded w-full p-2 mb-3" placeholder="Apartment, suite, etc. (optional)" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="City" />
                            <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="Postal Code. (optional)" />
                        </div>

                        <div className="mb-4">
                            <input type="checkbox" id="saveInfo" className="me-2" />
                            <label htmlFor="saveInfo">Save this information for next time</label>
                        </div>
                        <h5 className="mb-2 Unbounded text-2xl">Shipping Method</h5>
                        <div className="p-3 flex justify-between items-center border border-gray-300 rounded bg-blue-50">
                            <span>Standard</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <h4 className="mt-5 mb-2 Unbounded text-2xl">Payment</h4>
                        <p className="text-gray-500 mb-3">All transactions are secure and encrypted</p>

                        <div className="border border-gray-300 rounded p-3 mb-3">
                            <input type="text" className="border border-gray-300 rounded w-full p-2 mb-2" placeholder="Card number" />
                            <div className="grid grid-cols-2 gap-2">
                                <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="Expiration date (MM / YY)" />
                                <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="Security code" />
                            </div>
                            <input type="text" className="border border-gray-300 rounded w-full p-2" placeholder="Name on card" />
                        </div>
                        <button className="w-full py-2 bg-[var(--prim-color)] cursor-pointer text-white rounded hover:bg-black transition-all"
                            onClick={handlePlaceOrder}
                        >
                            Pay Now
                        </button>
                    </div>
                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="border border-gray-300 p-4 rounded shadow">
                            <h5 className="font-bold mb-3 flex items-center gap-2 Unbounded">
                                <i className="ri-shopping-cart-2-line text-[var(--prim-color)]"></i> Order Summary
                            </h5>
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500">Your cart is Empty!</p>
                            ) : (
                                cartItems.map((item) => {
                                    const quantity = item.qty ?? 1;
                                    const priceNum = parseFloat(item.price.replace("$", "")) || 0;
                                    return (
                                        <div key={item.Id} className="flex items-center mb-3 border-b border-gray-300 pb-2">
                                            <img src={item.image} alt={item.title} className="rounded w-20 h-20 object-cover mr-2" />
                                            <div className="flex-grow">
                                                <h6 className="mb-1 Unbounded">{item.title}</h6>
                                                <small className="font-semibold">$${(priceNum * quantity).toFixed(2)}</small>
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                            <div className="flex justify-between text-sm pt-2">
                                <span>Subtotal</span>
                                <span className="Unbounded">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Shipping</span>
                                <span>Enter address</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Estimated Tax</span>
                                <span className="Unbounded">${estimatedTax}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2">
                                <span>Total</span>
                                <span className="Unbounded">${(totalPrice + parseFloat(estimatedTax)).toFixed(2)}</span>
                            </div>

                            <button className="w-full mt-3 mb-3 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-800 transition"
                            onClick={handlePlaceOrder}> Place Order
                            </button>
                            <Link href="/UI-Components/Pages/cart"
                            className="block text-center py-2 border rounded hover:bg-gray-100 transition">
                                Back to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}