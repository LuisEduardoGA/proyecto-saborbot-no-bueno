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

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    const estimatedTaxes = 10;

    useEffect(() => {
        const loadCart = () => {
            try {
                const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
                setCartItems(cart);

                const total = cart.reduce((acc: number, item: CartItem) => {
                    const quantity = item.qty ?? 1;
                    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                    return acc + priceNum * quantity;
                }, 0);
                setSubtotal(total)
            } catch (error) {
                console.error("Failed to load Cart", error);
                setCartItems([]);
                setSubtotal(0);
            }
        };
        loadCart();
        window.addEventListener("storageUpdate", loadCart);
        return () => window.removeEventListener("storageUpdate", loadCart);
    }, []);

    const handleRemove = (productId: string) => {
        const updatedCart = cartItems.filter((item) => item.Id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storageUpdate"));
        toast.success("Product Removed From Cart");
    };

    const handleQtyChange = (productId: string, qty: number) => {
        const updatedCart = cartItems.map((item) =>
            item.Id === productId ? { ...item, qty } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storageUpdate"));
    };


    return (
        <>
            <div className="px-[8%] lg:px-[12%] bg-[#E6F9EF] py-5">
                <div className="flex justify-between items-center">
                    <h2 className="Unbounded text-2xl">Shopping cart</h2>
                    <div className="flex">
                        <Link href="/" className="text-2xl Unbounded">
                            Home &nbsp; :
                        </Link>
                        <h2 className="Unbounded text-2xl text-[var(--prim-color)]"> &nbsp; Cart </h2>
                    </div>
                </div>
            </div>

            <div className="px-[8%] lg:px-[12%] py-10">
                {cartItems.length === 0 ? (
                    <p className="text-lg bg-red-200 px-5 py-2 rounded">Your Cart is Empty!</p>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1 overflow-x-auto">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded hidden md:table">
                                    <thead className="bg-[var(--prim-light)]">
                                        <tr>
                                            <th className="py-3 px-4 Unbounded font-normal text-left">Product</th>
                                            <th className="py-3 px-4 Unbounded font-normal text-left">Price</th>
                                            <th className="py-3 px-4 Unbounded font-normal text-left">Quantity</th>
                                            <th className="py-3 px-4 Unbounded font-normal text-left cursor-pointer">Subtotal</th>
                                            <th className="py-3 px-4 Unbounded text-left cursor-pointer">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item: CartItem) => {
                                            const quantity = item.qty ?? 1;
                                            const priceNum =
                                                parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                                            const itemSubtotal = priceNum * quantity;

                                            return (
                                                <tr key={item.Id} className="border-b border-gray-300">
                                                    <td className="py-3 px-4 flex items-center gap-3">
                                                        <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
                                                            <img src={item.image} alt={item.title}
                                                                className="object-contain rounded" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium Unbounded text-lg">{item.title}</p>
                                                            <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                                <i className="bi bi-shop text-[var(--prim-color)]"></i> By Lucky
                                                            </h6>
                                                            <span className="flex items-center text-yellow-500 text-sm">
                                                                <i className="bi bi-star-fill me-1"></i> {item.review} Review
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 Unbounded ">${(priceNum.toFixed(2))}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center border w-24 rounded">
                                                            <button className="px-2 text-lg cursor-pointer"
                                                                onClick={() =>
                                                                    handleQtyChange(item.Id, Math.max(1, quantity - 1))
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-4">{quantity}</span>
                                                            <button className="px-2 text-lg cursor-pointer"
                                                                onClick={() =>
                                                                    handleQtyChange(item.Id, Math.max(1, quantity + 1))
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 Unbounded">${itemSubtotal.toFixed(2)}</td>
                                                    <td className="py-3 px-4 Unbounded">
                                                        <button className="text-red-500 hover:text-red-700 cursor-pointer"
                                                            onClick={() => handleRemove(item.Id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/*Mobile List */}
                                <div className="md:hidden space-y-4">
                                    {cartItems.map((item: CartItem) => {
                                        const quantity = item.qty ?? 1;
                                        const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                                        const itemSubtotal = priceNum * quantity;

                                        return (
                                            <div key={item.Id} className="border-b border-gray-300 rounded p-4 bg-[#E6F9EF]">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-[100px] h-[100px] flex justify-center items-center overflow-hidden">
                                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain rounded" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium Unbounded text-lg">{item.title}</p>
                                                        <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                            <i className="bi bi-shop text-[var(--prim-color)]"></i> By Lucky
                                                        </h6>
                                                        <span className="flex items-center text-yellow-500 text-sm">
                                                            <i className="bi bi-star-fill me-1"></i> {item.review} Review
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="Unbounded text-sm">Price: ${priceNum.toFixed(2)}</p>
                                                <p className="Unbounded text-sm mb-2">Subtotal: ${itemSubtotal.toFixed(2)}</p>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center border w-24 rounded">
                                                        <button
                                                            className="px-2 text-lg cursor-pointer"
                                                            onClick={() => handleQtyChange(item.Id, Math.max(1, quantity - 1))}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-4">{quantity}</span>
                                                        <button
                                                            className="px-2 text-lg cursor-pointer"
                                                            onClick={() => handleQtyChange(item.Id, Math.max(1, quantity + 1))}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
                                                        onClick={() => handleRemove(item.Id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 sticky h-[100%] top-22 left-0">
                            <div className="bg-[var(--prim-light)] p-5 rounded-lg shadow">
                                <h2 className="text-xl font-semibold mb-4">Cart total</h2>
                                <div className="flex justify-between mb-2">
                                    <span className="Unbounded">Subtotal</span>
                                    <span className="Unbounded">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="Unbounded">Estimated</span>
                                    <span className="Unbounded">Free</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="Unbounded">Estimated Taxes</span>
                                    <span className="Unbounded">MX  ${estimatedTaxes.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t border-gray-400 pt-2 text-lg mb-2">
                                    <span className="Unbounded">Total</span>
                                    <span className="Unbounded">${(subtotal + estimatedTaxes).toFixed(2)}</span>
                                </div>
                                <button className="w-[200px] mt-2 py-3 cursor-pointer bg-[var(--prim-color)] text-white font-semibold
                                rounded hover:bg-black transition">
                                    <Link href="/UI-Components/Pages/checkout">
                                        Proceed To Checkout
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}